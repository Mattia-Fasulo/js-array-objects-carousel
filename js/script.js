"use strict";
/*

Consegna:
Dato un array di oggetti letterali con:
 - url dell’immagine
 - titolo
 - descrizione
Creare un carosello come nella foto allegata.
Milestone 0:
Come sempre focalizziamoci prima sulla creazione del markup statico: costruiamo il container e inseriamo l'immagine grande in modo da poter stilare lo slider.
Milestone 1:
Ora rimuoviamo i contenuti statici e usiamo l’array di oggetti letterali per popolare dinamicamente il carosello.
Al click dell'utente sulle frecce verso sinistra o destra, l'immagine attiva diventerà visibile e dovremo aggiungervi titolo e testo.
Milestone 2:
Aggiungere il **ciclo infinito** del carosello. Ovvero se la miniatura attiva è la prima e l'utente clicca la freccia verso destra, la miniatura che deve attivarsi sarà l'ultima e viceversa per l'ultima miniatura se l'utente clicca la freccia verso sinistra.
BONUS 1:
Aggiungere le thumbnails (sottoforma di miniatura) ed al click attivare l’immagine corrispondente.
BONUS 2:
Aggiungere funzionalità di autoplay: dopo un certo periodo di tempo (3 secondi) l’immagine attiva dovrà cambiare alla successiva.
BONUS 3:
Aggiungere bottoni di start/stop e di inversione del meccanismo di autoplay.


*/

const images = [
    {
        url: 'http://www.viaggiareonline.it/wp-content/uploads/2014/11/sweden_148857365.jpg',
        title: 'Svezia',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid  deleniti aut veniam.'
    },

    {
        url: 'https://static1.evcdn.net/images/reduction/1513757_w-1920_h-1080_q-70_m-crop.jpg',
        title: 'Perù',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam.'
    },

    {
        url: 'https://img.itinari.com/pages/images/original/0d3ed180-d22d-48e8-84df-19c4d888b41f-62-crop.jpg?ch=DPR&dpr=2.625&w=1600&s=7ebd4b5a9e045f41b4e0c7c75d298d6c',
        title: 'Chile',
        description: 'Lorem ipsum, dolor sit amet consectetur       adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam.'
    },
    {
        url: 'https://static1.evcdn.net/images/reduction/1583177_w-1920_h-1080_q-70_m-crop.jpg',
        title: 'Argentina',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam.'
    },
    {
        url: 'https://cdn.sanity.io/images/24oxpx4s/prod/ed09eff0362396772ad50ec3bfb728d332eb1c30-3200x2125.jpg?w=1600&h=1063&fit=crop',
        title: 'Colombia',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam.'
    },
];

const sliderContainerHTML = document.getElementById('slider');
const row = document.querySelector('.row');
const btnPrev = document.querySelector(".carousel-control-prev")
const btnNext = document.querySelector(".carousel-control-next")

let activeindex = 0;

//funzione che genera il carosello
function drawCarousel() {


    const slider = document.createElement('div');
    slider.className = 'carousel-inner';

    images.forEach((value, index) => {

        //genero le slide
        const slide = document.createElement('div');
        slide.className = (index === 0) ? 'carousel-item active' : 'carousel-item';
        slide.innerHTML = `
    <img src="${value.url}" class="d-block w-100" alt="${value.title}">
    <div class="carousel-caption d-none d-md-block">
        <h5>${value.title}</h5>
        <p>${value.description}</p>
    </div>
    `
        slider.append(slide);

        //genero le thubnails
        const cols = document.createElement('div');
        cols.classList = (index == 0) ? ('col') : ('col','opacity');
        cols.innerHTML = `
        <img src="${value.url}" alt="${value.title}">
        `
        row.appendChild(cols);       
    })

    sliderContainerHTML.insertBefore(slider, btnPrev)
}

drawCarousel();

//genero un array con tutti div dello slider
const bigSlides = Array.from(document.querySelectorAll('.carousel-item'));

//generoi un array con tutte le col presenti nella row
const thubnails = Array.from(row.children);

// console.log(bigSlides);
// console.log(thubnails);

//funzione che gestisce il funzionamento del carosello
function playCarousel(right) {
    
    bigSlides[activeindex].classList.toggle('active');
    thubnails[activeindex].classList.toggle('opacity');
  
    if (right) {
        activeindex = (activeindex == bigSlides.length - 1) ? 0 : (activeindex + 1)
    }
    else {
        activeindex = (activeindex == 0) ? bigSlides.length - 1 : (activeindex - 1)
            ;
    }

    bigSlides[activeindex].classList.toggle('active')
    thubnails[activeindex].classList.toggle('opacity');
}

btnNext.addEventListener('click', () => {
    playCarousel(true);
})

btnPrev.addEventListener('click', () => {
    playCarousel(false);
})

const autoSlide = setInterval(function () {
    btnNext.click();
}, 3000)
