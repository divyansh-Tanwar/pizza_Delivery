import AWN from "awesome-notifications"
const axios=require('axios');
export function placeOrder(formObject)
{
    axios.post("/orders",formObject).then((res)=>{
        let notifier = new AWN();
        notifier.success(res.data.message);
        
        setTimeout(()=>{
          
          window.location.href='/customer/orders';
        },500)
        
       }).catch((err)=>{
        //  console.log(err);
          let notifier = new AWN();
         notifier.warning(err.res.data.message);
       })
}