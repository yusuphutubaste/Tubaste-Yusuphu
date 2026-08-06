const hamburger = document.getElementById("hamburger");
const nav = document.querySelector("nav");


if (hamburger) {

    hamburger.addEventListener("click", function(){

        nav.classList.toggle("active");

        hamburger.classList.toggle("open");

    });

}
