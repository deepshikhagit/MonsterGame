var ImageCollection = angular
                .module("ImagesModule", [])
                .controller("ImageController", function ($scope) {
                    var Dragon = {
                        image: "/images/DragonImage.png"
                    };
                    $scope.Dragon = Dragon;
                    var Player = {
                        image: "/images/PlayerImage.png"
                    };
                    $scope.Player = Player;
                    var PlayerAttacking = {
                        image: "/images/PlayerAttacking.png"
                    };
                    $scope.PlayerAttacking = PlayerAttacking;
                    var DragonAttacking = {
                        image: "/images/DragonAttack.png"
                    };
                    $scope.DragonAttacking = DragonAttacking;
                });


var player_health = 100;
var dragon_health = 100;
display_health();

var action = document.getElementsByClassName("action");
for(var i =0;i<action.length;i++){
    action[i].addEventListener('click',function(){
        if(this.id=="attack"){
            attack();}
        if(this.id=="blast"){
            blast();}
        if(this.id=="heal"){
            heal();}
        if(this.id=="giveup"){
            giveup();}
        display_health();
    });
}

//This function will first decrease dragon's health by random number and then player's health with other random number
function attack(){
    var player_attack_power = Math.floor((Math.random() * 100) + 1);
    var dragon_attack_power = Math.floor((Math.random() * 100) + 1);
    dragon_health -= player_attack_power;
    document.getElementById('Player').style.backgroundImage="url(/images/PlayerAttacking.png)";
    document.getElementById('commentary').innerHTML +='<h5 align="center"> Player Attacks Monster For '+ player_attack_power+ '</h5>';
    if(dragon_health<=0)
    {
        result();
        return;
    }
    document.getElementById('Dragon').style.backgroundImage="url(/images/DragonAttack.png)";
    document.getElementById('commentary').innerHTML +='<h5 align="center"> Monster Attacks Player For '+ dragon_attack_power+ '</h5>';
    player_health -= dragon_attack_power;
    if(player_health<=0)
    {
        result();
        return;
    }
}

//This function will first decrease dragon's health by a random number and then decrease player's health by same random number
function blast(){
    var blast_power = Math.floor((Math.random() * 100) + 1);
    dragon_health -= blast_power;
    document.getElementById('Dragon').style.backgroundImage="url(/images/DragonBlast.png)";
    document.getElementById('Player').style.backgroundImage="url(/images/playerBlast.png)";
    document.getElementById('commentary').innerHTML +='<h5 align="center"> Player Launches Power Attack For '+ blast_power + '</h5>';
    if(dragon_health<=0)
    {
        result();
        return;
    }
    player_health -= blast_power;
    if(player_health<=0)
    {
        result();
        return;
    }
}

//This function will increase player's health by a random number and then decrease it by another random number
function heal(){
    var heal_power = Math.floor((Math.random() * 100) + 1);
    var dragon_attack = Math.floor((Math.random() * 100) + 1);
    player_health += heal_power;
    player_health -= dragon_attack;
    if(player_health<=0)
    {
        result();
    }
    document.getElementById('commentary').innerHTML +='<h5 align="center"> Player Health Raised For '+ heal_power + '</h5>';
    document.getElementById('commentary').innerHTML +='<h5 align="center"> Monster Attacks Player For '+ dragon_attack + '</h5>';
    document.getElementById('Dragon').style.backgroundImage="url(/images/DragonHeal.png)";
    document.getElementById('Player').style.backgroundImage="url(/images/playerheal.png)";
}

//This function will set player's and dragon's health to 100
function giveup(){
    continue_game();
}

//This function will show the result based on minimum health
function result()
{
    var final_result = "";
    if(dragon_health<=0){
        final_result = "YOU WIN";}
    else if(player_health<=0){
        final_result = "YOU LOSE";}
    else if(player_health == dragon_health){
        final_result = "GAME TIE";}
    document.getElementById("blink").style.visibility = "visible";
    document.getElementById("actions").style.visibility = "hidden";
    document.getElementById("blink").innerHTML = '<span>' + final_result +'</span>' + '<h6 style="color: white;">Do you want a re-match ?   </h6>'+ '<button type="button" id="yes" onclick="continue_game()">YES</button>'+
    '<button type="button" id="no" onclick="exit()">NO</button>';       
}

//This function will again start the game
function continue_game()
{
    document.getElementById('Player').style.backgroundImage="url(/images/PlayerImage.png)";
    document.getElementById('Dragon').style.backgroundImage="url(/images/DragonImage.png)";
    document.getElementById("blink").style.visibility = "hidden";
    player_health = 100;
    dragon_health = 100;
    var div = document.getElementById('commentary');
    while(div.firstChild){
        div.removeChild(div.firstChild);
    }
    display_health();
    document.getElementById("actions").style.visibility = "visible";
}

//To exit from the game
function exit()
{
    return location.href = 'Welcome.html';
}

//To show health status
function display_health()
{
    document.getElementById('PlayerHealth').innerHTML= '<h5 align="center" style="color: white;"><b>'+ player_health+ '%</h5>';
    document.getElementById('DragonHealth').innerHTML= '<h5 align="center" style="color: white;"><b>'+ dragon_health+ '%</h5>';
}

//This will generate picture slide
function slideShowController($scope, $timeout) {
    var slidesInSlideshow = 4;
    var slidesTimeIntervalInMs = 3000; 
   
    $scope.slideshow = 1;
    var slideTimer =
    $timeout(function interval() {
        $scope.slideshow = ($scope.slideshow % slidesInSlideshow) + 1;
        slideTimer = $timeout(interval, slidesTimeIntervalInMs);
        }, slidesTimeIntervalInMs);
}
