
const axios=require('axios');
let addToCard = document.querySelectorAll(".add-to-cart");
 
function updateCart(pizza)
{
   axios.post('/update_cart',pizza).then(function(res){
    console.log(res)});
   
}

addToCard.forEach(function(btn){
  btn.addEventListener("click", function (event) {
    console.log(event);
     
    //JSON.parse is used to convert string to object
    let pizza=JSON.parse(btn.dataset.pizza); //fetch data of the pizza on click
    
    updateCart(pizza);
    // console.log(pizza);
  });
});
