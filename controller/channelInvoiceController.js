const ChannelInvoice = require("../database/model/channelInvoice");
const Channel = require('../database/model/channel');
const Licensor = require("../database/model/licensor");
const { ObjectId } = require("mongodb");
const channelInvoices = require("../database/model/channelInvoice");
const Currency = require("../database/model/currency");
const Dashboard = require("../database/model/dashboard")
const Music = require("../database/model/musics")



// Generate Invoive

exports.generateChannelInvoice = async (req, res) => {
  try {
    const { date } = req.body;
    console.log("Channel Invoice Date:", date);

    // Parse the date from the request body (assuming the format is "Month Year")
    const [month, year] = date.split(" ");
    const targetDate = new Date(year, ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].indexOf(month), 1);

    const channels = await Channel.find({
      "assets.date": date
    });
    const music = await Music.find({
      "assets.date": date
    });

    if (!channels || channels.length === 0) {
      return res.status(404).json({ error: "No channel data found for the provided date" });
    }

    // Fetch all licensor details
    const licensors = await Licensor.find();
    if (!licensors || licensors.length === 0) {
      return res.status(404).json({ error: "No licensor data found" });
    }


    // Fetch currency conversion rates for the given date
    const currencyRate = await Currency.findOne({ date });
    if (!currencyRate) {
      return res.status(404).json({ error: "No currency data found for the provided date" });
    }


    // Fetch the last generated invoice number
    let lastInvoiceNumber = await ChannelInvoice.findOne().sort({ _id: -1 }).limit(1);
    let invoiceCounter = lastInvoiceNumber ? parseInt(lastInvoiceNumber.invoiceNumber.slice(-4)) + 1 : 1;

    // Create an array to store generated invoices
    const invoices = [];

    const generateInvoiceNumber = (num) => {
      const prefix = 'INVCH';
      const paddedNum = String(num).padStart(6, '0'); // Pad the number with leading zeros to ensure it is 4 digits long
      return `${prefix}${paddedNum}`;
    };

    let totalCommissionChannel = 0;
    let totalTaxDeducted = 0;

    for (const channel of channels) {
      if (!channel) {
        console.warn('Channel is undefined');
        continue;
      }
      if (!channel.licensorId) {
        console.warn(`LicensorId is undefined for Channel Id: ${channel._id}`);
        continue;
      }

      // Check if an invoice already exists for this channelId and date
      const existingInvoice = await ChannelInvoice.findOne({ channelId: channel.channelId, date });
      if (existingInvoice) {
        console.warn(`Invoice already exists for channelId: ${channel.channelId}, date: ${date}`);
        continue; // Skip this channel entry if the invoice already exists
      }

      const licensor = licensors.find(l => l._id.toString() === channel.licensorId.toString());
      if (!licensor) {
        console.warn(`Licensor not found for Channel Id: ${channel._id}, licensorId: ${channel.licensorId}`);
        continue;
      }

      // Extract required fields from licensor
      const partnerName = licensor.companyName;
      const licensorId = licensor._id;
      const licensorName = licensor.licensorName;
      const licensorEmail = licensor.licensorEmail;
      const accNum = licensor.bankAccNum;
      const currency = licensor.currency;
      const channelId = channel.channelId;
      const channelName = channel.channelName;
      const licensorAddress =licensor.licensorAddress;
      const invoiceNumber = generateInvoiceNumber(invoiceCounter++); // Generate and increment invoice number
      const status = "unpaid";

      let ifsc = "";
      let iban = "";
      if (currency === "INR") {
        ifsc = licensor.ifsc_iban;
      } else if (currency === "INRO") {
        ifsc = licensor.ifsc_iban;
      } else if (currency === "USD") {
        iban = licensor.ifsc_iban;
      }

      // Find the asset with the target date
      const asset = channel.assets.find(a => {
        const assetDate = new Date(a.date);
        return assetDate.getMonth() === targetDate.getMonth() && assetDate.getFullYear() === targetDate.getFullYear();
      });

      if (!asset) {
        console.warn(`No asset found for Channel Id: ${channel._id} for the target date`);
        continue;
      }

      // Calculate financial fields
      const ptRevenue = parseFloat(asset.partnerRevenue).toFixed(2);
      const tax = (parseFloat(ptRevenue) * 0.15).toFixed(2); // assuming 15% tax
      const ptAfterTax = (parseFloat(ptRevenue) - parseFloat(tax)).toFixed(2);
      const commissionRate = parseFloat(channel.commission) / 100;
      const commissionAmount = (ptAfterTax * commissionRate).toFixed(2);
      const totalPayout = (ptAfterTax - parseFloat(commissionAmount)).toFixed(2);


      totalCommissionChannel += parseFloat(commissionAmount);
      totalTaxDeducted += parseFloat(tax);
      
      // Get the conversion rate based on the currency
      let conversionRate = 1.0; // default value if no conversion is needed
      if (currency === "INR") {
        conversionRate = parseFloat(currencyRate.INR);
      } else if (currency === "INR0") {
        conversionRate = parseFloat(currencyRate.INR);
      } else if (currency === "USD") {
        conversionRate = parseFloat(currencyRate.USD);
      } 

      const payout = (parseFloat(totalPayout) * conversionRate).toFixed(2);
      

      // Create invoice
      const invoice = new ChannelInvoice({
        partnerName,
        licensorId,
        licensorName,
        licensorEmail,
        licensorAddress,
        accNum,
        ifsc,
        iban,
        currency,
        channelId,
        channelName,
        date,
        invoiceNumber,
        ptRevenue,
        tax,
        ptAfterTax,
        commission: channel.commission,
        commissionAmount,
        totalPayout,
        conversionRate: conversionRate.toFixed(2),
        payout,
        status
      });

      await invoice.save();
      invoices.push(invoice);
    }

    if (invoices.length === 0) {
      return res.status(404).json({ error: `invoices already generated for date: ${date}` });
    }


    let existingDashboard = await Dashboard.findOne({ date: date });

    if (existingDashboard) {
      // Update existing dashboard data
      existingDashboard.totalLicensor = licensors.length;
      existingDashboard.totalChannel = channels.length;
      existingDashboard.totalMusic = music.length;

      // Handle empty or undefined channelCommission and channelTaxDeducted
      const existingChannelCommission = parseFloat(existingDashboard.channelCommission) || 0;
      const existingChannelTaxDeducted = parseFloat(existingDashboard.channelTaxDeducted) || 0;

      const existingTotalCommission = parseFloat(existingDashboard.totalCommission) || 0;
      const existingTotalTaxDeducted = parseFloat(existingDashboard.totalTaxDeducted) || 0;
      
      // Parse and add new values
      const commissionToAdd = parseFloat(totalCommissionChannel) || 0;
      const taxToAdd = parseFloat(totalTaxDeducted) || 0;

      existingDashboard.channelCommission = commissionToAdd + existingChannelCommission; 
      existingDashboard.channelTaxDeducted = taxToAdd + existingChannelTaxDeducted;

      existingDashboard.totalCommission = existingTotalCommission + commissionToAdd;
      existingDashboard.totalTaxDeducted = existingTotalTaxDeducted + taxToAdd;

      // Format the results to ensure they are consistent
      existingDashboard.channelCommission = parseFloat(existingDashboard.channelCommission);
      existingDashboard.channelTaxDeducted = parseFloat(existingDashboard.channelTaxDeducted);

    } else {
      // Create new dashboard data
      existingDashboard = new Dashboard({
        date,
        totalLicensor: licensors.length,
        totalChannel: channels.length,
        totalMusic: music.length,
        channelCommission: totalCommissionChannel,
        channelTaxDeducted: totalTaxDeducted,
        totalCommission:totalCommissionChannel,
        totalTaxDeducted: totalTaxDeducted,
      });
    }

    // Save the updated or new dashboard data
    await existingDashboard.save();

    // Return all generated invoices
    res.status(200).json({ message: `Channel invoices generated for ${date}`, invoices });
        console.log(`Channel invoices generated for ${date}`);
  } catch (error) {
    console.error("Error generating invoices:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};




// exports.generateChannelInvoice = async (req, res) => {
//   try {
    
//     const { date } = req.body;
//     console.log(" channel date : ",date);


//     // Parse the date from the request body (assuming the format is "Month Year")
//     const [month, year] = date.split(" ");
//     const targetDate = new Date(year, ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].indexOf(month), 1);


//     const channels = await Channel.find({
//       "assets.date": date
//     });
    
//     if (!channels || channels.length === 0) {
//       return res.status(404).json({ error: "No channel data found for the provided date" });
//     }

//     // Fetch all licensor details
//     const licensors = await Licensor.find();
//     if (!licensors || licensors.length === 0) {
//       return res.status(404).json({ error: "No licensor data found" });
//     }

//     // Create an array to store generated invoices
//     const invoices = [];


//     const generateInvoiceNumber = (num) => {
//       const prefix = 'INVCH';
//       const paddedNum = String(num).padStart(4, '0'); // Pad the number with leading zeros to ensure it is 4 digits long
//       return `${prefix}${paddedNum}`;
//     };
    
//     let invoiceCounter = 1; // Initialize a counter for invoice numbers
    
//     for (const channel of channels) {
//       if (!channel) {
//         console.warn('Channel is undefined');
//         continue;
//       }
//       if (!channel.licensorId) {
//         console.warn(`LicensorId is undefined for Channel Id: ${channel._id}`);
//         continue;
//       }
//       const licensor = licensors.find(l => l._id.toString() === channel.licensorId.toString());
//       if (!licensor) {
//         console.warn(`Licensor not found for Channel Id: ${channel._id}, licensorId: ${channel.licensorId}`);
//         continue;
//       }
    
//       // Extract required fields from licensor
//       const partnerName = licensor.companyName;
//       const licensorId = licensor._id;
//       const licensorName = licensor.licensorName;
//       const accNum = licensor.bankAccNum;
//       const ifsc = licensor.ifsc_iban;
//       const iban = licensor.ifsc_iban; // Assuming IFSC and IBAN are stored together in this case
//       const currency = licensor.currency;
//       const channelId = channel.channelId;
//       const channelName = channel.channelName;
//       const invoiceNumber = generateInvoiceNumber(invoiceCounter++); // Generate and increment invoice number
//       const status = "unpaid";
      
    
//       // Find the asset with the target date
//       const asset = channel.assets.find(a => {
//         const assetDate = new Date(a.date);
//         return assetDate.getMonth() === targetDate.getMonth() && assetDate.getFullYear() === targetDate.getFullYear();
//       });
    
//       if (!asset) {
//         console.warn(`No asset found for Channel Id: ${channel._id} for the target date`);
//         continue;
//       }
    
//       // Calculate financial fields
//       const ptRevenue = parseFloat(asset.partnerRevenue).toFixed(2);
//       const tax = (parseFloat(ptRevenue) * 0.15).toFixed(2); // assuming 15% tax
//       const ptAfterTax = (parseFloat(ptRevenue) - parseFloat(tax)).toFixed(2);
//       const commissionRate = parseFloat(channel.commission) / 100;
//       const commissionAmount = (ptAfterTax * commissionRate).toFixed(2);
//       const totalPayout = (ptAfterTax - parseFloat(commissionAmount)).toFixed(2);
//       const conversionRate = 1.0; // assuming no conversion for simplicity
//       const payout = (parseFloat(totalPayout) * conversionRate).toFixed(2);
    
//       // Create invoice
//       const invoice = new ChannelInvoice({
//         partnerName,
//         licensorId,
//         licensorName,
//         accNum,
//         ifsc,
//         iban,
//         currency,
//         channelId,
//         channelName,
//         date,
//         invoiceNumber, // Add the generated invoice number here
//         ptRevenue,
//         tax,
//         ptAfterTax,
//         commission: channel.commission,
//         commissionAmount,
//         totalPayout,
//         conversionRate: conversionRate.toFixed(2),
//         payout,
//         status
//       });
    
//       await invoice.save();
//       invoices.push(invoice);
//     }
    

   

//     // Return all generated invoices
//     res.status(201).json(invoices);
//     console.log(`channel invoice generated for  ${date}`);
//   } catch (error) {
//     console.error("Error generating invoices:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };



  // get licensors
  exports.getChannelInvoice = async (req, res) => {
    try {
      const invoices = await channelInvoices.find();
  
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
exports.viewChannelInvoice = async (req, res) => {
    try {
      const { id } = req.params;
      // console.log("view channel invoice ",req.body);
      const objectId = new ObjectId(id);
      const invoiceDetails = await channelInvoices.findOne({ _id: objectId });
  
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




