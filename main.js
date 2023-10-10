Parado_no_Bailao="";
Runaway="";
Harry_potter_theme_song="";
rightWrist_x = 0;
rightWrist_y = 0;
leftWrist_x = 0;
leftWrist_y = 0;
scoreleftWrist = 0;
song_name = "";
scorerightWrist = 0;
song_Parado = "";
song_Runaway = "";

function setup(){
    canvas = createCanvas(600,530);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotposes);
}

function preload(){
    Runaway = loadSound("Runaway.mp3");
    Parado_no_Bailao = loadSound("Parado_no_Bailao.mp3");
}

function draw(){
    image(video,0,0,600,530);

    fill("#00ff00");
    stroke("#ff0000");

    song_Parado = Parado_no_Bailao.isPlaying();
    console.log(song_Parado);

    song_Runaway = Runaway.isPlaying();
    console.log(song_Runaway);

    if(scoreleftWrist > 0.2){
        circle(leftWrist_x,leftWrist_y,20);
        Runaway.stop();
        if(song_Parado == false){
            Parado_no_Bailao.play();
        }
        else{
            console.log("Song Name: Parado no Bailao");
            document.getElementById("song_id").innerHTML = "Song Name: Parado no Bailao";
        }
    }

    if(scorerightWrist > 0.2){
        circle(rightWrist_x,rightWrist_y,20);
        Parado_no_Bailao.stop();
        if(song_Runaway == false){
            Runaway.play();
        }
        else{
            console.log("Song Name: Runaway");
            document.getElementById("song_id").innerHTML = "Song Name: Runaway";
        }
    }
}
function modelLoaded(){
    console.log("poseNet Is Initialized");
}

function gotposes(results){
    if(results.length > 0){
        console.log(results);

        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreleftWrist);

        scorerightWrist = results[0].pose.keypoints[10].score;
        console.log(scorerightWrist);
         
        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        console.log("leftWrist_x = "+leftWrist_x+" leftWrist_y = "+leftWrist_y);

        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        console.log("rightWrist_x = "+rightWrist_x+" rightWrist_y = "+rightWrist_y);
    }
}