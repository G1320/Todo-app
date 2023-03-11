const { createRouter, createWebHashHistory } = VueRouter;

import HomePage from './pages/HomePage.js';
import TodoIndex from './pages/TodoIndex.js';
import UserDetails from './pages/UserDetails.js';
import NoteDetails from './pages/NoteDetails.js';

const routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/list',
    component: TodoIndex,
  },
  {
    path: '/user',
    component: UserDetails,
  },
  {
    path: '/note/:noteId',
    component: NoteDetails,
  },
];

export const router = createRouter({
  routes,
  history: createWebHashHistory(),
});
