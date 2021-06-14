const imageUrl="https://www.themoviedb.org/t/p/w600_and_h900_bestv2"
$(document).ready(function(){
    const parametroBusca= new URLSearchParams(window.location.search) ;

    if(parametroBusca.get("nomeFilme")==""){
        $('#gridFilmes').html('<div style="width:100%" ><h1 id="AlertDiv">Nada encontrado</h1></div>')
    }
    const resposta = getDados("&query="+parametroBusca.get("nomeFilme"));
    resposta.then((json)=>{
        setGrid(json);

    })
    $("#btn-search").click(function(){
        let busca =$("#search").val()
        document.location.href="./navegacao.html?nomeFilme="+busca;
        return false; 
    })
    
})

async function getDados(dadosBusca){


    const url ="https://api.themoviedb.org/3/search/movie";
    const opcoes = "?api_key=ebf2faa6e1c2e6783650ee8bcdbb293a&language=pt-BR";
    return await fetch(url + opcoes+dadosBusca, {
        method: "GET", 
        mode: "cors"
    }).then(response =>{
        return response.json();
    })

}




async function setGrid(dados){
    let conteudo="";
    let imagem = "";
    for(let i = 0; i < dados.results.length; i++){
        if(i % 4 == 0){
            conteudo+= `<div class = "w-100"></div>`
        }

        await $.get(imageUrl+dados.results[i].poster_path)
        .done(function() { 
            imagem = imageUrl+dados.results[i].poster_path;
        }).fail(function() { 
            imagem = "../imagens/image-not-found.jpg";
        }).catch(function(){
            imagem = "../imagens/image-not-found.jpg";
        })

        
        conteudo+=

        `<div class="col-sm" >
            <div class="card" >
                <img class="card-img-top" src="`+imagem+`" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">`+dados.results[i].title+`</h5>
                    <p class="card-text">`+dados.results[i].overview+`</p>
                
                    
                </div>
            </div>
        </div>`
        
    }

    $('#gridFilmes').html(conteudo)

}
