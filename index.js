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
    res.locals.message = req.flash()
    next()
})

app.set("view engine","ejs")
app.set("views","views")

app.get("/", async (req,res) => {
    if (req.session.siginFlag == true) { 
        res.json({ loginStore:req.session })
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