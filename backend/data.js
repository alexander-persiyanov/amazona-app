import bcrypt from 'bcryptjs';

const data = {
    users:[
        { 
            name:'admin',
            email:'admin@example.com',
            password:bcrypt.hashSync('1234',8),
            isAdmin:true,

        },
        { 
            name:'Marco',
            email:'marco@example.com',
            password:bcrypt.hashSync('1234',8),
            isAdmin:false,

        },
        { 
            name:'Julia',
            email:'julia@example.com',
            password:bcrypt.hashSync('1234',8),
            isAdmin:false,

        }
        
    ],

    products:[
        {
            
            name:'Nike slim shirt',
            category:'shirt',
            image:'/images/p1.jpg',
            price:150,
            countInStock:4,
            brand:'Nike',
            rating:3.5,
            numReviews:10,
            description:'high quality product',
            
        },
        {
            
            name:'Adidas slim shirt',
            category:'shirt',
            image:'/images/p2.jpg',
            price:100,
            countInStock:0,
            brand:'Nike',
            rating:2.0,
            numReviews:10,
            description:'high quality product',
            
        },
        {
            
            name:'Lacoste free shirt',
            category:'shirt',
            image:'/images/p3.jpg',
            price:150,
            countInStock:20,
            brand:'Lacoste',
            rating:5,
            numReviews:50,
            description:'best quality product',
            
        },
        {
            
            name:'Nike slim pant',
            category:'Pants',
            image:'/images/p4.jpg',
            price:90,
            countInStock:3,
            brand:'Nike',
            rating:4.4,
            numReviews:15,
            description:'high quality product',
            
        },
        {
            
            name:'Puma slim pant',
            category:'Pants',
            image:'/images/p5.jpg',
            price:60,
            countInStock:10,
            brand:'Puma',
            rating:4.7,
            numReviews:20,
            description:'high quality product',
            
        },
        {
            
            name:'Adidas fit pant',
            category:'Pants',
            image:'/images/p6.jpg',
            price:99,
            countInStock:12,
            brand:'Adidas',
            rating:4.9,
            numReviews:24,
            description:'high quality product',
            
        },

    ],
}

export default data;
