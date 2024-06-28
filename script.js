//Testing connection
// alert('Connected successfully!');

//Get reference to all necessary HTML element
const createNotes = document.querySelector('#create_notes'),
popupBox = document.querySelector('.popup_main_container'),
overLay = document.querySelector('.overlay_container'),
closePopup = document.querySelector('#close'),
noteTitle = document.querySelector('#note_title'),
noteDescription = document.querySelector('#note_desctiption'),
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
const allNotes = JSON.parse(localStorage.getItem('Notes') ||  '[]');

// let storeData = localStorage.getItem('Notes')

//function for saving notes
function saveNotes(e) {
    e.preventDefault();

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
        let noteData = 
            {
                title : notesTitle,
                discription : notesDescription,
                date : `${newMonth} ${newDate}, ${newYear}`
            }

            //Store notes into array and push for every new notes
            let allNotes = [];
            allNotes.push(noteData);

            localStorage.setItem('Notes', JSON.stringify(allNotes))
            
        console.log(allNotes)
    }else{
        console.log('There is no value');
    }
    
    //Check there is any note in;localStorag
}

//function for displaying popup
function showPopup(){
    overLay.classList.add('show_overlay');
    popupBox.classList.add('show_popup');
    // console.log(popupBox);
}

//function for hidding popup
function hidePopup() {
    overLay.classList.remove('show_overlay');
    popupBox.classList.remove('show_popup');
    // console.log(closePopup);
}

//Event Listeners for showing and hidding popup
createNotes.addEventListener('click', showPopup);
closePopup.addEventListener('click', hidePopup);

//Event Listeners for saving notes
saveNote.addEventListener('click', saveNotes)

