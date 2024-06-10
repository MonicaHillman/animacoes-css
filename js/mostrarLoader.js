export default function mostrarLoader(duration) {
    const loaderElement = document.getElementById("loader"); // Assuming you have an element with ID "loader"

    // Display the loader
    loaderElement.style.display = "block";

    // Return a promise that resolves after the specified duration
    return new Promise((resolve) => {
        // Wait for the specified duration
        setTimeout(() => {
            // Hide the loader after the delay
            loaderElement.style.display = "none";
            resolve(); // Resolve the promise to indicate that the loader is hidden
        }, duration * 1000);
    });
}
