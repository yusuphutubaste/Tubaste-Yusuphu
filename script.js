function loadComponent(id, file) {

    fetch(file)
    .then(response => response.text())
    .then(data => {

        const element = document.getElementById(id);

        if (element) {
            element.innerHTML = data;
        }

    })
    .catch(error => console.log("Component error:", error));

}



loadComponent("navbar", "components/navbar.html");

loadComponent("hamburger", "components/hamburger.html");

loadComponent("social", "components/social.html");

loadComponent("footer", "components/footer.html");





document.addEventListener("click", function(event) {


    if (event.target.closest("#hamburger")) {


        const nav = document.querySelector("nav");


        if (nav) {

            nav.classList.toggle("active");

        }


    }


});
