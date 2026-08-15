/* =========================================================
   TUBASTE WEBSITE
   GLOBAL JAVASCRIPT
   VERSION 2.0
   ========================================================= */


/* =========================================================
   01. INITIALIZE WEBSITE
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    loadNavbar();

    loadFooter();

});


/* =========================================================
   02. COMPONENT LOADER
   ========================================================= */

async function loadComponent(url, containerId, componentName) {

    const container = document.getElementById(containerId);

    if (!container) {
        return null;
    }

    try {

        const response = await fetch(url, {
            cache: "no-cache"
        });

        if (!response.ok) {

            throw new Error(
                `${componentName} could not be loaded: ${response.status}`
            );

        }

        const html = await response.text();

        container.innerHTML = html;

        return container;

    } catch (error) {

        console.error(
            `${componentName} loading error:`,
            error
        );

        return null;

    }

}


/* =========================================================
   03. LOAD NAVBAR
   ========================================================= */

async function loadNavbar() {

    const navbar = await loadComponent(
        "components/navbar.html",
        "navbar",
        "Navbar"
    );

    if (!navbar) {
        return;
    }

    setActivePage();

    loadHamburger();

}


/* =========================================================
   04. LOAD FOOTER
   ========================================================= */

async function loadFooter() {

    await loadComponent(
        "components/footer.html",
        "footer",
        "Footer"
    );

}


/* =========================================================
   05. LOAD HAMBURGER
   ========================================================= */

async function loadHamburger() {

    const container =
        document.getElementById(
            "hamburger-container"
        );

    if (!container) {
        return;
    }

    try {

        const response = await fetch(
            "components/hamburger.html",
            {
                cache: "no-cache"
            }
        );

        if (!response.ok) {

            throw new Error(
                `Hamburger could not be loaded: ${response.status}`
            );

        }

        const html = await response.text();

        container.innerHTML = html;

        activateMenu();

    } catch (error) {

        console.error(
            "Hamburger loading error:",
            error
        );

    }

}


/* =========================================================
   06. MOBILE NAVIGATION
   ========================================================= */

function activateMenu() {

    const hamburger =
        document.getElementById("hamburger");

    const navMenu =
        document.getElementById("main-navigation");

    if (!hamburger || !navMenu) {
        return;
    }


    /* -----------------------------------------
       INITIAL ACCESSIBILITY STATE
       ----------------------------------------- */

    hamburger.setAttribute(
        "aria-expanded",
        "false"
    );

    hamburger.setAttribute(
        "aria-label",
        "Open navigation menu"
    );



    /* -----------------------------------------
       OPEN / CLOSE
       ----------------------------------------- */

    hamburger.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();

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
       CLOSE WHEN NAV LINK IS CLICKED
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
       PREVENT MENU CLICK FROM CLOSING ITSELF
       ----------------------------------------- */

    navMenu.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();

        }
    );



    /* -----------------------------------------
       CLOSE WHEN CLICKING OUTSIDE
       ----------------------------------------- */

    document.addEventListener(
        "click",
        function () {

            if (
                navMenu.classList.contains("active")
            ) {

                closeMenu();

            }

        }
    );



    /* -----------------------------------------
       CLOSE WITH ESCAPE
       ----------------------------------------- */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                navMenu.classList.contains("active")
            ) {

                closeMenu();

                hamburger.focus();

            }

        }
    );



    /* -----------------------------------------
       CLOSE ON DESKTOP RESIZE
       ----------------------------------------- */

    window.addEventListener(
        "resize",
        function () {

            if (
                window.innerWidth > 900 &&
                navMenu.classList.contains("active")
            ) {

                closeMenu();

            }

        }
    );

}


/* =========================================================
   07. OPEN MOBILE MENU
   ========================================================= */

function openMenu() {

    const hamburger =
        document.getElementById("hamburger");

    const navMenu =
        document.getElementById("main-navigation");

    if (!hamburger || !navMenu) {
        return;
    }


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


    /* Prevent background scrolling */

    document.body.classList.add(
        "menu-open"
    );

}


/* =========================================================
   08. CLOSE MOBILE MENU
   ========================================================= */

function closeMenu() {

    const hamburger =
        document.getElementById("hamburger");

    const navMenu =
        document.getElementById("main-navigation");

    if (!hamburger || !navMenu) {
        return;
    }


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


    /* Restore background scrolling */

    document.body.classList.remove(
        "menu-open"
    );

}


/* =========================================================
   09. ACTIVE PAGE
   ========================================================= */

function setActivePage() {

    const navLinks =
        document.querySelectorAll(
            ".nav-menu a"
        );

    if (!navLinks.length) {
        return;
    }


    /* -----------------------------------------
       GET CURRENT PAGE
       ----------------------------------------- */

    let currentPage =
        window.location.pathname
        .split("/")
        .pop();


    /*
       If the pathname ends with a slash,
       treat it as the homepage.
    */

    if (!currentPage) {

        currentPage =
            "index.html";

    }


    navLinks.forEach(function (link) {

        const rawHref =
            link.getAttribute("href");


        if (!rawHref) {
            return;
        }


        /*
           Ignore external links,
           anchors and javascript links.
        */

        if (
            rawHref.startsWith("http://") ||
            rawHref.startsWith("https://") ||
            rawHref.startsWith("#") ||
            rawHref.startsWith("javascript:")
        ) {

            return;

        }


        /*
           Convert the link into a clean filename.
        */

        let linkPage;

        try {

            const linkURL =
                new URL(
                    rawHref,
                    window.location.href
                );

            linkPage =
                linkURL.pathname
                .split("/")
                .pop();

        } catch (error) {

            return;

        }


        if (!linkPage) {

            linkPage =
                "index.html";

        }


        /*
           Remove any previous active state.
        */

        link.classList.remove(
            "active"
        );

        link.removeAttribute(
            "aria-current"
        );


        /*
           Set active page.
        */

        if (
            linkPage === currentPage ||
            (
                currentPage === "index.html" &&
                linkPage === ""
            )
        ) {

            link.classList.add(
                "active"
            );

            link.setAttribute(
                "aria-current",
                "page"
            );

        }

    });

}


/* =========================================================
   10. PAGE SCROLL LOCK
   ========================================================= */

function preventMenuScroll() {

    const menuOpen =
        document.body.classList.contains(
            "menu-open"
        );

    if (menuOpen) {

        document.body.style.overflow =
            "hidden";

    } else {

        document.body.style.overflow =
            "";

    }

}


/* =========================================================
   11. OBSERVE MENU STATE
   ========================================================= */

const menuStateObserver =
    new MutationObserver(
        function () {

            preventMenuScroll();

        }
    );


document.addEventListener(
    "DOMContentLoaded",
    function () {

        menuStateObserver.observe(
            document.body,
            {
                attributes: true,
                attributeFilter: ["class"]
            }
        );

    }
);


/* =========================================================
   12. CLEANUP ON PAGE EXIT
   ========================================================= */

window.addEventListener(
    "beforeunload",
    function () {

        document.body.classList.remove(
            "menu-open"
        );

        document.body.style.overflow =
            "";

    }
);
