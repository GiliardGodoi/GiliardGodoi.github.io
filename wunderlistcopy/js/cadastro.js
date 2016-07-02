$(function(){
	var $inputCEP = $('#rua, #bairro, #cidade, #uf, #ibge');
	var $inputRUA = $('#cep, #bairro, #ibge');
	var validaCEP = /^[0-9]{8}$/;
	
	function limpaFormularioCEP(alerta){
            if(alerta !== undefined){
                alert(alerta);
            }
            $inputCEP.val('');
	}
	
	function setCEP(data){
            console.log(data);
            $('#cep').val(data.cep != undefined ? data.cep : '');
            $('#cidade').val(data.localidade != undefined ? data.localidade : '');
            $('#uf').val(data.uf != undefined ? data.uf : '');
            $('#bairro').val(data.bairro != undefined ? data.bairro : '');
            $('#rua').val(data.logradouro != undefined ? data.logradouro : '');
	}
	
	function getCEP(url){
		$.getJSON(url).done(setCEP).fail(limpaFormularioCEP);
	}
        
        function cadastroCliente(evento){
            
            var xhr = new XMLHttpRequest();
            var nome = $("#nome").val();
            var email = $("#email").val();
            var login = $("#login").val();
            var cep = $("#cep").val();
            var rua = $("#rua").val();
            var bairro = $("#bairro").val();
            var cidade = $("#cidade").val();
            var uf = $("#uf").val();
            var senha = $("#senha").val();
            var confirma = $("#confirma-senha").val();
            
            var parametros = "nome="+nome+"&email="+email+"&login="+login;
        }
	//Digitando RUA/Cidade/UF
	
	//Digitando CEP
	$('#cep').on('blur', function(e){
            var cep = $('#cep').val().replace(/\D/g, '');
            if(cep !== '' && validaCEP.test(cep)){
                    $inputCEP.val('...');
                    getCEP('https://viacep.com.br/ws/' + cep + '/json/');
            }else{
                    limpaFormularioCEP(cep === '' ? undefined : 'Formato CEP inválido!!');
            }
	});
        
        $('#btncadastrar').click(cadastroCliente);

});

