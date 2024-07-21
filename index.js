const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 8000;
const path = require("path");
const Chat = require("./model/Chat_Model.js")
const methodOverride = require('method-override')

app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}))
app.use(express.json())

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


main()
  .then((res) => {
    console.log("connected successful");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/MiniChatApp");
}


app.get("/chats", async (req,res)=>{
    let chats = await Chat.find()
    // console.log(chats);
    res.render('index',{chats})
})

app.get("/chats/new", async (req,res)=>{
    res.render('new')
})

app.post("/chats", async (req,res)=>{
    let {from,message,to} = req.body;
    let newChat = new Chat({
        from:from,
        message:message,
        to:to,
        created_at: new Date()
    })
    newChat.save().then(()=>console.log("Chat Added")).catch((err)=>console.log(err))
    res.redirect('/chats')
})


app.get("/chats/:id/edit", async(req,res)=>{
    let {id} = req.params
    let chat = await Chat.findById(id)
    res.render('edit',{chat})
})
app.put("/chats/:id", async(req,res)=>{
    let {id} = req.params
    let {message:Newmessage} = req.body
    console.log(Newmessage);
    let updatedChat = await Chat.findByIdAndUpdate(id,{ message:Newmessage},{runValidators:true,new:true})
    console.log(updatedChat);
    res.redirect("/chats")
})

app.delete("/chats/:id", async (req,res)=>{
    let {id} = req.params
    await Chat.findByIdAndDelete(id)
    res.redirect('/chats')
})

app.get("/",(req,res)=>{
    res.redirect('/chats')
})

app.get("*",(req,res)=>{
    res.send('Page Not found')
})

app.listen(port,()=>{
    console.log("Active port ",port);
})