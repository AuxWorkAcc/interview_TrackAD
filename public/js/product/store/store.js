import { defineStore } from 'pinia';
// pinia, is a standalone library and does not require Vue to be explicitly imported here

export const useStore = defineStore({
  id: 'main',
  state: () => ({
    products: [],
    isLoading: false,
    error: null
  }),
  getters: {
    allProducts() {
      return this.products;
    },
  },
  actions: {
    setProducts(products) {
      this.products = products;
    },
    setLoading(isLoading) {
      this.isLoading = isLoading;
    },
    setError(error) {
      this.error = error;
    },
    async fetchProducts() {
      this.setLoading(true);
      this.setError(null);
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        this.setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        this.setError('Error fetching products');
      } finally {
        this.setLoading(false);
      }
    }
  }
});
