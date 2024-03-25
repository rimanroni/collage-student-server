const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
const app = express()
const port = process.env.PORT || 4000;  
app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://studentdatas:IZpSRYfrkZNw7RJ7@cluster0.jcqpshi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0` ;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect(); 
    // main variable post database 

    const database = client.db('Student')
    const studentCollection = database.collection('student')
    app.post('/student', async(req, res)=>{
           const data = req.body;
           const result = await studentCollection.insertOne(data)
           res.send(result)
    })
    app.get('/student', async(req, res)=>{
       const findStudent = await studentCollection.find().toArray()
       res.send(findStudent)
     })
     app.get('/student/:id', async(req, res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await  studentCollection.findOne(query)
      res.send(result)
  } )
  //   update data 
 app.put('/student/:id', async(req, res)=>{
  const id = req.params.id;
  const student = req.body;
  const query = {_id: new ObjectId(id)}
  const option = {upsert : true};
  const updateStudent = {
    $set : {
      name : student.name,
       father : student.father, 
        mother: student.mother, 
         depertment : student.depertment, 
          blood : student.blood,
           phone : student.phone, 
            semester : student.semester,
             roll : student.roll,
              registration : student.registration,
               sesson : student.sesson,
                PhotoURL : student.PhotoURL
    }
  }
   const result = await studentCollection.updateOne(query, updateStudent, option)

  res.send(result)
 })

// delet student 
app.delete('/student/:id', async(req, res)=>{
  const id = req.params.id;
  const query = {_id: new ObjectId(id)}
  const result = await studentCollection.deleteOne(query)
  res.send(result)
})

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 }); 
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);





app.get('/', (req, res)=>{
    res.send('hello devloper how are you')
})

app.listen(port, ()=>{
    console.log(`Server port is runing port : ${port}`)
})