const tax = require('../database/model/tax')
const currency = require('../database/model/currency');
const { ObjectId } = require('mongodb');



exports.viewTax = async (req, res) => {
    try {
        const getTax = await tax.find();
        
        if(getTax.length > 0){
            res.status(200).json(getTax);
            // console.log("Displayed Successfully")
        }
        else{
            res.status(404).json("Tax list is empty")
        }
    } catch (error) {
        console.error(error);
        res.status(500).json("Internal Server Error");
        
    }
};

// exports.addTax = async (req, res) => {
//     try {
//         const {taxPercentage ,date } = req.body;
//         console.log("received data:", req.body);

//         const existingTax = await tax.findOne({
//             $or: [{ date }],
//         });

//         if ( existingTax ){
//             return res.status(409).json({
//                 message:"Tax is already exists",
//             });
//         }


//         const newTax = new tax({
//             taxPercentage,
//             date
//         });
//         await newTax.save();
//         res.status(201).json({message: 'Tax added Succesfully'});
//     } catch (error) {
//         console.error("Error adding Tax:",error);
//         res.status(500).json({ error : 'Internal Server error'});
        
//     }
// };

exports.addTax = async (req, res) => {
  try {
      const { taxPercentage, date } = req.body;
      console.log("Received data:", req.body);

      const existingTax = await tax.findOneAndUpdate(
          { date },
          { taxPercentage, date },
          { new: true, upsert: true }
      );

      if (existingTax) {
          return res.status(200).json({
              message: "Tax updated successfully",
              tax: existingTax
          });
      }

      const newTax = new tax({
          taxPercentage,
          date
      });
      await newTax.save();
      res.status(201).json({ message: 'Tax added successfully' });

  } catch (error) {
      console.error("Error adding or updating tax:", error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};



exports.updateTax = async (req, res) =>{
    try{
      const Id = req.params.id;
      const updatedTax = req.body;
  
      const objectid = new ObjectId(Id);
    
        const filter = { _id: objectid };
        const updateResult = await tax.updateOne(filter, { $set: updatedTax });
  
        if (updateResult.modifiedCount === 1) {
          return res.json({ success: true, message: 'Tax updated successfully' });
        } else {
          return res.status(404).json({ error: 'Tax not found' });
        }
      }
      catch (error){
        console.error('Error updating Tax:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }
  }; 



exports.delTax = async (req, res) => {
    try {
        const { id } = req.params;
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }

        const objectId = new ObjectId(id);
        const taxFind = await tax.findById(objectId);

        if (!taxFind) {
            return res.status(404).json({ error: 'Tax not found' });
        }

        const removeTaxResult = await tax.deleteOne({ _id: objectId });

        if (removeTaxResult.deletedCount === 0) {
            return res.status(500).json({ error: 'Failed to delete the tax record' });
        }

        console.log("One record deleted");

        const allTax = await tax.find();
        return res.status(200).json(allTax);

    } catch (error) {
        console.error('Error deleting tax record:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

//View Currency

exports.viewCurrency = async (req, res) => {
    try {
        const getCurrency = await currency.find();
        
        if(getCurrency.length > 0){
            res.status(200).json(getCurrency);
            // console.log("Displayed Successfully")
        }
        else{
            res.status(404).json("Currency list is empty")
        }
    } catch (error) {
        console.error(error);
        res.status(500).json("Internal Server Error");
        
    }
};

// exports.addCurrency = async (req, res) => {
//     try {
//         const { currencyName, currencyRate ,month, year} = req.body;
//         console.log("received data:", req.body);

//         // const existingCurrency = await currency.findOne({
//         //     $or: [{ currencyName }],
//         // });

//         // if ( existingCurrency ){
//         //     return res.status(409).json({
//         //         message:"Currency is already exists",
//         //     });
//         // }

//         const newCurrency = new currency({
//             currencyName,
//             currencyRate,
//             month,
//             year
//         });
//         await newCurrency.save();
//         res.status(201).json({message: 'Currency added Succesfully'});
//     } catch (error) {
//         console.error("Error adding Tax:",error);
//         res.status(500).json({ error : 'Internal Server error'});
        
//     }
// };


exports.addCurrency = async (req, res) => {
    const { INR, date } = req.body;
    const USD = 1; // Assign a default value to USD
  console.log("currency add",req.body);
    if (!INR || !date) {
      return res.status(400).send('Invalid input data');
    }
  
    try {
      let getCurrency = await currency.findOne({ date });
  
      if (getCurrency) {
        getCurrency.INR = INR;
         console.log("Date updated successfully"); 
      } else {
        getCurrency = new currency({
          date,
          USD,
          INR
        });
      }
  
      await getCurrency.save();
      res.status(200).send('Currency data saved successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
};
  


exports.updateCurrency = async (req, res) =>{
    try{
        const { id } = req.params;
      const updatedCurrency = req.body;
  
      const objectid = new ObjectId(id);
    
        const filter = { _id: objectid };
        const updateResult = await currency.updateOne(filter, { $set: updatedCurrency });
  
        if (updateResult.modifiedCount === 0) {
          return res.json({ success: true, message: 'Currency updated successfully' });
        } else {
          return res.status(404).json({ error: 'Currency not found' });
        }
      }
      catch (error){
        console.error('Error updating Currency:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }
  }; 


exports.delCurrency = async (req, res) => {
    try {
        const { id } = req.params;
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }

        const objectId = new ObjectId(id);
        const currencyFind = await currency.findById(objectId);

        if (!currencyFind) {
            return res.status(404).json({ error: 'Currency not found' });
        }

        const removeCurrency = await currency.deleteOne({ _id: objectId });

        if (removeCurrency.deletedCount === 0) {
            return res.status(500).json({ error: 'Failed to delete the currency record' });
        }

        console.log("One record deleted");

        const allCurrency = await currency.find();
        return res.status(200).json(allCurrency);

    } catch (error) {
        console.error('Error deleting currency record:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};


// exports.currencyConversion = async (req, res) => {
//     try {
//         const { currencyName } = req.body;

//         // Assuming currencyName is a string and should not be converted to ObjectId
//         if (!currencyName || typeof currencyName !== 'string') {
//             return res.status(400).json({ error: 'Invalid Currency Name' });
//         }

//         const currencyRate = await currency.findOne({ currencyName: currencyName });

//         if (!currencyRate) {
//             return res.status(404).json({ error: 'Currency not found' });
//         }

//         return res.status(200).json(currencyRate);
//     } catch (error) {
//         console.error('Error fetching currency rate:', error);

//         if (error.name === 'CastError') {
//             return res.status(400).json({ error: 'Invalid Currency' });
//         }

//         return res.status(500).json({ error: 'Internal Server Error' });
//     }
// }; 

