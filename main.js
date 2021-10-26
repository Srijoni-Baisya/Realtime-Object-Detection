img = "";

//var to check the status of object detection
status = "";

//var to hold all the results
objects = [];



function setup(){
    canvas = createCanvas(380,380); 
    var width = screen.width;
    if (width<768){
        canvas.center();
    }
    else{
        canvas.position(530,100);
    }

    //access the webcam
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();

    //load the model
    objectDetector = ml5.objectDetector('cocossd' , modelLoaded);

    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

//define modelLoaded() function
function modelLoaded(){
    console.log("Model Loaded !");
    //update the status 
    status = true;
}

function draw(){
    //place image
    image(video,0,0,380,380);

    if(status != ""){
        //execute the model
        objectDetector.detect(video, gotResult);

        r = random(255);
        g = random(255);
        b = random(255);

        for(i = 0; i < objects.length; i++){

            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("objects").innerHTML = "No. of Objects Detected : " + objects.length;

            fill(r,g,b);

            //store the confidence and convert it to percentage
            percent = floor(objects[i].confidence * 100);

            //display the label
            text(objects[i].label + " (" + percent + "%) ", objects[i].x + 15 , objects[i].y + 15);
            textSize(18);

            //unset the color
            noFill();

            //set the border color
            stroke(r,g,b);

            //draw the rectangle around the object
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
        }
    }

    //fill("#00008b");
    //text("Dog",70,75);
    //noFill(); //unset the color set in fill()
    //stroke("#00008b");
    //rect(60,60,400,350);
    //text color
    //fill("#FF0000");
    //place label
    //text("Cat",350,95);
    //unset color
    //noFill();
    //set the border color of the rectangle
    //stroke("#00008b");
    //draw the rectangle around the cat
    //rect(300,80,280,320);
}

//define gotResult() function
function gotResult(error, results){
    if (error){
        console.log(error);
    }
    else{
        console.log(results);
        //update the objects variable
        objects = results;
    }
}
