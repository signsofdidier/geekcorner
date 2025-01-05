import { createRouter, createWebHistory } from "vue-router";
import ShopComponent from '../components/ShopComponent.vue'
import ProductDetail from '../components/ProductDetail.vue'
import CheckoutComponent from '../components/CheckoutComponent.vue'


const routes = [
    { path: '/', name: 'ShopPage', component: ShopComponent },
    { path: '/product/:id', name: 'ProductDetail', component: ProductDetail },
    { path: '/checkout', name: 'CheckoutComponent', component: CheckoutComponent },
];

const router = createRouter({
    history: createWebHistory('/fullstack/didier/geekcorner/'),
    routes,
});

export default router;