<template>
  <h1>Milk Tanks</h1>
  <form class="form" v-on:submit.prevent>
    <p class="errorMessage" v-if="isServerError">{{ errorMessage }}</p>
    <p class="errorMessage" v-if="isEmpty">Is require field</p>
    <input
      class="form-field form__name-field"
      type="text"
      placeholder="Enter your name"
      v-model.trim="name"
      required
    />
    <p class="errorMessage" v-if="isLowerThanOneOrFolat">Litters must be positive integer number</p>
    <input
      class="form-field form__litters-field"
      type="number"
      placeholder="Enter litters"
      v-model="litters"
      min="1"
      required
    />
    <button
      class="form-button"
      type="submit"
      @click="sendForm();"
    >Fill</button>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';

type IFormData = {
  name: string;
  litters: number;
  isServerError: boolean;
  errorMessage: string;
}

type APIResponse = {
  code: number,
  status: string,
  message?: string,
}

export default defineComponent({
  name: 'Form',
  data(): IFormData {
    return {
      name: '',
      litters: 1,
      errorMessage: '',
      isServerError: false,
    } as IFormData;
  },
  methods: {
    async sendForm() {
      if (!this.isLowerThanOneOrFolat && this.name.length !== 0) {
        const { name, litters } = this;

        const response = await axios.post<APIResponse>('http://localhost:3000/api/v1/fill', { name, litters });

        if (response.data) {
          const { data } = response;
          if (data.code === 200) {
            this.isServerError = false;
            this.errorMessage = '';

            this.$router.push('Journal');
          } else {
            this.isServerError = true;

            if (data.message) this.errorMessage = data.message;
            else this.errorMessage = 'Error. Check your internet connection';
          }
        } else {
          this.isServerError = true;
          this.errorMessage = 'Error. Check your internet connection';
        }
      }
    },
  },
  computed: {
    isLowerThanOneOrFolat() {
      return (this.$data as IFormData).litters < 1 || (this.$data as IFormData).litters % 1 !== 0;
    },

    isEmpty() {
      return (this.$data as IFormData).name === '';
    },
  },
});
</script>

<style scoped lang="scss">
  h1 {
    color: white;
  }

  .form {
    width: 300px;
    height: max-content;
    display: flex;
    flex-direction: column;
    padding: 30px;
    border-radius: 40px;
    box-shadow: 0 0 400px 0 #000000;
    background-color: #151541;
    &__litters-field {
      -moz-appearance:textfield;
      &::-webkit-outer-spin-button, &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }
  }

  .form-field {
    padding: 10px;
    background-color: transparent;
    outline: none;
    color: white;
    box-sizing: border-box;
    box-shadow: inset 0 0 20px 0 #33339990;
    border: 2px solid transparent;
    border-radius: 40px;
    transition: .5s;
    margin-bottom: 20px;
    &:focus {
      box-shadow: 0 0 20px 0 #33339990;
      border: 2px solid #333399;
      border-left: 40px solid #333399;
      background-color: #33339970;
    }
  }

  .form-button {
    padding: 10px;
    background-color: #333399;
    border: none;
    outline: none;
    color: white;
    box-sizing: border-box;
    font-size: 1.1em;
    cursor: pointer;
    border-radius: 40px;
    transition: .5s;
    overflow: hidden;
    &:hover {
      box-shadow: 0 0 20px 0 #33339990;
    }
  }

  .errorMessage {
    background-color: #e2505050;
    padding: 10px;
    margin: 0 0 20px 0;
    color: #ffeeee;
    font-weight: bold;
    font-size: 0.8em;
    border-radius: 40px;
    border-left: 20px solid #e25050;
    text-align: left;
    display: flex;
    align-items: center;
  }

</style>
