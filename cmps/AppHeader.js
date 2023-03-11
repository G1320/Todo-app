export default {
  name: 'appHeader',
  template: `
        <header>
            <section class="user-info">
                <RouterLink to="/user">{{user.fullName}}</RouterLink> | \${{user.balance}} 
            </section>
            <h1 class="main-title">App App</h1> 
            <h5>
                <span>{{noteListLength}}</span> 
                Notes in your NoteList
                <button href="#" @click="isNoteListShown=!isNoteListShown" v-if="noteList.length > 0">
                    {{(isNoteListShown)? 'hide' : 'show'}}
                </button> 
            </h5>
            
            <section class="noteList" v-if="isNoteListShown && noteList.length > 0">
                <h5>Your NoteList</h5>
                <ul>
                    <li v-for="note in noteList" :key="note._id">
                        {{note.name}}
                        <button @click="removeFromNoteList(note._id)">x</button>
                    </li>
                </ul>
                <p>Total: \${{noteListTotal}} </p>
                <button @click="checkout">Checkout</button>
            </section>
            <nav>
                <router-link to="/">Home</router-link> | 
                <router-link to="/list">List</router-link>
            </nav>
        </header>
    `,
  data() {
    return {
      isNoteListShown: false,
    };
  },
  computed: {
    noteListLength() {
      return this.$store.state.noteList.length;
    },
    noteListTotal() {
      return this.$store.getters.noteListTotal;
    },
    noteList() {
      return this.$store.state.noteList;
    },
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    removeFromNoteList(noteId) {
      this.$store.commit({ type: 'removeFromNoteList', noteId });
    },
    checkout() {
      console.log('Checkout!');
      this.$store.commit({ type: 'checkout' });
    },
  },
};
