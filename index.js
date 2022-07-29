const express = require("express");

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get("/", async (req,res) => {
    const DamageReportImg = require("./models/lsblCloudm/DamageReportImg")
    res.json(await DamageReportImg.select([]))
})

app.listen(7777,()=>{
    console.log('run the service...')
})