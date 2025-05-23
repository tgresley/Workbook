// Open browser window
function openPopup(event) {
    event.preventDefault(); 
    const width = 300;
    const height = 150;
    const left = 1200; 
    const top = 400; 
    
    window.open(
        "https://handbook.unimelb.edu.au/2023/subjects/gdes30008", 
        "_blank",
        `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
    );
}

// Utility function to show an element
function showImage(id) {
    const image = document.getElementById(id);
    image.style.display = "block";
}

// Click listeners to **show only**
document.getElementById("box row18").addEventListener("click", function() {
    showImage("workbookpng");
});

document.getElementById("box row13").addEventListener("click", function() {
    showImage("dpgraphgif");
});

document.getElementById("box row16").addEventListener("click", function() {
    showImage("plane");
});

document.getElementById("box row19").addEventListener("click", function() {
    showImage("spiral");
});

document.getElementById("box row17").addEventListener("click", function() {
    showImage("facewindow");
});

document.getElementById("box row11").addEventListener("click", function() {
    showImage("handbookwindow");
});

// Separate close button example
const closeButton = document.querySelector(".close-button");
const faceContainer = document.getElementById("facewindow");
if (closeButton && faceContainer) {
    closeButton.addEventListener("click", function() {
        faceContainer.style.display = "none";
    });
}

// Sound buttons
clickableHonk.addEventListener("click", function() {
    console.log("Honk clicked");
    audioHonk.play();
});

clickableBubbles.addEventListener("click", function() {
    console.log("Bubbles clicked");
    audioBubbles.play();
});

clickableLaugh.addEventListener("click", function() {
    console.log("Laugh clicked");
    audioLaugh.play();
});
