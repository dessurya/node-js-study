const express = require('express')
const router = express.Router()
const ModelTbUserNew = require("../models/lsblDevDbApp/TbUserNew")
const md5 = require('md5')

router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    if (req.session.siginFlag == false || req.session.siginFlag == undefined) { next() }
    else{ res.redirect('/') }
})

router.get("/", async (req,res) => {
    res.render('layout/login',{title:'Study Node JS'})
})

router.post("/", async (req,res) => {
    const username = req.body.username
    const password = md5(req.body.password)
    const getUser = await ModelTbUserNew.first({
        where:[
            { key:'username', operator:'=', value:'\''+username+'\'', andor:'AND' },
            { key:'password', operator:'=', value:'\''+password+'\'', andor:'' }
        ]
    })
    if (getUser.result.err == null && (getUser.result.data != null && getUser.result.data != undefined) ) {
        req.flash('success', 'welcome '+getUser.result.data.username+'!')
        req.session.siginFlag = true
        req.session.siginInfo = {
            username:getUser.result.data.username,
            nama:getUser.result.data.nama
        }
        res.redirect('/')
    }
    else{
        req.flash('err', 'Your login is fail!')
        res.redirect('/login')
    }
})

module.exports = router