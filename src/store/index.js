import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    toastQueue: [],
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = payload;
    },
    ADD_FRIEND_REQUEST(state, payload) {
      const user = { ...state.user };
      if (!user.friendRequests) user.friendRequests = {};
      user.friendRequests[payload.userId] = payload;
      state.user = user;
    },
    ADD_TOAST(state, toast) {
      const queue = state.toastQueue;
      queue.push(toast);
      state.toastQueue = queue;
    },
    ADD_FRIEND(state, friend) {
      const user = { ...state.user };

      if (!user.friends) user.friends = {};
      user.friends[friend.userId] = friend;
      if (friend.initiator) delete user.friendRequests[friend.userId];

      state.user = user;
    },
    REMOVE_FRIEND_REQUEST(state, friend) {
      const user = { ...state.user };
      try {
        delete user.friendRequests[friend.userId];
      } catch {
        return;
      }
      state.user = user;
    },
    REMOVE_FRIEND(state, userId) {
      const user = { ...state.user };
      try {
        delete user.friends[userId];
      } catch {
        return;
      }
      state.user = user;
    },
    SET_TOAST_QUEUE(state, queue) {
      state.toastQueue = queue;
    }
  },
  actions: {},
  modules: {},
});
