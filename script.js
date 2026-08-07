/* =====================================================
   TUBASTE WEBSITE SCRIPT
===================================================== */


document.addEventListener("DOMContentLoaded", () => {



    /* =====================================================
       LOAD COMPONENTS
    ===================================================== */


    // LOAD NAVBAR

    fetch("components/navbar.html")

        .then(response => response.text())

        .then(data => {

            const navbar = document.getElementById("navbar");


            if (navbar) {

                navbar.innerHTML = data;

                initializeMenu();

            }

        });



    // LOAD FOOTER

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
   MOBILE MENU
===================================================== */


function initializeMenu(){


    const hamburger = document.getElementById("hamburger");

    const navMenu = document.querySelector(".nav-menu");



    if (!hamburger || !navMenu) return;



    hamburger.addEventListener("click", () => {



        hamburger.classList.toggle("active");


        navMenu.classList.toggle("active");



        const expanded =
            hamburger.classList.contains("active");



        hamburger.setAttribute(
            "aria-expanded",
            expanded
        );



        document.body.classList.toggle(
            "menu-open"
        );


    });



    // Close menu when clicking a link

    const links =
        navMenu.querySelectorAll("a");



    links.forEach(link => {


        link.addEventListener("click", () => {


            hamburger.classList.remove("active");


            navMenu.classList.remove("active");


            document.body.classList.remove(
                "menu-open"
            );


        });


    });



}
