<template>
  <div class="form">
    <Form />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Form from '@/components/Form.vue'; // @ is an alias to /src

export default defineComponent({
  name: 'Home',
  components: {
    Form,
  },
});
</script>
