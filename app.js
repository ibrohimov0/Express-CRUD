const express = require("express")
const fs = require("fs")
const app = express()
const Port = 1202

function reader() {
    const Data = fs.readFileSync("./db.json", "utf-8",(err, data) =>{
            if (err) throw err
            return data
    })
    return JSON.parse(Data)
}
function writer(data) {
    const res = JSON.stringify(data)
    fs.writeFileSync("./db.json",res,(err, data) =>{
            if (err) throw err
    })
}

app.get("/", function(req,res){
    console.log("GET!");
    const data = reader()
    res.status(201).json({
        data
    })
})
app.post("/", function(req,res){
    console.log("POST!");
    const data = reader()
    data.push(req.body)
    writer(data)
})
app.put("/", function(req,res){
    console.log("PUT!");
    const data = reader()
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