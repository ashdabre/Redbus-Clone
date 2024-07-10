const express=require('express')
const bodyparser=require('body-parser')
const cors=require('cors')
const mongoose=require('mongoose')

const app=express();

app.use(cors());
app.use(bodyparser.json())

const DBURL='mongodb+srv://ashaldabre13:test@tedbus.k7jqukq.mongodb.net/?retryWrites=true&w=majority&appName=Tedbus'
mongoose.connect(DBURL)
.then(()=> console.log("Mongodb connected"))
.catch(err=> console.error('mongodb connection error: ',err))

app.get('/',(req,res)=>{
  res.send('hello, Tedbus is working')
})

const PORT=5000
app.listen(PORT,()=>{
  console.log('server is running on port ${PORT}')})
