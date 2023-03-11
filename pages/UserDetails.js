export default {
  template: `
        <h3 v-if="user.orders.length === 0">No orders yet. 
            <RouterLink to="/list">Make your first one!</RouterLink>
        </h3>
        <section v-else class="user-details">
            <ul>
                <li v-for="order in user.orders">
                    <details>
                        <summary>{{ order.items.length }} Items</summary>
                        <pre>{{ order }}</pre>
                        <button @click="toggleOrderStatus(order._id)">
                            {{ order.status === 'pending' ? 'approve' : 'cancel' }}
                        </button>
                    </details>
                </li>
            </ul>

        </section>
        <h3>Add Jubot</h3>
        <form class="add-funds" @submit.prevent="addFunds">
            <input type="number" v-model.number="amount">
            <button>Add!</button>
        </form>
    `,
  data() {
    return {
      amount: 0,
    };
  },
  methods: {
    toggleOrderStatus(orderId) {
      this.$store.commit({ type: 'toggleOrderStatus', orderId });
    },
    addFunds() {
      this.$store.commit({ type: 'updateBalance', amount: this.amount });
      this.amount = 0;
    },
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
};
