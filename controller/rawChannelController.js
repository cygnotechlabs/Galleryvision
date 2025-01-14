// const rawchannels = require('../database/model/rawchannel');
// const channels = require("../database/model/channel");
// const csv = require('csvtojson');
// const fs = require('fs'); 


// const importChannel = async (req, res) => {
//     try {

//         await rawchannels.deleteMany({});
//         console.log("Channel CSV File Uploaded ");
//         console.log("Existing records deleted.");

//         // Initialize an object to store aggregated revenue data
//         const aggregatedData = {};
//         const currentDate = new Date();
//         currentDate.setMonth(currentDate.getMonth());
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
//                             usRevenue: country === 'US' ? partnerRevenue : 0 // Initialize usRevenue based on country
//                         };
//                     } else {
//                         aggregatedData[channelId].partnerRevenue += partnerRevenue;
//                         if (country === 'US') {
//                             aggregatedData[channelId].usRevenue += partnerRevenue;
//                         }
//                     }
//                 }
//             },
//                 (error) => {
//                     console.error("Error during CSV processing:", error);
//                 },
//                 async () => {
//                     console.log("CSV processing completed");

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


// // const autoUpdateChannels = async () => {
// //     try {
// //         const rawChannels = await rawchannels.find();
// //         console.log("Channel Auto Updating ....");

// //         for (const rawChannel of rawChannels) {
// //             const existingChannel = await channels.findOne({
// //                 channelId: rawChannel.channelId,
// //             });

// //             if (existingChannel) {
// //                 // Check if the date already exists in the assets
// //                 const dateExists = existingChannel.assets.some(asset => asset.date === rawChannel.date);

// //                 if (!dateExists) {
// //                     // Only update if the date does not exist
// //                     existingChannel.assets.push({
// //                         date: rawChannel.date,
// //                         partnerRevenue: rawChannel.partnerRevenue,
// //                         usRevenue: rawChannel.usRevenue || 0, // Ensure usRevenue is initialized or default to 0
// //                     });
// //                     await existingChannel.save();
// //                     console.log(`Channel with ID ${rawChannel.channelId} updated successfully`);
// //                 } else {
// //                     console.log(`Date ${rawChannel.date} already exists for channel ID ${rawChannel.channelId}, skipping update`);
// //                 }

// //                 // Remove the rawChannel entry regardless of whether it was updated or not
// //                 await rawchannels.deleteOne({ channelId: rawChannel.channelId });
// //                 console.log(`Raw channel with ID ${rawChannel.channelId} deleted successfully`);
// //             }
// //         }

// //         console.log("Channels auto updated successfully");
// //     } catch (error) {
// //         console.error("Error updating channels:", error);
// //     }
// // };


// const autoUpdateChannels = async () => {
//     try {
//         const rawChannels = await rawchannels.find();
//         console.log("Channel Auto Updating ....");

//         const updatePromises = rawChannels.map(async (rawChannel) => {
//             const existingChannel = await channels.findOne({ channelId: rawChannel.channelId });

//             if (existingChannel) {
//                 const dateExists = existingChannel.assets.some(asset => asset.date === rawChannel.date);

//                 if (!dateExists) {
//                     existingChannel.assets.push({
//                         date: rawChannel.date,
//                         partnerRevenue: rawChannel.partnerRevenue,
//                         usRevenue: rawChannel.usRevenue || 0, // Ensure usRevenue is initialized or default to 0
//                     });
//                     await existingChannel.save();
//                     console.log(`Channel with ID ${rawChannel.channelId} updated successfully`);
//                 } else {
//                     console.log(`Date ${rawChannel.date} already exists for channel ID ${rawChannel.channelId}, skipping update`);
//                 }

//                 await rawchannels.deleteOne({ channelId: rawChannel.channelId });
//                 console.log(`Raw channel with ID ${rawChannel.channelId} deleted successfully`);
//             } else {
//                 console.log(`Channel with ID ${rawChannel.channelId} not found in existing channels`);
//             }
//         });

//         await Promise.all(updatePromises);

//         console.log("Channels auto updated successfully");
//     } catch (error) {
//         console.error("Error updating channels:", error);
//     }
// };


// module.exports = {
//     importChannel
// };











































const rawchannels = require('../database/model/rawchannel');
const channels = require("../database/model/channel");
const csv = require('csvtojson');
const fs = require('fs');

const importChannel = async (req, res) => {
    try {
        await clearRawChannels();
        console.log("Existing records deleted.");

        const formattedDate = getCurrentFormattedDate();
        console.log("Starting CSV parsing...");

        const aggregatedData = await parseCSV(req.file.path, formattedDate);

        console.log("CSV processing completed");
        await rawchannels.insertMany(aggregatedData);
        console.log("Data inserted into the database.");

        await autoUpdateChannels();
        res.status(200).send({ success: true, msg: 'Channel CSV Extracted Successfully' });
    } catch (error) {
        console.error("Error during import process:", error);
        res.status(400).send({ success: false, msg: error.message });
    }
};

const clearRawChannels = async () => {
    await rawchannels.deleteMany({});
};

const getCurrentFormattedDate = () => {
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() - 1); 
    const month = currentDate.toLocaleString('en-US', { month: 'long' });
    const year = currentDate.getFullYear();
    return `${month} ${year}`;
};

const parseCSV = (filePath, formattedDate) => {
    return new Promise((resolve, reject) => {
        const aggregatedData = {};
        const fileStream = fs.createReadStream(filePath);

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
            .subscribe(
                (row) => {
                    if (row['Asset Channel ID']) {
                        const channelId = row['Asset Channel ID'];
                        const partnerRevenue = parseFloat(row['Partner Revenue'] || 0);
                        const country = row['Country'];

                        if (!aggregatedData[channelId]) {
                            aggregatedData[channelId] = {
                                channelId,
                                date: formattedDate,
                                partnerRevenue,
                                usRevenue: country === 'US' ? partnerRevenue : 0
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
                    reject(error);
                },
                () => {
                    resolve(Object.values(aggregatedData));
                }
            );
    });
};

const autoUpdateChannels = async () => {
    try {
        const rawChannels = await rawchannels.find();
        console.log("Channel Auto Updating ....");

        const updatePromises = rawChannels.map(async (rawChannel) => {
            const existingChannel = await channels.findOne({ channelId: rawChannel.channelId });

            if (existingChannel) {
                const dateExists = existingChannel.assets.some(asset => asset.date === rawChannel.date);

                if (!dateExists) {
                    existingChannel.assets.push({
                        date: rawChannel.date,
                        partnerRevenue: rawChannel.partnerRevenue,
                        usRevenue: rawChannel.usRevenue || 0,
                    });
                    await existingChannel.save();
                    console.log(`Channel with ID ${rawChannel.channelId} updated successfully`);
                } else {
                    // console.log(`Date ${rawChannel.date} already exists for channel ID ${rawChannel.channelId}, skipping update`);
                }

                await rawchannels.deleteOne({ channelId: rawChannel.channelId });
                console.log(`Raw channel with ID ${rawChannel.channelId} deleted successfully`);
            } else {
                // console.log(`Channel with ID ${rawChannel.channelId} not found in existing channels`);
            }
        });

        await Promise.all(updatePromises);
        console.log("Channels auto updated successfully");
    } catch (error) {
        console.error("Error updating channels:", error);
    }
};

module.exports = {
    importChannel
};
