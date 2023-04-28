// Check if the API FILE works
if (window.File && window.FileReader && window.FileList) {
    console.log("Las APIs son soportadas");
}
else {
    alert("La API de FILE no es soportada en este navegador");
}

// Listener of files
function start() {
    player = document.getElementById("player");
    files = document.getElementById("files");    
    files.addEventListener("change", verify, false);
}

// Verify the files
function verify(e) {
    const files = document.getElementById("files");
    let filePath = files.value;
    let allowedExtension = /(\.mp4)$/i;
    let error = document.getElementById("message");
    let animation = document.createElement("div");
    let load = document.getElementById("load");
    
    // Check if the file is .mp4
    if(!allowedExtension.exec(filePath)) {
        alert("Tipo de archivo inválido. Suba un mp4");
        files.value = '';
        error.innerHTML = "Extensión de archivo no válido. Intente un archivo .mp4";
        player.setAttribute("style", "display:none")
        return false;
    }

    // Animation loading the video
    else {
        error.innerHTML = "";
        alert("Cargando...")
        load.appendChild(animation);
        animation.classList.add("loading");
        // Timeout for the loading -> after loading, the video appear
        setTimeout(function() {
            animation.setAttribute("style", "display:none");
            player.setAttribute("style", "display:flex")
        }, 5000);
    }
    
    // Read the video - just the first video
    let eFiles = e.target.files;
    let myFile = eFiles[0];
    let reader = new FileReader();
    reader.readAsArrayBuffer(myFile);
    reader.addEventListener("load", show, false);
}

// Creating the url 
function show(e) {
    let result = e.target.result;
    // Buffer to a blob
    let videoBlob = new Blob([new Uint8Array(result)], { type: 'video/mp4' });
    // Blob give a URL to the video file
    let url = window.URL.createObjectURL(videoBlob);
    // Create a source inside the video
    source = document.createElement("source");
    video.appendChild(source);
    source.src = url;
}

// Listener
window.addEventListener("load", start, false);