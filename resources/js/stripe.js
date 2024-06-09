import AWN from "awesome-notifications"
const axios=require('axios');
import {loadStripe} from '@stripe/stripe-js';
import { placeOrder } from "./apiService";
async function initStripe()
{   
    // --------------------------------stripe setup-------------------------------------------------------------------------------------
    const stripe = await loadStripe('pk_test_51PPmL8FVJ2wnCUY3Sm9od4Z5ebaEiDx68ZSb5X8ccroqvkkNII0nRW6KNKMPwgJdg589Os4rOACdp1WbTUBjMo5M00UGLn0dZ6');
    let card=null
    function mountWidget()
    {
        const elements=stripe.elements()
        let style = {
           base: {
           color: '#32325d',
           fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
           fontSmoothing: 'antialiased',
           fontSize: '16px',
           '::placeholder': {
               color: '#aab7c4'
           }
           },
           invalid: {
           color: '#fa755a',
           iconColor: '#fa755a'
           }
       };

        card=elements.create('card',{style,hidePostalCode:true})
        card.mount('#card-element')
    }
   

    const paymentType=document.getElementById('paymentType')
    if(!paymentType)
    {
        return;
    }
    paymentType.addEventListener('change',(event)=>{
        
        console.log(event.target.value);
        if(event.target.value==='card')
        {
            mountWidget();
        }
        else
        {
            card.destroy();
        }
    })

  //------------------------------------------------stripe setup end----------------------------------------------------------------------
    
  // getting form data from cart ,ejs,doing ajax call to server(ajax call)
   const paymentForm=document.getElementById('payment-form')
   if(paymentForm)
    {
      paymentForm.addEventListener('submit',(event)=>{
        event.preventDefault();
     
        let formData = new FormData(paymentForm);
        let formObject={}
     
        for(let [key, value] of formData.entries())
         { 
           formObject[key]=value
           
         }
         
        
         if(!card)
          {
            placeOrder(formObject);
            return;
          }
    //-----------------------sending request to stripe to generate token then sending the data to server--------------------------------------
           // step1:sending request to strip server to generate token(card verification)
          stripe.createToken(card).then((res)=>{
            // console.log(res.token.id);
             formObject.stripeToken=res.token.id
            //  console.log(formObject.stripeToken);
            placeOrder(formObject);
          }).catch((err)=>{
              
            console.log(err);
          })
  
      })
    }
    
}

export default initStripe;