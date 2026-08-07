document.addEventListener("DOMContentLoaded", function () {



    /* =====================================================
       LOAD NAVBAR
    ===================================================== */


    fetch("components/navbar.html")

    .then(response => response.text())

    .then(data => {


        const navbar = document.getElementById("navbar");


        if (navbar) {


            navbar.innerHTML = data;


            loadHamburger();


        }


    });








    /* =====================================================
       LOAD FOOTER
    ===================================================== */


    fetch("components/footer.html")

    .then(response => response.text())

    .then(data => {


        const footer = document.getElementById("footer");


        if (footer) {


            footer.innerHTML = data;


        }


    });



});









/* =====================================================
   HAMBURGER MENU
===================================================== */


function loadHamburger(){



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
        hamburger.getAttribute("aria-expanded") === "true";



        hamburger.setAttribute(
            "aria-expanded",
            !expanded
        );



    });








    /* CLOSE MENU WHEN CLICKING LINK */


    const links =
    menu.querySelectorAll("a");



    links.forEach(link => {



        link.addEventListener("click", function(){



            menu.classList.remove("active");


            hamburger.classList.remove("active");



            hamburger.setAttribute(
                "aria-expanded",
                "false"
            );



        });



    });



}
