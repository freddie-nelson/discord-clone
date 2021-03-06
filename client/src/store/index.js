import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    modal: {
      show: false,
      callback: undefined,
      results: {},
      title: undefined,
      description: undefined,
      inputs: undefined
    },
    user: {},
    messages: {},
    chat: {
      chatId: null,
      userId: null,
    },
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
    },
    SET_CURRENT_CHAT(state, { chatId, userId, name }) {
      state.chat.chatId = chatId;
      state.chat.userId = userId;
      state.chat.username = name;
    },
    RECEIVE_MESSAGE(state, message) {
      const messages = { ...state.messages };
      const name = message.userId === state.user.userId ? state.user.username : state.user.friends[message.userId].username;

      const msg = {
        user: {
          name,
          id: message.userId
        },
        id: message.id,
        text: message.text,
        timestamp: message.timestamp,
      };

      messages[message.chatId] ? messages[message.chatId].push(msg) : messages[message.chatId] = [ msg ];
      state.messages = messages;
    },
    SET_MESSAGES(state, messages) {
      const msgs = { ...state.messages };
      
      const fixedMsgs = messages.logs.map(msg => {
        const name = msg.userId === state.user.userId ? state.user.username : state.user.friends[msg.userId].username;

        return {
          user: {
            name,
            id: msg.userId,
          },
          id: msg.id,
          text: msg.text,
          timestamp: msg.timestamp,
        };
      })

      msgs[messages.chatId] = fixedMsgs;
      state.messages = msgs;

      state.chat = { ...state.chat, chatId: messages.chatId }
    },
    MODAL_DETAILS(state, details) {
      state.modal = { ...state.modal, ...details };
    },
    SHOW_MODAL(state, show) {
      // if callback function is provided then add it to modal object
      if (typeof show === "object") {
        state.modal = { ...state.modal, ...show };
      } else {
        state.modal = { ...state.modal, show };
      }
    },
    MODAL_RESULTS(state, results) {
      // save modal results and run callback if exists
      state.modal = { ...state.modal, results };

      if (state.modal.callback) {
        state.modal.callback();
      }
    }
  },
  actions: {},
  modules: {},
});
