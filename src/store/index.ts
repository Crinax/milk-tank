import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    journal: [],
  },
  mutations: {
    setJournal(state, journal) {
      state.journal = journal;
    },
  },
  actions: {
    async setJournal({ commit }) {
      const journal = await axios.get('http://localhost:3000/api/v1/journal');
      commit('setJournal', journal);
    },
  },
  modules: { },
});
