goog.provide('tutorial.notepad');
goog.provide('tutorial.notepad.Note');

goog.require('goog.dom');
goog.require('goog.ui.Zippy');

tutorial.notepad.makeNotes = function(data, noteContainer) {
  const notes = [];
  for (let i = 0; i < data.length; i++) {
    const note =
      new tutorial.notepad.Note(data[i].title, data[i].content, noteContainer);
    notes.push(note);
    note.makeNoteDom();
  }
  return notes;
};

tutorial.notepad.Note = function(title, content, noteContainer) {
  this.title = title;
  this.content = content;
  this.parent = noteContainer;
};

tutorial.notepad.Note.prototype.makeNoteDom = function() {
  // Create DOM structure to represent the note.
  this.headerElement = goog.dom.createDom(goog.dom.TagName.DIV,
      {style: 'background-color:#EEE'}, this.title);
  this.contentElement = goog.dom
      .createDom(goog.dom.TagName.DIV, null, this.content);
  const newNote = goog.dom.createDom(goog.dom.TagName.DIV, null,
      this.headerElement, this.contentElement);

  // Add the note's DOM structure to the document.
  goog.dom.appendChild(this.parent, newNote);
  return new goog.ui.Zippy(this.headerElement, this.contentElement);
};
