const server_port = 7070
const express = require("express")
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get("/", async (req,res) => {
    const DamageReportImg = require("./models/lsblCloudm/DamageReportImg")
    res.json(await DamageReportImg.select({
        where:[
            {
                key:'string_encode',
                operator:'=',
                value:'\'N\'',
                andor:''
            }
        ],
        orderbBy: { key:['id_damage_img_global'], value:'DESC' },
        limit:50,
        offset:150
    }))
})

app.get("/count", async (req,res) => {
    const DamageReportImg = require("./models/lsblCloudm/DamageReportImg")
    res.json(await DamageReportImg.selectCount({
        where:[
            {
                key:'string_encode',
                operator:'=',
                value:'\'N\'',
                andor:''
            }
        ]
    }))
})

app.get("/paginate", async (req,res) => {
    const DamageReportImg = require("./models/lsblCloudm/DamageReportImg")
    res.json(await DamageReportImg.paginate({
        where:[
            {
                key:'string_encode',
                operator:'=',
                value:'\'N\'',
                andor:''
            }
        ],
        orderbBy: { key:['id_damage_img_global'], value:'DESC' },
        limit:50,
        page:3
    }))
})

app.get("/first", async (req,res) => {
    const DamageReportImg = require("./models/lsblCloudm/DamageReportImg")
    res.json(await DamageReportImg.first({
        where:[
            {
                key:'string_encode',
                operator:'=',
                value:'\'N\'',
                andor:''
            }
        ],
        orderbBy: { key:['id_damage_img_global'], value:'DESC' }
    }))
})

app.get("/find", async (req,res) => {
    const DamageReportImg = require("./models/lsblCloudm/DamageReportImg")
    res.json(await DamageReportImg.find({ primary: 1471 }))
})

app.listen(server_port,()=>{
    console.log('run the service ...! On port : '+server_port)
})