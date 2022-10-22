import { renderNotes } from "./app.js"

let note = document.querySelector(".note");
let title = document.querySelector(".title");
let addNoteButton = document.querySelector(".button");
let notesDisplay = document.querySelector(".notes-display");
let showOtherNotes = document.querySelector(".notes-container");
let showPinnedNotes = document.querySelector(".pinned-notes-container");
let pinTitle = document.querySelector(".pin-title");
let otherTitle = document.querySelector(".other-title");

// let arrayofNotes = [{id:Date.now(),note:"this is note",title:"this is title",isPinned:false, isArchived:false}];
let arrayOfNotes = JSON.parse(localStorage.getItem("notes")) || [];


if (arrayOfNotes.length > 0){
    pinTitle.classList.toggle("d-none");
    otherTitle.classList.toggle("d-none");
}



addNoteButton.addEventListener("click", () => {
    if (note.value.trim().length > 0 || title.value.trim().length > 0) {
         
        arrayOfNotes = [...arrayOfNotes , {id:Date.now(),title:title.value.trim(),note:note.value.trim(),isPinned:false,isArchived:false}]
        note.value = title.value = "";
        showOtherNotes.innerHTML = renderNotes(arrayOfNotes.filter(({
            isPinned, isArchived
        }) => !isPinned && !isArchived));
        localStorage.setItem("notes", JSON.stringify(arrayOfNotes));
    }
});

notesDisplay.addEventListener("click", (event) => {
    // console.log(event.target.dataset.type);
    let noteId = event.target.dataset.id;
    let type = event.target.dataset.type;

    // console.log({type,notesId});

    switch (type) {
        case "del":
            arrayOfNotes = arrayOfNotes.filter(({id}) => id.toString() !== noteId);
            showOtherNotes.innerHTML = renderNotes(arrayOfNotes.filter(({isPinned, isArchived}) => !isPinned && !isArchived));
            showPinnedNotes.innerHTML = renderNotes(arrayOfNotes.filter(({isPinned}) => isPinned));
            localStorage.setItem("notes", JSON.stringify(arrayOfNotes));
            break;

        case "pinned":
            arrayOfNotes = arrayOfNotes.map(note => note.id.toString() === noteId ? {
                ...note,
                isPinned: !note.isPinned
            } : note);

            // console.log(arrayOfNotes);

            showOtherNotes.innerHTML = renderNotes(arrayOfNotes.filter(({
                isPinned, isArchived
            }) => !isPinned && !isArchived));
            showPinnedNotes.innerHTML = renderNotes(arrayOfNotes.filter(({
                isPinned
            }) => isPinned));
            localStorage.setItem("notes", JSON.stringify(arrayOfNotes));
            break;
        case "archived":
            arrayOfNotes = arrayOfNotes.map(note => note.id.toString() === noteId ? {
                ...note,
                isArchived: !note.isArchived
            } : note);
            showOtherNotes.innerHTML = renderNotes(arrayOfNotes.filter(({
                isPinned, isArchived
            }) => !isPinned && !isArchived));
            //code
            
            showPinnedNotes.innerHTML = renderNotes(arrayOfNotes.filter(({
                isPinned,isArchived
            })=>isPinned && !isArchived))

            localStorage.setItem("notes", JSON.stringify(arrayOfNotes));
            break;
        default:
            console.log("none");
    }
})

showOtherNotes.innerHTML = renderNotes(arrayOfNotes.filter(({
    isPinned, isArchived
}) => !isPinned && !isArchived));
showPinnedNotes.innerHTML = renderNotes(arrayOfNotes.filter(({
    isPinned
}) => isPinned));
