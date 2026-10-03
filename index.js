const express = require("express")

const app = express();
app.use(express.json());

const notes = [];

app.post("/notes", function(req,res){
    const note = req.body.note;
    notes.push(note);
    res.json({
        message : "Done!"
    })
})

app.get("/notes", function(req,res){
    res.json({
        notes
    })
})

app.get("/", function(req,res){
    res.sendFile("/Users/vishesh/NotesApp/Fronted/index.html")
})

app.listen(3000);