document.addEventListener('DOMContentLoaded', function() {
  const noteInput = document.getElementById('noteInput');
  const addNoteBtn = document.getElementById('addNote');
  const notesList = document.getElementById('notesList');
  let emptyNoteCount = 1;

  addNoteBtn.addEventListener('click', function() {
    const noteText = noteInput.value.trim();

    if (noteText !== '') {
      const li = document.createElement('li');
      li.textContent = noteText;

      const saveBtn = document.createElement('button');
      saveBtn.innerHTML = '&#128190;'; // Unicode representation of "floppy disk" symbol
      saveBtn.className = 'saveBtn';
      li.appendChild(saveBtn);

      notesList.appendChild(li);
      noteInput.value = '';

      saveBtn.addEventListener('click', function() {
        saveNoteToFile(noteText);
      });

      li.addEventListener('dblclick', function() {
        this.remove();
      });
    } else {
      const li = document.createElement('li');
      li.textContent = `Empty Note ${emptyNoteCount}`;
      emptyNoteCount++;

      notesList.appendChild(li);

      // Automatically delete the empty note after 5 seconds
      setTimeout(function() {
        li.remove();
      }, 5000);
    }
  });

  function saveNoteToFile(noteText) {
    const blob = new Blob([noteText], { type: 'text/plain' });
    const anchor = document.createElement('a');
    anchor.href = URL.createObjectURL(blob);
    anchor.download = 'note.txt';
    anchor.click();
  }
});
