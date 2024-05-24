const musics = require('../database/model/musics');
const channels = require("../database/model/channel");
const licensors = require('../database/model/licensor');

exports.getCount = async (req, res) => {
    try {
        const channelCount = await channels.countDocuments();
        const musicCount = await musics.countDocuments();
        const licensorCount = await licensors.countDocuments();

        res.status(200).json({ 
            channelCount: channelCount,
            musicCount: musicCount,
            licensorCount: licensorCount
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};