'use strict';

import NotePreview from './NotePreview.js';

export default {
  name: 'noteList',
  props: ['notes'],
  template: `
    <section v-if="notes.length" class="note-list">
	<note-preview v-for="note in notes" :note="note" :key="note._id" @removeNote="$emit('removeNote', $event)" />
    </section>
    <section v-else class="note-list"> No Notes Yet!</section>
    `,
  methods: {},
  components: {
    NotePreview,
  },
};
