const mongoose = require('mongoose')

const DB = process.env.DATABASE

mongoose.connect(DB)
.then(()=>{
    console.log("📡...Gallery Vision Database Connected Succesfully...📡");
}).catch((error)=>{
    console.log(error);
})


// {
//     "channelId":"12345",
//     "channelName":"AMAL",
//     "commission":"10",
//     "email":"amaljoy@gmail.com",
//     "currency":"INR",
//     "logo":"image.png"
//   }