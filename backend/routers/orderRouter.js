import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import { isAuth } from '../utils.js';//Middleware for send user field

const orderRouter = express.Router();

orderRouter.post('/',isAuth,expressAsyncHandler(async(req,res)=>{
    if(req.body.orderItems===0){
        res.status(400).send({message:"Card is empty"});

    }else{
        const order = new Order({
            orderItems:req.body.orderItems,
            shippingAddress: req.body.shippingAddress,
            paymentMethod:req.body.paymentMethod,
            itemsPrice:req.body.itemsPrice,
            shippingPrice:req.body.shippingPrice,
            taxPrice:req.body.taxPrice,
            totalPrice:req.body.totalPrice, 
            user:req.user._id,


        });
        const createdOrder = await order.save(); 
        res.status(201).send({message:"New order created",order:createdOrder});
    }

}));

orderRouter.get('/:id',isAuth,expressAsyncHandler(async(req,res)=>{
    const order = await Order.findById(req.params.id);
    if(order){
        res.send(order);
    }else{
        res.status(404).send({message:"Order not found"});
    }

}));

orderRouter.put('/:id/pay',isAuth,expressAsyncHandler(async(req,res)=>{
    const order = await Order.findById(req.params.id);
  
    if(order){
        console.log("order exist");
        console.log(`id:${req.body.id}`);
        console.log(`status:${req.body.status}`);
        console.log(`update_time:${req.body.update_time}`);
        console.log(`email_address:${req.body.payer.email_address}`);


        console.log(req.body);
      
       

        order.isPaid = true;
        order.paidAt  = Date.now();
       
        order.paymentResult = {
            id:req.body.id,
            status:req.body.status,
            update_time:req.body.update_time,
            email_address:req.body.payer.email_address,
        };

     
        const updatedOrder = await order.save();
       
       
        res.send({message:"Order Paid",order: updatedOrder});
    }else{
        res.status(404).send({message:'Order Not Found'});
    }
   

}));



export default orderRouter;