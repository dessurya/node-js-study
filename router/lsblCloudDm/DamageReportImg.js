const express = require('express')
const router = express.Router()
const DamageReportImg = require("../../models/lsblCloudm/DamageReportImg")

// middleware that is specific to this router
router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
})

router.get("/", async (req,res) => {
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

router.get("/count", async (req,res) => {
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

router.get("/pluck", async (req,res) => {
    res.json(await DamageReportImg.selectPluck({
        where:[
            {
                key:'string_encode',
                operator:'=',
                value:'\'N\'',
                andor:''
            }
        ],
        field : 'id_damage_img_global'
    }))
})

router.get("/paginate", async (req,res) => {
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

router.get("/first", async (req,res) => {
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

router.get("/find", async (req,res) => {
    res.json(await DamageReportImg.find({ primary: 1471 }))
})

module.exports = router