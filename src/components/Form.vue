<template>
  <div>
    <input
      class="form-field form__name-field"
      type="text"
      name="name"
      placeholder="Enter your name"
    />
    <input
      class="form-field form__litters-field"
      type="number"
      name="litters"
      placeholder="Enter litters"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Form',
  props: {
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
