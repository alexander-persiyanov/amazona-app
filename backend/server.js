// Attention for launch this requested switched version Node js to 16.9.1
// Use nvm ls , nvm use node-version
// For launch this server API in directory amazona set --> npm start (launch express server)
// For automatic refresh server i install nodemon and in file package.json written script for start it

import express from 'express';
import mongoose from 'mongoose';
// import data from './data.js';
import productRouter from './routers/productRouter.js';
import userRouter from './routers/userRouter.js';

const app = express();



await mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/amazona',{
  useNewUrlParser:true,
  useUnifiedTopology:true,
  useCreateIndex:true,
});



// app.get('/api/products/:id', (req, res) => {

//   const product = data.products.find((x)=>x._id===req.params.id);
//   if(product){
//     res.send(product);
//   }else{
//     res.status(404).send({message:"Product not Found"});
//   }
  
// });


// app.get('/api/products', (req, res) => {
 
//   res.send(data.products);
// });



app.use('/api/users',userRouter);
app.use('/api/products',productRouter);

app.get('/', (req, res) => {
  res.send('Server is ready');
});

//Errore catcher from router expressAsyncHandler in userRouter
app.use((err,req,res,next)=>{
  res.status(500).send({message:err.message});
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});