function loadComponent(id, file) {

    fetch(file)
        .then(response => response.text())
        .then(data => {

            const element = document.getElementById(id);

            if (element) {
                element.innerHTML = data;
            }

        })
        .catch(error => console.log(error));

}


// Load components

loadComponent("navbar", "components/navbar.html");

loadComponent("hamburger", "components/hamburger.html");

loadComponent("footer", "components/footer.html");

loadComponent("social", "components/social.html");


// Mobile menu

document.addEventListener("click", function(event){

    const hamburger = event.target.closest(".hamburger");

    if(hamburger){

        const nav = document.querySelector("nav");

        if(nav){

            nav.classList.toggle("active");

        }

    }

});
