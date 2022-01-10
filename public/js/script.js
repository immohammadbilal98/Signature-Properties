// Change Navbar Scrolling 
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


const root = document.documentElement;
const marqueeElementsDisplayed = getComputedStyle(root).getPropertyValue("--marquee-elements-displayed");
const marqueeContent = document.querySelector("ul.marquee-content");

root.style.setProperty("--marquee-elements", marqueeContent.children.length);

for(let i=0; i<marqueeElementsDisplayed; i++) {
  marqueeContent.appendChild(marqueeContent.children[i].cloneNode(true));
}