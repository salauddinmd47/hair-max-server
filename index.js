const express = require('express')
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors')
require('dotenv').config()
const app = express()
app.use(cors())
app.use(express.json())
const port = process.env.PORT || 4000
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.9yfqt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true }); 
async function run() {
    try {
       await client.connect();
       const database = client.db("hairMaxSalon");
       const servicesCollection = database.collection("services");
       const appointmentsCollection = database.collection('appointments')
       
      //  getting service from server 
        app.get('/services', async(req, res)=>{ 
            const services = servicesCollection.find({})
            const result =await  services.toArray()
            res.json(result)  
        })
        // route for add appointment in server 
        app.post('/appointments', async(req, res)=>{ 
            const appointment = req.body;
            result = await appointmentsCollection.insertOne(appointment)
            console.log(result)
            res.send(result)
        })

        app.get('/appointments', async(req, res)=>{
          const email = req.query.email
          console.log(email)
          const query = {email:email}
            const appointment = appointmentsCollection.find(query)
            result = await  appointment.toArray() 
            res.json(result)
        })
      //  delete appointment 
      app.delete('/appointments/:id',async(req, res)=>{
        const id = req.params.id;
         const query = {_id:ObjectId(id)}
         const result = await appointmentsCollection.deleteOne(query)
         console.log(result)
         res.send(result)
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