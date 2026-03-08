const express = require("express")
const cors = require("cors")


const app = express()
app.use(cors())

var uname = "faali"
var pass = 123

{/*app.use(express.urlencoded({extended:true}))*/}
app.use(express.json())

app.post("/login",function(req,res)
{  
    console.log(req.body.username)

    if(uname === req.body.username && pass === Number(req.body.password))
    {
        res.send(true)
    }
    else
    {
        res.send(false)
    }
})

app.listen(7000,function()
{
    console.log("server started!!")
})