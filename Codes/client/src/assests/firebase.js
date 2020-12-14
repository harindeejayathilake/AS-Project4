import firebase from 'firebase/app';
import 'firebase/storage';


var config = {
    apiKey: "AIzaSyDHzt0QguS-pG5JaivfuZj-nfjT6phJOyI",
    authDomain: "ecartpanel.firebaseapp.com",
    databaseURL: "https://ecartpanel.firebaseio.com",
    projectId: "ecartpanel",
    storageBucket: "ecartpanel.appspot.com",
    messagingSenderId: "683381887878",
    appId: "1:683381887878:web:d12d4c18f56d9516ddd207"
}

firebase.initializeApp(config);

const storage = firebase.storage();
export {
    storage, firebase as default
}