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