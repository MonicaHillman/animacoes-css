export default function mostrarLoader(duration) {
    const loaderElement = document.getElementById("loader");

    loaderElement.style.display = "block";

    return new Promise((resolve) => {
        setTimeout(() => {
            loaderElement.style.display = "none";
            resolve(); // Resolve the promise to indicate loader is hidden
        }, duration * 1000);
    });
}
