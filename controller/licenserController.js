const licensor = require('../database/model/licensor')
const { ObjectId } = require("mongodb");


exports.addLicensor = async (req, res) => {
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
      
      const existingLicensor = await licensor.findOne({ licenserName });

    if (existingLicensor) {
      return res.status(409).json({
        error: 'Licensor with the provided name already exists',
      });
    }

      const newLicensor = new licensor({
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


exports.getLicensor = async (req, res) => {
    try {
        const allLicensor = await licensor.find();
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


exports.removelicensor = async (req,res)=>{
    const { id } = req.params
    console.log("id to delete : ", id);
    try {
      const objectid = new ObjectId(id);
      console.log("Object-id : ", objectid);
      const removeLicensor = await licensor.deleteOne({ _id: objectid });
      if (removeLicensor) {
        const allLicensor = await licensor.find();
        res.status(200).json(allLicensor);
      }
    } catch (error) {
      res.status(401).json(error);
    }
}