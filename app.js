const express = require("express")
const fs = require("fs")
const app = express()
const Port = 1202

const Data = fs.readFileSync("./db.js", "utf-8",(err, data) =>{
        if (err) throw err
        return data
})

app.get("/", function(req,res){
    console.log("GET!");
    res.send(Data)
})
app.post("/", function(req,res){
    console.log("POST!");
    const postData = Data.push(req.body)
    fs.writeFileSync("./db.js", `${postData}`,(err, data) =>{
        if (err) throw err
        console.log("Writed!");
    })
    res.send(Data)
})
app.put("/", function(req,res){
    console.log("PUT!");
    const putData = Data.replace(Data.charAt(req.body),req.body)
    fs.writeFileSync("./db.js", `${putData}`,(err, data) =>{
        if (err) throw err
        console.log("PUTED!");
    })
    res.send(Data)
})
app.delete("/", function(req,res){
    console.log("DELETE!");
    const deleteData = Data.replace(Data.charAt(req.body),"")
    fs.writeFileSync("./db.js", `${deleteData}`,(err, data) =>{
        if (err) throw err
        console.log("DELETED!");
    })
    res.send(Data)
})

app.listen(Port)