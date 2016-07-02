/* global $lasClicked */

var main = function(){
    
    var $lastClicked = undefined;
    var idLista;
    var tituloLista;
    
    function atualizarTarefa(evento){
        
    }
    
    function addTarefa(texto, id){
        id = id || 0;
        var item = $("<li></li>").addClass("item-lista")
                                .append($("<div></div>").addClass("item-check").append($("<input type='checkbox'>")))
                                .append($("<div></div>").addClass("tarefa-id").text(id))
                                .append($("<div></div>").addClass("item-texto").text(texto))
                                .append($("<div></div>").addClass("item-delete").append($("<i></i>").addClass("fa").addClass("fa-trash")))
                                .append($("<div></div>").addClass("item-editar").append($("<i></i>").addClass("fa").addClass("fa-edit")));
        $(".lista-tarefa").prepend(item);
        $(".item-delete").click(onTarefaDeleteClick);
        $(".item-editar").click(onTarefaEditClick);
        $(".lista-tarefa").sortable();
    }

    function salvarEdicaoTarefa($tarefa){
        var texto = $tarefa.children(".editar-tarefa").val();
        $tarefa.empty();
        $tarefa.append($("<div></div>").addClass("item-check").append($("<input type='checkbox'>")))
                                .append($("<div></div>").addClass("item-texto").text(texto))
                                .append($("<div></div>").addClass("item-delete").append($("<i></i>").addClass("fa").addClass("fa-trash")))
                                .append($("<div></div>").addClass("item-editar").append($("<i></i>").addClass("fa").addClass("fa-edit")));
        $tarefa.toggleClass("item-lista");
        $(".item-delete").click(onTarefaDeleteClick);
        $(".item-editar").click(onTarefaEditClick);
        $(".lista-tarefa").sortable();
    }

    function onTarefaDeleteClick(){
        var texto = "Deletar o item "+$(this).parent(".item-lista").children(".item-texto").text();
        console.log(texto);
        $(this).parent(".item-lista").hide("slow", function(){
            $(this).remove();
        });
    }

    function onTarefaEditClick(){
        if(!$(this).is($lastClicked)){
            if($lastClicked !== undefined){
                console.log("lastClicked undefined");
                salvarEdicaoTarefa($lastClicked);
            }
            $lastClicked = $(this).parent(".item-lista");
            var texto = $lastClicked.children(".item-texto").text();
            console.log("texto em onTarefaEditClik: "+texto);
            
            var inputEditar = "<input type='text' class='editar-tarefa' value='"+texto+"'/>";
            
            $lastClicked.empty();
            $lastClicked.toggleClass("item-lista");
            $lastClicked.html(inputEditar);
            $(".editar-tarefa").focus();
            $(".editar-tarefa").keydown(onTarefaEditKeydown);
        }
    }

    function onTarefaEditKeydown(evento){
        if(evento.which === 13){
            salvarEdicaoTarefa($lastClicked);
            $lastClicked = undefined;
        }
    }
    
    function onTarefaInputKeydown(evento){
        if(evento.which === 13){
            var texto = $(this).val();
            console.log(texto);
            addTarefa(texto,0);
            $(this).val('');
            serverEnviarTarefa();
        }
    }
    
    function onTituloClick() {
        console.log("Vc clicou no título");
    }

    function serverEnviarTarefa() {
        var dados = {
            nome : "Giliard Godoi",
            cidade : "Santo Antonio da Platina"
        };
        var urlServer = "/projetoWeb/tarefa";
        $.post(urlServer, dados)
                .done(function(data){
                    console.log(data);
                }).fail(function(){
                    console.log("Post falhou!!");
                });
    }
    
    function mundarBarraProgresso(xhr) {
        setInteval(function(xhr){
            var i = 0 ;
            if(xhr.readyState === 0){
                $('.progresso').css('width', '10%');
                i = xhr.readyState;
            }else if(xhr.readyState === 25){
                i = xhr.readyState;
            }
        }, 2000);
    }
    
    function progresso(){
        $("#progresso-barra").css("display", "block");
        var val = $("#progresso-barra").progressbar("value") || 0;
        $("#progresso-barra").progressbar("value", val + 15);
        if(val < 100){
            setTimeout(progresso, 80);
        }else{
            val = 0;
            
        }
    };
    
    $("#progresso-barra").progressbar({
        value : false,
        change: function (){
            $("#progresso-label").text($("#progresso-barra").progressbar("value")+"%");
        },
        complete : function(){
            $("#progresso-label").text("Pronto!!");
            setTimeout(function(){
                $("#progresso-barra").css("display", "none");
            }, 900);
            
        }
    });
    
    function serverCarregarTarefa(idlista){
        var urlServer = "/projetoWeb/tarefa";           
        $.ajax({ url : urlServer,
               type : "get",
               dataType: "json",
               data : {
                   'operacao' : "buscar-item",
                   'q' : idlista,
                   'id' : idlista
               },
               beforeSend : function antesEnviar(xhr){
                   console.log("beforeSend: "+xhr.readyState);
               }, 
               success: function(data){
                   $(".lista-tarefa").empty();
                   console.log(data);
                   $.each(data.d, function(i, item){
                       addTarefa(item.texto, item.id);
                   });
               },
               complete : function(xhr){
                   console.log("complete: "+xhr.readyState);
               }
        });
        setTimeout(progresso,10);
    }
    
    function onMenuLateralClick(){
        console.log("Ola");
        $('#menu-lateral').toggleClass('menu-lateral-open');
        $('#container-painel-tarefa').toggleClass('container-tarefa-menu-lateral-open');
    }

    function mostrarJanelaModal() {
        $("#fundo-janela-modal").css('display', 'block');
    }
    
    function esconderJanelaModal() {
        $("#fundo-janela-modal").css('display', 'none');
    }
    
    function mudarLista(texto, id){
        $("#titulo-lista").text(texto);
        $("#lista-id").text(id);
        $("#progresso-barra").progressbar("value",false);
    }
    
    var onKeyupInputBusca = (function(){
      
        var time = 2000;
        var ultimaExecucao = new Date( (new Date()).getTime() - time);
        
        var logica = function(){
            $("#buscar-input").autocomplete({
                source : function(request, response){
                    console.log("autocomplete source ajax sendo executado");
                    $.ajax({
                        url : "/projetoWeb/tarefa",
                        type : "get",
                        dataType : "json",
                        data : {
                            'q' : request.term ,
                            'operacao' : 'lista-lista'
                        }
                    }).done(function(data){
                        console.log(data);
                        response($.each(data.d, function(i, item){
                            return (item);
                        }));
                    }).fail(function(){
                        console.error("Requisição ajax no autocomplete falhou!!");
                    });
                },
                select : function(event, ui){
                    serverCarregarTarefa(ui.item.id);
                    mudarLista(ui.item.value, ui.item.id);
                }
            });
        };
        
        return function(){
            var executar = true;
            if((ultimaExecucao.getTime() + time) <= (new Date()).getTime()){
                console.log("executando: onKeyupInputBuscar");
                ultimaExecucao = new Date();
                logica();
            }
        };
    }());
    
    $(window).click(function(evento){
        var $modal = $("#fundo-janela-modal");
        if($(evento.target).is($modal)){
            esconderJanelaModal();
        }
    });
    $("#buscar-input").keyup(onKeyupInputBusca);
    $(".fechar-modal").click(esconderJanelaModal);
    $('.menu-icon').click(onMenuLateralClick);
    $('.adicionar-tarefa').keydown(onTarefaInputKeydown);
    $(".item-delete").click(onTarefaDeleteClick);
    $(".item-editar").click(onTarefaEditClick);
    $(".lista-tarefa").sortable();
    $("#buscar").click(mostrarJanelaModal);
    $("#titulo-lista").click(onTituloClick);
};

$(document).ready(main);