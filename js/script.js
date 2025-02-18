/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/



/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

let student_list = document.querySelector(".student-list");
let link_list = document.querySelector(".link-list");
function showPage(list, page){

   let start = (page * 9) - 9;
   let end = page * 9;

   const student_list = document.querySelector(".student-list");

   student_list.innerHTML = "";

   list.forEach((element, index) => {
      
      //Siamo nella pagina 1. Durante il cliclo dobbiamo verificare che la condizione sia vera
      //Solo per gli elementi che vanno dall'indice 0 a 10;

      if(index >= start && index < end){

         let studentHTML = `<li class="student-item cf">
                              <div class="student-details">
                                 <img class="avatar" src="${element.picture.thumbnail}" alt="Profile Picture">
                                 <h3>${element.name.title} ${element.name.first} ${element.name.last}</h3>
                                 <span class="email">${element.email}</span>
                              </div>
                              <div class="joined-details">
                                 <span class="date">Joined ${element.registered.date}</span>
                              </div>
                           </li>`


         student_list.insertAdjacentHTML("beforeend", studentHTML);
      }

   });
}


/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(list){

   let nButtons = list.length / 9; //per ogni bottone che equivale ad una pagina ci devono essere nove elementi

   let link_list = document.querySelector(".link-list");

   link_list.innerHTML = "";

   for(let i = 0; i < nButtons; i++){

      let buttonHTML = `<li><button>${i + 1}</button></li>`

      link_list.insertAdjacentHTML("beforeend", buttonHTML);
   }

   document.querySelector(".link-list > li:first-child button").classList.add("active");
}


link_list.addEventListener("click", (e)=>{

   let activeButton = document.querySelector("button.active");

   if(e.target.tagName === "BUTTON"){

      activeButton.classList.remove("active");
      e.target.classList.add("active");

      showPage(data, +e.target.textContent);

   }


});


const search = document.querySelector("#search");
search.addEventListener("keyup", e => {

   let filteredArray = [];

   let  inputValue = e.target.value.toLowerCase();


   data.forEach((element, index) => {

      let completeCredential =  `${element.name.title} ${element.name.first} ${element.name.last}`;
      let checkCredential = completeCredential.toLowerCase().includes(inputValue);

      if(checkCredential){

         filteredArray.push(element);
         addPagination(filteredArray);
         showPage(filteredArray, 1);
      }

      if(filteredArray.length > 0){
         addPagination(filteredArray);
         showPage(filteredArray, 1);
      }else{
         student_list.innerHTML = `<h1>No results were found</h1>`;
         link_list.innerHTML = "";
      }

   })
})



// Call functions
addPagination(data);
showPage(data, 1);

