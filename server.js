require('dotenv').config()

const express = require('express')

const cors = require('cors')

const server = express()

const router = require('./router/router')

const rawMusicRoute = require('./router/rawMusicRoute')

const rawChannelRoute = require('./router/rawChannelRoute')

require('./database/connection/connection')

server.use(cors())

server.use('/music',rawMusicRoute)

server.use('/channel',rawChannelRoute)

server.use(express.json())

server.use(router)

const PORT =  5000

server.get('/',(req,res)=>{
    res.status(200).json("Gallery vision server started")
})

server.listen(PORT,()=>{
    console.log('Gallery vision started at port: ',PORT);
})