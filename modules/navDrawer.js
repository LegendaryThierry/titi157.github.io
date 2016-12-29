window.onload=PageChargee;

function PageChargee(){
	document.getElementById("navDrawerOpen").onclick=afficherDrawer;
	document.getElementById("boutonFermer").onclick=fermerDrawer;
}

function afficherDrawer() {
    document.getElementById("navDrawer").style.width = "25%";
		document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

function fermerDrawer() {
    document.getElementById("navDrawer").style.width = "0";
		document.body.style.backgroundColor = "#fff";
}
