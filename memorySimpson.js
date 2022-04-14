var motifsCartes=[1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10];
var etatsCartes=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var cartesRetournees=[];
var nbPairesTrouvees =0;
var imgCartes=document.getElementById("tapis").getElementsByTagName("img");
var btnDemarrer = document.getElementById("btnDemarrer");
var btnRedemarrer = document.getElementById("btnRedemarrer");
var affscore = 0;
var Score = document.getElementById("Score");

for(var i=0; i<imgCartes.length; i++){
    imgCartes[i].noCarte=i;
    imgCartes[i].onclick=function(){
        controleJeu(this.noCarte);
    }
}

initialiseJeu();

function majAffichage(noCarte){
    switch(etatsCartes[noCarte]){
        case 0:
            imgCartes[noCarte].src="dos.jpg";
            break;
        case 1:
            imgCartes[noCarte].src="carte"+motifsCartes[noCarte]+".jpg";
            break;
        case -1:
            imgCartes[noCarte].style.visibility="hidden";
            break;
    }
}

function rejouer(){
    alert("DOH ! \n Tu as trouvé toutes les paires ! \n Je me reprendrais bien un pitit Donuts !!!");
    location.reload();
    stopChrono();
}

function initialiseJeu(){
    for(var position=motifsCartes.length-1; position >=1; position--){
        var hasard=Math.floor(Math.random()*(position+1));
        var sauve= motifsCartes[position];
        motifsCartes[position]=motifsCartes[hasard];
        motifsCartes[hasard]=sauve;
    }
}

function controleJeu(noCarte) {
    if(cartesRetournees.length<2){
        if(etatsCartes[noCarte]==0) {
            etatsCartes[noCarte]=1;
            cartesRetournees.push(noCarte);
            majAffichage(noCarte);
        }
    }
    if(cartesRetournees.length==2){
        var nouveauEtat=0;
        if(motifsCartes[cartesRetournees[0]]==motifsCartes[cartesRetournees[1]]){
            nouveauEtat=-1;
            nbPairesTrouvees++;
            score();
            }
        etatsCartes[cartesRetournees[0]]=nouveauEtat;
        etatsCartes[cartesRetournees[1]]=nouveauEtat;
        setTimeout(function() {
            majAffichage(cartesRetournees[0]);
            majAffichage(cartesRetournees[1]);
            cartesRetournees=[];
            if(nbPairesTrouvees==10){
                rejouer();
            }
            },750);
        }
}   




//abonnement bouton démarrer
btnDemarrer.addEventListener("click", initialiseJeu);
btnDemarrer.addEventListener("click", startChrono);

//abonnement bouton redémarrer
btnRedemarrer.addEventListener("click", initialiseJeu);

// -- TIMER -------------------------------
var timeChrono = null;
var cptChrono = document.getElementById("cptChrono");
var cent = 0;
var seconde = 0;
var minute = 0;
var heure = 0;



// Init chrono
initChrono();

// Fonctions applicatives -------------------------------
function startChrono() {
    console.log("startChrono");
   
    //Démarre le timer
    timeChrono = setInterval(lanceChrono,10);
}

function stopChrono() {
    console.log("stopChrono");
      //Stop le timer
    clearInterval(timeChrono);
    //Réinitialise le chrono
    initChrono();

}

function pauseChrono() {
    console.log("pauseChrono");
   
     //Stop le timer
     clearInterval(timeChrono);
}

function reprendreChrono() {
    console.log("reprendreChrono");
  
    //Démarre le timer
    timeChrono = setInterval(lanceChrono,10);
}


function initChrono() {
   
    seconde = 0;
}

function lanceChrono() {

    //ajout d'un centième de  seconde
    cent++;

    //MAJ heures, minutes et secondes écoulées
    if (cent > 99){
    cent = 0;
    seconde++;
    }else if (seconde > 59) {
        seconde = 0;
        minute++;
    }else if (minute>59) {
        minute = 0;
        heure++;
    }
    //affichage du chrono
    cptChrono.innerHTML = ajouteunZero(heure) + ":" 
                        + ajouteunZero(minute) + ":" 
                        + ajouteunZero(seconde) + ":" 
                        + ajouteunZero(cent);
}

function ajouteunZero(nombre) {
    return(nombre < 10)? "0" + nombre : nombre;
}


function score() {
    affscore = nbPairesTrouvees;
    Score.innerHTML = affscore;
}