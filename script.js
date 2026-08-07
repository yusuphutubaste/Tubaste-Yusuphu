document.addEventListener("DOMContentLoaded", function () {



    // LOAD NAVBAR

    fetch("components/navbar.html")

    .then(response => response.text())

    .then(data => {


        const navbar = document.getElementById("navbar");


        if (navbar) {

            navbar.innerHTML = data;


            loadHamburger();

        }


    })

    .catch(error => {

        console.log("Navbar loading error:", error);

    });








    // LOAD FOOTER


    fetch("components/footer.html")

    .then(response => response.text())

    .then(data => {


        const footer = document.getElementById("footer");


        if (footer) {


            footer.innerHTML = data;


        }


    })

    .catch(error => {


        console.log("Footer loading error:", error);


    });








});









// LOAD HAMBURGER COMPONENT


function loadHamburger(){



    const container = document.getElementById("hamburger-container");



    if (!container) return;





    fetch("components/hamburger.html")


    .then(response => response.text())


    .then(data => {



        container.innerHTML = data;



        activateMenu();



    })

    .catch(error => {


        console.log("Hamburger loading error:", error);


    });



}









// MOBILE MENU


function activateMenu(){



    const hamburger = document.getElementById("hamburger");


    const navMenu = document.querySelector(".nav-menu");



    if (!hamburger || !navMenu) return;





    hamburger.addEventListener("click", function(){



        navMenu.classList.toggle("active");



        const expanded =

        hamburger.getAttribute("aria-expanded") === "true";



        hamburger.setAttribute(

            "aria-expanded",

            !expanded

        );



    });



}
