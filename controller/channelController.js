const channels = require('../database/model/channel')
const rawchannels = require('../database/model/rawchannel');
const { ObjectId } = require("mongodb");
const { MongoClient } = require('mongodb');
// const db = process.env.DATABASE




// add channel
exports.addChannel = async (req, res) => {
  try {
    const { channelId, channelName, commission, email, logo , licensorName } = req.body;

    const existingChannel = await channels.findOne({
      $or: [{ channelId }, { channelName }, { email }],
    });

    if (existingChannel) {
      return res.status(409).json({
        message: 'Channel with the provided ID, name, or email already exists',
      });
    }
    const newChannel = new channels({
      channelId,
      channelName,
      commission,
      email,
      logo,
      licensorName
    });

    await newChannel.save();

    res.status(201).json({ message: 'Channel created successfully' });
  } catch (error) {
    console.error('Error creating channel:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.assignChannel = async (req, res) => {
  console.log(req.body);
  try {
    const { id } = req.params;
      const objectId = new ObjectId(id);
     
    const { channelId, channelName, commission , channelEmail , licensorId , channelLogo  } = req.body;
    const rawChannel = await rawchannels.findOne({ _id: objectId });

    if (!rawChannel) {
      return res.status(404).json({ message: 'Raw channel not found' });
    }

    rawChannel.channelName = channelName;
    rawChannel.commission = commission;
    rawChannel.channelEmail = channelEmail;
    rawChannel.licensorId = licensorId;
    rawChannel.channelLogo = channelLogo;

    const assignedChannel = new channels(rawChannel);

    await assignedChannel.save();

    await rawchannels.deleteOne({ channelId });

    res.status(201).json({ message: 'Channel assigned and raw channel deleted successfully' });
  } catch (error) {
    console.error('Error assigning channel:', error);
    res.status(500).json({ message: 'Internal server error' });
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
      const unlinkedChannels = await rawchannels.find();

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

// get particular unassigned channel
exports.getOneChannel = async (req, res) => {
    try {
      const { id } = req.params;
      const objectId = new ObjectId(id);
      const channelDetails = await rawchannels.findOne({ _id: objectId });
  
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
  

  
  
  // get particular licensor
  exports.getOneRawChannel = async (req, res) => {
      try {
        const { id } = req.params;
        const objectId = new ObjectId(id);
        const oneChannelDetails = await rawChannel.findOne({ _id: objectId });
    
        if (!oneChannelDetails) {
          return res.status(404).json({ error: 'Channel not found' });
        }
    
        return res.status(200).json(oneChannelDetails);
      } catch (error) {
        if (error.name === 'CastError') {
          return res.status(400).json({ error: 'Invalid Channel' });
        }
    
        return res.status(500).json({ error: 'Internal Channel' });
      }
    };