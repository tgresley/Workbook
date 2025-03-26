//Openbrowserwindow
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

//popupimages/windows/gifs
    document.getElementById("box row18").addEventListener("click", function() {
        var image = document.getElementById("workbookpng");
        if (image.style.display === "none") {
            image.style.display = "block"; 
        } else {
            image.style.display = "none"; 
        }
    });

    document.getElementById("box row13").addEventListener("click", function() {
        var image = document.getElementById("dpgraphgif");
        if (image.style.display === "none") {
            image.style.display = "block"; 
        } else {
            image.style.display = "none"; 
        }
    });

    document.getElementById("box row16").addEventListener("click", function() {
        var image = document.getElementById("plane");
        if (image.style.display === "none") {
            image.style.display = "block"; 
        } else {
            image.style.display = "none"; 
        }
    });

    document.getElementById("box row19").addEventListener("click", function() {
        var image = document.getElementById("spiral");
        if (image.style.display === "none") {
            image.style.display = "block"; 
        } else {
            image.style.display = "none"; 
        }
    });


    document.getElementById("box row17").addEventListener("click", function() {
        var image = document.getElementById("facewindow");
        if (image.style.display === "none") {
            image.style.display = "block"; 
        } else {
            image.style.display = "none"; 
        }
    });


    document.getElementById("box row11").addEventListener("click", function() {
        var image = document.getElementById("handbookwindow");
        if (image.style.display === "none") {
            image.style.display = "block"; 
        } else {
            image.style.display = "none"; 
        }
    });

    //Closingwindow
    const closeButton = document.querySelector(".close-button");
    const faceContainer = document.getElementById("facewindow");
    closeButton.addEventListener("click", function() {
        faceContainer.style.display = "none";
    });
    

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


