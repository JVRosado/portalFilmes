
const imageUrl="https://www.themoviedb.org/t/p/w600_and_h900_bestv2"

$(document).ready(function(){

    $(".SliderFilmes").slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        prevArrow: '<button class="slide-arrow prev-arrow"></button>',
        nextArrow: '<button class="slide-arrow next-arrow"></button>',
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: true,
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
              }
            },

            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
          ]
        });
        const resposta = getDados("popular");
        resposta.then((json)=>{
            setCarouselSuperior(json);
            setCarrouselInferior(json);
        })
        $("#btn-search").click(function(){
            let busca =$("#search").val()
            console.log(busca);
            document.location.href="./categorias/navegacao.html?nomeFilme="+busca;
            return false; 
        })
})
// Carrousel superior
function setCarouselSuperior(dados){
    $('#titulo1').html(dados.results[0].title);
    $('#img1').attr("src", imageUrl+dados.results[0].poster_path);
    $('#sinopse1').html(dados.results[0].overview);
    $('#titulo2').html(dados.results[1].title);
    $('#img2').attr("src", imageUrl+dados.results[1].poster_path);
    $('#sinopse2').html(dados.results[1].overview);
    $('#titulo3').html(dados.results[2].title);
    $('#img3').attr("src", imageUrl+dados.results[2].poster_path);
    $('#sinopse3').html(dados.results[2].overview);
    $('#botao1').attr("href","https://www.themoviedb.org/movie/"+dados.results[0].id);
    $('#botao2').attr("href","https://www.themoviedb.org/movie/"+dados.results[1].id);
    $('#botao3').attr("href","https://www.themoviedb.org/movie/"+dados.results[2].id);
    console.log(dados)

}

function setCarrouselInferior(dados){
    let conteudo="";
    for(let i = 3; i < dados.results.length; i++){
        $('.SliderFilmes').slick('slickAdd', 
        `<div class="container">
            <img src="`+imageUrl+dados.results[i].poster_path+`" alt="Avatar `+(i+1).toString()+`" class="image">
            <div class="overlay">
                <div class="text" >`+dados.results[i].overview+`</div>
                
            </div>
        </div>`
        );
    }

}




async function getDados(parametroBusca){
    const url ="https://api.themoviedb.org/3/movie/";
    const opcoes = "?api_key=ebf2faa6e1c2e6783650ee8bcdbb293a&language=pt-BR";
    return await fetch(url + parametroBusca + opcoes, {
        method: "GET", 
        mode: "cors"
    }).then(response =>{
        return response.json();
    })

}

//ebf2faa6e1c2e6783650ee8bcdbb293a

//eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYmYyZmFhNmUxYzJlNjc4MzY1MGVlOGJjZGJiMjkzYSIsInN1YiI6IjYwYmZhODk4YmNmOGM5MDA3YmM4MGUwZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hLsymM9d44ng6tpgEek8pTh4-LV70gxzZwYiHMBGV8s
//https://www.themoviedb.org/movie/813258