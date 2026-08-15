/* =========================================================
   TUBASTE WEBSITE
   GLOBAL JAVASCRIPT
   ========================================================= */


document.addEventListener("DOMContentLoaded", function () {

    loadNavbar();

    loadFooter();

});



/* =========================================================
   LOAD NAVBAR
   ========================================================= */

function loadNavbar() {

    fetch("components/navbar.html")

        .then(response => {

            if (!response.ok) {

                throw new Error(
                    `Navbar could not be loaded: ${response.status}`
                );

            }

            return response.text();

        })

        .then(data => {

            const navbar = document.getElementById("navbar");

            if (!navbar) return;

            navbar.innerHTML = data;

            setActivePage();

            loadHamburger();

        })

        .catch(error => {

            console.error(
                "Navbar loading error:",
                error
            );

        });

}



/* =========================================================
   LOAD FOOTER
   ========================================================= */

function loadFooter() {

    fetch("components/footer.html")

        .then(response => {

            if (!response.ok) {

                throw new Error(
                    `Footer could not be loaded: ${response.status}`
                );

            }

            return response.text();

        })

        .then(data => {

            const footer = document.getElementById("footer");

            if (!footer) return;

            footer.innerHTML = data;

        })

        .catch(error => {

            console.error(
                "Footer loading error:",
                error
            );

        });

}



/* =========================================================
   LOAD HAMBURGER COMPONENT
   ========================================================= */

function loadHamburger() {

    const container =
        document.getElementById(
            "hamburger-container"
        );

    if (!container) return;


    fetch("components/hamburger.html")

        .then(response => {

            if (!response.ok) {

                throw new Error(
                    `Hamburger could not be loaded: ${response.status}`
                );

            }

            return response.text();

        })

        .then(data => {

            container.innerHTML = data;

            activateMenu();

        })

        .catch(error => {

            console.error(
                "Hamburger loading error:",
                error
            );

        });

}



/* =========================================================
   MOBILE MENU
   ========================================================= */

function activateMenu() {

    const hamburger =
        document.getElementById("hamburger");

    const navMenu =
        document.getElementById("main-navigation");


    if (!hamburger || !navMenu) return;


    /* -----------------------------------------
       OPEN / CLOSE MENU
       ----------------------------------------- */

    hamburger.addEventListener(
        "click",
        function () {

            const isOpen =
                navMenu.classList.contains("active");


            if (isOpen) {

                closeMenu();

            } else {

                openMenu();

            }

        }
    );



    /* -----------------------------------------
       CLOSE MENU WHEN LINK IS CLICKED
       ----------------------------------------- */

    const navLinks =
        navMenu.querySelectorAll("a");


    navLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                closeMenu();

            }
        );

    });



    /* -----------------------------------------
       CLOSE MENU WITH ESCAPE KEY
       ----------------------------------------- */

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                closeMenu();

            }

        }
    );



    /* -----------------------------------------
       CLOSE MENU IF WINDOW BECOMES DESKTOP
       ----------------------------------------- */

    window.addEventListener(
        "resize",
        function () {

            if (window.innerWidth > 900) {

                closeMenu();

            }

        }
    );

}



/* =========================================================
   OPEN MENU
   ========================================================= */

function openMenu() {

    const hamburger =
        document.getElementById("hamburger");

    const navMenu =
        document.getElementById("main-navigation");


    if (!hamburger || !navMenu) return;


    navMenu.classList.add("active");

    hamburger.classList.add("active");

    hamburger.setAttribute(
        "aria-expanded",
        "true"
    );

    hamburger.setAttribute(
        "aria-label",
        "Close navigation menu"
    );

}



/* =========================================================
   CLOSE MENU
   ========================================================= */

function closeMenu() {

    const hamburger =
        document.getElementById("hamburger");

    const navMenu =
        document.getElementById("main-navigation");


    if (!hamburger || !navMenu) return;


    navMenu.classList.remove("active");

    hamburger.classList.remove("active");

    hamburger.setAttribute(
        "aria-expanded",
        "false"
    );

    hamburger.setAttribute(
        "aria-label",
        "Open navigation menu"
    );

}



/* =========================================================
   ACTIVE PAGE
   ========================================================= */

function setActivePage() {

    const currentPage =
        window.location.pathname
        .split("/")
        .pop();


    const navLinks =
        document.querySelectorAll(
            ".nav-menu a"
        );


    navLinks.forEach(function (link) {

        const linkPage =
            link.getAttribute("href");


        if (
            linkPage === currentPage ||
            (
                currentPage === "" &&
                linkPage === "index.html"
            )
        ) {

            link.classList.add("active");

            link.setAttribute(
                "aria-current",
                "page"
            );

        }

    });

}
