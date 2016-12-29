window.onload=pageChargee;

var jouerVideo=0;

function pageChargee(){
    diaporama();
    document.getElementsByTagName("video")[0].onclick=jouer;
}

/*DIAPORAMA*/

var indiceImage = 0;

function diaporama() {
    var i;
    var x = document.getElementsByClassName("imagesDiaporama");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";  
    }
    indiceImage++;
    if (indiceImage > x.length) {indiceImage = 1}    
    x[indiceImage-1].style.display = "block";  
    setTimeout(diaporama, 4000);
}

/*TEXTE*/

$(document).ready(function(){
    $(".toggle").click(function(){
        $("#"+this.id+"Afficher").toggle("slow");
    });
});

/*VIDEOS*/

/*Utilisation des méthodes .play() et .pause() du DOM*/
function jouer(){
    if (jouerVideo==0){
        this.play();
        jouerVideo=1;
}
    else{
        this.pause();
        jouerVideo=0;
    }
}

/*BOUTON REVENIR EN HAUT*/
/*Nous ajoutons ou enlevons des classes CSS pour afficher ou faire disparaître le bouton de retour vers le haut*/
$(document).ready(function($){
	var offset = 300;
	var	offset_opacity = 1200;
	var	scroll_top_duration = 700;
	var	$back_to_top = $('.boutonHaut');

	$(window).scroll(function(){
		( $(this).scrollTop() > offset ) ? $back_to_top.addClass('boutonHaut-visible') : $back_to_top.removeClass('boutonHaut-visible boutonHaut-disparition');
		if( $(this).scrollTop() > offset_opacity ) { 
			$back_to_top.addClass('boutonHaut-disparition');
		}
	});

	$back_to_top.on('click', function(event){
		event.preventDefault();
		$('body,html').animate({
			scrollTop: 0 ,
		 	}, scroll_top_duration
		);
	});
});

/*TEST POUR jQuery

function test() {
    if (window.jQuery) {  
        alert("jQuery fonctionne. #GENIAL");
    } else {
        alert("jQuery ne fonctionne pas. #TRISTESSE");
    }
}*/

/*TSANG Thierry*/