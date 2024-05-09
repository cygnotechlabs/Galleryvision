const channels = require('../database/model/channel')
const { ObjectId } = require("mongodb");
const { MongoClient } = require('mongodb');
// const db = process.env.DATABASE

// collection to collection

exports.processData = async (req, res) => {
  try {
    // Your data processing logic here
    const client = await MongoClient.connect("mongodb+srv://galleryvision:E80Cha76i9vA5jRY@galleryvision.43un76r.mongodb.net/GalleryVision?retryWrites=true&w=majority&appName=GalleryVision");
    console.log('Connected to MongoDB');
    const dbName = 'GalleryVision';
    const db = client.db(dbName);

    // Query sampledata collection for documents where channelid is not empty
    const docs = await db.collection('sample_datas').find({ "Asset Channel ID": { $ne: '' } }).toArray();
    // console.log(docs[0]["Asset Channel ID"]);
    // Process each document
    for (const doc of docs) {
      // console.log(doc["Asset Channel ID"]);
      console.log(doc["YouTube Revenue Split"]);
      const channelId = doc["Asset Channel ID"]
      const youtubeRevenue =doc["YouTube Revenue Split"]
      const partnerRevenue =doc["Partner Revenue"]
      const assetId =doc["Asset ID"]
      const channelName = ""
      const commission=""
      const email = ""
      const currency = ""
      const logo=""
      const licensorName = ""
      // Extract channelid and revenue
      // const { channelid, revenue } = doc;

      // // Create new document for channels collection
      const newChannelDoc = {
        channelId,
        youtubeRevenue,
        partnerRevenue,
        assetId,
        channelName,
      commission,
      email,
      currency,
      logo,
      licensorName
      };

      // Insert new document into channels collection
      await db.collection('channels').insertOne(newChannelDoc);
      // console.log('Document inserted into channels collection');
    }

    console.log('Data processed successfully');
    client.close();
    
    // Send response to client
    res.send('Data processed successfully');
  } catch (error) {
    console.error('Error processing data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// collection to collection



// add channel
exports.addChannel = async (req, res) => {
  try {
    const { channelId, channelName, commission, email, currency, logo , licensorName } = req.body;

    const existingChannel = await channels.findOne({
      $or: [{ channelId }, { channelName }, { email }],
    });

    if (existingChannel) {
      return res.status(409).json({
        error: 'Channel with the provided ID, name, or email already exists',
      });
    }
    const newChannel = new channels({
      channelId,
      channelName,
      commission,
      email,
      currency,
      logo,
      licensorName
    });

    await newChannel.save();

    res.status(201).json({ message: 'Channel created successfully' });
  } catch (error) {
    console.error('Error creating channel:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
// get linked channels
exports.getLinkedChannels = async (req, res) => {
  try {
      const linkedChannels = await channels.find({ channelName: { $ne: "" } });

      if (linkedChannels.length > 0) {
          res.status(200).json(linkedChannels);
      } else {
          res.status(404).json("No linked channels found");
      }
  } catch (error) {
      console.error(error);
      res.status(500).json("Internal server error");
  }
};
// get unlinked channels
exports.getUnlinkedChannels = async (req, res) => {
  try {
      const unlinkedChannels = await channels.find({ channelName: "" });

      if (unlinkedChannels.length > 0) {
          res.status(200).json(unlinkedChannels);
      } else {
          res.status(404).json("No unlinked channels found");
      }
  } catch (error) {
      console.error(error);
      res.status(500).json("Internal server error");
  }
};

// get channels
exports.getChannels = async (req, res) => {
    try {
        const allChannels = await channels.find();
        // console.log(allChannels);
        
        if (allChannels.length > 0) {
            res.status(200).json(allChannels);
        } else {
            res.status(404).json("Channel list is empty"); 
        }
    } catch (error) {
        console.error(error); 
        res.status(500).json("Internal server error"); 
    }
};

// get particular channel
exports.getOneChannel = async (req, res) => {
    try {
      const { id } = req.params;
      const objectId = new ObjectId(id);
      const channelDetails = await channels.findOne({ _id: objectId });
  
      if (!channelDetails) {
        return res.status(404).json({ error: 'Channel not found' });
      }
  
      return res.status(200).json(channelDetails);
    } catch (error) {
      if (error.name === 'CastError') {
        return res.status(400).json({ error: 'Invalid channel ID' });
      }
  
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

// remove channel
exports.removeChannel = async (req, res) => {
    try {
      const { id } = req.params;
      const objectId = new ObjectId(id);
  
      // Check if the channel exists
      const channelToRemove = await channels.findOne({ _id: objectId });
      if (!channelToRemove) {
        return res.status(404).json({ error: 'Channel not found' });
      }
  
      // Remove the channel
      const removeChannel = await channels.deleteOne({ _id: objectId });
            if (removeChannel) {
              const allChannels = await channels.find();
              res.status(200).json(allChannels);
            }
    } catch (error) {
      if (error.name === 'CastError') {
        return res.status(400).json({ error: 'Invalid channel ID' });
      }
  
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
  
// update channel
exports.updateChannel = async (req, res) => {
    try {
      const channelId = req.params.id;
      const updatedData = req.body;
  
      const objectid = new ObjectId(channelId);
  
      const filter = { _id: objectid };
      const updateResult = await channels.updateOne(filter, { $set: updatedData });
  
      if (updateResult.modifiedCount === 1) {
        return res.json({ success: true, message: 'channel details updated successfully' });
      } else {
        return res.status(404).json({ error: 'channel not found' });
      }
    } catch (error) {
      console.error('Error updating order:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
  

