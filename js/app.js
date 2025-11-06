// Global variables
const storageKey = "notesAppData";
let notes = [];
let activeNoteId = null;

// Shortcut for selecting elements
const element = id => document.getElementById(id);

// Saving notes to local storage
function saveToStorage () {
    localStorage.setItem(storageKey, JSON.stringify(notes));
}

// Retrieving notes from local storage
function loadFromStorage () {
    const notesJSON = localStorage.getItem(storageKey);

    if (notesJSON) {
        try {
            notes = JSON.parse(notesJSON);
            return notes;
        } catch (error) {
            console.error("Error parsing notes from local storage:", error);
            return [];
        }
    }
}

// Format timestamp into a readable string (to see the updates on each note chronologically)
function formatDate (timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString();
}

// Render list of notes in the sidebar
const renderList = filter => {
    const listItem = element("notes-list");
    listItem.innerHTML = "";

// Filter and sort notes (being able to use the search functionality)
const items = notes.filter(n => {
    if (!filter) return true;
    const search = filter.toLowerCase();
    return n.title.toLowerCase().includes(search)
    || n.content.toLowerCase().includes(search)
    || (n.tags || []).join('').toLowerCase().includes(search);
})
.sort((a,b) => b.updated - a.updated);

// Show message if no notes found 
if (items.length === 0) {
    const paragraph = document.createElement("div");
    paragraph.textContent = "No notes found";
    notes-list.appendChild(paragraph);
    return;
}

// Render each note as a card in the list
items.forEach(n => {
    const item = document.createElement("div");
    item.className = 'note-item';
    item.dataset.id = n.id;

    const itemTitle = document.createElement("div");
    itemTitle.textContent = n.title || 'Untitled';
    item.appendChild(itemTitle);

    const meta = document.createElement("div");
    meta.className = 'meta';
    meta.textContent = formatDate(n.updated);
    item.appendChild(meta);

    // Click event to open note in editor
    item.addEventListener("click", () => openEditor(n.id));
    listItem.appendChild(item);
})
}



