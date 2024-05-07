const channels = require('../database/model/channel')
const { ObjectId } = require("mongodb");

// add channel

exports.addChannel = async (req, res) => {
  try {
    const { channelId, channelName, commission, email, currency, logo } = req.body;

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
    });

    await newChannel.save();

    res.status(201).json({ message: 'Channel created successfully' });
  } catch (error) {
    console.error('Error creating channel:', error);
    res.status(500).json({ error: 'Internal server error' });
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
        return res.json({ success: true, message: 'Order updated successfully' });
      } else {
        return res.status(404).json({ error: 'Order not found' });
      }
    } catch (error) {
      console.error('Error updating order:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
  

