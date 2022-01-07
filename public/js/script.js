//Change Navbar Scrolling 
// window.addEventListener('scroll', function () {
//     let header = document.querySelector('header');

//     let windowPosition = window.scrollY > 0;

//     header.classList.toggle('scrolling-active', windowPosition);
    
// })


//Hamburger Button Animation
let ChangeIcon = function(icon){
    icon.classList.toggle("change")
}


$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();   
  });