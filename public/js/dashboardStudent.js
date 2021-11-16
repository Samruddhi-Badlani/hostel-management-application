console.log('This is my tutorial 42');

// Button with id myBtn
let myBtn = document.getElementById("showStudentDetails");

// div with id content 
let content = document.getElementById("studentDetailBox");



function showProfile(){
  console.log("Started getData")
    url = "/users/students/profile";
    fetch(url).then((response)=>{
        console.log("Inside first then")
        return response.json();
    }).then((data)=>{
        console.log("Inside second then")
        console.log(data);
    })
}