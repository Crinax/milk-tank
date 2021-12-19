import { createStore } from 'vuex';

export default createStore({
  state: {
    journal: [],
  },
  mutations: {
    setUsers(state, journal) {
      state.journal = journal;
    },
  },
  actions: {
    async setUsers({ commit }) {
      const users = await fetch('http://localhost:3000/');
      commit('setUsers', users);
    },
  },
  modules: { },
});
