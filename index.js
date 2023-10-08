const inputslider = document.querySelector('[data-lengthSlider]');
const lengthDisplay = document.querySelector('[data-length-number]');
const passworddisplay = document.querySelector('[data-passwordDisplay]');
const copybtn = document.querySelector('[data-copy]');
const copytext = document.querySelector('[data-textcopy]');
const uppercasecheck = document.querySelector('#uppercase');
const lowercasecheck = document.querySelector('#lowercase');
const numberscheck = document.querySelector('#numbers');
const symbolscheck = document.querySelector('#symbols');
const indicator = document.querySelector('[data-indicator]');
const generatebtn = document.querySelector('.generatebtn');
const allcheckbox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~!@#$%^&()[]{}|,.<,>_+- ';

let password = "";
let passwordlength = 10;
let checkCount = 0;
//setting strength circle to grey 
handleslider();
setIndicator("#ccc")
//functions 
//set pswrd length
function handleslider() {
    inputslider.value = passwordlength;
    lengthDisplay.innerText = passwordlength;
    const min = inputslider.min;
    const max = inputslider.max;

    inputslider.style.backgroundSize = ((passwordlength-min) * 100/(max-min) + "% 100%")
}
function setIndicator(color){
    indicator.style.backgroundColor = color;

}
function getrndinterger(min, max){
    return Math.floor(Math.random() * (max - min)) + min;
}

function generaterandomnumber(){
    return getrndinterger(0, 9);
}

function generatelowercase(){
    return String.fromCharCode(getrndinterger(97, 123));
}

function generateuppercase(){
   return String.fromCharCode(getrndinterger(65, 91));
}

function generatesymbols(){
    const random = getrndinterger(0, symbols.length);
    return symbols.charAt(random);
}

function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (uppercasecheck.checked) hasUpper = true;
    if (lowercasecheck.checked) hasLower = true;
    if (numberscheck.checked) hasNum = true;
    if (symbolscheck.checked) hasSym = true;
  
    if (hasUpper && hasLower && (hasNum || hasSym) && passwordlength >= 8) {
      setIndicator("#0f0");
    } else if (
      (hasLower || hasUpper) &&
      (hasNum || hasSym) &&
      passwordlength >= 6
    ) {
      setIndicator("#ff0");
    } else {
      setIndicator("#f00");
    }
}

async function copyContent(){
    try {
        await navigator.clipboard.writeText(passworddisplay.value);
        copytext.innerText = "copied";
    } catch (error) {
        copytext.innerText = "Failed";
    }
    copytext.classList.add("active");
    setTimeout(() => {
        copytext.classList.remove("active");
    }, 2000);
};

function shufflePassword(array) {
    for (let i = array.length - 1; i > 0; i--) {
        //random J, find out using random function
        const j = Math.floor(Math.random() * (i + 1));
        //swap number at i index and j index
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;    
}

function handlecheckboxchange() {
    checkCount = 0;
    allcheckbox.forEach((checkbox) => {
        if(checkbox.checked)    
            checkCount++;
    });
    //
    if(passwordlength < checkCount){
        passwordlength = checkCount;
        handleslider();
    }
}

allcheckbox.forEach( (checkbox) => {
    checkbox.addEventListener('change', handlecheckboxchange);
})


inputslider.addEventListener('input', (e) => {
    passwordlength = e.target.value;
    handleslider();
})


 copybtn.addEventListener('click', () => {
    if(passworddisplay.value)
        copyContent();
 })

 generatebtn.addEventListener('click', () => {
    if(checkCount == 0) 
    {
        alert("cannot generate.. plz check the iven options");
        return;
    }
   


    if(passwordlength < checkCount){
        passwordlength = checkCount;
        handleslider();
    }
    password = "";

    //making new password , entering stuff checked by checkboxes
    // if(uppercasecheck.checked){
    //     password += generateuppercase();
    // }

    // if(lowercasecheck.checked){
    //     password += generatelowercase();
    // }
    // if(numberscheck.checked){
    //     password += generaterandomnumber();
    // }
    // if(symbolscheck.checked){
    //     password += generatesymbols();
    // }

    let funcArr = [];

    if(uppercasecheck.checked)
        funcArr.push(generateuppercase);
    
    if(lowercasecheck.checked)
        funcArr.push(generatelowercase);
    
    if(numberscheck.checked)
        funcArr.push(generaterandomnumber);
     if(symbolscheck.checked)
        funcArr.push(generatesymbols);

    for(let i=0;i<funcArr.length;i++){
        password += funcArr[i]();
    }

    for(let i=0;i<passwordlength-funcArr.length;i++){
       let randomindex = getrndinterger(0, funcArr.length);
    //    console.log(randomindex);
       password += funcArr[randomindex](); 
    }

    password = shufflePassword(Array.from(password));

    passworddisplay.value = password;

    //calculate strength
    calcStrength();
 });


