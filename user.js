
// Initialize Firebase
var config = {
  apiKey: "AIzaSyD16590_oBAk25dBr4hpzIjqPWcqY6TnN0",
  authDomain: "gkousk-shop.firebaseapp.com",
  databaseURL: "https://gkousk-shop.firebaseio.com",
  projectId: "gkousk-shop",
  storageBucket: "gkousk-shop.appspot.com",
  messagingSenderId: "523948246563"
};
firebase.initializeApp(config);

loginbtn=document.getElementById("login");
logoutbtn=document.getElementById("logout");
em=document.getElementById("a");
firebase.auth().onAuthStateChanged(function(user) {
    if(firebase.auth().currentUser){
        loginbtn.classList.add("hide");
        logoutbtn.classList.remove("hide");
        em.innerHTML = ""+firebase.auth().currentUser.email;
        
    }
    else{
        loginbtn.classList.remove("hide");
        logoutbtn.classList.add("hide");
        
    }
});

function logout(){
    firebase.auth().signOut();
}