// Variable Initialization
const addNoteBtn = document.getElementById("add-note-btn");
const newNote = document.getElementById("newNote");
const notesContainer = document.getElementById("notes-container");
const themeToggle = document.getElementById("toggle-theme-btn");
const body = document.body;

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
   noteDiv.classList.add('note-item');

   const noteText = document.createElement('pre');
   noteText.textContent = text;

   const editBtn = document.createElement('button');
   editBtn.textContent = 'Edit';
   editBtn.addEventListener("click", () => editNote(text, index || getNoteIndex(text)));

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


// Switching to dark mode
themeToggle.addEventListener("click", () => {
   body.classList.toggle('dark');
   themeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});