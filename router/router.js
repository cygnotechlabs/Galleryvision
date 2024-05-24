const express = require('express')

const router = new express.Router()

const userController = require('../controller/userController')
const channelController = require('../controller/channelController')
const musicController = require('../controller/musicController')
const licensorController = require('../controller/licenserController')
const musicInvoiceController =require('../controller/musicInvoiceController')
const channelInvoiceController = require('../controller/channelInvoiceController')
const SettingsController = require('../controller/settingController')
const PaymentController = require('../controller/paymentController')

// collection to collection

// router.get('/process',channelController.processData)

// collection to collection

//Register
router.post('/register',userController.register)

//login
router.post('/login',userController.login)


// channel routes
router.post('/add-channel',channelController.addChannel)

router.post('/assign-channel',channelController.assignChannel)

// router.get('/autoupdate-assigned-channel',channelController.autoUpdateChannels)

router.get('/get-linked-channel',channelController.getLinkedChannels)

router.get('/get-unlinked-channel',channelController.getUnlinkedChannels)

router.get('/get-channel',channelController.getChannels)

router.get('/view-channel/:id',channelController.getOneChannel)

router.delete('/remove-channel/:id',channelController.removeChannel)

router.put('/update-channel/:id',channelController.updateChannel)

// channel invoicesunder channel
router.get('/get-channel-invoice-for-channel',channelController.getInvoiceForChannel)



// licensor routes
router.post('/add-licensor',licensorController.addLicensor)

router.get('/get-licensor',licensorController.getLicensor)

router.get('/view-licensor/:id',licensorController.getOneLicensor)

router.delete('/remove-licensor/:id',licensorController.removelicensor)

router.put('/update-licensor/:id',licensorController.updateLicensor)

module.exports = router



// Music Route

router.get('/get-rawmusic',musicController.getRawMusic)

router.get('/view-rawmusic/:id',musicController.getOneRawMusic)

router.get('/get-linked-music',musicController.getLinkedMusics)

router.post('/add-music',musicController.addMusic) 

router.delete('/remove-music/:id',musicController.delmusic)

router.put('/update-music/:id',musicController.updateMusic)

router.get('/view-music/:id',musicController.getOneMusic)

router.post('/assign-music',musicController.assignMusic)



// Channel Route

// router.get('/get-rawchannel',channelController.getRawChannel)

router.get('/view-rawchannel/:id',channelController.getOneRawChannel)





// Music Invoice Route
router.post("/generate-music-Invoice", musicInvoiceController.generateMusicInvoice
    
);

router.get("/get-music-Invoice", musicInvoiceController.getMusicInvoice);

router.get("/view-music-Invoice/:id", musicInvoiceController.viewMusicInvoice);


// channel invoice
router.post("/generate-channel-Invoice", channelInvoiceController.generateChannelInvoice);

router.get("/get-channel-Invoice", channelInvoiceController.getChannelInvoice);

router.get("/view-channel-Invoice/:id", channelInvoiceController.viewChannelInvoice);

//TAX
router.get('/view-tax',SettingsController.viewTax)

router.post('/add-tax',SettingsController.addTax)

router.put('/update-tax/:id',SettingsController.updateTax)

router.delete('/del-tax/:id',SettingsController.delTax)

//Currency
router.get('/view-currency',SettingsController.viewCurrency)

router.post('/add-currency',SettingsController.addCurrency)

//router.delete('/del-currency/:id',SettingsController.delCurrency)

//router.put('/update-currency/:id',SettingsController.updateCurrency)

router.put('/channel-invoice-status/:id',PaymentController.ChannelInvoiceStatus)

router.put('/music-invoice-status/:id',PaymentController.MusicInvoiceStatus)