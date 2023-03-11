import { showSuccessMsg } from '../services/event-bus.service.js';
import { noteService } from '../services/note.service.js';

export default {
  name: 'homePage',
  template: `
        <section class="home">
            <h1>Hi {{user.fullName}}!</h1>
            <h1>We have {{noteCount}} Notes!</h1>
            <h2>
                Count {{countForDisplay}}
                <button @click="inc(1)">+</button>
                <button @click="inc(10)">+10</button>
            </h2>
            <img src="img/logo.png"/>
        </section>
    `,
  data() {
    return {};
  },
  created() {},
  methods: {
    inc(val) {
      this.$store.commit({ type: 'increment', val });
    },
  },
  computed: {
    countForDisplay() {
      return this.$store.state.count;
    },
    user() {
      return this.$store.state.user;
    },
    noteCount() {
      return this.$store.state.notes.length;
    },
  },
};
