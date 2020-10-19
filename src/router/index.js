import Vue from 'vue'
import VueRouter from 'vue-router'
import Friends  from '../views/Friends/TheFriends';
import AddFriend from "../views/TheAddFriend";
import Chat from "../views/Chat/TheChat";
import Auth from "../views/Auth/TheAuth";

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Auth",
    component: Auth
  },
  {
    path: "/friends",
    name: "Friends",
    component: Friends,
  },
  {
    path: "/add-friend",
    name: "AddFriend",
    component: AddFriend
  },
  {
    path: "/chat",
    name: "Chat",
    component: Chat,
  }
];

const router = new VueRouter({
  routes
})

export default router
