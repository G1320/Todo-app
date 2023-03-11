const { createStore } = Vuex;

import { showErrorMsg } from '../services/event-bus.service.js';
import { noteService } from '../services/note.service.js';
import { userService } from '../services/user.service.js';
import { utilService } from '../services/util.service.js';

const storeOptions = {
  strict: true,
  state() {
    return {
      count: 99,
      user: userService.getLoggedinUser(),
      notes: noteService.query(),
      noteList: [],
    };
  },
  mutations: {
    increment(state, { val }) {
      console.log(val);
      state.count += val;
    },
    addToNoteList(state, { note }) {
      state.noteList.push(note);
    },
    removeFromNoteList(state, { noteId }) {
      const idx = state.noteList.findIndex((note) => note._id === noteId);
      state.noteList.splice(idx, 1);
    },
    addNote({ notes }, { note }) {
      const savedNote = noteService.save(note);
      notes.push(savedNote);
    },
    checkout(state) {
      const total = state.noteList.reduce((acc, prd) => acc + prd.price, 0);
      if (state.user.balance < total) {
        showErrorMsg('Insufficient funds');
        return;
      }
      const order = {
        _id: utilService.makeId(),
        createdAt: Date.now(),
        items: state.noteList,
        total,
        status: 'pending',
      };
      userService.addOrder(order);

      state.user.orders.push(order);
      state.user.balance -= total;
      state.noteList = [];
    },
    toggleOrderStatus(state, { orderId }) {
      userService.toggleOrderStatus(orderId);

      const order = state.user.orders.find((order) => order._id === orderId);
      order.status = order.status === 'pending' ? 'approved' : 'pending';
    },
    updateBalance(state, { amount }) {
      userService.updateBalance(amount);
      state.user.balance += amount;
    },
  },
  getters: {
    noteListTotal({ noteList }) {
      return noteList.reduce((acc, prd) => acc + prd.price, 0);
    },
  },
};
export const store = createStore(storeOptions);
