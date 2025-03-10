document.addEventListener("DOMContentLoaded", function () {
    var btnTopo = document.getElementById("btnTopo");

    let lastScroll = window.scrollY;
    let threshold = 10; // Mínima diferença para considerar movimento
    // Mostra o botão quando o usuário rolar 300px para baixo
    window.addEventListener("scroll", function () {
        let currentScroll = window.scrollY;
        if (lastScroll - currentScroll > threshold) {
            btnTopo.classList.add("show"); // Mostra suavemente
        }
        else if (currentScroll - lastScroll > threshold || currentScroll === 0) {
            btnTopo.classList.remove("show"); // Esconde suavemente
        }
        lastScroll = currentScroll;
    });

    // Faz a página rolar suavemente para o topo ao clicar
    btnTopo.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});