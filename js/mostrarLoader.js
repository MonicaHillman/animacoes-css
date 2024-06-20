export default function mostrarLoader(duration) {
    const loaderElement = document.getElementById("loader");

    if (!loaderElement) {
        console.error('Loader element not found.');
        return Promise.reject('Loader element not found.');
    }

    loaderElement.style.display = "block";

    return new Promise((resolve) => {
        setTimeout(() => {
            loaderElement.style.display = "none";
            resolve();
        }, duration * 1000);
    });
}
