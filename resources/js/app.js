

let addToCard = document.querySelectorAll(".add-to-cart");

addToCard.forEach(function(btn){
  btn.addEventListener("click", function (event) {
    console.log(event);
    
    let pizza=btn.dataset.pizza;
    console.log(pizza);
  });
});
