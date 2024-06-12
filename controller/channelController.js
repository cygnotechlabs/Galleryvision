const channels = require("../database/model/channel");
const channelInvoices = require("../database/model/channelInvoice");
const licensors = require("../database/model/licensor")
const rawchannels = require("../database/model/rawchannel");
const { ObjectId } = require("mongodb");
const { MongoClient } = require("mongodb");
// const db = process.env.DATABASE

// add channel
exports.addChannel = async (req, res) => {
  console.log("add channel :", req.body);
  try {
    const { channelId, channelName, commission, channelLogo, licensorName ,licensorId } =
      req.body;

    const existingChannel = await channels.findOne({
      $or: [{ channelId }, { channelName }],
    });

    if (existingChannel) {
      return res.status(409).json({
        message: "Channel with the provided ID, name, or email already exists",
      });
    }
    const newChannel = new channels({
      channelId,
      channelName,
      commission,
      channelLogo,
      licensorName,
      licensorId
    });

    await newChannel.save();
    await licensors.updateOne(
      { _id: licensorId },
      { $push: { channel: { channelId: channelId } } }
    );
 
    res.status(201).json({ message: "Channel created successfully" });
    console.log("channel created successfully");
  } catch (error) {
    console.error("Error creating channel:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Assign channel
exports.assignChannel = async (req, res) => {
  console.log("assign channel",req.body);
  try {
    const {
      channelId,
      channelName,
      commission,
      licensorId,
      licensorName,
      channelLogo,
      date,
      partnerRevenue,
    } = req.body;

    // Check if a document with the same channelId already exists in the channels collection
    const existingChannel = await channels.findOne({ channelId });

    if (existingChannel) {
      return res.status(409).json({ message: 'Channel with the same ID already exists' });
    }

    const assets = [
      {
        date,
        partnerRevenue
      },
    ];

    const newChannel = new channels({
      channelId,
      channelName,
      commission,
      licensorId,
      licensorName,
      channelLogo,
      assets,
    });

    await newChannel.save();

    await rawchannels.deleteOne({ channelId });
    await licensors.updateOne(
      { _id: licensorId },
      { $push: { channel: { channelId: channelId, channelName: channelName } } }
    );


    res.status(201).json({
      message: "Channel assigned and raw channel deleted successfully",
    });
    console.log("assign channel success");

  } catch (error) {
    console.error("Error assigning channel:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// update assigned channels assets  with new entries
exports.autoUpdateChannels = async (req, res) => {
  try {
    const rawChannels = await rawchannels.find();

    for (const rawChannel of rawChannels) {
      const existingChannel = await channels.findOne({


        
        channelId: rawChannel.channelId,
      });

      if (existingChannel) {
        // const formattedDate = new Date().toLocaleDateString('en-GB');
        existingChannel.assets.push({
          date: rawChannel.date,
          ytRevenue: rawChannel.ytRevenue,
          partnerRevenue: rawChannel.partnerRevenue,
        });
        await existingChannel.save();
        console.log(`Channel with ID ${rawChannel.channelId} updated successfully`);
        await rawchannels.deleteOne({ channelId: rawChannel.channelId });
        console.log(`Raw channel with ID ${rawChannel.channelId} deleted successfully`);
      }
    }

    res.status(201).json({ message: "Channels auto updated successfully" });
  } catch (error) {
    console.error("Error updating channels:", error);
    res.status(500).json({ message: "Internal server error" });
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
// get invoices
exports.getInvoiceForChannel = async (req, res) => {
  try {
    const { channelId } = req.body; // Extracting channelId from the request body
    console.log("get invoice for channel",cha);
    if (!channelId) {
      return res.status(400).json("Channel ID is required");
    }

    const channelInvoice = await channelInvoices.find({ channelId });

    if (channelInvoice.length > 0) {
      res.status(200).json(channelInvoice);
    } else {
      res.status(404).json("No invoices found for the specified channel");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal server error");
  }
};


exports.getOneChannel = async (req, res) => {
  console.log("View Channel", req.body);
  try {
    const { id } = req.params;
    const objectId = new ObjectId(id);

    // Find the channel details
    const channelDetails = await channels.findOne({ _id: objectId });

    if (!channelDetails) {
      return res.status(404).json({ error: "Channel not found" });
    }

    const channelId = channelDetails.channelId;
    console.log("get invoice for channel", channelId);

    if (!channelId) {
      return res.status(400).json("Channel ID is required");
    }

    // Find the channel invoices
    const channelInvoice = await channelInvoices.find({ channelId });

    // Combine the channel details and invoices into one response
    return res.status(200).json({ channelDetails, channelInvoice });
  } catch (error) {
    console.error(error);
    if (error.name === "CastError") {
      return res.status(400).json({ error: "Invalid channel ID" });
    }

    return res.status(500).json({ error: "Internal server error" });
  }
};




exports.removeChannel = async (req, res) => {
  try {
    const { id } = req.params;
    const objectId = new ObjectId(id);

    // Check if the channel exists
    const channelToRemove = await channels.findOne({ _id: objectId });
    if (!channelToRemove) {
      return res.status(404).json({ error: "Channel not found" });
    }

    const { channelId, licensorId } = channelToRemove;
    
    // Remove the channel
    const removeChannel = await channels.deleteOne({ _id: objectId });
    if (removeChannel.deletedCount === 0) {
      return res.status(500).json({ error: "Failed to delete channel" });
    }

    // Update the licensor document to remove the channelId from the channels array
    const licensorObject = new ObjectId(licensorId);
    const updateLicensor = await licensors.updateOne(
      { _id: licensorObject },
      { $pull: { channel: { channelId: channelId } } }
    );

    if (updateLicensor.modifiedCount === 0) {
      return res.status(500).json({ error: "Failed to update licensor" });
    }

    const allChannels = await channels.find().toArray();
    return res.status(200).json(allChannels);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ error: "Invalid channel ID" });
    }

    return res.status(500).json({ error: "Internal server error" });
  }
};




exports.updateChannel = async (req, res) => {
  try {
    const Id = req.params.id;
    const updatedData = req.body;
    console.log("update channel",updatedData,Id);
    

    const objectid = new ObjectId(Id);
    console.log("edit reach here");
    // Find the channel to get the current licensorName
    const channel = await channels.findOne({ _id: objectid });
    if (!channel) {
      return res.status(404).json({ error: "channel not found" });
    }
    

    const oldLicensorName = channel.licensorName;
    const newLicensorName = updatedData.licensorName;

    if (newLicensorName && oldLicensorName !== newLicensorName) {
      // Find the old and new licensor documents
      const oldLicensor = await licensors.findOne({ licensorName: oldLicensorName });
      const newLicensor = await licensors.findOne({ licensorName: newLicensorName });

      const oldId = oldLicensor._id
      const newId = newLicensor._id
      
      const oldLicensorId = new ObjectId(oldId);
      const newLicensorId = new ObjectId(newId);
      
      if (oldLicensor) {
        // Remove the channelId from the old licensor's channel array
        await licensors.updateOne(
          { _id: oldLicensorId },
          { $pull: { channel: { channelId: updatedData.channelId } } }
        );
      }

      if (newLicensor) {
        // Add the channelId to the new licensor's channel array
        await licensors.updateOne(
          { _id: newLicensorId },
          { $push: { channel: { channelId: updatedData.channelId } } }
        );
      } else {
        return res.status(404).json({ error: "new licensor not found" });
      }
    }

    // Update the channel details in the channels collection
    const filter = { _id: objectid };
    const updateResult = await channels.updateOne(filter, {
      $set: updatedData,
    });

    if (updateResult.modifiedCount === 1) {
      return res.json({
        success: true,
        message: "channel details updated successfully",
      });
    } else {
      return res.status(404).json({ error: "channel not found" });
    }
  } catch (error) {
    console.error("Error updating channel:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};




// get particular raw licensor
exports.getOneRawChannel = async (req, res) => {
  try {
    const { id } = req.params;
    const objectId = new ObjectId(id);
    const oneChannelDetails = await rawChannel.findOne({ _id: objectId });

    if (!oneChannelDetails) {
      return res.status(404).json({ error: "Channel not found" });
    }

    return res.status(200).json(oneChannelDetails);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ error: "Invalid Channel" });
    }

    return res.status(500).json({ error: "Internal Channel" });
  }
};
