import { carregarItensDaSacola } from "./carregarItensDaSacola.js";

function isPaginaSacola() {
    return window.location.pathname.includes("/sacola.html");
}

if (isPaginaSacola()) {
    carregarItensDaSacola();
}