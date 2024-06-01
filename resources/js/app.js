
import AWN from "awesome-notifications"
const axios=require('axios');

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
