
import { carregarItensDaSacola } from "./js/carregarItensDaSacola.js";
import { imprimirCamisetas } from "./js/imprimirCamisetas.js";
import { imprimirUmDeCadaCategoria } from "./js/imprimirUmDeCadaCategoria.js";


// Chama a função para carregar os itens da sacola ao carregar a página



// Função para verificar se a página atual é /camisetas.html
function isPaginaCamisetas() {
  return window.location.pathname.includes("/camisetas.html");
}

function isPaginaSacola() {
  return window.location.pathname.includes("/sacola.html");
}

if (isPaginaSacola()) {
  carregarItensDaSacola();
}

// Função para imprimir somente as camisetas
function separarCamisetas(produtos) {
  const camisetas = produtos.produtos.camisetas;

  // Verifica se a página atual é /camisetas.html
  if (isPaginaCamisetas()) {
    imprimirCamisetas(camisetas);
  }
}

const produtosHTML = document.getElementById("produtos");

function carregarProdutos(localizacao) {
  while (produtosHTML.firstChild) {
    produtosHTML.removeChild(produtosHTML.firstChild);
  }

  let url = "./json/produtos.json";
  if (localizacao === "EUA") {
    url = "./json/products.json"
  }

  fetch(url)
    .then((response) => response.json())
    .then((produtosJSON) => {
      if (isPaginaCamisetas()) {
        separarCamisetas(produtosJSON);
      } else imprimirUmDeCadaCategoria(produtosJSON);
    })
    .catch((error) => console.error("Erro ao carregar o arquivo JSON:", error));
}

const localizacao = document.querySelector("#localizacao");
localizacao.addEventListener("change", function () {
  carregarProdutos(this.value);
})

carregarProdutos(localizacao.value);

const sacola = JSON.parse(localStorage.getItem("sacola"));
const quantidadeDeItensNaSacola = sacola ? sacola.length : 0;

const carrinhoIcone = document.querySelector(".bi-cart2");
const numeroDeItens = document.createElement("span");
numeroDeItens.id = "carrinho-numero";
numeroDeItens.textContent = quantidadeDeItensNaSacola;

carrinhoIcone.appendChild(numeroDeItens);

const inputPesquisa = document.querySelector("#input-pesquisa");
const divSugestoes = document.querySelector("#sugestoes-pesquisa");

inputPesquisa.addEventListener("input", () => {
  const termoPesquisa = inputPesquisa.value.trim();

  if (termoPesquisa) {
    const sugestoes = ["Camiseta", "Calça", "Sapato"];

    const sugestoesHTML = sugestoes
      .filter(sugestao => sugestao.toLowerCase().includes(termoPesquisa.toLowerCase()))
      .map(sugestao => `<div class="sugestao">${sugestao}</div>`)
      .join("");

    divSugestoes.innerHTML = sugestoesHTML;
  } else {
    divSugestoes.innerHTML = ""
  }
})


const navbarToggler = document.querySelector('.navbar-toggler');
function toggleNavbarIconBackground() {
  const icon = navbarToggler.querySelector('.navbar-toggler-icon');

  icon.classList.toggle('toggling'); // Add/remove toggling class

  if (navbarToggler.getAttribute('aria-expanded') === 'true') {
    icon.style.backgroundImage = 'url("./assets/close.svg")';
  } else {
    icon.style.backgroundImage = 'var(--bs-navbar-toggler-icon-bg)';
  }
}

// Call the function on document load
window.addEventListener('DOMContentLoaded', toggleNavbarIconBackground);

// Optionally, call the function whenever the aria-expanded attribute changes
navbarToggler.addEventListener('click', toggleNavbarIconBackground);

