prediction_1=" ";
 prediction_2=" ";
 Webcam.set({
     width : 350 ,
     height : 350 , 
     image_format : 'png',
     png_quality : 90
 });

 var camera=document.getElementById("camera");
 Webcam.attach('#camera');

 function take_snapshot(){
    Webcam.snap(function(data_URI){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_URI+'"/>';
    });
 }

 console.log('ml5 version',ml5.version);
 
 var classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/hBdl2L2lF/model.json",modelLoaded);

 function modelLoaded(){
     console.log('model Loded');
 }

 function speak(){
     var synth=window.speechSynthesis;
     var speak_data_1="The first Prediction"+prediction_1;
     var speak_data_2="The first Prediction"+prediction_2;
     var utter=new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
     synth.speak(utter);
 }

 function check(){
     var img=document.getElementById("captured_image");
     classifier.classify(img,gotResult);
 }

 function gotResult(error,results){
     if(error){
         console.error(error);
     }
     else{
         console.log(results);
         document.getElementById("result_emotion_name").innerHTML=results[0].label;
         document.getElementById("result_emotion_name_2").innerHTML=results[1].label;
         prediction_1=results[0].label;
         prediction_2=results[1].label;
         console.log(results[0].label);
         speak();
         if(results[0].label=="Amazing"){
            document.getElementById("update_emoji").innerHTML= "&#128077;";
         }
         
         if(results[0].label=="Best"){
            document.getElementById("update_emoji").innerHTML= "&#128076;";
         }

         if(results[0].label=="Victory"){
            document.getElementById("update_emoji").innerHTML= "&#9996;";
         }

         }
     }