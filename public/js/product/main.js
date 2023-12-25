import { createApp } from 'vue';
import store from './store/store.js';
import { createI18n } from 'vue-i18n'

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: {
      name: 'Name',
      price: 'Price',
      description: 'Description',
      search: 'Search...'
    },
    ru: {
      name: 'Имя',
      price: 'Цена',
      description: 'Описание',
      search: 'Поиск...'
    }
  },
})

const app = createApp({
  components: {
    ProductTable: () => import('./components/ProductTable.vue'),
    ProductCreate: () => import('./components/ProductCreate.vue')
  }
})

app.use(store)
app.use(i18n)
app.mount('#product-app')
