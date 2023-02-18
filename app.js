const express = require("express")
const fs = require("fs")
const app = express()
app.use(express.json())
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
app.get("/users", function(req,res){
    console.log("GET!");
    const data = reader()
    res.status(201).json({
        data
    })
})
app.post("/users", function(req,res){
    console.log("POST!");
    const data = reader()
    data.push(req.body)
    writer(data)
    res.status(201).json({
        data
    })
})
app.put("/users/:id", function(req,res){
    console.log("PUT!");
    const data = reader()
    data[req.params.id] = req.body
    writer(data)
    res.status(201).json({
        data
    })
})
app.delete("/users/:id", function(req,res){
    console.log("DELETE!");
    const data = reader()
    delete data[req.params.id-0]
    writer(data)
    res.status(201).json({
        data
    })
})

app.listen(Port)