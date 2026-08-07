document.addEventListener("DOMContentLoaded", function () {



/* =====================================================
LOAD NAVBAR
===================================================== */


fetch("components/navbar.html")

.then(response => response.text())

.then(data => {


    const navbar = document.getElementById("navbar");


    if(navbar){


        navbar.innerHTML = data;


        initializeMenu();


    }


});








/* =====================================================
LOAD FOOTER
===================================================== */


fetch("components/footer.html")

.then(response => response.text())

.then(data => {


    const footer = document.getElementById("footer");


    if(footer){


        footer.innerHTML = data;


    }


});








/* =====================================================
LOAD SOCIAL COMPONENT
===================================================== */


fetch("components/social.html")

.then(response => response.text())

.then(data => {


    const social = document.getElementById("social");


    if(social){


        social.innerHTML = data;


    }


});





});








/* =====================================================
HAMBURGER MENU
===================================================== */


function initializeMenu(){



const hamburger =
document.getElementById("hamburger");



const menu =
document.querySelector(".nav-menu");





if(!hamburger || !menu){

    return;

}






hamburger.addEventListener("click", function(){



    menu.classList.toggle("active");



    hamburger.classList.toggle("active");



    const expanded =
    hamburger.getAttribute("aria-expanded")
    === "true";



    hamburger.setAttribute(
        "aria-expanded",
        !expanded
    );



});









/* CLOSE MENU AFTER CLICK */


const links =
menu.querySelectorAll("a");



links.forEach(link => {



    link.addEventListener(
    "click",
    function(){


        menu.classList.remove("active");


        hamburger.classList.remove("active");


        hamburger.setAttribute(
            "aria-expanded",
            "false"
        );


    });


});



}
