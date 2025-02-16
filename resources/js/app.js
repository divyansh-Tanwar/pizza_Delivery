
import AWN from "awesome-notifications"
import initAdmin from "./admin.js";
const axios=require('axios');
import initStripe from "./stripe.js"
import moment from 'moment';

let addToCard = document.querySelectorAll(".add-to-cart");
let cartCounter=document.getElementById('cartCounter');
function updateCart(pizza)
{
   axios.post('/update_cart',pizza).then(function(res){
    console.log(res)
    cartCounter.innerText=res.data.totalQty;
    //code for notification(awesome notification package)
    let notifier = new AWN();
    notifier.success('Successfully added to Cart!');
  }).catch(function(err){
      console.log(err);
      //code for notification(awesome notification package)
    let notifier = new AWN();
    notifier.warning("Please try again after sometime!");
  });
    
   
}


addToCard.forEach(function(btn){
  btn.addEventListener("click", function (event) {
    // console.log(event);
     
    //JSON.parse is used to convert string to object
    let pizza=JSON.parse(btn.dataset.pizza); //fetch data of the pizza on click
    
    updateCart(pizza);
    // console.log(pizza);
  });
});

const alertMsg=document.getElementById("success-alert");

if(alertMsg)
  {
    setTimeout(()=>{
      alertMsg.remove()
    },2000)
  }
  

initStripe();

  // socket for admin
  let skt=io()
  initAdmin(skt);
  let adminAreaPath=window.location.pathname
  // console.log(adminAreaPath);
  if(adminAreaPath.includes('admin'))
    { 
      skt.emit('join','adminRoom');
    }
 


  //function to get status of order and change it
  let statuses=document.querySelectorAll('.staus_line');
  let hidden_Input=document.querySelector("#hidden_Input")
  let order=hidden_Input?hidden_Input.value:"kuch nhi mila";
  let time=document.createElement('small');
  order=JSON.parse(order);
  // console.log("yaha hu");
  // console.log(order);
  // console.log(statuses);

   function updateStatus(order)
   {    
    statuses.forEach((status)=>{
       status.classList.remove('step-completed')
       status.classList.remove('current')
    }) 
       
        let stepCompleted=true;
        
        statuses.forEach((status)=>{
           
           let dataprop=status.dataset.status;
           if(stepCompleted)
            {
              status.classList.add('step-completed');
            }

            if(dataprop===order.status)
            {  
              time.innerText=moment(order.updatedAt).format('hh:mm A');
              status.appendChild(time);
              stepCompleted=false;
                if( status.nextElementSibling)
                {
                    status.nextElementSibling.classList.add('current');
                }
               
            }
        })

   }

   updateStatus(order);

   //socket

   let socket=io()
      //step1:send message that we have landed into single order page pls make a private room for this order id with room name=order.id
   if(order)
    {
      socket.emit('join',`order_${order._id}`)
    }

    console.log("line 108  app.js");

    socket.on('orderUpdated',(data)=>{
      // console.log("socket ke ander hu");
      // console.log(data);
      const updatedOrder={...order}
      // updatedOrder.updatedAt=
      updatedOrder.status=data.status
      updateStatus(updatedOrder);
      
      //notification
          let notifier = new AWN();
        notifier.success(data.status);
      }).catch(function(err){
          console.log(err);
          //code for notification(awesome notification package)
        let notifier = new AWN();
        notifier.warning("Please try again after sometime!");
      
    })
   


