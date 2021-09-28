prediction_1="";
prediction_2="";
function setup(){
    canvas=createCanvas(400,400);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/4XCziR5mG/model.json",modelLoaded);

}

function modelLoaded(){
    console.log("modelLoaded")
}
function draw(){
    image(video,0,0,400,400);
    classifier.classify(video,gotResult);
}

function speak(){
    var synth=window.speechSynthesis;
    speak1="The First prediction is"+ prediction_1;
    speak2="The Second prediction is"+ prediction_2;
    var utterThis=new SpeechSynthesisUtterance(speak1+speak2);
    synth.speak(utterThis);
}

function  check(){
    img=document.getElementById("capture_image");
    classifier.classify(img,gotResult);
}

function gotResult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name1").innerHTML=results[0].label;
        document.getElementById("result_emotion_name2").innerHTML=results[1].label;
        prediction_1=results[0].label;
        prediction_2=results[1].label;
        speak();
        if(results[0].label=="Happy"){
            document.getElementById("update_emoji1").innerHTML="&#128522;";
            
        }
        if(results[0].label=="Sad"){
            document.getElementById("update_emoji1").innerHTML="&#128532;";
        }
        if(results[0].label=="Angry"){
            document.getElementById("update_emoji1").innerHTML="&#128548;"
        }

        if(results[1].label=="Happy"){
            document.getElementById("update_emoji2").innerHTML="&#128522;";
            
        }
        if(results[1].label=="Sad"){
            document.getElementById("update_emoji2").innerHTML="&#128532;";
        }
        if(results[1].label=="Angry"){
            document.getElementById("update_emoji2").innerHTML="&#128548;"
        }
    }
}
