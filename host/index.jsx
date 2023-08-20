function mogrtImport(start, end, clip, textValue) {
    var project = app.project;
    var sequence = project.activeSequence;
    var mogrtClip = sequence.importMGTFromLibrary("Votre bibliothèque", "Simple Subtitle", start, 6, 0);
    if (mogrtClip) {
        mogrtClip.start = start;
        mogrtClip.end = end;
        var mogrtComponent = mogrtClip.getMGTComponent();
        for (var i = 0; i < mogrtComponent.properties.numItems; i++) {
            if (mogrtComponent.properties[i].displayName == "Text") {
                mogrtComponent.properties[i].setValue(textValue);
            }
        }
    }
}

function parseCSVLine(line) {
    var insideQuote = false;
    var columns = [];
    var currentColumn = "";

    for (var j = 0; j < line.length; j++) {
        var currentChar = line[j];
        if (currentChar === '"') {
            insideQuote = !insideQuote;
            continue;
        } else if (currentChar === ',' && !insideQuote) {
            columns.push(currentColumn);
            currentColumn = "";
        } else {
            currentColumn += currentChar;
        }
    }
    if (currentColumn) {
        columns.push(currentColumn);
    }
    return columns;
}



function display() {
    var project = app.project;
    var sequence = project.activeSequence;

    var file = File("D:/BOULOT/TikTok/mogrt/TikTok31.csv");
    if (file.open("r")) {
        var content = file.read();
        file.close();
    } else {
        alert("Erreur lors de l'ouverture du fichier.");
    }

    var rows = content.split("\n");
    var texts = []; // Pour stocker les textes des sous-titres

    for (var i = 1; i < rows.length; i++) {
        var columns = parseCSVLine(rows[i]);
        if (columns && columns.length > 2) {
            texts.push(columns[2].replace(/"/g, '')); // Stockez le texte du sous-titre
        }
    }

    var videoTrack6 = sequence.videoTracks[5];

    for (var j = 0; j < videoTrack6.clips.numItems && j < texts.length; j++) {
        var textStart = videoTrack6.clips[j].start.ticks;
        var textEnd = videoTrack6.clips[j].end.ticks;
        mogrtImport(textStart, textEnd, videoTrack6.clips[j], texts[j]);
    }  
}