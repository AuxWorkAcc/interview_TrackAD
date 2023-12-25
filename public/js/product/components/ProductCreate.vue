<template>
    <form @submit.prevent="submitForm">
      <div>
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="product.name" required>
      </div>
      <div>
        <label for="price">Price:</label>
        <input type="number" id="price" v-model="product.price" step="0.01" required>
      </div>
      <div>
        <label for="description">Description:</label>
        <textarea id="description" v-model="product.description" required></textarea>
      </div>
      <button type="submit" :disabled="store.isLoading">Create Product</button>
    </form>
  </template>
  
  <script>
  import { ref } from 'vue';
  import axios from 'axios';
  import { useStore } from 'pinia';
  
  export default {
    setup() {
      const product = ref({
        name: '',
        price: '',
        description: ''
      });
  
      const store = useStore('main');
  
      const submitForm = async () => {
        store.setLoading(true);
        store.setError(null);
  
        try {
          await axios.post('/api/product_create', product.value);
  
            //  Requirements for the backend API for products creation (Starting line.)
  
            // 1. Body of request (JSON) acepted by API must be:

                // {
                //     "name": "<Product Name>",
                //     "price": "<Product Price>",
                //     "description": "<Product Description>"
                // }

            // 2. Upon successful creation of the product, we already have redirect in ProductCreateController.php

            // 3. The API should implement authentication and input sanitization, if there is an error of some sort (database err.,
            //    validation, wrong token, etc.) the API should return an appropriate HTTP status code (4XX/5XX) and an error message in 
            //    the response body.

            //  Requirements for the backend API for products creation (Ending line.)
  
          
          product.value = { name: '', price: '', description: '' };
          store.fetchProducts();
        } catch (error) {
          store.setError('An error occurred while creating the product.');
          console.error(error);
        } finally {
          store.setLoading(false);
        }
      };
  
      return { product, submitForm };
    },
  };
  </script>
  