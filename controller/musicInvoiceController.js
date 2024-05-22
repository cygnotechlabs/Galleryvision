const MusicInvoice = require("../database/model/musicInvoice");
const Music = require('../database/model/musics');
const Licensor = require("../database/model/licensor");
const { ObjectId } = require("mongodb");
const musicInvoices = require("../database/model/musicInvoice");


// Generate Invoive
exports.generateMusicInvoice = async (req, res) => {
  try {
    const { date } = req.body;
    console.log(" music date",date);


    // Parse the date from the request body (assuming the format is "Month Year")
    const [month, year] = date.split(" ");
    const targetDate = new Date(year, ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].indexOf(month), 1);

    const musics = await Music.find({
      "assets.date": date
    });
    
    if (!musics || musics.length === 0) {
      return res.status(404).json({ error: "No music data found for the provided date" });
    }

    // Fetch all licensor details
    const licensors = await Licensor.find();
    if (!licensors || licensors.length === 0) {
      return res.status(404).json({ error: "No licensor data found" });
    }

    // Create an array to store generated invoices
    const invoices = [];

    const generateInvoiceNumber = (num) => {
      const prefix = 'INVMU';
      const paddedNum = String(num).padStart(4, '0'); // Pad the number with leading zeros to ensure it is 4 digits long
      return `${prefix}${paddedNum}`;
    };
    
    let invoiceCounter = 1; // Initialize a counter for invoice numbers
    

    for (const music of musics) {
      // Find the corresponding licensor for this music entry
      const licensor = licensors.find(l => l._id.toString() === music.licensorId.toString());
      if (!licensor) {
        console.warn(`Licensor not found for musicId: ${music._id}, licensorId: ${music.licensorId}`);
        continue; // Skip this music entry if the licensor is not found
      }

      // Extract required fields from licensor
      const partnerName = licensor.companyName;
      const licensorId = licensor._id;
      const licensorName = licensor.licensorName;
      const accNum = licensor.bankAccNum;
      const ifsc = licensor.ifsc_iban;
      const iban = licensor.ifsc_iban; // Assuming IFSC and IBAN are stored together in this case
      const currency = licensor.currency;
      const status = "unpaid"
      const musicId = music.musicId
      const musicName = music.musicName
      const invoiceNumber = generateInvoiceNumber(invoiceCounter++); // Generate and increment invoice number


      // Find the asset with the target date
      const asset = music.assets.find(a => {
        const assetDate = new Date(a.date);
        return assetDate.getMonth() === targetDate.getMonth() && assetDate.getFullYear() === targetDate.getFullYear();
      });

      // Calculate financial fields
      const ptRevenue = parseFloat(asset.partnerRevenue).toFixed(2);
      const tax = (parseFloat(ptRevenue) * 0.15).toFixed(2); // assuming 15% tax
      const ptAfterTax = (parseFloat(ptRevenue) - parseFloat(tax)).toFixed(2);
      const commissionRate = parseFloat(music.commission) / 100;
      const commissionAmount = (ptAfterTax * commissionRate).toFixed(2);
      const totalPayout = (ptAfterTax - parseFloat(commissionAmount)).toFixed(2);
      const conversionRate = 1.0; // assuming no conversion for simplicity
      const payout = (parseFloat(totalPayout) * conversionRate).toFixed(2);

      // Create invoice
      const invoice = new MusicInvoice({
        partnerName,
        licensorId,
        licensorName,
        accNum,
        ifsc,
        iban,
        currency,
        musicId,
        musicName,
        invoiceNumber,
        date,
        ptRevenue,
        tax,
        ptAfterTax,
        commission: music.commission,
        commissionAmount,
        totalPayout,
        conversionRate: conversionRate.toFixed(2),
        payout,
        status
      });

      await invoice.save();
      invoices.push(invoice);
    }

    // Return all generated invoices
    res.status(201).json(invoices);
    console.log(`music invoice generated for  ${date}`);

  } catch (error) {
    console.error("Error generating invoices:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};



  // get licensors
  exports.getMusicInvoice = async (req, res) => {
    try {
      const invoices = await musicInvoices.find();
  
      if (invoices.length > 0) {
        res.status(200).json(invoices);
      } else {
        res.status(404).json("No invoices found");
      }
    } catch (error) {
      console.error(error);
      res.status(500).json("Internal server error");
    }
  };

// get particular licensor
exports.viewMusicInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const objectId = new ObjectId(id);
    const invoiceDetails = await musicInvoices.findOne({ _id: objectId });

    if (!invoiceDetails) {
      return res.status(404).json({ error: 'invoice not found' });
    }

    return res.status(200).json(invoiceDetails);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid licensor ID' });
    }

    return res.status(500).json({ error: 'Internal server error' });
  }
};




