import axios from "axios";
import { 
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_CREATE_RESET,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_SUCCESS,
 } from "../constans/orderConstants";
import {CART_EMPTY} from "../constans/cartConstants";
const createOrder = (order) =>{
    return async (dispatch,getState)=>{

        dispatch({type:{ORDER_CREATE_REQUEST},payload:order});
        try{
            const {userSignin:{userInfo}} = getState();
            const {data} = await axios.post('/api/orders',order,{
                headers:{
                    Authorization:`Bearer ${userInfo.token}`,
                }
            });

            dispatch({type:ORDER_CREATE_SUCCESS,payload:data.order});
            dispatch({type:CART_EMPTY});
            localStorage.removeItem("cartItems");


        }catch(error){
            dispatch({type:{ORDER_CREATE_FAIL},
            payload:error.response && error.response.data.message?error.response.data.message:error.message
            });
        }
    }
};

export default  createOrder;

export const detailsOrder =  (orderId)=>{

    return async (dispatch,getState)=>{

        dispatch({type:ORDER_DETAILS_REQUEST,payload:orderId});
        const {userSignin:{userInfo}} = getState(); 
        try {
            // data.data => {data}
           const {data} = await axios.get(`/api/orders/${orderId}`,{
                headers:{
                    Authorization:`Bearer ${userInfo.token}`,
                }
            }); 
            // response from server that contains data order details
            dispatch({type:ORDER_DETAILS_SUCCESS,payload:data});
        } catch (error) {
            const message = error.response && error.response.data.message?error.response.data.message:error.message;
            dispatch({type:ORDER_DETAILS_FAIL,payload:message});
        }
    };

}
