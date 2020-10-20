import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {}
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = payload;
    },
    ADD_FRIEND_REQUEST(state, payload) {
      const user = { ...state.user };
      user.friendRequests[payload.userId] = payload;
      state.user = user;
    }
  },
  actions: {},
  modules: {},
});
