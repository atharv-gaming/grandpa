leftwristx=0;
leftwristy=0;
rightwristx=0;
rightwristy=0;
scoreleftwrist=0
scorerightwrist=0
function setup(){
canvas=createCanvas(600,600);
canvas.center();
video=createCapture(VIDEO);
video.hide();
poseNet=ml5.poseNet(video,modelLoaded)
poseNet.on('pose',gotPoses)
}
function draw(){
image(video,0,0,600,600);
fill("blue");
stroke("blue");
if(scorerightwrist>0.2){
circle(rightwristx,rightwristy,20)
if(rightwristy>0 &&rightwristy<=100){
    document.getElementById("speed").innerHTML="speed =0.5x"
    song.rate(0.5)
}
else if(rightwristy>100 && rightwristy<=200){
    document.getElementById("speed").innerHTML="speed= 1x";
    song.rate(1)
}
else if(rightwristy>200 && rightwristy<=300){
    document.getElementById("speed").innerHTML="speed= 1.5x";
    song.rate(1.5)
}
else if(rightwristy>300 && rightwristy<=400){
    document.getElementById("speed").innerHTML="speed= 2x";
    song.rate(2)
}
else if(rightwristy>400 && rightwristy<=500){
    document.getElementById("speed").innerHTML="speed= 2.5x";
    song.rate(2.5)
}}
if(scoreleftwrist>0.2)
{


circle(leftwristx,leftwristy,20);
in_nuber=Number(leftwristy);
remove_decimal=floor(in_nuber);
volume =remove_decimal/500;
document.getElementById("volume").innerHTML="volume "+volume;
song.setVolume(volume)}
}
song="";
function preload(){
    song=loadSound("music");
}
function play(){
    song.play();
    song.setVolume(1)
    song.rate(1)
}
function modelLoaded(){
    console.log("posenet is initialized")
}
function gotPoses(results){
if(results.length>0){
    console.log(results)
    leftwristx=results[0].pose.leftWrist.x
    leftwristy=results[0].pose.leftWrist.y
        console.log("left wrist x ="+leftwristx+" left wrist y ="+leftwristy)
        rightwristx=results[0].pose.rightWrist.x
        rightwristy=results[0].pose.rightWrist.y
        console.log("right wrist x ="+rightwristx+" right wrist y ="+rightwristy)
        scoreleftwrist=results[0].pose.keypoints[9].score;
        console.log("score left wrist"+scoreleftwrist+"score riht wrist"+scorerightwrist)
        scorerightwrist=results[0].pose.keypoints[10].score;
        
}
}