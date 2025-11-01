// Global variables
let notes = [];
let activeNote = null;

// Selecting elements
const noteTitleInput = document.getElementById("noteTitle");
const searchInput = document.getElementById("searchInput");
const noteItems = document.querySelector(".notes-list-sidebar");
const textArea = document.getElementById("noteContentArea");
const newNoteButton = document.getElementById("newNoteButton");
const saveButton = document.getElementById("saveNoteButton");
const deleteButton = document.getElementById("deleteNoteButton");
const closeButton = document.getElementById("closeNoteButton");


// Load notes from localStorage
window.addEventListener("DOMContentLoaded", () => {
    const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    notes = storedNotes;
    displayNotes();
})

// Create a new note
newNoteButton.addEventListener("click", () => {
    noteTitleInput.value = "";
    textArea.value = "";
    activeNote = null;
});

// Save a note
saveButton.addEventListener("click", () => {
    const title = noteTitleInput.value.trim();
    const content = textArea.value.trim();

    if (!title && !content) {
        alert("Cannot save an empty note.");
        return;
    }

    if (activeNote) {
        const existingNote = notes.find(note => note.id === activeNote.id);
        existingNote.title = title;
        existingNote.content = content;
        existingNote.date = new Date();
    } else {
        newNote = { 
            id: Date.now(), 
            title, 
            content, 
            date: new Date()
    };
    notes.push(newNote);
    }

    localStorage.setItem("notes", JSON.stringify(notes));
    displayNotes();
});

// Delete a note
deleteButton.addEventListener("click", () => {
    if (!activeNote) {
        alert("No note selected to delete.");
        return;
    }
    notes = notes.filter(note => note.id !== activeNote.id);
    activeNote = null;
    noteTitleInput.value = "";
    textArea.value = "";
    localStorage.setItem("notes", JSON.stringify(notes));
    displayNotes();
})