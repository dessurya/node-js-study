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
        limit:10,
        offset:0
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
        limit:10,
        offset:0
    }))
})

app.listen(server_port,()=>{
    console.log('run the service ...! On port : '+server_port)
})