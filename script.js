function loadComponent(id, file) {

    fetch(file)
    .then(response => {

        if (!response.ok) {
            throw new Error("Cannot load " + file);
        }

        return response.text();

    })
    .then(data => {

        document.getElementById(id).innerHTML = data;

    })

    .catch(error => {

        console.log(error);

    });

}



loadComponent("footer", "./components/footer.html");

loadComponent("navbar", "./components/navbar.html");

loadComponent("hamburger", "./components/hamburger.html");

loadComponent("social", "./assets/social.html");
