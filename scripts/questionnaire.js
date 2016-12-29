window.onload=pageChargee;
var budget;
var appareil;
var marque;
var corps;
var controller;

var reponses = [];

/*Réponses attendues dans le meilleur des cas*/
var googleCardboard = ["0","smartphone","google","non","bouton"];
var samsungGearVR = ["1","smartphone","samsung","non","touchpad"];
var oculusRift = ["2","ordinateur","oculus","non","manetteConsole"];
var htcVive = ["3","ordinateur","htc","oui","manetteHTC"];

var g=0;
var s=0;
var o=0;
var h=0;

var prixGoogleCardboard = 20;
var prixSamsungGearVR = 70;
var prixOculusRift = 699;
var prixHTCVive = 949;

function pageChargee(){
    //Minuteur
    intervaleMinuteur = window.setInterval(actualisationDate,1000);
    document.getElementById("pause").onclick=pause;
    document.getElementById("reprendre").onclick=reprendre;
    //Questionnaire
    document.getElementsByTagName("input")[0].onchange=afficheBudget;
    document.getElementsByClassName("fermer")[0].onclick=fermeMessage;
}

window.onload = pageChargee;

var intervaleMinuteur;

actualisationDate() //Initialise le minuteur dès le chargement de la page au cas où la page mettrait trop de temps à se charger

function actualisationDate(){
    var d = new Date();
    var dateE3 = new Date("2017-06-13 09:00:00 UTC-8");
    var decompte = dateE3-d;
    var secondes = Math.floor((decompte/1000)%60);
    var minutes = Math.floor( (decompte/1000/60)%60);
    var heures = Math.floor((decompte/(1000*60*60))%24);
    var jours = Math.floor(decompte/(1000*60*60*24));
    document.getElementById("joursSpan").innerHTML=jours;
    document.getElementById("heuresSpan").innerHTML=('0' + heures).slice(-2);
    document.getElementById("minutesSpan").innerHTML=('0' + minutes).slice(-2);
    document.getElementById("secondesSpan").innerHTML=('0' + secondes).slice(-2);
    if (decompte <= 0){
        clearInterval(intervaleMinuteur);
        document.getElementById("jours").innerHTML="00";
        document.getElementById("heures").innerHTML="00";
        document.getElementById("minutes").innerHTML="00";
        document.getElementById("secondes").innerHTML="00";
    }
}

function pause(){
    clearInterval(intervaleMinuteur);
}
function reprendre(){
    actualisationDate()
    intervaleMinuteur = window.setInterval(actualisationDate,1000);
}

/*Affiche le budget en euros à côté du "range input"*/
function afficheBudget(){
    budget=document.getElementsByTagName("input")[0].value;
    document.getElementsByTagName("output")[0].innerHTML=budget + " euros";
}

/*Récupère les choix de l'utilisateur*/
function analyse() {
    budget=document.getElementsByTagName("input")[0].value;
    appareil = document.getElementsByName('appareil');
    marque = document.getElementsByName('marque');
    corps = document.getElementsByName('corps');
    controller = document.getElementsByName('controller');
    
    if(budget<69){
        reponses.push("0");
    }
    else if(budget>=70 && budget<698){
        reponses.push("1");
    }
    else if(budget>=699 && budget<948){
        reponses.push("2");
    }
    else{
        reponses.push("3");
    }
    
    
    for (i = 0; i < appareil.length; i++) {
        if (appareil[i].checked) {
            reponses.push(appareil[i].value);
            //alert(appareil[i].value);
        }
    }
    for (i = 0; i < marque.length; i++) {
        if (marque[i].checked) {
            reponses.push(marque[i].value);
            //alert(marque[i].value);
        }
    }
    for (i = 0; i < corps.length; i++) {
        if (corps[i].checked) {
            reponses.push(corps[i].value);
            //alert(corps[i].value);
        }
    }
    for (i = 0; i < controller.length; i++) {
        if (controller[i].checked) {
            reponses.push(controller[i].value);
            //alert(controller[i].value);
        }
    }
    calculResultat();
}

/*Détermine le casque VR le plus approprié en fonction des résultats de l'utilisateur*/
function calculResultat(){
    document.getElementById("resultat").innerHTML="<span class='fermer'>&times;</span>";
    for (i=0; i<reponses.length; i++){
        if(reponses[i]==googleCardboard[i]){
            g++
        }
    }
    for (i=0; i<reponses.length; i++){
        if(reponses[i]==samsungGearVR[i]){
            s++
        }
    }
    for (i=0; i<reponses.length; i++){
        if(reponses[i]==oculusRift[i]){
            o++
        }
    }
    for (i=0; i<reponses.length; i++){
        if(reponses[i]==htcVive[i]){
            h++
        }        
    }
    //alert(g);
    //alert(s);
    //alert(o);
    //alert(h);
    if (g>=s && g>=o && g>=h){
        document.getElementById("resultat").innerHTML+="Le casque Google Cardboard est selon vos reponses, le casque qui vous conviendrait le plus.<br>";
        if(budget<prixGoogleCardboard){
            manque = prixGoogleCardboard - budget;
            document.getElementById("resultat").innerHTML+="Cependant, il vous manque "+manque+" euros dans votre budget !";
        }
    }
    else if (s>=g && s>=o && s>=h){
        document.getElementById("resultat").innerHTML+="Le casque Samsung Gear VR est selon vos reponses, le casque qui vous conviendrait le plus.<br>";
        if(budget<prixSamsungGearVR){
            manque = prixSamsungGearVR - budget;
            document.getElementById("resultat").innerHTML+="Cependant, il vous manque "+manque+" euros dans votre budget !";
        }
    }
    else if (o>=g && o>=s && o>=h){
        document.getElementById("resultat").innerHTML+="Le casque Oculus Rift est selon vos reponses, le casque qui vous conviendrait le plus.<br>";
        if(budget<prixOculusRift){
            manque = prixOculusRift - budget;
            document.getElementById("resultat").innerHTML+="Cependant, il vous manque "+manque+" euros dans votre budget !";
        }
    }
    else if (h>=g && h>=s && h>=o){
        document.getElementById("resultat").innerHTML+="Le casque HTC Vive est selon vos reponses, le casque qui vous conviendrait le plus.<br>";
        if(budget<prixHTCVive){
            manque = prixHTCVive - budget;
            document.getElementById("resultat").innerHTML+="Cependant, il vous manque "+manque+" euros dans votre budget !";
        }
    }
    reponses=[];
    afficheMessage();
}

function afficheMessage(){
    $("#resultat").addClass('show');
}

function fermeMessage() {
    document.getElementById("resultat").style.width = "0";
    alert("sdffsdjsfdhjsdkjfn");
}

/*NOTE PERSO: Système de points abandonné car 2+2=4 mais aussi 1+3=4*/

/*Google Cardboard 0 à 69 1 pt
  Samsung Gear VR 70 à 698 2 pts
  Oculus Rift 699 à 948 3 pts
  HTC Vive 949 à 1200 4 pts*/
  
/* Google Cardboard 5 pts à 
   Samsung Gear VR 
*/
/*TSANG Thierry*/