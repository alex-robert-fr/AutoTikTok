var csInterface = new CSInterface();

var filePath = document.querySelector("#fileInput");
filePath.addEventListener("click", getFile);
var openButton = document.querySelector("#open-button");
openButton.addEventListener("click", openDoc);

var nameFile = document.querySelector("#name-file");

function getFile() {
  csInterface.evalScript('getFile()', function(result) {
    nameFile.innerText = result;
  });
}

function openDoc() {
  var csv = document.querySelector("#name-file").innerText.replace(/\\/g, '/');
  var nbVideoTrack = document.querySelector("#nb-video-track").value;
  var nbNewVideoTrack = document.querySelector("#nb-new-video-track").value;
  csInterface.evalScript('display("'+ csv +'", '+ nbVideoTrack +', '+ nbNewVideoTrack +')');
}