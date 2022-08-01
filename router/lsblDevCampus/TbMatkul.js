const express = require('express')
const router = express.Router()
const TbMatkul = require("../../models/lsblDevCampus/TbMatkul")

// middleware that is specific to this router
router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
})

router.get("/", async (req,res) => {
    res.json(await TbMatkul.select({
        where:[
            {
                key:'ket',
                operator:'=',
                value:'\'Y\'',
                andor:''
            }
        ],
        orderbBy: { key:['id_matkul'], value:'DESC' },
        limit:50,
        offset:0
    }))
})

router.get("/count", async (req,res) => {
    res.json(await TbMatkul.selectCount({
        where:[
            {
                key:'ket',
                operator:'=',
                value:'\'Y\'',
                andor:''
            }
        ]
    }))
})

router.get("/pluck", async (req,res) => {
    res.json(await TbMatkul.selectPluck({
        where:[
            {
                key:'ket',
                operator:'=',
                value:'\'Y\'',
                andor:''
            }
        ],
        field : 'id_matkul'
    }))
})

router.get("/paginate", async (req,res) => {
    res.json(await TbMatkul.paginate({
        where:[
            {
                key:'ket',
                operator:'=',
                value:'\'Y\'',
                andor:''
            }
        ],
        orderbBy: { key:['id_matkul'], value:'DESC' },
        limit:50,
        page:1
    }))
})

router.get("/first", async (req,res) => {
    res.json(await TbMatkul.first({
        where:[
            {
                key:'ket',
                operator:'=',
                value:'\'Y\'',
                andor:''
            }
        ],
        orderbBy: { key:['id_matkul'], value:'DESC' }
    }))
})

router.get("/find", async (req,res) => {
    res.json(await TbMatkul.find({ primary: 4 }))
})

router.get("/insert", async (req,res) => {
    res.json(await TbMatkul.insert({ set: [
        {key:'nama_matkul',value:'\'INSERT 1\''},
        {key:'ket',value:'\'Y\''}
    ] }))
})

router.get("/update", async (req,res) => {
    res.json(await TbMatkul.update({ 
        set: [
            {key:'nama_matkul',value:'\'UPDATE 1\''},
            {key:'ket',value:'\'Y\''}
        ],
        where:[
            {
                key:'id_matkul',
                operator:'=',
                value: 3,
                andor:''
            }
        ]
    }))
})

module.exports = router