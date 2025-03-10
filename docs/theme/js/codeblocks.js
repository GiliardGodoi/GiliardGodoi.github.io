document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("pre").forEach(function (block) {
        // Criar botão de copiar
        var button = document.createElement("button");
        button.innerHTML = '<i class="far fa-clipboard"></i>';
        button.classList.add("btn", "btn-outline-secondary", "btn-sm", "btn-copy");

        // Tornar o <pre> um container para posicionamento correto
        block.style.position = "relative";

        // Inserir o botão dentro do bloco <pre>
        block.appendChild(button);

        // Evento de cópia
        button.addEventListener("click", function () {
            var code = block.innerText;
            navigator.clipboard.writeText(code).then(function () {
                button.innerText = "Copiado!";
                setTimeout(() => (button.innerHTML = '<i class="far fa-clipboard"></i>'), 2000);
            });
        });
    });
});
