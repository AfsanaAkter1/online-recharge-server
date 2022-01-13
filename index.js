const express = require("express");
const port = process.env.PORT || 5000;
const cors = require("cors");
const app = express();
require("dotenv").config();
const { MongoClient } = require("mongodb");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to my site");
});

//connect to database

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.eq3ws.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
async function run() {
  try {
    await client.connect();
    const database = client.db("reChargeDB");
    const offersCollection = database.collection("offers");
    // app.get("/offers",async(req,res)=>{

    // })
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);
app.listen(port, (req, res) => {
  console.log("server is running on port 5000");
});
