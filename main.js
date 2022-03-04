function preload(){
    classifier = ml5.imageClassifier('DoodleNet');
}

function setup(){
    canvas = createCanvas(640,480);
    canvas.center();
    background('white');
    synth = window.speechSynthesis;
    canvas.mouseReleased(classifyCanvas);

}

function clear_canvas(){
    background('white');
}

function draw(){
    strokeWeight(5);
    stroke('black');
    if(mouseIsPressed){
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}

function classifyCanvas(){
    classifier.classify(canvas, got_result);
}

function got_result(error, results){
    if(error){
        console.error(error);
    }
        console.log(results);
        answer = results[0].label;
        confidence = Math.round(results[0].confidence * 100)+'%';
        document.getElementById('answer').innerHTML = 'Answer: '+answer;
        document.getElementById('confidence').innerHTML = 'Confidence: '+confidence;
        utterthis = new SpeechSynthesisUtterance(`I guess it's ${answer}`);
        synth.speak(utterthis);
}