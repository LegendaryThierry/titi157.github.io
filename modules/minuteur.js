window.onload = pageChargee;

var intervaleMinuteur;

actualisationDate() //Initialise le minuteur dès le chargement de la page au cas où la page mettrait trop de temps à se charger

function pageChargee(){
    intervaleMinuteur = window.setInterval(actualisationDate,1000);
    document.getElementById("pause").onclick=pause;
    document.getElementById("reprendre").onclick=reprendre;
}

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

