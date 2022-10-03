let url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
let wordPage = {};


async function searchDefinition(){
    let word = document.querySelector(".form-control").value;
    const response = await fetch(url + word);
    wordPage = await response.json();
    if(wordPage.message){
        document.querySelector(".form-control").classList.add("error");
        document.querySelector(".wordInput .image-group").classList.add("hidden");
        document.querySelector(".wordDisplay").classList.add("hidden");
        document.querySelector(".errorDisplay").classList.remove("hidden");

        document.querySelector(".errorMessage h2").innerHTML = wordPage.title;
        document.querySelector(".errorMessage h3").innerHTML = wordPage.message;
    }else{
        document.querySelector(".form-control").classList.remove("error");
        document.querySelector(".wordMeaning").innerHTML=``;
        document.querySelector(".wordInput .image-group").classList.add("hidden");
        document.querySelector(".wordDisplay").classList.remove("hidden");
        document.querySelector(".errorDisplay").classList.add("hidden");
        
        console.log(wordPage);
        document.querySelector(".title" ).innerHTML = wordPage[0].word;
        document.querySelector(".phonetic" ).innerHTML = `(${wordPage[0].phonetic})`;

        for(let i = 0; i <= wordPage.length; i++){
            for(audio of wordPage[i].phonetics){
                if (audio.audio){
                    document.querySelector(".audioIcon").setAttribute("src", "../DictionAppy/images/audioOn.svg");
                    document.querySelector("#audio").setAttribute("src", audio.audio);
                }else{
                    document.querySelector(".audioIcon").setAttribute("src", "../DictionAppy/images/audioOff.svg");
                    document.querySelector("#audio").setAttribute("src", "");
                }
            }
            
            console.log(wordPage[i].meanings);
            for(meaning of wordPage[i].meanings){
                document.querySelector(".wordMeaning").innerHTML+=
                `<h5> &bull; ${meaning.partOfSpeech}</h5>`;
                for(definition of meaning.definitions){
                    document.querySelector(".wordMeaning").innerHTML+=
                    `<p>${definition.definition}</p>`;
                }

            }
        }
        
    }

}

function errorClear(){
    document.querySelector(".form-control").classList.remove("error");
}

function playAudio(){
    let audio = document.querySelector("#audio");
    audio.play();
}