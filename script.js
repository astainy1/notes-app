//Testing connection
// alert('Connected successfully!');

//Get reference to all necessary HTML element
const noteContainer = document.querySelector('.content_container'),
createNotes = document.querySelector('#create_notes'),
popupBox = document.querySelector('.popup_main_container'),
overLay = document.querySelector('.overlay_container'),
closePopup = document.querySelector('#close'),
noteTitle = document.querySelector('#note_title'),
noteDescription = document.querySelector('#note_desctiption'),
noteError = document.querySelector('#note_error'),
saveNote = document.querySelector('#save_notes');


//Global variable(s)
const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

    /*
    Get key named Notes in LocalStorage if exist and parse them into Js object, 
    else get empty array from localStorage.
*/
const allNotes = JSON.parse(localStorage.getItem("Notes") || "[]");


//Load all notes before other scripts
// document.addEventListener('DOMContentLoaded', () =>{
//     displayNotes();
// })

displayNotes();

//function for saving notes
function saveNotes() {
    //Prevent the refreshing of the submit button
    // e.preventDefault();

    //Get inputs fields values
    const notesTitle = noteTitle.value,
    notesDescription = noteDescription.value;
    
    if(notesTitle && notesDescription ){
        //Store MM/DD/YY of current date into variables
        const dateObj = new Date(),
        newMonth = months[dateObj.getMonth()],
        newDate = dateObj.getDate(),
        newYear = dateObj.getFullYear();

        //Store variables into array object
        let notes = 
            {
                title : notesTitle,
                discription : notesDescription,
                date : `${newMonth} ${newDate}, ${newYear}`
            }
            //Store notes into array and push for every new notes
            allNotes.push(notes);

            //Store notes into localStorage
            localStorage.setItem("Notes", JSON.stringify(allNotes))
            
            // console.log(allNotes)
            //hide popup after saving notes
            hidePopup();
            displayNotes();
    }else{
        noteError.textContent = "Please check your input field(s)";
        console.log('There is no value');
    }

}

//function to display data from localStorage
function displayNotes() {
    /* Remove/delete any previous note */
    document.querySelectorAll('.notes_container').forEach(note => note.remove());
    
    //Loop over each note
    allNotes.forEach((note, index) => {
        console.log(note)
        
        //If there is a note, display it else set display to none
        if(allNotes){

            // let newDivContainer = document.createElement('div');
            let newDiv = document.createElement('div');
            
            newDiv.classList.add('notes_container');

            // console.log(newDiv);

            newDiv.innerHTML = 
            `
                <div>
                    <h4>${note.title}</h4>
                    <p>${note.discription}</p>
                </div>
                <div class="date_and_action_container">
                    <span>${note.date}</span>
                    <div class="action_icons">
                        <div onclick="deleteNote(${index})"><i class="fa fa-trash"></i></div>
                        <div onclick="updateNote(${index}, '${note.title}', '${note.discription}')"><i class="fa fa-pen"></i></div>
                    </div>
                </div>

        `;  

        noteContainer.insertAdjacentElement('beforeend', newDiv)
        }else{
            noteContainer.style.display = 'none';
        }

    });

}

//function for deleting notes
function deleteNote(noteId){
    allNotes.splice(noteId, 1);//removing selected note
    console.log(noteId)

    //Store updated notes to localStorage
    localStorage.setItem("Notes", JSON.stringify(allNotes));
    displayNotes();
}

//function for updating notes
function updateNote(noteId, title, description){
    // console.log(noteId, title, description);
    //display popup with existing data
    showPopup()
    noteTitle.value = `${title}`;
    noteDescription.value = `${description}`;
    saveNote()
}

//function for displaying popup
function showPopup(){
    overLay.classList.add('show_overlay');
    popupBox.classList.add('show_popup');
    // console.log(popupBox);
}

//function for hidding popup
function hidePopup() {
    //clear form after save/hidding
    noteTitle.value = '';
    noteDescription.value = '';
    noteError.textContent = ''

    overLay.classList.remove('show_overlay');
    popupBox.classList.remove('show_popup');
    // console.log(closePopup);

}

//Event Listeners for showing and hidding popup
createNotes.addEventListener('click', showPopup);
closePopup.addEventListener('click', hidePopup);

//Event Listeners for saving notes
saveNote.addEventListener('click', saveNotes)
