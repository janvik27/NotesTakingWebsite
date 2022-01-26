console.log("this is a notes making app");

//whenevr user reloads the page, he should be able to see all the notes
showNotes();

//if user adds a note, add it to the local storage
let btn= document.getElementById("addBtn");
btn.addEventListener("click",function f(){
    let text= document.getElementById("addTxt");

    //checking whether there are any notes in the local storage
    let notes= localStorage.getItem("notes");
    if(notes==null)
    {
        notesObj=[];
    }
    else
    {
        notesObj= JSON.parse(notes);
    }

    //now pushingthe current note to the notesObj array
    notesObj.push(text.value);
    localStorage.setItem("notes",JSON.stringify(notesObj));
    text.value="";

    //function to show the notes created
    showNotes();
})

//function which reads the notes from local storage and shows them
function showNotes()
{
    let notes=localStorage.getItem("notes");
    if(notes==null)
    {
        notesObj=[];
    }
    else{
        notesObj= JSON.parse(notes);
    }

    let card="";  //variable for storing the html of a card
    notesObj.forEach(function f(element,index){
        card+= `<div class="noteCard mx-2 my-2 card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">Note ${index+1}</h5>
          <p class="card-text">${element}</p>
          
          <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
        </div>
    </div>`
    })

    let notesElement= document.getElementById("notes");

    //if there are notes existing, then set each note's inner html as that of card's html
    if(notesObj.length != 0)
    {
        notesElement.innerHTML=card;
    }

    //if there are no notes existing
    else
    {
        notesElement.innerHTML= `<i>There are no notes yet. Use "Add a Note" section above to add the notes.</i>`
    }

}

//function to delete a note
//whenevr someone will click on the delete button in the card, the delete function will be called
function deleteNote(index)
{
    console.log("i am deleting",index);
    
    //fetch all the existing notes in the form of array
    let notes= localStorage.getItem("notes");
    if(notes==null)
    {
        notesObj=[];
    }
    else
    {
        notesObj= JSON.parse(notes);
    }

    //splicing the particular note from the array
    notesObj.splice(index,1); //deletes 1 element rom the particular index

    //updating the local storage with new noteobject
    localStorage.setItem("notes",JSON.stringify(notesObj));
    showNotes();
}

//SEARCH FUNCTIONALITY
//whenevr user searches something, then show the corresponding note

//get the text to be searched
let search= document.getElementById("searchTxt");

//adding an event listener to input bar, i.e whenever you enter something, it calls the function
search.addEventListener("input",function(){
    let inputVal= search.value.toLowerCase();

    let noteCards= document.getElementsByClassName("noteCard");
    Array.from(noteCards).forEach(function f(element){
        let cardTxt= element.getElementsByTagName("p")[0].innerText;

        if(cardTxt.includes(inputVal))
        {
            element.style.display="block";
        }
        else
        {
            element.style.display="none";
        }
    })
})
