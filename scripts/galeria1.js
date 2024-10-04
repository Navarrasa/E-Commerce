const slider = document.querySelectorAll('.puffle');
const btnPrev = document.getElementById('previous-');
const btnNext = document.getElementById('next-');

let currentSlider = 0;
const itemsPerSlide = 4; // Número de itens a serem exibidos por vez

// Função para esconder todos os slides
function hideSlider(){
  slider.forEach(item => item.classList.remove('on'));
}

// Função para mostrar os slides do índice atual
function showSlider(){
  hideSlider();
  // Mostra os itens da galeria atual
  for (let i = 0; i < itemsPerSlide; i++) {
    const index = currentSlider * itemsPerSlide + i;
    if (index < slider.length) {
      slider[index].classList.add('on');
    }
  }
}

// Função para ir para o próximo slide
function nextSlider(){
  currentSlider++;
  if (currentSlider * itemsPerSlide >= slider.length) {
    currentSlider = 0; // Volta para o início
  }
  showSlider();
}

// Função para ir para o slide anterior
function prevSlider(){
  currentSlider--;
  if (currentSlider < 0) {
    currentSlider = Math.floor(slider.length / itemsPerSlide); // Vai para o último
  }
  showSlider();
}

// Inicializa mostrando o primeiro conjunto de slides
showSlider();

// Adiciona eventos aos botões
btnNext.addEventListener('click', () => nextSlider());
btnPrev.addEventListener('click', () => prevSlider());
