const express = require('express')
const router = express.Router()
const TbMatkul = require("../../models/lsblDevCampus/TbMatkul")

// middleware that is specific to this router
router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    if (req.session.siginFlag == true) { next() }
    else{ res.redirect('/login') }
})

router.get("/", async (req,res) => {
    res.render('layout/main',{
        title_page:'Study Node JS',
        title_content:'TbMatkul',
        body_content:'../pages/TbMatkul',
        body_content_param:{
            title_content:'TbMatkul'
        },
        default_config: new Buffer(JSON.stringify({default_config:null})).toString('base64'),
        script:[
            'js/TbMatkul.js'
        ]
    })
})

router.get("/select", async (req,res) => {
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

router.get("/paginate/:encripty", async (req,res) => {
    let props = { where:[], orderbBy: { key:['id_matkul'], value:'DESC' }, limit:10, page:1 }
    const input = JSON.parse(Buffer.from(req.params.encripty, 'base64').toString('ascii'))
    for(const [key, val] of Object.entries(input)){
        if (key == 'page' || key == 'limit') { props[key] = val }
        if (key == 'nama_matkul' || key == 'ket') { props.where.push({ key:key, operator:'LIKE', value:'\'%'+val+'%\'', andor:'AND' }) }
    }
    props.where[props.where.length-1].andor = ''
    props.orderbBy.key = [input.order_by]
    props.orderbBy.value = [input.order_by_value]
    const getPaginate = await TbMatkul.paginate(props)
    res.json(getPaginate)
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

router.get("/find/:id_matkul", async (req,res) => {
    res.json(await TbMatkul.find({ primary: req.params.id_matkul }))
})

router.post("/insert", async (req,res) => {
    res.json(await TbMatkul.insert({ set: [
        {key:'nama_matkul',value:'\'INSERT 1\''},
        {key:'ket',value:'\'Y\''}
    ] }))
})

router.put("/update", async (req,res) => {
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

router.post("/updateOrInsert", async (req,res) => {
    let id_matkul = req.body.id_matkul
    if (id_matkul == '' || id_matkul == null || id_matkul == undefined) { id_matkul = 0}
    const result = await TbMatkul.updateOrInsert({ 
        set: [
            {key:'nama_matkul',value:'\''+req.body.nama_matkul+'\''},
            {key:'ket',value:'\''+req.body.ket+'\''}
        ],
        where:[ { key:'id_matkul', operator:'=', value: id_matkul, andor:'' } ]
    })
    if (result.result.data.insertId == 0) { result.result.data.insertId = id_matkul }
    res.json(result)
})

router.delete("/delete/:id_matkul", async (req,res) => {
    const result = await TbMatkul.deleteRows({ where:[ { key:'id_matkul', operator:'=', value:req.params.id_matkul, andor:'' } ] })
    res.json(result)
})

module.exports = router