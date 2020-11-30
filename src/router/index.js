import Vue from 'vue'
import VueRouter from 'vue-router'
import Friends  from '../views/Friends/TheFriends';
import AddFriend from "../views/TheAddFriend";
import Chat from "../views/Chat/TheChat";
import Auth from "../views/Auth/TheAuth";

Vue.use(VueRouter)

const routes = [
  {
    path: "/login",
    name: "Auth",
    component: Auth
  },
  {
    path: "/",
    name: "Friends",
    component: Friends,
  },
  {
    path: "/add-friend",
    name: "AddFriend",
    component: AddFriend
  },
  {
    path: "/chat/:friend",
    name: "Chat",
    component: Chat,
  }
];

const router = new VueRouter({
  mode: "history",
  routes
})

export default router
