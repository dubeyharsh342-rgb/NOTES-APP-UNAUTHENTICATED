const express = require("express")
const jwt = require("jsonwebtoken")
const app = express();
app.use(express.json());

const notes = [];
const users = [{
    username : "harsh",
    password : "123321"
}];

app.post("/signup", function(req, res){
    const username = req.body.username;
    const password = req.body.password;

    const userExist = users.find(user=> user.username === username);
    if(userExist){
        return res.status(403).json({
            message: "User with this username already exists"
        })
    }
    users.push({
        username: username, password: password
    })
    res.json({
        message: "You have signed up"
    })
})

app.post("/signin", function(req, res){
    const username = req.body.username;
    const password = req.body.password;
    
    const userExist = users.find(user => user.username === username && user.password === password);
    if(!userExist){
        res.status(403).json({
            message: "Incorrect credentials"
        })
        return;
    }
    //json web token
    const token = jwt.sign({
        username: username
    },"harsh123");
    res.json({
        token: token
    })
})


app.post("/notes", function(req,res){
   //check if they semt the right header, extract who this user is from the header
    const token = req.headers.token; 
    if(!token){
        res.status(403).json({
            message: "You are not logged in"
        })
        return;
    }
    const decoded = jwt.verify(token, "harsh123");
    const username = decoded.username;
    if(!username){
        res.status(403).json({
            message: "malformed token"
        })
        return;
    }

    const note = req.body.note;
    notes.push({note, username});
    res.json({
        message : "Done!"
    })
})

app.get("/notes", function(req,res){
    const token = req.headers.token; 
    if(!token){
        res.status(403).json({
            message: "You are not logged in"
        })
        return;
    }
    const decoded = jwt.verify(token, "harsh123");
    const username = decoded.username;
    if(!username){
        res.status(403).json({
            message: "malformed token"
        })
        return;
    }
    const userNotes = notes.filter(note => note.username === username)
    res.json({
        notes : userNotes
    })
})

app.get("/", function(req,res){
    res.sendFile("/Users/vishesh/NotesApp/Fronted/index.html")
})
app.get("/signup", function(req,res){
    res.sendFile("/Users/vishesh/NotesApp/Fronted/signup.html")
})
app.get("/signin", function(req,res){
    res.sendFile("/Users/vishesh/NotesApp/Fronted/signin.html")
})

app.listen(3000);