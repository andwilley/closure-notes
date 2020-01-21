goog.provide('tutorial.notepad');
goog.provide('tutorial.notepad.Note');

goog.require('goog.dom');
goog.require('goog.ui.Zippy');

tutorial.notepad.makeNotes = function(data, noteContainer) {
  return data.map((d) => {
    const note = new tutorial.notepad.Note(d, noteContainer);
    note.makeNoteDom();
    return note;
  });
};

/**
 * Manages the data and interface for a single note.
 * @param {Array.<Object>} data The data for a single note.
 * @param {Element} noteContainer The element under which DOM nodes for
 *     the notes should be added.
 * @constructor
 */
class Note {
  constructor(data, noteContainer) {
    this.title = data.title;
    this.content = data.content;
    this.parent = noteContainer;
  }

  // NEW: Implements our Save button.
  /**
   * Event handler for clicks on the Save button. Sets the content of the Note
   * to the text in the editor and hides the editor.
   * @param {goog.events.Event} e The event object.
   */
  save(e) {
    this.content = this.editorElement.value;
    this.closeEditor();
  }

  // NEW: Saving closes the editor
  /**
   * Updates the content of the content element, displays the content element,
   * and hids the editor.
   */
  closeEditor() {
    this.contentElement.innerHTML = this.content;
    this.contentElement.style.display = 'inline';
    this.editorContainer.style.display = 'none';
  }

  /**
   * Event handler for clicks on the content element. Clicking on the
   * content element opens the editor field.
   * @param {goog.events.Event} e The event object.
   */
  openEditor(e) {
    this.editorElement.value = this.content;
    this.contentElement.style.display = 'none';
    this.editorContainer.style.display = 'inline';
  }

  /**
   * Creates the DOM structure for the note and adds it to the document.
   */
  makeNoteDom() {
    // Create DOM structure to represent the note.
    this.headerElement =
        goog.dom.createDom(goog.dom.TagName.DIV, null, this.title);
    this.contentElement =
        goog.dom.createDom(goog.dom.TagName.DIV, null, this.content);

    // Create the editor text area and save button.
    this.editorElement = goog.dom.createDom(goog.dom.TagName.TEXTAREA);
    const saveBtn = goog.dom.createDom(
        goog.dom.TagName.INPUT, {'type': 'button', 'value': 'Save'});
    this.editorContainer = goog.dom.createDom(
        goog.dom.TagName.DIV, {'style': 'display:none;'}, this.editorElement,
        saveBtn);

    this.contentContainer = goog.dom.createDom(
        goog.dom.TagName.DIV, null, this.contentElement, this.editorContainer);

    // Wrap the editor and the content div in a single parent so they can
    // be toggled in unison.
    const newNote = goog.dom.createDom(
        goog.dom.TagName.DIV, null, this.headerElement, this.contentContainer);

    // Add the note's DOM structure to the document.
    this.parent.appendChild(newNote);

    // Attach the event handler that opens the editor.
    // CHANGED: We need to preserve the meaning of 'this' when the handler
    // is called.
    goog.events.listen(this.contentElement, goog.events.EventType.CLICK,
        this.openEditor, false, this);

    // NEW:
    goog.events.listen(saveBtn, goog.events.EventType.CLICK,
        this.save, false, this);

    // Attach the Zippy behavior.
    this.zippy = new goog.ui.Zippy(this.headerElement, this.contentContainer);
  }
}

tutorial.notepad.Note = Note;

