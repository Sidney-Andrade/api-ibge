$.ajax({
    type: "GET",
    dataType: "json",
    url: "https://servicodados.ibge.gov.br/api/v1/localidades/estados",
    success: function (data) {
        let option = "<option default>Selecione um estado</option>";
        $.each(data,function(i,value){
            //console.log(i +  " " + value.nome)
            option += "<option id="+value.id+" value="+value.sigla+">"+ value.nome +"</option>";
        })
        $("#endereco").find("#estado").append(option);
        
    },
    error: function () {
      $("form .erro").text("Ops! algo deu errado ao carregar os dados do estado")
    },
    beforeSend: function () {
        
    }
})

function mudancaCidade(){
    $("#endereco").find("#endereco-cidade").show();
    const id = $("#estado").find(":selected").attr("id");
    
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "https://servicodados.ibge.gov.br/api/v1/localidades/estados/"+id+"/distritos",
        success: function (data) {
          let option = "";
          $.each(data,function(i, value){
            option += `<option id="${value.id}" value="${value.nome}">${value.nome}</option>`
          })
          $("#endereco").find("#cidade").append(option);
        },
        error: function (data) {
            $("form .erro").text("Ops! algo deu errado ao carregar os dados da cidade")
        },
        beforeSend: function () {
          $("#endereco").find("#cidade option").remove();
          //$("#resultado").show();
        }
    })

}
function fechar(){
    $("#resultado").hide();
}

function escolher(){
    $("body").find("#resultado").show();
    $("#resultado").find(".estado-atual").text($("#estado").find(":selected").text());
    $("#resultado").find(".cidade-atual").text($("#cidade").find(":selected").text())
    
}