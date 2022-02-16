const express = require('express')
const { MongoClient } = require('mongodb');
const cors = require('cors')
require('dotenv').config()
const app = express()
app.use(cors())
app.use(express.json())
const port = process.env.PORT || 4000
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.9yfqt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
console.log(uri)
async function run() {
    try {
       await client.connect();
       const database = client.db("hairMaxSalon");
       const servicesCollection = database.collection("services");
       
        app.get('/services', async(req, res)=>{

            const services = servicesCollection.find({})
            const result =await  services.toArray()
            res.json(result)
            console.log(result)

        })
       
      
    } 
    finally {
    //   await client.close();
    }
  }
  run().catch(console.dir);
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Server running  on port ${port}`)
})