import { showSuccessMsg } from '../services/event-bus.service.js';
import { noteService } from '../services/note.service.js';
import noteList from '../cmps/NoteList.js';

export default {
  template: `
        <section class="list-app">
            <h1>The List</h1>   
            <ul>
                <li v-for="note in notes">
                   <!-- <h1>{{note}}</h1>  -->
                   <note-list v-if="notes" :notes="notes" @removeNote="removeNote">
                     </note-list>
                    <button @click="addToNoteList(note)">Add to NoteList</button>
                  
		<!-- {{notesToDisplay}} -->

                </li>
            </ul>
            <hr />

            <h3>Add Note</h3>
            <form @submit.prevent="addNote">
                <input type="text" placeholder="Name" v-model="noteToEdit.name" />
                <input type="number" placeholder="Price" v-model.number="noteToEdit.price" />
                <button>Save</button>
            </form>

        </section>
    `,
  data() {
    return {
      notes: this.$store.state.notes,
      noteToEdit: noteService.getEmptyNote(),
    };
  },
  computed: {
    notesToDisplay() {
      return this.$store.state.notes;
    },
  },
  methods: {
    addToNoteList(note) {
      this.$store.commit({ type: 'addToNoteList', note });
      showSuccessMsg(`TODO: Add ${note._id} to NoteList`);
    },
    addNote() {
      this.$store.commit({ type: 'addNote', note: this.noteToEdit });
      this.noteToEdit = noteService.getEmptyNote();
    },
    removeNote(noteId) {
      noteService.remove(noteId).then(() => this.loadNotes());
    },
  },
  components: {
    noteList,
  },
};
