/*productStore.js*/
import {defineStore} from "pinia";
import axios from "axios";

export const useProductStore = defineStore('product', {
    state: () => ({
        products: [],
        cart: [],
        freeShippingPrice: 1000,
        favoriteProducts: JSON.parse(localStorage.getItem('favoriteProducts')) || [],
        searchQuery: "", // Zoekterm toevoegen
    }),
    getters: {
      cartTotal: (state) => state.cart.reduce((total, item) => total + item.price * item.quantity, 0),
      totalItems: (state) => state.cart.reduce((count, item) => count + item.quantity, 0),
      cartTotalExcl: (state) => state.cartTotal * 0.79,
      freeShippingCalc: (state) => state.freeShippingPrice - state.cartTotal > 0 ? state.freeShippingPrice - state.cartTotal : 0 },
    actions: {
        async fetchProducts() {
            try {
                const response = await axios.get('https://fakestoreapi.in/api/products');
                this.products = response.data.products.slice(0, 20); // Beperk tot 20 producten bijvoorbeeld
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        },
        updateSearchQuery(query) {
            this.searchQuery = query;
        },

        addToCart(product){
            const existingItem = this.cart.find(item => item.id === product.id);if (existingItem) {
                existingItem.quantity += 1;
            } else {
                this.cart.push({...product, quantity: 1});
            }
        },

        removeItem(itemId){
            this.cart = this.cart.filter(item => item.id !== itemId)
        },

        cartItemIncrement(itemId) {
            const item = this.cart.find(item => item.id === itemId);
            if (item) {
                item.quantity++;
            }
        },
        cartItemDecrement(itemId) {
            const item = this.cart.find(item => item.id === itemId);
            if (item && item.quantity > 1) { // Zorg ervoor dat het niet onder 1 gaat
                item.quantity--;
            }
        },

        // Favorieten logica
        addToFavorite(product) {
            const index = this.favoriteProducts.findIndex(fav => fav.id === product.id);
            if (index === -1) {
                this.favoriteProducts.push(product);
            } else {
                this.favoriteProducts.splice(index, 1);
            }
            // Sla favorieten op in localStorage
            localStorage.setItem('favoriteProducts', JSON.stringify(this.favoriteProducts));
        },

    }
})