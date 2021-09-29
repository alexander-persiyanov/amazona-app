import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';
import data from '../data.js';


const productRouter = express.Router();


productRouter.get('/',
expressAsyncHandler( 
    async(req,res)=>{
        const products = await Product.find({});//turn all products
        res.send(products);

    }
)
);

productRouter.get('/seed',
expressAsyncHandler( 
    async(req,res)=>{
        // await Product.remove({});//Remove all products from DB
        const createdProducts = await Product.insertMany(data.products);
       res.send({createdProducts});
    
    }
) 
);


productRouter.get('/:id',

    expressAsyncHandler( 
        async(req,res)=>{
            
            const product = await Product.findById(req.params.id);
            

            if(product){
                res.send(product);
            }else{
                res.status(4040).send({message:'Product not found'});
            }
        }
    ) 
);



export default productRouter;