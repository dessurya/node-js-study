const server_port = 7070
const express = require("express")
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('static'))

app.set("view engine","ejs")
app.set("views","views")

app.get("/", async (req,res) => {
    res.render('layout/login',{title:'Study Node JS'})
})

const routeDamageReportImg = require("./router/lsblCloudDm/DamageReportImg")
const routeTbMatkul = require("./router/lsblDevCampus/TbMatkul")

app.use('/DamageReportImg', routeDamageReportImg)
app.use('/TbMatkul', routeTbMatkul)

app.listen(server_port,()=>{
    console.log('run the service ...! On port : '+server_port)
})