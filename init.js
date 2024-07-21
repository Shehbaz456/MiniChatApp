const mongoose = require("mongoose");
const Chat = require("./model/Chat_Model.js")

main()
  .then((res) => {
    console.log("connected successful");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/MiniChatApp");
}

// insert
const allchats = [
    {
        from:"Salman",
        to:"shehbaz",
        message:"Hello bro",
        created_at: new Date()
    },
    {
        from:"Ram",
        to:"Sona",
        message:"Hello bro",
        created_at: new Date()
    },
    {
        from:"John Abharam",
        to:"Salman",
        message:"We warriors",
        created_at: new Date()
    },
    {
        from:"Afroz",
        to:"shehbaz",
        message:"All power are show",
        created_at: new Date()
    }
]

Chat.insertMany(allchats)
