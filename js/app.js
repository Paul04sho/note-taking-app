// Variable Initialization
const addNoteBtn = document.getElementById("add-note-btn");
const newNote = document.getElementById("newNote");
const notesContainer = document.getElementById("notesContainer");
const themeToggle = document.getElementById("toggle-theme-btn");
const body = document.body;
let editingNoteIndex = null;

// Loading saved notes on page load
window.addEventListener("load", () => {
   const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
   savedNotes.forEach((note, index) => createNoteElement(note, index));
});

// To add or update a note
addNoteBtn.addEventListener("click", () => {
   const noteText = newNote.value;
   if (noteText.trim() === '') return;

   if (editingNoteIndex !== null) {
      updateNoteInLocalStorage(noteText, editingNoteIndex);
      resetInput();
   } else {
      createNoteElement(noteText);
      saveNoteToLocalStorage(noteText);
   }
   newNote.value = '';
});

// To create a note element
function createNoteElement(text, index = null) {
   const noteDiv = document.createElement('div');
   noteDiv.classList.add('note');

   const noteText = document.createElement('pre');
   noteText.textContent = text;

   const editBtn = document.createElement('button');
   editBtn.textContent = 'Edit';
   editBtn.addEventListener("click", () => editNote(text, index ?? getNoteIndex(text)));

   const deleteBtn = document.createElement('button');
   deleteBtn.textContent = 'Delete';
   deleteBtn.addEventListener("click", () => {
      noteDiv.remove();
      deleteNoteFromLocalStorage(text);
   });

   noteDiv.appendChild(noteText);
   noteDiv.appendChild(editBtn);
   noteDiv.appendChild(deleteBtn);
   notesContainer.appendChild(noteDiv);
}

// Save new notes to LocalStorage (every time we'll access the page we'll see our previous notes)
function saveNoteToLocalStorage(note) {
   const notes = JSON.parse(localStorage.getItem('notes')) || [];
   notes.push(note);
   localStorage.setItem('notes', JSON.stringify(notes));
}

// Updating an existing note
function updateNoteInLocalStorage(newText, index) {
   const notes = JSON.parse(localStorage.getItem('notes'));
   notes[index] = newText;
   localStorage.setItem('notes', JSON.stringify(notes));

   // Refresh the UI
   notesContainer.innerHTML = '';
   notes.forEach((note, i) => createNoteElement(note, i));
   editingNoteIndex = null;
}

// Deleting notes from LocalStorage
function deleteNoteFromLocalStorage(note) {
   const notes = JSON.parse(localStorage.getItem('notes')) || [];
   const updatedNotes = notes.filter(n => n !== note);
   localStorage.setItem('notes', JSON.stringify(updatedNotes)); 
}

// Editing a note
function editNote(text, index) {
   newNote.value = text; // Load the note into the input field
   editingNoteIndex = index; // Track the index for update
   addNoteBtn.textContent = 'Update Note'; // Change button text
}

// Helper Function : get note index
function getNoteIndex(text) {
   const notes = JSON.parse(localStorage.getItem('notes'));
   return notes.indexOf(text);
}

// Reset input and button text
function resetInput () {
   newNote.value = '';
   addNoteBtn.textContent = 'Add Note';
}


// Switching to dark mode
themeToggle.addEventListener("click", () => {
   body.classList.toggle('dark');
   themeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});
