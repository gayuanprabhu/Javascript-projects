const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById ("email");
const password =document.getElementById ("password");
const password2 = document.getElementById("password2");

const formvalues = [];

const formFeilds = {
    username: null,
    email: null, 
    password: null,
    password2: null,
};

function showError(input, message){
    const formControl = input.parentElement;
    formControl.className = "form-control error";
    let small = formControl.querySelector("small");
    small.innerText = message;
}

function showSuccess(input){
    const formControl = input.parentElement;
    formControl.className = "form-control success";
}

function checkEmail(input){
    const re= /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (re.test(input.value)) {
    showSuccess(input);
    formFeilds.email = true;
   }
   else{
    showError(input, "Email is not valid");
    formFeilds.email = false;
   }
}

function checkRequired(inputArr){
    inputArr.forEach(function(input){
        if(input.value === "") {
            showError(input, `${getFieldName(input)} is required`);
        formFeilds.username =false;
        }else {
            showSuccess(input);
            formFeilds.username =true;
        }
    });
}

function checkPasswordMatch(password1,password2){
    if(password1.value !== password2.value){
        showError(password2, "Password Dosen't match!")
        formFeilds.password =false;
      }
      formFeilds.password2 = true;
    }

function checkLength(input,min,max){
    if(input.value.length <= min){
        showError(input, `${getFieldName(input)}  must be more then ${min} characters`);
        formFeilds[input]=false;
    }else if(input.value.length >= max){
        showError(input, 
            `${getFieldName(input)} must be less than ${max} charaters`);
            formFeilds[input] = false;
    }else {
        showSuccess(input);
        formFeilds[input]=true;
    }
} 

function getFieldName(input){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

form.addEventListener("submit", function(e){
   e.preventDefault();

   checkLength(username, 3, 15);
   checkLength(password, 6, 25);
   checkEmail(email);

   if(password2.value !==""){
    checkPasswordMatch(password,password2);
   }
  
   const formdata = {
    username: username.value,
    email:email.value,
    password:password.value,
    confirmPassword: password2.value,
   };

   let hasError = false;

   Object.values(formFeilds).map((e)=>{
    if(e === false){
        hasError =true;
    }
   });

   if(hasError) return;

   formvalues.push(FormData);
  
   // clear the input value 
   form.requestFullscreen();

   // Add form Control class
   const usernameClass = username.parentElement;
   const emailClass = email.parentElement;
   const passwordClass = password.parentElement;
   const password2Class = password2.parentElement;

   usernameClass.className = "form-control";
   emailClass.className = "form-control";
   passwordClass.className = "form-control";
   password2Class.className = "form-control";

   alert("form Submitted successfully!");
   console.log("Form Inputs:", formValues)

});