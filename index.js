
let search = document.getElementById('search');
let word;
let audioElement = new Audio();

search.addEventListener('click', fetchData);

function setData(wordObj) {

    let definition = "";
    let synonyms = "";
    let antonyms = "";
    let examples = "";
    let pronunciationUrl = "";
    let pronunciationText = "";

    document.getElementById('results3').innerHTML = `<li id="results3li"></li>`;
    document.getElementById('results4').innerHTML = `<li id="results4li"></li>`;

    wordObj.forEach(function (element) {

        element['meanings'].forEach(function (element2) {

            element2['definitions'].forEach(function (element3) {

                definition += `<li>${element3['definition']}</li>`;

                if (element3.example != undefined)
                    examples += `<li>${element3.example}</li>`;

                if(element3.synonyms != undefined) {
                element3.synonyms.forEach(function (synonym) {

                    if (synonym != undefined) {
                        synonyms += `${synonym}, `;
                    }

                });
            }

            if(element3.antonyms != undefined) {
                element3.antonyms.forEach(function (antonym) {

                    if (antonym != undefined) {
                        antonyms += `${antonym}, `;
                    }

                });

            }

            });

        });

    });
    
    wordObj.forEach(function(element){

        element.phonetics.forEach(element2=>{

            if(element2.text != undefined && pronunciationText.length<=1 ) {

                pronunciationText = element2.text;
            }

            if(element2.audio != undefined && pronunciationUrl.length<=1 ) {

                pronunciationUrl = element2.audio;
            }
        });
    });

    synonyms = synonyms.substring(0, synonyms.length - 2);
    synonyms += `.`;
    antonyms = antonyms.substring(0, antonyms.length - 2);
    antonyms += `.`;

    if (synonyms.length <= 1) {
        document.getElementById('Heading3').innerHTML = `Sorry we are unable to find any synonym for ${word}`;
        document.getElementById('results3').innerHTML = "";
    }
    else {
        document.getElementById('Heading3').innerHTML = `Synonyms of ${word}`;
        document.getElementById('results3li').innerHTML = "";
        document.getElementById('results3li').innerHTML = synonyms;
    }

    if (antonyms.length <= 1) {
        document.getElementById('Heading4').innerHTML = `Sorry we are unable to find any antonym for ${word}`;
        document.getElementById('results4').innerHTML = "";
    }
    else {
        document.getElementById('Heading4').innerHTML = `Antonyms of ${word}`;
        document.getElementById('results4li').innerHTML = "";
        document.getElementById('results4li').innerHTML = antonyms;
    }

    if (examples.length === 0) {
        document.getElementById('Heading5').innerHTML = `Sorry we are unable to find any example for ${word}`;
        document.getElementById('results5').innerHTML = "";
    }
    else {
        document.getElementById('Heading5').innerHTML = `Examples of ${word}`;
        document.getElementById('results5').innerHTML = "";
        document.getElementById('results5').innerHTML = examples;
    }

    let heading = document.getElementById('Heading');
    heading.innerHTML = "";
    heading.innerHTML = `Possible Definitions for ${word}`;

    let list = document.getElementById('results');
    list.innerHTML = "";
    list.innerHTML += definition;

    document.getElementById('Heading6').innerHTML = `Pronunciation for ${word}`;
    document.getElementById('pronunciationText').innerHTML = pronunciationText;

    audioElement.src = pronunciationUrl;
    audioElement.pause();

    if(pronunciationText.length<1) {

        document.getElementById('pronunciationText').innerHTML = `Sorry Unable to fetch pronunciation text for ${word}`;

    }
}

function fetchData() {
    setTimeout(function () {

        word = document.getElementById('word').value;

        document.getElementById('Heading').innerHTML = "Please wait... fetching results!";
        document.getElementById('Heading3').innerHTML = "Please wait... fetching Synonyms!";
        document.getElementById('Heading4').innerHTML = "Please wait... fetching Antonyms!";
        document.getElementById('Heading5').innerHTML = "Please wait... fetching Examples!";
        document.getElementById('Heading6').innerHTML = "Please wait... fetching Pronunciation!";
        

        document.getElementById('results').innerHTML = "";
        document.getElementById('results3').innerHTML = "";
        document.getElementById('results4').innerHTML = "";
        document.getElementById('results5').innerHTML = "";
        document.getElementById('pronunciationText').innerHTML = "";

        const xhr = new XMLHttpRequest();

        xhr.open('GET', `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`, true);


        xhr.onload = function () {

            if (this.status === 200) {
                let wordjson = this.responseText;
                let wordObj = JSON.parse(wordjson);
                setData(wordObj);
            }
            else {

                let list = document.getElementById('results');
                list.innerHTML = "";
                let heading = document.getElementById('Heading');
                heading.innerHTML = "";
                heading.innerHTML = `Sorry! Either ${word} is an invalid word or we are unable to fetch the results`;
                document.getElementById('results3').innerHTML = "";
                document.getElementById('Heading3').innerHTML = "Unable to fetch the Synonyms!";
                document.getElementById('results4').innerHTML = "";
                document.getElementById('Heading4').innerHTML = "Unable to fetch the Antonyms!";
                document.getElementById('results5').innerHTML = "";
                document.getElementById('Heading5').innerHTML = "Unable to fetch the Examples!";
                document.getElementById('Heading6').innerHTML = "Unable to fetch the Pronunciation!";
                document.getElementById('pronunciationText').innerHTML = "";
            }
        }

        xhr.send();

    }, 100);
}

document.getElementById('pronunciationImg').addEventListener('click', ()=>{

    if(audioElement.src!=undefined) {

        audioElement.play();
    }
});




