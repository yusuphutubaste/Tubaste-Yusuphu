document.addEventListener("DOMContentLoaded", function () {


    // LOAD NAVBAR

    fetch("components/navbar.html")
        .then(response => response.text())
        .then(data => {

            const navbar = document.getElementById("navbar");

            if (navbar) {

                navbar.innerHTML = data;

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
