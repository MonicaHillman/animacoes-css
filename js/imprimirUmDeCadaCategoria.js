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
  if (favoritar) {
    botao.innerHTML = "<i class='bi bi-heart-fill icon-preto'></i>";
  } else {
    botao.innerHTML = "<i class='bi bi-heart icon-preto'></i>";
  }
}

function verificarItemNoCarrinho(produto) {
  const sacola = JSON.parse(localStorage.getItem("sacola") || []);

  const nomesDosItensNaSacola = sacola.map(item => item.nome);

  return nomesDosItensNaSacola.includes(produto.nome)
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
            <img class="modal-imagem" src="${produto.imagens.desktop}" alt="${produto.nome}">
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
            <button type="button" class="botao-favorito" id="favoritar-btn-${produto.nome.replace(/\s+/g, "-")}"><i class="bi bi-heart icon-preto"></i></button>
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