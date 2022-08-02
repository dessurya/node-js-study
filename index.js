const server_port = 7070
const express = require("express")
const session = require('express-session')
const flash = require('connect-flash')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('static'))
app.use(flash())
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}))
app.use(function(req, res, next){
    // for devlopment by pass session login
    // req.session.siginFlag = true
    // req.session.siginInfo = {
    //     nama:'BY PASS'
    // }
    // for devlopment by pass session login

    res.locals.message = req.flash()
    res.locals.userLive = req.session.siginInfo
    next()
})

app.set("view engine","ejs")
app.set("views","views")

app.get("/", async (req,res) => {
    if (req.session.siginFlag == true) { 
        res.render('layout/main',{
            title_page:'Study Node JS',
            title_content:'Dashboard',
            body_content:null,
            body_content_param:null,
            default_config: null,
            script:[]
        })
    }
    else{ res.redirect('/login') }
})

app.get("/out", async (req,res) => {
    req.session.siginFlag = false
    req.session.siginInfo = null
    req.flash('err', 'Success signout your session!')
    res.redirect('/login')
})

const urlAuthSessionApp = require("./router/AuthSessionApp")
app.use('/login', urlAuthSessionApp)

const urlDamageReportImg = require("./router/lsblCloudDm/DamageReportImg")
app.use('/DamageReportImg', urlDamageReportImg)

const urlTbMatkul = require("./router/lsblDevCampus/TbMatkul")
app.use('/TbMatkul', urlTbMatkul)


app.listen(server_port,()=>{
    console.log('run the service ...! On port : '+server_port)
})