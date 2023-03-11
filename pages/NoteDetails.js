import { noteService } from '../services/note.service.js';

export default {
  template: `
    <section v-if="note" class="note-details">
        <h1>{{note}}</h1>
        <router-link to="/note">Back</router-link>
    </section>
    `,
  data() {
    return {
      note: null,
    };
  },
  created() {
    const { noteId } = this.$route.params;
    console.log('noteId: ', noteId);
    if (noteId) {
      this.note = noteService.getById(noteId);
    }
  },
};
