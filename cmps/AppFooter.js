export default {
  template: `
        <footer>
            <h4>NoteList Total: \${{ totalPrice }}</h4>
            <h4>Count: {{ count }}</h4>
        </footer>
    `,
  computed: {
    totalPrice() {
      return this.$store.getters.notelistTotal;
    },
    count() {
      return this.$store.state.count;
    },
  },
};
