const musics = require('../database/model/musics');
const channels = require("../database/model/channel");
const licensors = require('../database/model/licensor');
const dashboard = require('../database/model/dashboard'); 

// exports.getCount = async (req, res) => {
//     try {
//         const channelCount = await channels.countDocuments();
//         const musicCount = await musics.countDocuments();
//         const licensorCount = await licensors.countDocuments();

//         res.status(200).json({ 
//             channelCount: channelCount,
//             musicCount: musicCount,
//             licensorCount: licensorCount
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };

exports.getCount = async (req, res) => {
    try {
        const channelCount = await channels.countDocuments();
        const musicCount = await musics.countDocuments();
        const licensorCount = await licensors.countDocuments();

        // Sum totalCommission from the dashboard collection
        const totalCommissionResult = await dashboard.aggregate([
            {
                $group: {
                    _id: null,
                    totalCommission: { $sum: { $toDouble: "$totalCommission" } }
                }
            }
        ]);

        // Extract the totalCommission value
        const totalCommission = totalCommissionResult.length > 0 ? totalCommissionResult[0].totalCommission : 0;

        const totalchannelCommissionResult = await dashboard.aggregate([
            {
                $group: {
                    _id: null,
                    channelCommission: { $sum: { $toDouble: "$channelCommission" } }
                }
            }
        ]);

        // Extract the totalChannelCommission value
        const totalchannelCommission = totalchannelCommissionResult.length > 0 ? totalchannelCommissionResult[0].channelCommission : 0;

        const totalMusicCommissionResult = await dashboard.aggregate([
            {
                $group: {
                    _id: null,
                    musicCommission: { $sum: { $toDouble: "$musicCommission" } }
                }
            }
        ]);

        // Extract the totalMusicCommission value
        const totalMusicCommission = totalMusicCommissionResult.length > 0 ? totalMusicCommissionResult[0].musicCommission : 0;

        // Get channelCommissionArray and musicCommissionArray
        const channelCommissionArrayResult = await dashboard.aggregate([
            {
                $project: {
                    channelCommission: { $toDouble: "$channelCommission" }
                }
            }
        ]);

        const musicCommissionArrayResult = await dashboard.aggregate([
            {
                $project: {
                    musicCommission: { $toDouble: "$musicCommission" }
                }
            }
        ]);

        const totalCommissionArrayResult = await dashboard.aggregate([
            {
                $project: {
                    totalCommission: { $toDouble: "$totalCommission" }
                }
            }
        ]);

        const dateArrayResult = await dashboard.aggregate([
            {
                $project: {
                    date: 1 // Use 1 to include the date field as it is without conversion
                }
            }
        ]);

        const channelCommissionArray = channelCommissionArrayResult.map(doc => doc.channelCommission);
        const musicCommissionArray = musicCommissionArrayResult.map(doc => doc.musicCommission);
        const totalCommissionArray = totalCommissionArrayResult.map(doc => doc.totalCommission);
        const dateArray = dateArrayResult.map(doc => doc.date);

        res.status(200).json({ 
            channelCount: channelCount,
            musicCount: musicCount,
            licensorCount: licensorCount,
            totalCommission: totalCommission,
            totalchannelCommission: totalchannelCommission,
            totalMusicCommission: totalMusicCommission,
            channelCommissionArray: channelCommissionArray,
            musicCommissionArray: musicCommissionArray,
            totalCommissionArray: totalCommissionArray,
            dateArray: dateArray
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// exports.getCount = async (req, res) => {
//     try {
//         const channelCount = await channels.countDocuments();
//         const musicCount = await musics.countDocuments();
//         const licensorCount = await licensors.countDocuments();

//         // Sum totalCommission from the dashboard collection
//         const totalCommissionResult = await dashboard.aggregate([
//             {
//                 $group: {
//                     _id: null,
//                     totalCommission: { $sum: { $toDouble: "$totalCommission" } }
//                 }
//             }
//         ]);

//         // Extract the totalCommission value
//         const totalCommission = totalCommissionResult.length > 0 ? totalCommissionResult[0].totalCommission : 0;

//         const totalchannelCommissionResult = await dashboard.aggregate([
//             {
//                 $group: {
//                     _id: null,
//                     channelCommission: { $sum: { $toDouble: "$channelCommission" } }
//                 }
//             }
//         ]);

//         // Extract the totalCommission value
//         const totalchannelCommission = totalchannelCommissionResult.length > 0 ? totalchannelCommissionResult[0].channelCommission : 0;

//         const totalMusicCommissionResult = await dashboard.aggregate([
//             {
//                 $group: {
//                     _id: null,
//                     musicCommission: { $sum: { $toDouble: "$musicCommission" } }
//                 }
//             }
//         ]);

//         // Extract the totalCommission value
//         const totalMusicCommission = totalMusicCommissionResult.length > 0 ? totalMusicCommissionResult[0].musicCommission : 0;

//         res.status(200).json({ 
//             channelCount: channelCount,
//             musicCount: musicCount,
//             licensorCount: licensorCount,
//             totalCommission: totalCommission,
//             totalchannelCommission : totalchannelCommission,
//             totalMusicCommission: totalMusicCommission
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };


exports.getDashboard = async (req, res) => {
    try {
        const dashboardData = await dashboard.find(); // Renamed variable to avoid conflict
  
        if (dashboardData.length > 0) {
            res.status(200).json(dashboardData);
        } else {
            res.status(404).json({ message: "No dashboard details found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
