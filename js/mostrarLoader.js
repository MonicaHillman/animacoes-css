export default function mostrarLoader(duration) {
    const loaderElement = document.getElementById("loader"); // Assuming you have an element with ID "loader"

    // Display the loader
    loaderElement.style.display = "block";

    // Wait for the specified duration
    setTimeout(() => {
        // Hide the loader after the delay
        loaderElement.style.display = "none";
    }, duration * 1000);
}