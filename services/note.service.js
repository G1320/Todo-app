// NOTE: this is a synchronous service on purpose
// meant to simplify first intro to Vuex

import { storageService } from './storage.service.js';
import { utilService } from './util.service.js';

const KEY = 'notesDB';

export const noteService = {
  query,
  getById,
  remove,
  save,
  getEmptyNote,
};

var gNotes = _createNotes();

// TODO: support paging and filtering and sorting
function query() {
  const notes = JSON.parse(JSON.stringify(gNotes));
  return notes;
}

function getById(id) {
  console.log('id: ', id);

  return gNotes.find((note) => note._id === id);
}

function remove(id) {
  const idx = gNotes.findIndex((note) => note._id === id);
  gNotes.splice(idx, 1);
  storageService.store(KEY, gNotes);
}

function save(note) {
  const noteToSave = JSON.parse(JSON.stringify(note));
  const savedNote = noteToSave._id ? _update(noteToSave) : _add(noteToSave);

  storageService.store(KEY, gNotes);
  return savedNote;
}

function _add(note) {
  note._id = utilService.makeId();
  gNotes.push(note);
  return note;
}

function _update(note) {
  const idx = gNotes.findIndex((currNote) => currNote._id === note._id);
  gNotes.splice(idx, 1, note);
  return note;
}

function getEmptyNote() {
  return {
    _id: '',
    name: '',
    price: 100,
  };
}

function _createNotes() {
  var notes = storageService.load(KEY);
  if (!notes || !notes.length) {
    notes = [_createNote('Television 55 inch'), _createNote('Tape Double Cassette')];
    storageService.store(KEY, notes);
  }
  return notes;
}

function _createNote(name) {
  return {
    _id: utilService.makeId(),
    name,
    price: 80,
  };
}
