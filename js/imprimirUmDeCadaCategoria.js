import { adicionarProdutoAoLocalStorage } from "./adicionarProdutoAoLocalStorage.js";

function adicionarProduto(camiseta) {
  adicionarProdutoAoLocalStorage({
    nome: camiseta.nome,
    preco: camiseta.preco,
    descricao: camiseta.descricao,
    imagens: camiseta.imagens
  });
}
function atualizarIconeFavorito(botao, favoritar) {
  const heartFill = botao.querySelector('.botao-favorito use:last-child');

  if (heartFill) {
    if (favoritar) {
      heartFill.classList.add('on');
    } else {
      heartFill.classList.remove('on');
    }
  } else {
    console.error('Classe .heart-fill não encontrada.');
  }
}

// ...rest of your JavaScript code...

function verificarItemNoCarrinho(produto) {
  // Get the sacola from localStorage, or initialize as an empty array if not found
  const sacolaJSON = localStorage.getItem("sacola") || '[]';

  try {
    // Attempt to parse the JSON string into an array
    const sacola = JSON.parse(sacolaJSON);

    // Extract the names of items in sacola
    const nomesDosItensNaSacola = sacola.map(item => item.nome);

    // Check if the produto.nome exists in the array of item names
    return nomesDosItensNaSacola.includes(produto.nome);
  } catch (error) {
    // Handle any parsing errors (though empty JSON input shouldn't normally throw an error)
    console.error('Error parsing sacola JSON:', error);
    return false; // Return false in case of error
  }
}


export function imprimirUmDeCadaCategoria(produtos) {
  const row = document.querySelector("#produtos");

  for (const categoria in produtos.produtos) {
    if (produtos.produtos.hasOwnProperty(categoria)) {
      const produto = produtos.produtos[categoria][0];

      const col = document.createElement("div");
      col.className = "col-12 col-md-6 col-xxl-4 pb-4";
      row.appendChild(col);

      const card = document.createElement("div");
      card.className = "card animated-card"; // Adicione uma classe para controlar a animação
      col.appendChild(card);

      const images = `
        <img class="d-block d-md-none" src="${produto.imagens.mobile}" alt="${produto.nome}">
        <img class="d-none d-md-block d-xl-none" src="${produto.imagens.tablet}" alt="${produto.nome}">
        <img class="d-none d-xl-block" src="${produto.imagens.desktop}" alt="${produto.nome}">
      `;

      const cardBody = `
        <div class="card-body">
          <h5 class="card-title fw-bold">${produto.nome}</h5>
          <p class="card-text">${produto.descricao}</p>
          <p class="fw-bold">${produto.preco}</p>
          <button type="button" class="btn btn-primary botao-lilas rounded-0 border-0" data-bs-toggle="modal" data-bs-target="#modal${categoria}">Ver mais</button>
        </div>
      `;

      const generateCarouselHTML = (images, name) => {
        if (typeof images !== 'object' || Array.isArray(images)) {
          console.error('Expected "images" to be an object, but got:', images);
          return ''; // Return empty string or handle the error as needed
        }

        // Create an array of image URLs based on the keys 'mobile', 'tablet', 'desktop'
        const imageUrls = [images.mobile, images.tablet, images.desktop];

        return `
          <div id="carousel-${name}" class="slideshow-container">
            ${imageUrls.map((imageUrl, index) => `
              <div class="mySlides-${name} fade">
                <img src="${imageUrl}" alt="Slide ${index + 1}" style="width:100%">
                <div class="text">Caption ${index + 1}</div>
              </div>
            `).join('')}
            <a class="prev" id="prev-${name}">&#10094;</a>
            <a class="next" id="next-${name}">&#10095;</a>
          </div>
          <br>
        `;
      };



      // Use it when creating the modal content
      const carrousel = generateCarouselHTML(produto.imagens, produto.nome.replace(/\s+/g, "-"));

      console.log(carrousel)
      card.innerHTML = images + cardBody;

      const modalContent = `
        <div class="modal-content">
          <div class="modal-header">
            <div class="modal-header-icon">
              <img src="assets/check-circle.svg">
              <h1 class="modal-title fs-5" id="modalLabel${categoria}">Confira detalhes sobre o produto</h1>
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            ${carrousel}
            <div>
              <div id="mensagem-carrinho-${produto.nome.replace(/\s+/g, "-")}"></div>
              <h3>${produto.nome}</h3>
              <p class="modal-description">${produto.descricao}</p>

              <hr class="divider-principal">

              <p class="modal-price">${produto.preco}</p>
              <p class="modal-seller">Vendido e entregue por Riachuelo</p>

              <hr class="divider-secondary">
              <p><b>Cores</b></p>
              <form>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                  <label class="form-check-label" for="flexRadioDefault1">
                    Amarelo
                  </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2">
                  <label class="form-check-label" for="flexRadioDefault2">
                    Offwhite
                  </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3">
                  <label class="form-check-label" for="flexRadioDefault3">
                    Preto
                  </label>
                </div>
              </form>

              <hr class="divider-secondary">

              <p><b>Tamanho</b></p>
              <form>
                <label class="radio-container">
                  <input type="radio" name="size" value="P">
                  <span class="checkmark"></span>
                  <span class="radio-label">P</span>
                </label>
                <label class="radio-container">
                  <input type="radio" name="size" value="M">
                  <span class="checkmark"></span>
                  <span class="radio-label">M</span>
                </label>
                <label class="radio-container">
                  <input type="radio" name="size" value="G">
                  <span class="checkmark"></span>
                  <span class="radio-label">G</span>
                </label>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn botao-lilas" id="adicionar-btn-${produto.nome.replace(/\s+/g, "-")}">Adicionar à sacola</button>
<button type="button" id="favoritar-btn-${produto.nome.replace(/\s+/g, "-")}" class="botao-favorito">
    <svg viewBox="0 0 24 24">
        <use xlink:href="#heart" /> 
        <use xlink:href="#heart" /> 
    </svg>

    <svg class="hide" viewBox="0 0 24 24">
        <defs>
            <path id="heart" d="M12 4.435c-1.989-5.399-12-4.597-12 3.568 0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-8.118-10-8.999-12-3.568z" />
        </defs>
    </svg>
</button>



            </div>
            </div>
          </div>
        </div>
      `;
      const modal = `
      <div class="modal fade" id="modal${categoria}" tabindex="-1" aria-labelledby="modalLabel${categoria}" aria-hidden="true">
        <div class="modal-dialog">
          ${modalContent}
        </div>
      </div>
    `;
      document.body.insertAdjacentHTML("beforeend", modal);

      const botao = document.querySelector(`#adicionar-btn-${produto.nome.replace(/\s+/g, "-")}`);
      botao.addEventListener("click", () => adicionarProduto(produto));

      const botaoFavorito = document.querySelector(`#favoritar-btn-${produto.nome.replace(/\s+/g, "-")}`);
      botaoFavorito.addEventListener("click", function () {
        let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
        const index = favoritos.indexOf(produto.nome);
        if (index !== -1) {
          favoritos.splice(index, 1);
        } else {
          favoritos.push(produto.nome);
        }

        localStorage.setItem("favoritos", JSON.stringify(favoritos));
        atualizarIconeFavorito(this, index === -1);
      });

      const mensagemDeAviso = document.querySelector(`#mensagem-carrinho-${produto.nome.replace(/\s+/g, "-")}`);

      if (verificarItemNoCarrinho(produto)) {
        mensagemDeAviso.innerHTML = "<div class='alert alert-warning' role='alert'> Este item já está no seu carrinho! </div>";
      }



    }


  }




  checkCardVisibility();

  // Função para verificar se um elemento está visível na tela
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // Função para verificar se um elemento está dentro da seção dos cards
  function isElementInCardSection(el) {
    const cardSection = document.getElementById('produtos'); // Identificador da seção dos cards
    const rect = el.getBoundingClientRect();
    const cardSectionRect = cardSection.getBoundingClientRect();
    return (
      rect.top >= cardSectionRect.top &&
      rect.bottom <= cardSectionRect.bottom
    );
  }

  // Função para verificar a visibilidade dos cards e mostrar animação de fade-in
  // Função para verificar a visibilidade dos cards e mostrar animação de fade-in
  function checkCardVisibility() {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card) => {
      if (isElementInViewport(card) && isElementInCardSection(card)) {
        card.classList.add('fade-in'); // Adicione uma classe para controlar o efeito de fade-in
      }
    });
  }


  // Verificar visibilidade dos cards ao rolar a página
  window.addEventListener('scroll', checkCardVisibility);



}
