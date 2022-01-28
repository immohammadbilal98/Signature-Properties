// JavaScript ===============================================================


// Change Navbar Scrolling 
window.addEventListener('scroll', function () {
    let header = document.querySelector('header');
    let windowPosition = window.scrollY > 0;
    header.classList.toggle('scrolling-active', windowPosition);
 
}) 

// Hamburger Button Animation
let ChangeIcon = function (icon) {
  icon.classList.toggle("change");
};

// Marquee
const root = document.documentElement;
const marqueeElementsDisplayed = getComputedStyle(root).getPropertyValue(
  "--marquee-elements-displayed"
);
const marqueeContent = document.querySelector("ul.marquee-content");

if (marqueeContent && marqueeContent.children) {
  root.style.setProperty("--marquee-elements", marqueeContent.children.length);
  for (let i = 0; i < marqueeElementsDisplayed; i++) {
    marqueeContent.appendChild(marqueeContent.children[i].cloneNode(true));
  }
}

//Gallery Filter

//selecting all required elements
const filterItem = document.querySelector(".items-gallery");
const filterImg = document.querySelectorAll(".gallery .image");
window.onload = () => {
  //after window loaded
  filterItem.onclick = (selectedItem) => {
    //if user click on filterItem div
    if (selectedItem.target.classList.contains("item-gallery")) {
      //if user selected item has .item class
      filterItem.querySelector(".active").classList.remove("active"); //remove the active class which is in first item
      selectedItem.target.classList.add("active"); //add that active class on user selected item
      let filterName = selectedItem.target.getAttribute("data-name"); //getting data-name value of user selected item and store in a filtername variable
      filterImg.forEach((image) => {
        let filterImges = image.getAttribute("data-name"); //getting image data-name value
        //if user selected item data-name value is equal to images data-name value
        //or user selected item data-name value is equal to "all"
        if (filterImges == filterName || filterName == "all") {
          image.classList.remove("hide"); //first remove the hide class from the image
          image.classList.add("show"); //add show class in image
        } else {
          image.classList.add("hide"); //add hide class in image
          image.classList.remove("show"); //remove show class from the image
        }
      });
    }
  };
  /*for (let i = 0; i < filterImg.length; i++) {
      filterImg[i].setAttribute("onclick", "preview(this)"); //adding onclick attribute in all available images
    }*/
};

/*
  //fullscreen image preview function
  //selecting all required elements
  const previewBox = document.querySelector(".preview-box"),
  categoryName = previewBox.querySelector(".title p"),
  previewImg = previewBox.querySelector("img"),
  closeIcon = previewBox.querySelector(".icon"),
  shadow = document.querySelector(".shadow");
  function preview(element){
    //once user click on any image then remove the scroll bar of the body, so user cant scroll up or down
    document.querySelector("body").style.overflow = "hidden";
    let selectedPrevImg = element.querySelector("img").src; //getting user clicked image source link and stored in a variable
    let selectedImgCategory = element.getAttribute("data-name"); //getting user clicked image data-name value
    previewImg.src = selectedPrevImg; //passing the user clicked image source in preview image source
    categoryName.textContent = selectedImgCategory; //passing user clicked data-name value in category name
    previewBox.classList.add("show"); //show the preview image box
    shadow.classList.add("show"); //show the light grey background
    closeIcon.onclick = ()=>{ //if user click on close icon of preview box
      previewBox.classList.remove("show"); //hide the preview box
      shadow.classList.remove("show"); //hide the light grey background
      document.querySelector("body").style.overflow = "auto"; //show the scroll bar on body
    }
  }
  */


  

// JQUERY ===============================================================

$(function() {

});

// Tooltips
$(document).ready(function () {
  $('[data-toggle="tooltip"]').tooltip();

  $("form#filterForm").on("submit", function (e) {
    e.preventDefault();
    let reqBody = {};
    reqBody.minPrice = parseInt($("input[name=price-from]").val());
    reqBody.maxPrice = parseInt($("input[name=price-to]").val());
    reqBody.minArea = parseInt($("input[name=area-from]").val());
    reqBody.maxArea = parseInt($("input[name=area-to]").val());
    reqBody.baths = parseInt($("select[name=baths] :selected").val());
    reqBody.beds = parseInt($("select[name=beds] :selected").val());
    reqBody.type = $("select[name=type] :selected").val();
    reqBody.brand = $("select[name=brand] :selected").val();
    reqBody.name = $("input[name=propertyName]").val();

    $.ajax({
      type: "post",
      url: "/rent",
      data: reqBody,
      dataType: "json",
    }).done(function (resp) {
      if (resp && !resp.message && resp.length) {
        $("ul.properties").html("");
        for (let item of resp) {
          let source = $("#property-template").html();
          let template = Handlebars.compile(source);
          $("ul.properties").append(template(item));
        }
      }
    });
  });
  
});
// initialise
function carouselStart() {
  // check if local storage stored a slide, if yes make it active
  checkStoredImg = localStorage.getItem('carousel-slide');
  imgSrc = $("li.carousel-item > img[src$='" + checkStoredImg + "']");
  if (checkStoredImg != null) {
      imgSrc.parent().addClass('active');
  }
  // otherwise make the first item active
    else {
        $('li.carousel-item:first-child').addClass('active');
    }
}

// play button function
$('.play-btn').on('click touch', function (e) {        
  // hide play button & show pause
  $('.play-btn').toggle();
  $('.pause-btn').toggle();
  // disable timer setting options
  $('select').prop('disabled', true);
  // change lock icon from unlocked to locked
  $('.lock-icon').removeClass('fa-lock-open').addClass('fa-lock');
  // get current timer settings set by select input
  var currentTimerSetting = $('select').val();
  if (currentTimerSetting == "x1") {
      trigger = window.setInterval(function () {
          triggerCarousel();
      }, 1000);
  }
  else if (currentTimerSetting == "x2") {
      trigger = window.setInterval(function () {
          triggerCarousel();
      }, 2000);
  }
  else if (currentTimerSetting == "x3") {
      trigger = window.setInterval(function () {
          triggerCarousel();
      }, 3000);
  }
  else {
      trigger = window.setInterval(function () {
          triggerCarousel();
      }, 5000);
  }
});

// pause button function
$('.pause-btn').on('click touch', function () {
  // hide pause button & show play
  $('.play-btn').toggle();
  $('.pause-btn').toggle();
  // re-enable timer setting options
  $('select').prop('disabled', false);
  // change icon back to unlocked
  $('.lock-icon').removeClass('fa-lock').addClass('fa-lock-open');
  // stop carousel
  window.clearInterval(trigger);
});

// automatic carousel sliding (loop)
function triggerCarousel() {
  //find active item and move active class to next item (psuedo loop)
  $('li.carousel-item.active').removeClass('active').next().addClass('active');
  // store active item in local storage as carousel moves through items
  currentActiveImg = $('li.carousel-item.active > img').attr('src');
  storeImg = localStorage.setItem('carousel-slide', currentActiveImg);
  //check active class is present in list items, re-add if missing (psuedo loop)
  if (!$('li.carousel-item').hasClass('active')) {
      $('li.carousel-item:first-child').addClass('active');
      currentActiveImg = $('li.carousel-item.active > img').attr('src');
      storeImg = localStorage.setItem('carousel-slide', currentActiveImg);
  }
}

//previous button nav
$('.prev-btn').on('click touch', function () {
  // if the first item is active when clicking previous btn make last active (psuedo loop)
  if ($('li.carousel-item:first-child').hasClass('active')) {
      $('li.carousel-item:first-child').removeClass('active');
      $('li.carousel-item:last-child').addClass('active');
      // store active slide in local storage
      currentActiveImg = $('li.carousel-item.active > img').attr('src');
      storeImg = localStorage.setItem('carousel-slide', currentActiveImg);
  }
  else if (!$('li.carousel-item:first-child').hasClass('active')) {
      $('li.carousel-item.active').removeClass('active').prev().addClass('active');
      // store active slide in local storage
      currentActiveImg = $('li.carousel-item.active > img').attr('src');
      storeImg = localStorage.setItem('carousel-slide', currentActiveImg);
  }
});

//next button nav
$('.next-btn').on('click touch', function () {
  // if the last item is active when clicking previous btn make first active (psuedo loop)
  if ($('li.carousel-item:last-child').hasClass('active')) {
      $('li.carousel-item:last-child').removeClass('active');
      $('li.carousel-item:first-child').addClass('active');
      // store active slide in local storage
      currentActiveImg = $('li.carousel-item.active > img').attr('src');
      storeImg = localStorage.setItem('carousel-slide', currentActiveImg);
  }
  else if (!$('li.carousel-item:last-child').hasClass('active')) {
      $('li.carousel-item.active').removeClass('active').next().addClass('active');
      // store active slide in local storage
      currentActiveImg = $('li.carousel-item.active > img').attr('src');
      storeImg = localStorage.setItem('carousel-slide', currentActiveImg);
  }
});

//thumbnail nav
$('li.carousel-thumbs-item').on('click touch', function () {
  // get thumbnail image src and match carousel item, then make it active
  var thumbImgSrc = $(this).find('img').attr('src');
  var mainImgSrc = $("li.carousel-item > img[src$='" + thumbImgSrc +  "']");        
  $('li.carousel-item.active').removeClass('active');
  mainImgSrc.parent().addClass('active');
  // store active slide in local storage
  currentActiveImg = $('li.carousel-item.active > img').attr('src');
  storeImg = localStorage.setItem('carousel-slide', currentActiveImg);
});

$.fn.touch = function () {
  var start = function (event) {
      var orig = event.originalEvent;
      var pos = $(this).position();
      downx = orig.changedTouches[0].pageX - pos.left;
  }
  var move = function (event) {
      var orig = event.originalEvent;
      var pos = $(this).position();
      newx = orig.changedTouches[0].pageX - pos.left;
      if (newx < downx && downx - newx > 70) {
          $('body').addClass('nextimagemove');
      }
      if (newx > downx && newx - downx > 70) {
          $('body').addClass('previmagemove');
      }
  }
  var end = function (event) {
      $('body').removeClass('nextimagemove previmagemove');
      var orig = event.originalEvent;
      var pos = $(this).position();
      var newx = orig.changedTouches[0].pageX - pos.left;
      if (newx < downx && downx - newx > 100) {
          $('.next-btn').click();
      }
      if (newx > downx && newx - downx > 100) {
          $('.prev-btn').click();
      }
  }
  this.on("touchstart", start);
  this.on("touchmove", move);
  this.on("touchend", end);
};
$('.carousel-items-container').touch();    

//initialise carousel on doc ready
$(function () {
  carouselStart();
});

// Filtering Searching


// $('body').removeClass('modal-open');
// $('.modal-backdrop').remove();

$('.modal-backdrop').remove();

// function openNav() {
//   document.getElementById("myNav").style.width = "100%";
// }

// function closeNav() {
//   document.getElementById("myNav").style.width = "0%";
// }


// $('.toggle-menu').click (function(){
//   $(this).toggleClass('active');
//   $('#menu').toggleClass('open');
// });


gsap.registerPlugin(ScrollTrigger);

// "to" tween (animate to provided values)


gsap.from("#Explore", {
  scrollTrigger: {
    trigger: "#Explore",
    start: "center bottom"
  }, 
  x: -200,
  opacity: 0,
  duration:1.5,
});


gsap.from(".NL-1",{
  scrollTrigger: {
    trigger: ".NL-1",
    start: "center bottom"
  }, 
  ease:  Expo.easeInOut,
  opacity: 0,
  x: -500 ,
  duration:1,
  delay:.1
});

gsap.from(".NL-2",{
  scrollTrigger: {
    trigger: ".NL-2",
    start: "center bottom"
  }, 
  ease:  Expo.easeInOut,
  opacity: 0,
  x: 500 ,
  duration:1,
  delay:.5
});

gsap.from(".OFP-1",{
  scrollTrigger: {
    trigger: ".OFP-1",
    start: "center bottom"
  }, 
  ease:  Expo.easeInOut,
  opacity: 0,
  y: -50 ,
  rotate:15,
  delay:.10
});

gsap.from(".OFP-2",{
  scrollTrigger: {
    trigger: ".OFP-2",
    start: "center bottom"
  }, 
  ease:  Expo.easeInOut,
  opacity: 0,
  y: -100 ,
  rotate:15,
  delay:.15
});



gsap.from(".OFP-3",{
  scrollTrigger: {
    trigger: ".OFP-3",
    start: "center bottom"
  }, 
  ease:  Expo.easeInOut,
  opacity: 0,
  y: -150 ,
  rotate:15,
  delay:.15
});
