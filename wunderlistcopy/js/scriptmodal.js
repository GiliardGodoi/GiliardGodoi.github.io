var main = function(){
    var $modal = $("#fundo-janela-modal");
    var $botao = $("#buscar");
    var $btnFechar = $(".fechar-modal");
    
    function mostrarJanelaModal() {
        $("#fundo-janela-modal").css('display', 'block');
    }
    
    function esconderJanelaModal() {
        $("#fundo-janela-modal").css('display', 'none');
    }
    
    $(window).click(function(evento){
        if($(evento.target).is($modal)){
            esconderJanelaModal();
        }
    });
    
    $botao.click(mostrarJanelaModal);
    $btnFechar.click(esconderJanelaModal);
};

$(document).ready(main);

