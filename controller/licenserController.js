const licensors = require('../database/model/licensor');
const { ObjectId } = require("mongodb");

// add licensor
exports.addLicensor = async (req, res) => {
  console.log(req.body);
    try {
      const {
        companyName,
        companyEmail,
        companylogo,
        licenserName,
        licenserEmail,
        licenserAddress,
        licenserPhno,
        paymentMethod,
        bankAccNum,
        ifsc_iban,
        preferredCurrency,
      } = req.body;
      
      const existingLicensor = await licensors.findOne({ licenserName });

    if (existingLicensor) {
      return res.status(409).json({
        error: 'Licensor with the provided name already exists',
      });
    }

      const newLicensor = new licensors({
        companyName,
        companyEmail,
        companylogo,
        licenserName,
        licenserEmail,
        licenserAddress,
        licenserPhno,
        paymentMethod,
        bankAccNum,
        ifsc_iban,
        preferredCurrency,
      });
  
      await newLicensor.save();
  
      res.status(201).json({ message: 'Licensor added successfully' });
    } catch (error) {
      console.error('Error adding licensor:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

// get licensors
exports.getLicensor = async (req, res) => {
    try {
        const allLicensor = await licensors.find();
        // console.log(allChannels);
        
        if (allLicensor.length > 0) {
            res.status(200).json(allLicensor);
        } else {
            res.status(404).json("licensor list is empty"); 
        }
    } catch (error) {
        console.error(error); 
        res.status(500).json("Internal server error"); 
    }
};

// get particular licensor
exports.getOneLicenser = async (req, res) => {
    try {
      const { id } = req.params;
      const objectId = new ObjectId(id);
      const licensorDetails = await licensors.findOne({ _id: objectId });
  
      if (!licensorDetails) {
        return res.status(404).json({ error: 'Licensor not found' });
      }
  
      return res.status(200).json(licensorDetails);
    } catch (error) {
      if (error.name === 'CastError') {
        return res.status(400).json({ error: 'Invalid licensor ID' });
      }
  
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

//remove licensor
exports.removelicensor = async (req,res)=>{
    const { id } = req.params
    console.log("id to delete : ", id);
    try {
      const objectid = new ObjectId(id);
      console.log("Object-id : ", objectid);
      const removeLicensor = await licensors.deleteOne({ _id: objectid });
      if (removeLicensor) {
        const allLicensor = await licensors.find();
        res.status(200).json(allLicensor);
      }
    } catch (error) {
      res.status(401).json(error);
    }
}

// update licensor
exports.updateLicensor = async (req, res) => {
    try {
      const licensorId = req.params.id;
      const updatedData = req.body;
  
      const objectid = new ObjectId(licensorId);
  
      const filter = { _id: objectid };
      const updateResult = await licensors.updateOne(filter, { $set: updatedData });
  
      if (updateResult.modifiedCount === 1) {
        return res.json({ success: true, message: 'licensor details updated successfully' });
      } else {
        return res.status(404).json({ error: 'licensor not found' });
      }
    } catch (error) {
      console.error('Error updating licensor:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
  