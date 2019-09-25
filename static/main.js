const contadorElement = document.querySelector('.contador');
let contador = 0
let wikipedia = null;
let links = null;
let novoLink = null;

const atualiza_page = () => {
    wikipedia = document.querySelector('#wikipedia');
    links = wikipedia.querySelectorAll('a');
    novoLink = null;
    links.forEach((link) => {
        if (link.hasAttribute('href') && link.getAttribute('href')[0] === '#') {
            // se for um link referencial nao coloca o event listener
            continue
        }
        link.addEventListener('click', (e) => {
            e.preventDefault();
            // Incremeta o contador e carrega nova pagina
            contador++;
            contadorElement.innerHTML = contador;
            const xhttp = new XMLHttpRequest();
            novoLink = link.getAttribute('href').replace('https://pt.wikipedia.org/', '/');
            xhttp.onreadystatechange = function() {
                // Ao carregar substitui o div wikipedia
                wikipedia.innerHTML = this.responseText;
                atualiza_page();
            }
            xhttp.open('GET', novoLink);
            xhttp.send();
            console.log(novoLink);
            console.log(link)
        });
    });
}

atualiza_page();