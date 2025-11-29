window.addEventListener("scroll", function () {
    let header = document.querySelector("header");

    if (window.scrollY > 80) {
        header.classList.add("shrink");
    } else {
        header.classList.remove("shrink");
    }
});
