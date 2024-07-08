const rawchannels = require('../database/model/rawchannel');
const channels = require("../database/model/channel");
const csv = require('csvtojson');
const fs = require('fs'); 

// const importChannel = async (req, res) => {
//     try {
//         console.log("Starting import process...");

//         await rawchannels.deleteMany({});
//         console.log("Existing records deleted.");

//         // Initialize an object to store aggregated revenue data
//         const aggregatedData = {};
//         const currentDate = new Date();
//         currentDate.setMonth(currentDate.getMonth() );
//         const month = currentDate.toLocaleString('en-US', { month: 'long' });
//         const year = currentDate.getFullYear();
//         const formattedDate = `${month} ${year}`; // Format as "Month Year"

//         console.log("Starting CSV parsing...");

//         // Create a read stream from the file path
//         const fileStream = fs.createReadStream(req.file.path);

//         // Process CSV data in a streaming manner
//         csv({
//             delimiter: ',',
//             noheader: false,
//             headers: [
//                 'Adjustment Type',
//                 'Day',
//                 'Country',
//                 'Asset ID',
//                 'Asset Title',
//                 'Asset Labels',
//                 'Asset Channel ID',
//                 'Asset Type',
//                 'Custom ID',
//                 'ISRC',
//                 'UPC',
//                 'GRid',
//                 'Artist',
//                 'Album',
//                 'Label',
//                 'Administer Publish Rights',
//                 'Owned Views',
//                 'YouTube Revenue Split : Auction',
//                 'YouTube Revenue Split : Reserved',
//                 'YouTube Revenue Split : Partner Sold YouTube Served',
//                 'YouTube Revenue Split : Partner Sold Partner Served',
//                 'YouTube Revenue Split',
//                 'Partner Revenue : Auction',
//                 'Partner Revenue : Reserved',
//                 'Partner Revenue : Partner Sold YouTube Served',
//                 'Partner Revenue : Partner Sold Partner Served',
//                 'Partner Revenue'
//             ]
//         })
//             .fromStream(fileStream)
//             .subscribe((row) => {
//                 if (row['Asset Channel ID']) {
//                     const channelId = row['Asset Channel ID'];
//                     const partnerRevenue = parseFloat(row['Partner Revenue'] || 0);
//                     const country = row['Country'];

//                     if (!aggregatedData[channelId]) {
//                         aggregatedData[channelId] = {
//                             channelId: channelId,
//                             date: formattedDate,
//                             partnerRevenue: partnerRevenue,
//                             country : country
//                         };
//                     } else {
//                         aggregatedData[channelId].partnerRevenue += partnerRevenue;
//                     }
//                 }
//             },
//                 (error) => {
//                     console.error("Error during CSV processing:", error);
//                     res.status(400).send({ success: false, msg: error.message });
//                 },
//                 async () => {
//                     console.log("CSV processing completed.");

//                     // This is called when the stream ends
//                     const userData = Object.values(aggregatedData);

//                     // Insert aggregated data into the database
//                     await rawchannels.insertMany(userData);
//                     console.log("Data inserted into the database.");

//                     await autoUpdateChannels(); // Call without req and res
//                     res.status(200).send({ success: true, msg: 'Channel CSV Extracted Successfully' });
//                 });
//     } catch (error) {
//         console.error("Error during import process:", error);
//         res.status(400).send({ success: false, msg: error.message });
//     }
// };

const importChannel = async (req, res) => {
    try {
        console.log("Starting import process...");

        await rawchannels.deleteMany({});
        console.log("Existing records deleted.");

        // Initialize an object to store aggregated revenue data
        const aggregatedData = {};
        const currentDate = new Date();
        currentDate.setMonth(currentDate.getMonth());
        const month = currentDate.toLocaleString('en-US', { month: 'long' });
        const year = currentDate.getFullYear();
        const formattedDate = `${month} ${year}`; // Format as "Month Year"

        console.log("Starting CSV parsing...");

        // Create a read stream from the file path
        const fileStream = fs.createReadStream(req.file.path);

        // Process CSV data in a streaming manner
        csv({
            delimiter: ',',
            noheader: false,
            headers: [
                'Adjustment Type',
                'Day',
                'Country',
                'Asset ID',
                'Asset Title',
                'Asset Labels',
                'Asset Channel ID',
                'Asset Type',
                'Custom ID',
                'ISRC',
                'UPC',
                'GRid',
                'Artist',
                'Album',
                'Label',
                'Administer Publish Rights',
                'Owned Views',
                'YouTube Revenue Split : Auction',
                'YouTube Revenue Split : Reserved',
                'YouTube Revenue Split : Partner Sold YouTube Served',
                'YouTube Revenue Split : Partner Sold Partner Served',
                'YouTube Revenue Split',
                'Partner Revenue : Auction',
                'Partner Revenue : Reserved',
                'Partner Revenue : Partner Sold YouTube Served',
                'Partner Revenue : Partner Sold Partner Served',
                'Partner Revenue'
            ]
        })
            .fromStream(fileStream)
            .subscribe((row) => {
                if (row['Asset Channel ID']) {
                    const channelId = row['Asset Channel ID'];
                    const partnerRevenue = parseFloat(row['Partner Revenue'] || 0);
                    const country = row['Country'];

                    if (!aggregatedData[channelId]) {
                        aggregatedData[channelId] = {
                            channelId: channelId,
                            date: formattedDate,
                            partnerRevenue: partnerRevenue,
                            usRevenue: country === 'US' ? partnerRevenue : 0 // Initialize usRevenue based on country
                        };
                    } else {
                        aggregatedData[channelId].partnerRevenue += partnerRevenue;
                        if (country === 'US') {
                            aggregatedData[channelId].usRevenue += partnerRevenue;
                        }
                    }
                }
            },
                (error) => {
                    console.error("Error during CSV processing:", error);
                    res.status(400).send({ success: false, msg: error.message });
                },
                async () => {
                    console.log("CSV processing completed.");

                    // This is called when the stream ends
                    const userData = Object.values(aggregatedData);

                    // Insert aggregated data into the database
                    await rawchannels.insertMany(userData);
                    console.log("Data inserted into the database.");

                    await autoUpdateChannels(); // Call without req and res
                    res.status(200).send({ success: true, msg: 'Channel CSV Extracted Successfully' });
                });
    } catch (error) {
        console.error("Error during import process:", error);
        res.status(400).send({ success: false, msg: error.message });
    }
};


const autoUpdateChannels = async () => {
    try {
        const rawChannels = await rawchannels.find();

        for (const rawChannel of rawChannels) {
            const existingChannel = await channels.findOne({
                channelId: rawChannel.channelId,
            });

            if (existingChannel) {
                // Check if the date already exists in the assets
                const dateExists = existingChannel.assets.some(asset => asset.date === rawChannel.date);

                if (!dateExists) {
                    // Only update if the date does not exist
                    existingChannel.assets.push({
                        date: rawChannel.date,
                        partnerRevenue: rawChannel.partnerRevenue,
                        usRevenue: rawChannel.usRevenue || 0, // Ensure usRevenue is initialized or default to 0
                    });
                    await existingChannel.save();
                    console.log(`Channel with ID ${rawChannel.channelId} updated successfully`);
                } else {
                    console.log(`Date ${rawChannel.date} already exists for channel ID ${rawChannel.channelId}, skipping update`);
                }

                // Remove the rawChannel entry regardless of whether it was updated or not
                await rawchannels.deleteOne({ channelId: rawChannel.channelId });
                console.log(`Raw channel with ID ${rawChannel.channelId} deleted successfully`);
            }
        }

        console.log("Channels auto updated successfully");
    } catch (error) {
        console.error("Error updating channels:", error);
    }
};

module.exports = {
    importChannel
};