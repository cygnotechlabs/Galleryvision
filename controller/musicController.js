const rawMusic = require('../database/model/rawmusic');

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
