import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    toastQueue: []
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
      state.toastQueue = [...state.toastQueue, toast]
    },
    ADD_FRIEND(state, friend) {
      const user = { ...state.user };

      if(!user.friends) user.friends = {};
      user.friends[friend.userId] = friend;
      if (friend.initiator) delete user.friendRequests[friend.userId];

      state.user = user;
    },
    REMOVE_FRIEND_REQUEST(state, friend) {
      const user = { ...state.user };

      user.friendRequests[friend.userId] = undefined;

      state.user = user;
    }
  },
  actions: {},
  modules: {},
});
