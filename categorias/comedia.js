const imageUrl="https://www.themoviedb.org/t/p/w600_and_h900_bestv2"
$(document).ready(function(){

    const resposta = getDados();
    resposta.then((json)=>{
        console.log(json);
        setGrid(json);

    })
    $("#btn-search").click(function(){
        let busca =$("#search").val()
        console.log(busca);
        document.location.href="./navegacao.html?nomeFilme="+busca;
        return false; 
    })

    
})

async function getDados(){
    const generos= "&with_genres=35&page=1"
    const url ="https://api.themoviedb.org/3/discover/movie";
    const opcoes = "?api_key=ebf2faa6e1c2e6783650ee8bcdbb293a&language=pt-BR";
    return await fetch(url + opcoes+generos, {
        method: "GET", 
        mode: "cors"
    }).then(response =>{
        return response.json();
    })

}
function setGrid(dados){
    let conteudo="";
    for(let i = 0; i < dados.results.length; i++){
        if(i % 4 == 0){
            conteudo+= `<div class = "w-100"></div>`
        }
        conteudo+=

        `<div class="col-sm" style="padding-bottom: 10px" >
            <div class="card" >
                <img class="card-img-top" src="`+imageUrl+dados.results[i].poster_path+`" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">`+dados.results[i].title+`</h5>
                    <p class="card-text">`+dados.results[i].overview+`</p>
                
                    
                </div>
            </div>
        </div>`
        
    }

    $('#gridFilmes').html(conteudo)

}


/*
genres: Array(19)
0: {id: 28, name: "Ação"}
1: {id: 12, name: "Aventura"}
2: {id: 16, name: "Animação"}
3: {id: 35, name: "Comédia"}
4: {id: 80, name: "Crime"}
5: {id: 99, name: "Documentário"}
6: {id: 18, name: "Drama"}
7: {id: 10751, name: "Família"}
8: {id: 14, name: "Fantasia"}
9: {id: 36, name: "História"}
10: {id: 27, name: "Terror"}
11: {id: 10402, name: "Música"}
12: {id: 9648, name: "Mistério"}
13: {id: 10749, name: "Romance"}
14: {id: 878, name: "Ficção científica"}
15: {id: 10770, name: "Cinema TV"}
16: {id: 53, name: "Thriller"}
17: {id: 10752, name: "Guerra"}
18: {id: 37, name: "Faroeste"}
length: 19
__proto__: Array(0)
__proto__: Object
*/
