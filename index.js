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
    app.get("/offers", async (req, res) => {
      let page = req.query.page;
      const size = parseInt(req.query.size);
      const type = req.query.type;
      let query;
      if (type) {
        query = {
          type: type,
        };
      } else {
        query = {};
      }
      const cursor = offersCollection.find(query);
      const count = await cursor.count();
      let offers;
      if (page) {
        page = page - 1;
        offers = await cursor
          .skip(page * size)
          .limit(size)
          .toArray();
      } else {
        offers = await cursor.toArray();
      }
      res.json({
        count,
        offers,
      });
    });
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);
app.listen(port, (req, res) => {
  console.log("server is running on port 5000");
});
