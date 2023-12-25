<template>
  <div>
    <input type="text" placeholder="$t('search')" @input="updateSearch">
    <p v-if="store.isLoading">Loading...</p>
    <p v-if="store.error">{{ store.error }}</p>
    <table v-if="!store.isLoading && !store.error">
      <tr>
        <th @click="sortBy('name')">{{ $t('name') }}</th>
        <th @click="sortBy('price')">{{ $t('price') }}</th>
        <th>{{ $t('description') }}</th>
      </tr>
      <tr v-for="product in filteredProducts" :key="product.id">
        <td>{{ product.name }}</td>
        <td>{{ product.price }}</td>
        <td>{{ product.description }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
import { useStore } from 'pinia';
import { debounce } from 'lodash';

export default {
  setup() {
    const store = useStore('main');
    const searchTerm = ref('');
    const currentSortField = ref(null);

    const products = computed(() => store.allProducts);
    const filteredProducts = computed(() => {
      let result = products.value;

      // filter
      if (searchTerm.value) {
        const term = searchTerm.value.toLowerCase();
        result = result.filter(product => product.name.toLowerCase().includes(term));
      }

      // sort
      if (currentSortField.value) {
        result = result.sort((a, b) => a[currentSortField.value] > b[currentSortField.value] ? 1 : -1);
      }

      return result;
    });

    const sortBy = (field) => {
      currentSortField.value = field;
    };

    // fetch products when component is mounted
    store.fetchProducts();

    const updateSearch = debounce((e) => {
      searchTerm.value = e.target.value;
    }, 350);

    return { searchTerm, filteredProducts, sortBy, updateSearch, store };
  }
};
</script>

<style>

</style>
