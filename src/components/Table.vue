<template>
  <table>
    <thead>
      <h1 @click="f();">Milk Tanks Statistic</h1>
    </thead>
    <tbody>
      {{ tableBody }}
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import store from '@/store/';

export default defineComponent({
  name: 'Table',
  store,
  data() {
    return {
      journal: store.state.journal,
    };
  },
  methods: {
    async f() {
      await store.dispatch('setJournal');
      console.log(this.journal);
    },
    getJournal() {
      return store.state.journal;
    },
  },
});
</script>

<style scoped lang="scss">

</style>
