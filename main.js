const word_el = document.getElementById("word");
const popup = document.getElementById("popup-container");
const message_el = document.getElementById("success-message");
const wrongLetters_el = document.getElementById("wrong-letters");
const items = document.querySelectorAll(".item");
const message = document.getElementById("message");
const PlayAgainBtn = document.getElementById("play-again");

const correctLetters = [];
const wrongLetters = [];
let selectedWord = getRandomWord();

function getRandomWord() {
  const words = ["javascript", "java", "html", "css", "git", "react"];
  return words[Math.floor(Math.random() * words.length)];
}

function displayWord() {

  word_el.innerHTML = `
    ${selectedWord
      .split("")
      .map(
        (letter) => `
    <div class="letter">
    ${correctLetters.includes(letter) ? letter : ""}
    </div>
    
    `
      )
      .join("")}
    
    `;

  // console.log(word_el.innerText.replace(/\n/g,''))

  const w = word_el.innerText.replace(/\n/g, "");
  if (w === selectedWord) {
    popup.style.display = "flex";
    message_el.innerText='Tebrikler Kazandınız '
  }
}

function uptadeWrongLetters (){
    wrongLetters_el.innerHTML = `
    ${wrongLetters.length > 0 ? `<h3>Hatalı Harfler</h3>` : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    
    `;

    items.forEach((item,index)=>{
        const errorCount = wrongLetters.length;

        if (index < errorCount) {
            item.style.display='block'
            if(errorCount==6){
                popup.style.display="flex"
                message_el.innerText='Kaybettiniz :('
            }
        }else{
            item.style.display='none'
        }
    })
}
function displayMessage (){
    message.classList.add('show')

    setTimeout(() => {
        message.classList.remove('show')
    }, 2000);
}

PlayAgainBtn.addEventListener('click', function() {
    correctLetters.splice(0);
    wrongLetters.splice(0);
    
    selectedWord = getRandomWord();
    displayWord();
    uptadeWrongLetters();

    popup.style.display = 'none';
});


window.addEventListener('keydown',function(e){
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key

        if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                displayWord();
            }else{
                displayMessage()
            }
        }else{
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter)
                uptadeWrongLetters();
                
            }else{
                displayMessage()
            }
        }
    }
})

displayWord();
