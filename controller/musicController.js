const { ObjectId } = require('mongodb')
const musics = require('../database/model/musics')
const rawMusic = require('../database/model/rawmusic')
const licensors = require('../database/model/licensor');
const musicInvoices = require('../database/model/musicInvoice');

const jwt = require('jsonwebtoken');
const secretKey = 'abcd'; 

// get rawMusic
exports.getRawMusic = async (req, res) => {
    try {
        const allRawMusic = await rawMusic.find();
        // console.log(allRawMusic);
        
        if (allRawMusic) {
            res.status(200).json(allRawMusic);
        } else {
            res.status(404).json("Raw music not found");
        }
    } catch (error) {
        console.error(error); 
        res.status(500).json("Internal server error"); 
    }
};

// get particular licensor
exports.getOneRawMusic = async (req, res) => {
    try {
      const { id } = req.params;
      const objectId = new ObjectId(id);
      const oneMusicDetails = await rawMusic.findOne({ _id: objectId });
  
      if (!oneMusicDetails) {
        return res.status(404).json({ error: 'Music not found' });
      }
  
      return res.status(200).json(oneMusicDetails);
    } catch (error) {
      if (error.name === 'CastError') {
        return res.status(400).json({ error: 'Invalid Music' });
      }
  
      return res.status(500).json({ error: 'Internal Music' });
    }
  };

  exports.getLinkedMusics = async (req, res) => {
  
    try {
        const getMusics = await musics.find();
        // console.log(allChannels);
        
        if (getMusics.length > 0) {
            res.status(200).json(getMusics);
            
        } else {
            res.status(404).json("Music Channel list is empty"); 
        }
    } catch (error) {
        console.error(error); 
        res.status(500).json("Internal server error"); 
    }
  };
  
  //Adding Music Channel
  exports.addMusic = async (req, res) => {
      try {
      const { 
        musicId,
        musicName,
        licensorName,
        licensorId,
        commission,
        musicLogo } = req.body;
          
          // Log the received data for debugging
          console.log("Received Add Music Data:", req.body);
  
          const existingMusics = await musics.findOne({
            $or: [{ musicId }, { musicName }],
          });
      
          if (existingMusics) {
            return res.status(409).json({
              message: "Music with the provided ID and name already exists",
            });
          }
   
          const newMusic = new musics({
              musicId,
              musicName,
              licensorName,
              licensorId,
              commission,
              musicLogo
              
          });
  
  
          // Save the new music document
          await newMusic.save();
  
          await licensors.updateOne(
            { _id: licensorId },
            { $push: { music: { musicId: musicId } } }
          );
  
          res.status(201).json({ message: 'Music added successfully' });
          console.log("Music added successfully");
      } catch (error) {
          // Log the error for debugging
          console.error("Error adding music:", error);
          res.status(500).json({ error: 'Internal server error' });
      }
  };
  
  
  //delete music channel
  exports.delmusic = async (req, res) => {
    try {
        const { id } = req.params;
        const objectId = new ObjectId(id);

        const musicFind = await musics.findOne({ _id: objectId });

        if (!musicFind) {
            return res.status(404).json({ error: 'Music Channel Not found' });
        }

        const { musicId, licensorId } = musicFind;
        const removeMusic = await musics.deleteOne({ _id: objectId });

        if (removeMusic.deletedCount === 0) {
            return res.status(500).json({ error: 'Failed to delete music' });
        }

        console.log("One record deleted");

        // Update the licensor document to remove the musicId from the music array
        const licensorObject = new ObjectId(licensorId);
        const updateLicensor = await licensors.updateOne(
            { _id: licensorObject },
            { $pull: { music: { musicId: musicId } } }
        );

        if (updateLicensor.modifiedCount === 0) {
            return res.status(500).json({ error: "Failed to update licensor" });
        }

        const allMusic = await musics.find().toArray();
        return res.status(200).json(allMusic);
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ error: 'Invalid Music channel ID' });
        }
        return res.status(500).json({ error: 'Internal server error' });
    }
};
  
  //update music channel
  exports.updateMusic = async (req, res) => {
    try {
      const Id = req.params.id;
      const updatedData = req.body;
      console.log("Update Music",updatedData);
      
      const objectid = new ObjectId(Id);
      
      // Find the music to get the current licensorName
      const music = await musics.findOne({ _id: objectid });
      if (!music) {
        return res.status(404).json({ error: "Music not found" });
      }
        
      const oldLicensorName = music.licensorName;
      const newLicensorName = updatedData.licensorName;
  
      console.log("Old=",oldLicensorName,"New=",newLicensorName)
  
      if (newLicensorName && oldLicensorName !== newLicensorName) {
        // Find the old and new licensor documents
        const oldLicensor = await licensors.findOne({ licensorName: oldLicensorName });
        const newLicensor = await licensors.findOne({ licensorName: newLicensorName });
  
        console.log("old=",oldLicensor,"new=",newLicensor)
  
        const oldId = music.licensorId
        const newId = newLicensor._id
        
        const oldLicensorId = new ObjectId(oldId);
        const newLicensorId = new ObjectId(newId);
  
        console.log(oldLicensorId,newLicensorId)
        
        if (oldLicensor) {
          // Remove the musicId from the old licensor's channel array
          await licensors.updateOne(
            { _id: oldLicensorId },
            { $pull: { music: { musicId: updatedData.musicId } } }
          );
        }
  
        if (newLicensor) {
          // Add the musicId to the new licensor's channel array
          await licensors.updateOne(
            { _id: newLicensorId },
            { $push: { music: { musicId: updatedData.musicId } } }
          );
        } else {
          return res.status(404).json({ error: "new licensor not found" });
        }
      }
  
      // Update the music details in the collection
      const filter = { _id: objectid };
      const updateResult = await musics.updateOne(filter, {
        $set: updatedData,
      });
  
      if (updateResult.modifiedCount === 1) {
        return res.json({
          success: true,
          message: "Music details updated successfully",
        });
      } else {
        return res.status(404).json({ error: "Music not found" });
      }
    } catch (error) {
      console.error("Error updating channel:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };
  

  exports.getOneMusic = async (req, res) => {
    console.log("view music", req.body);
    try {
      const { id } = req.params;
      const objectId = new ObjectId(id);
  
      // Find the channel details
      const musicDetails = await musics.findOne({ _id: objectId });
  
      if (!musicDetails) {
        return res.status(404).json({ error: "Music not found" });
      }
  
      const musicId = musicDetails.musicId;
      console.log("Get invoice for music", musicId);
  
      if (!musicId) {
        return res.status(400).json("Music ID is required");
      }
  
      // Find the channel invoices
      const musicInvoice = await musicInvoices.find({ musicId });
  
      // Combine the channel details and invoices into one response
      return res.status(200).json({ musicDetails, musicInvoice });
    } catch (error) {
      console.error(error);
      if (error.name === "CastError") {
        return res.status(400).json({ error: "Invalid music ID" });
      }
  
      return res.status(500).json({ error: "Internal server error" });
    }
  };
 
  //Assign Music
  exports.assignMusic = async (req, res) => {
    console.log("Assign music",req.body);
    try {
      const {
        musicId,
        musicName,
        commission,
        licensorId,
        licensorName,
        musicLogo,
        date,
        partnerRevenue,
      } = req.body;
  
      // Check if a document with the same channelId already exists in the channels collection
      const existingmusic = await musics.findOne({ musicId });
  
      if (existingmusic) {
        return res.status(409).json({ message: 'Music with the same ID already exists' });
      }
  
      const assets = [
        {
          date,
          partnerRevenue
        },
      ];
  
      const newMusic = new musics({
        musicId,
        musicName,
        commission,
        licensorName,
        licensorId,
        musicLogo,
        assets,
      });
  
      await newMusic.save();
  
      await rawMusic.deleteOne({ musicId });
      
      await licensors.updateOne(
        { _id: licensorId },
        { $push: { music : { musicId: musicId, musicName: musicName }  } }
      );
      
  
      res.status(201).json({
        message: "Music assigned and raw music deleted successfully",
      });
    } catch (error) {
      console.error("Error assigning music:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };