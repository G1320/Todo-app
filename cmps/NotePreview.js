'use strict';

export default {
  name: 'notePreview',
  props: ['note'],
  template: `<article className="bug-preview">
                <span>🐛</span>
                <!-- <pre>{{ note }}</pre> -->
                <h4>{{note.name}}</h4>
                <div class="actions">
                  <router-link :to="'/note/' + note._id">Details</router-link>
                  <router-link :to="'/note/edit/' + note._id"> Edit</router-link>
                </div>
                <button @click="onRemove(note._id)">X</button>
              </article>`,
  methods: {
    onRemove(noteId) {
      this.$emit('removeNote', noteId);
    },
  },
};
