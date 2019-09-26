const contadorElement = document.querySelector('.contador');
const overlay = document.getElementById("overlay");
let contador = 0
let wikipedia = null;
let links = null;
let novoLink = null;
let gameOn = false;

// window.onload = function() {
//     //element.parentNode.removeChild(overlay);
//     overlay.classList.add('invisible');
// };

const atualiza_page = () => {
    wikipedia = document.querySelector('#wikipedia');
    links = wikipedia.querySelectorAll('a');
    novoLink = null;
    links.forEach((link) => {
        if (link.hasAttribute('href') && link.getAttribute('href')[0] === '#') {
            // se for um link referencial nao coloca o event listener
            return;
        }
        link.addEventListener('click', (e) => {
            e.preventDefault();

            if(!gameOn) comeca_jogo();

            // Incremeta o contador e carrega nova pagina
            contador++;
            contadorElement.innerHTML = contador;
            const xhttp = new XMLHttpRequest();
            novoLink = link.getAttribute('href').replace('https://pt.wikipedia.org/', '/');
            xhttp.onreadystatechange = function() {
                if(this.readyState == 4){
                    overlay.classList.add('invisible');
                    r = JSON.parse(this.responseText);
                    wikipedia.innerHTML = r.text;
                    atualiza_page();
                    if(r.atingiu_destino === 1) acaba_jogo();
                }else{
                    overlay.classList.remove('invisible');    
                }
            }
            xhttp.open('GET', novoLink);
            xhttp.send();

        });
    });
    window.scrollTo(0, 0);
}

const comeca_jogo = (random) => {
    if(gameOn) return;
    popupHide()
    atualiza_UI();
    gameOn = true;

    let pagina_inicio = document.getElementById('pagina_inicio');
    let pagina_destino = document.getElementById('pagina_destino');

    if (random){
        pagina_inicio.value = '';
        pagina_destino.value = '';
    }

    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4){
            overlay.classList.add('invisible');
            // Ao carregar substitui o div wikipedia
            r = JSON.parse(this.responseText);
            wikipedia.innerHTML = r.text;
            document.getElementById('pagina_destino').value = r.destino;
            document.getElementById('destino').href = r.destino;
            document.getElementById('destino').innerHTML = r.destino;
            document.getElementById('pagina_inicio').value = r.inicio;
            document.getElementsByTagName('body')[0].style.backgroundColor = '#ffffff';
            atualiza_page();
        }else{
            overlay.classList.remove('invisible');    
        }
    }
    xhttp.open('POST', '/start');
    form_data = new FormData();
    form_data.append("page_start", pagina_inicio.value);
    form_data.append("page_end", pagina_destino.value);
    xhttp.send(form_data);
}

const acaba_jogo = () => {
    if(contador <= 7){
        popupShow("PARABÉNS! <br><br> Você venceu com apenas "+ contador +" cliques!<br><input class='big spacing' type='submit' value='Ver a página' onClick='popupHide()'><input class='big spacing' type='submit' value='Jogar Novamente' onClick='location.reload()'>");
    } else {
        popupShow("Quase! <br><br> Você chegou com "+ contador +" cliques.<br> Mas tente de novo: " + get_proverb() + " <br><input class='big spacing' type='submit' value='Ver a página' onClick='popupHide()'><input class='big spacing' type='submit' value='Jogar Novamente' onClick='location.reload()'>");
    }
}

const popupShow = (message) => {
    let popup = document.getElementById("popup");
    popup.style['display'] = 'block'; 

    let tex = document.getElementById("message");
    tex.innerHTML = message;
}

const popupHide = (message) => {
    let popup = document.getElementById("popup");
    popup.style['display'] = 'none'; 
}

const atualiza_UI = () => {
    if(!gameOn){
        let menu = document.getElementById("initial_menu");
        menu.style['display'] = 'none';

        let contador_container = document.getElementById("contador_container");
        contador_container.style['display'] = 'block';

        let header = document.querySelector('.header');
        header.classList.add('inGame');

        wikipedia = document.getElementById('wikipedia');
        wikipedia.classList.add('inGame');

        contadorElement.innerHTML = contador;

        let pagina_destino = document.getElementById('pagina_destino');
        let destino = document.getElementById('destino');
        destino.innerHTML = pagina_destino.value;
    }
}

const pegar_aleatorio = (id) => {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        let target = document.getElementById(id);
        // Pega o link da pagina e trata pra pegar so o nome
        pagina = JSON.parse(this.responseText).url
        // .replace('https://pt.wikipedia.org/wiki/', '')
        // .replace('_', ' ');
        target.value = pagina;
    }
    xhttp.open('GET', '/random');
    xhttp.send();
}

popupShow("Mudar o mundo, nem que seja em pouco mais de sete cliques.<br><input class='big spacing' type='submit' value='Me Surpreenda!' onClick='comeca_jogo(true)'>");
