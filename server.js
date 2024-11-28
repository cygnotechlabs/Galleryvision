require('dotenv').config()

const express = require('express')

const cors = require('cors')

const server = express()

const router = require('./router/router')

const rawMusicRoute = require('./router/rawMusicRoute')

const rawChannelRoute = require('./router/rawChannelRoute')

const reportRoute = require('./router/report')

require('./database/connection/connection')

server.use(cors())

server.use(express.json())
// Increase payload size limit
server.use(express.json({ limit: '1gb' })); // For JSON payload
server.use(express.urlencoded({ limit: '1gb', extended: true })); // For URL-encoded payload

server.use('/music',rawMusicRoute)

server.use('/channel',rawChannelRoute)

server.use('/report',reportRoute)

server.use(router)

const PORT =   5000

server.get('/',(req,res)=>{
    res.status(200).json("Gallery vision server started")
})

server.listen(PORT,()=>{
    console.log('Gallery vision started at port: ',PORT);
})