 /* var toHideShowControls; */
 var globalCueLatest;
 var videoId= document.getElementById('video')
  var srtTag = document.getElementById("mySRT");
 let mainEngArr = [];
 let mainNLArray = [];
 let displaySrt = document.getElementById('displaySrt')
 let bilingual = document.getElementById('bilingual')
 let nlArr = [];
 const doTwoLang = () => {
   nlArr;
   engStr = displaySrt.innerText;
   //let engArr = engStr.split('++<br>++')
   //console.log(engArr)


   let intermediate = engStr.split('++')
   let ta1211 = []; intermediate.map(x => { if (x !== '\n' && x !== "") { ta1211.push(x) } })

   console.log(ta1211)

   for (let i = 0; i < ta1211.length; i++) {
     const el = ta1211[i];
     if (el===' ') {ta1211.splice(i,1); --i;}
     
   }

   mainEngArr.map((x, i) => { mainEngArr[i].text = mainNLArray[i] + '\n' + ta1211[i] })
   console.log(mainEngArr)
   let vtt = Subtitle.stringifyVtt(mainEngArr)

 var vttBlob = new Blob([vtt], {
   type: 'text/plain'
 });
 let track = document.createElement("track");
 track.src = URL.createObjectURL(vttBlob);
 track.kind = "captions";
 track.label = "Nederlands";
 track.srclang = "nl";
//track.mode = 'showing';
 videoId.appendChild(track);
 videoId.textTracks[0].mode = "showing"




   var trackToHide = videoId.textTracks[0];
   trackToHide.mode = 'hidden';
 let span = document.getElementById('subtitleSpan');
   trackToHide.oncuechange = function(e) {

       var cue = this.activeCues[0];
       if (cue) {
         span = document.getElementById('subtitleSpan');
           span.innerHTML = '';
           span.appendChild(cue.getCueAsHTML());
           console.log(cue.getCueAsHTML(),'++++',span.innerHTML)
           globalCueLatest = cue;

let rectOfSpan = span.getBoundingClientRect();
if (!toHideShowControls) {toHideShowControls = document.getElementById('toHideShowControls')}

let rectOfControls = toHideShowControls.getBoundingClientRect();

/* 

*/
//let difference = rectOfSpan.y+rectOfSpan.height-rectOfControls.y


span.style.marginTop = String(rectOfControls.y-rectOfSpan.height)+'px'; 
//if (rectOfSpan.y+rectOfSpan.height>rectOfControls.y) {span.style.marginTop = 795-}

          // console.log(cue.getCueAsHTML())
         // span.textContent = cue.getCueAsHTML().textContent;
         // console.log(span.innerText,'---------',cue.getCueAsHTML().textContent)
       }

   };






 }
 bilingual.addEventListener('click', doTwoLang)
 /* function onFileSelected(event) {
   var selectedFile = event.target.files[0];
   var reader = new FileReader();
 
   var srtTag = document.getElementById("mySRT");
   srtTag.src = selectedFile.name;
 
    reader.onload = function(event) {
     srtTag.src = event.target.result;
   }; 
 
  reader.readAsDataURL(selectedFile);
 } */
 let SRTvariable;
 function onFileSelected(event) {
   var selectedFile = event.target.files[0];
   if (selectedFile) {
     var reader = new FileReader();
     reader.readAsText(selectedFile, "UTF-8");
     reader.onload = function (evt) {
       SRTvariable = evt.target.result;
       let srtParsed = Subtitle.parse(SRTvariable)
       console.log(srtParsed)

       mainEngArr = JSON.parse(JSON.stringify(srtParsed))
       let newArray = srtParsed.slice()
       /*  newArray.map((x, i) => {
          let a = x.text;
          a = a.replace('<i>', "");
          a = a.replace('</i>', "");
          a = a.replace(/\n/ig, '<br>');
          a += '++<br>++'
          newArray[i].text = a;
        })
        console.log(newArray); */

       //let srtHTML = document.createElement('div')
       //newArray.map(x=>{srtHTML.innerHTML += x.text})
       //let srtStr = '++';
       // newArray.map(x=>{srtStr += x.text})

       let arrayOnlyText = srtParsed.map(x => x.text)
       arrayOnlyText.map((x, i) => {
         let a = x;
         a = a.replace('<i>', "");
         a = a.replace('</i>', "");
         a = a.replace(/\n/ig, ' ');
         arrayOnlyText[i] = a;
       })
       let strToTranslate = JSON.stringify(arrayOnlyText)
       console.log(arrayOnlyText)
       mainNLArray = arrayOnlyText.slice();
       nlArr = arrayOnlyText.slice();
       displaySrt.innerHTML = '++ ' + arrayOnlyText.join(' ++<br>++ ');

     }
     reader.onerror = function (evt) {
       SRTvariable = "error reading file";
     }
   }
 }



 (function localFileVideoPlayer() {
   'use strict'
   var URL = window.URL || window.webkitURL
   var displayMessage = function (message, isError) {
     var element = document.querySelector('#message')
     element.innerHTML = message
     element.className = isError ? 'error' : 'info'
   }
   var playSelectedFile = function (event) {
     var file = this.files[0]
     var type = file.type
     var videoNode = document.querySelector('video')
     var canPlay = videoNode.canPlayType(type)
     if (canPlay === '') canPlay = 'no'
     var message = 'Can play type "' + type + '": ' + canPlay
     var isError = canPlay === 'no'
     displayMessage(message, isError)

     if (isError) {
       return
     }

     var fileURL = URL.createObjectURL(file)
     videoNode.src = fileURL
   }
   var inputNode = document.querySelector('input')
   inputNode.addEventListener('change', playSelectedFile, false)
 })()

 let wrapperUp = document.getElementById('wrapper')
 let hidden = false;


const hide = (e) => {
 let key = e.key.toLowerCase();
 if (key === 'h')
 {
   if (!hidden) 
   {
     wrapperUp.style.display= 'none'
     displaySrt.style.display= 'none'
     hidden = !hidden;
   } else {
     wrapperUp.style.display= 'flex'
     displaySrt.style.display= 'block'
     hidden = !hidden;
   }

 } else if (key === 's') {
   
   videoId.currentTime = videoId.currentTime-1;
  // renewSubtitles()
  
 
                 }

                 else if (key === 'w') {
                   (()=>{
   let elementWithId=videoId.textTracks[0].activeCues[0]||globalCueLatest
   //let numberId = Number(elementWithId.id)-1
   let startTime = elementWithId.startTime
   videoId.currentTime = startTime /* - 0.1 */;
 })()
 
                 }

                 else if (key === 'e') {
                   (()=>{
   let elementWithIdPrev=videoId.textTracks[0].activeCues[0]||globalCueLatest
   let numberId = Number(elementWithIdPrev.id)-2
   let startTimeOfPrevious = videoId.textTracks[0].cues[numberId].startTime
   videoId.currentTime = startTimeOfPrevious/*  - 0.1 */;
 })()
 
                 }

                 else if (key === 'r') {
                   (()=>{
   let elementWithIdPrev=videoId.textTracks[0].activeCues[0]||globalCueLatest
   let numberId = Number(elementWithIdPrev.id)
   let startTimeOfPrevious = videoId.textTracks[0].cues[numberId].startTime
   videoId.currentTime = startTimeOfPrevious /* - 0.1 */;
 })()
 
                 }
                 else if (key === ' ') {
                 if (videoId.controls===false) {

                  // let span = document.getElementById('subtitleSpan');

                  if (videoId.paused) {videoId.play();
                  // span.style.background = "#00000061";
                 }
                  else  {videoId.pause();
                  // span.style.background = "rgba(0, 0, 0, 0.18)";
                 }
 }
                 }
                 else if (key === ',') {
                      moveSubtitlesTimes(-0.1)

                 }
                 else if (key === '.') {
                      moveSubtitlesTimes(0.1)

                 }
                 else if (key === 'arrowup') {
                   videoId.volume += 0.1;

                 }
                 else if (key === 'arrowdown') {
                   videoId.volume -= 0.1;

                 }
}


const moveSubtitlesTimes = (time) => {
 let track = videoId.textTracks[0];
 let cues = track.cues;
 for (let i = 0; i < cues.length; i++) {
   const el = cues[i];
   el.startTime += time;
   el.endTime += time;
 }
}


const renewSubtitles = () => {

 if (videoId)  {
 trackToHide = videoId.textTracks[0];
       var cue = trackToHide.activeCues[0];
       if (cue) {
         span = document.getElementById('subtitleSpan');
           span.innerHTML = '';
           span.appendChild(cue.getCueAsHTML());
                  }
}
}

videoId.ontimeupdate = function(){
// renewSubtitles()
};

document.addEventListener('keydown',hide)

videoId.controls = false;
const showHideControls = (e) => {
 if (e.type==='mouseenter') {
   videoId.controls = true;
 } else {
   videoId.controls = false;
 }
}

toHideShowControls = document.getElementById('toHideShowControls')
toHideShowControls.addEventListener('mouseenter', showHideControls)
toHideShowControls.addEventListener('mouseleave', showHideControls) 

const pauseOrPlay = (e) => {

// let span = document.getElementById('subtitleSpan');

 if (videoId.controls===false) {
                  if (videoId.paused) {videoId.play();
                  // span.style.background = "#00000061";
                 }
                  else  {videoId.pause();
                  // span.style.background = "rgba(0, 0, 0, 0.18)";
                 }



 }
}
videoId.addEventListener('mousedown', 
pauseOrPlay


)

let turnedOnControls = false;
const hideShowOnMouseMove = (e) => {
 let y = e.offsetY;
 if (turnedOnControls===true&&y<window.innerHeight*0.87) {
   videoId.controls = false;
   turnedOnControls=false;
 }
 else if (turnedOnControls===false&&y>window.innerHeight*0.87) { videoId.controls = true;turnedOnControls=true;} 

}
videoId.addEventListener('mousemove', hideShowOnMouseMove)


const changeSubtitlePosition = (e) => {
 let span = document.getElementById('subtitleSpan');
let rectOfSpan = span.getBoundingClientRect();
if (!toHideShowControls) {toHideShowControls = document.getElementById('toHideShowControls')}
let rectOfControls = toHideShowControls.getBoundingClientRect();
span.style.marginTop = String(rectOfControls.y-rectOfSpan.height)+'px'; 
}
window.addEventListener('resize', changeSubtitlePosition);
