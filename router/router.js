const express = require('express')

const router = new express.Router()

const channelController = require('../controller/channelController')
const musicController = require('../controller/musicController')
const licensorController = require('../controller/licenserController')


// collection to collection

// router.get('/process',channelController.processData)

// collection to collection

// channel routes
router.post('/add-channel',channelController.addChannel)

router.post('/assign-channel/:id',channelController.assignChannel)

router.get('/get-linked-channel',channelController.getLinkedChannels)

router.get('/get-unlinked-channel',channelController.getUnlinkedChannels)

router.get('/get-channel',channelController.getChannels)

router.get('/view-channel/:id',channelController.getOneChannel)

router.delete('/remove-channel/:id',channelController.removeChannel)

router.put('/update-channel/:id',channelController.updateChannel)

// licensor routes
router.post('/add-licensor',licensorController.addLicensor)

router.get('/get-licensor',licensorController.getLicensor)

router.get('/view-licensor/:id',licensorController.getOneLicenser)

router.delete('/remove-licensor/:id',licensorController.removelicensor)

router.put('/update-licensor/:id',licensorController.updateLicensor)

module.exports = router

// Music Route

router.get('/get-rawmusic',musicController.getRawMusic)

router.get('/view-rawmusic/:id',musicController.getOneRawMusic)


// Channel Route

// router.get('/get-rawchannel',channelController.getRawChannel)

router.get('/view-rawchannel/:id',channelController.getOneRawChannel)