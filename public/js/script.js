//Change Navbar Scrolling 
window.addEventListener('scroll', function () {
    let header = document.querySelector('header');
    // let nav_text = document.querySelectorAll('a.nav-link')
    let windowPosition = window.scrollY > 0;

    header.classList.toggle('scrolling-active', windowPosition);
    // nav_text.classList.toggle('scrolling-active-nav-text', windowPosition);
})


//Hamburger Button Animation
let ChangeIcon = function(icon){
    icon.classList.toggle("change")
}