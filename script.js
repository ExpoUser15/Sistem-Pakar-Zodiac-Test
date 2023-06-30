import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getFirestore, doc, getDoc} from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js';

const firebaseConfig = {
    apiKey: "AIzaSyBEiHaBGbj3yjNqzbXMemCli2PZ97oDpSw",
    authDomain: "zodiac-expert-system.firebaseapp.com",
    projectId: "zodiac-expert-system",
    storageBucket: "zodiac-expert-system.appspot.com",
    messagingSenderId: "310116141765",
    appId: "1:310116141765:web:12b6d9bbf7371ee57f3eac"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const select = document.getElementById('zodiacSelect'),
ok = document.getElementById('okBtn'),
dialogBox = document.getElementById('dialogBox'),
info = document.querySelector('.alert'),
bgDark = document.getElementById('darkBg'),
body = document.querySelector('body');

let counter = 0;

ok.addEventListener("click", function(){
        dialogBox.classList.add('show');
        bgDark.style.display = "block";
        body.style.overflow = "hidden";
        if(select.value === "---"){
            info.textContent = "Berikan zodiac yang valid!"; 
            counter = 5;   
        }else{
            info.textContent = `Mari lihat karakteristik seorang ${select.value}`;
        }
});

dialogBox.onclick = () => {
        showInfo();
}

async function showInfo(){
  if (counter === 5) {
        dialogBox.classList.remove('show');
        bgDark.style.display = "none";
        counter = 0;
        return;
  }
  counter++;

  try{
      const docRef = doc(db, "zodiac", select.value.toLowerCase());
      const snapshot = await getDoc(docRef);

      if(select.value === "---" && snapshot.exists() && select.value === " "){
          info.textContent = "Berikan zodiac yang valid!";
          counter = 5;
          return;      
      }

      info.textContent = `${snapshot.data().karakteristik[counter]}`;
      body.style.overflow = "auto";
  }catch(e){
      console.log(e);
  }
}

const mode = document.getElementById('mode');

mode.onclick = () => {
        
        const toggle = mode.classList.toggle('fa-toggle-on');
        console.log(toggle);
       if(toggle === true){
            body.style.color = "white";
            body.style.backgroundColor = 'black';
       }else{
            body.style.color = 'black';
            body.style.backgroundColor = 'white';
       }
        
}




