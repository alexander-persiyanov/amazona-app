import React, { useEffect }  from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsProduct } from '../actions/productAction';
import Rating from '../components/Rating';
import LoadingBox from './../components/LoadingBox';
import MessageBox from '../components/MessageBox';
// import  data from '../data';

function ProductScreen (props){

    const productDetails = useSelector((state) => {return state.productDetails} );
    const {loading,error,product} = productDetails;
    const dispatch = useDispatch();
    const productId = props.match.params.id;
    
    // const product = data.products.find(x => x._id === props.match.params.id );
    // if(!product){
    //     return( 
    //         <div>Product not found</div>
    //     );
    // }

    useEffect(()=>{
        dispatch(detailsProduct(productId));
    },[dispatch,productId]);

    return(

        <div>
            {loading ? <LoadingBox></LoadingBox>
            :error?<MessageBox variant="danger">{error}</MessageBox>
            : 
            (
                <div >
                Product screen .... {props.match.params.id}
                <br></br>
                <Link to="/">Back to result</Link>
                <div className="row top">
                    <div className="col-2">
                        <img className="large" src={product.image} alt={product.name} />
                    </div>
                    <div className="col-1">
                        <ul>
                            <li> {product.name}</li>
                            <li> <Rating rating={product.rating} numReviews={product.numReviews}></Rating></li>
                        
                            <li>Description:   {product.description}</li>
                        </ul>
                
                    </div>
                    <div className="col-1">
                    <div className="card card-body">
                        <ul>
                            <li>
                                    <div>Price</div>
                                    <div className="price">${product.price}</div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Status</div>
                                    <div>{product.countInStock>0 ?(<span className="success">InStock</span>): (<span className="danger">Unavaible</span> )}</div>
                                    
                                </div>
                            </li>
                            <li>
                                <button className="primary block">Add to card</button>
                            </li>
                        </ul>
                    </div>
                    </div>
                </div>
            </div>



            )
            }
            
            </div>
        );

}

export default ProductScreen;
