 // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
  import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDI-yjPo7uWisxfVDIiDcC-qT_rdekVqrg",
    authDomain: "real-time-chat-app-19d9f.firebaseapp.com",
    databaseURL: "https://real-time-chat-app-19d9f-default-rtdb.firebaseio.com",
    projectId: "real-time-chat-app-19d9f",
    storageBucket: "real-time-chat-app-19d9f.appspot.com",
    messagingSenderId: "187015861489",
    appId: "1:187015861489:web:ce9941e4788bdabcc94550"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  const dbRef = ref(database);

// Pseudo-code
// When user hits submit button, a new node is created in the root database and saves that message
// onValue listens to any new changes, in this case a new message, get's snapshot of data and displays it in the textDisplayContainer

const inputField = document.getElementById('userMessage');
const displayText = document.querySelector('.displayTextContainer');



const form = document.querySelector('form');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const messageContent = inputField.value;
  const newMessage = {
    content: messageContent,
    senderId: 'user123',
    timestamp: Date.now()
  };

  push(dbRef, newMessage);
  inputField.value = '';
});

onValue(dbRef, (data) => {
  const allMessages = data.val();
  const arrOfMessages = [];

  for (let message in allMessages) {
    const listMessageItems = document.createElement('li');
    const sender = allMessages[message].senderId;
    const sentMessage = allMessages[message].content;

    const messageText = document.createTextNode(`${sender}: ${sentMessage}`);
    listMessageItems.appendChild(messageText);

    arrOfMessages.push(listMessageItems.outerHTML);
  }
  displayText.innerHTML = arrOfMessages.join('');
})






