let muscleIds = [];
let frontOrBack = [];

//Get a list with muscles
function myFetch(){
    let muscleList = [];
    fetch('https://wger.de/api/v2/muscle/')
        .then(response => response.json())
        .then(data => {
            let list = data.results;
            list.forEach(muscle=>{
                muscleList.push(muscle.name);
                muscleIds.push(muscle.id);
                frontOrBack.push(muscle.is_front);
            });
        print(muscleList);//function in .then to do it after getting the data
        showImage(muscleIds, frontOrBack);
        });
}
myFetch();

//create a list with muscles in DOM
function print(x){
    x.forEach(()=>{ //creating divs for every element
        document.querySelector('.muscleslist').insertAdjacentHTML('afterbegin', '<div id="muscleDiv"</div>');
    });
    for(let j=0;j<15;j++){ //creating radio button for every element
        //onchange event to change image on change of chosen radio button
        document.querySelectorAll('#muscleDiv')[j].insertAdjacentHTML('afterbegin', '<input type="radio" onchange="showImage(muscleIds, frontOrBack)" id="muscleRadio" name="muscleRadio" value="muscleRadio">');
    };
    for(let i=0;i<15;i++){ //creating label for every radio button
        document.querySelectorAll('#muscleRadio')[i].insertAdjacentHTML('afterend', `<br><label for="muscleRadio">${x[i]}</label>`);
    }
    document.querySelectorAll('#muscleRadio')[0].setAttribute("checked","");//first radio button is clicked
};

//Create image of specific muscle
function showImage(x,y){
    let muscleNumber = document.getElementsByName('muscleRadio');
    for (let i = 0; i<muscleNumber.length; i++) { //check which radiobutton is clicked
        if(muscleNumber[i].checked) {
            if(y[i]===true){ //if true - need image front
                document.getElementById('muscle-background').style.backgroundImage  = `url('https://wger.de/static/images/muscles/main/muscle-${x[i]}.svg'),url('https://wger.de/static/images/muscles/muscular_system_front.svg')`;
            } else { //if false - need image back
                document.getElementById('muscle-background').style.backgroundImage = `url('https://wger.de/static/images/muscles/main/muscle-${x[i]}.svg'),url('https://wger.de/static/images/muscles/muscular_system_back.svg')`;
            }
        }
    }    
}

// //Get a list with exercises - no exercise pic available for every muscle
// function fetchImage(){
//     let imageList = [];
//     fetch('https://wger.de/api/v2/exerciseimage/')
//         .then(response => response.json())
//         .then(data => {
//             let list = data.results;
//             list.forEach(exc=>imageList.push(exc.image));
//         printImage(imageList);//function in .then to do it after getting the data
//         });
// }
// fetchImage();

// //Print the image of exercise in DOM
// function printImage(x){
//     document.getElementById("exercise").setAttribute("src", `${x[6]}`);
// }