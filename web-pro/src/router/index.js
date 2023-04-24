import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/view/Home.vue';
import ProductsPage from '@/view/ProductsPage.vue';
import SignInPage from '@/view/SignInPage.vue';
import SignUpPage from '@/view/SignUpPage.vue';
import CheckOutPage from '@/view/CheckOutPage.vue';
import UserProfile from '@/view/UserProfile.vue';
import AddMin from '@/view/AddMin.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component:  Home
        
    },
    {
        path: '/Products/:id',
        name: 'Products',
        component: ProductsPage
    },
    {
        
        path: '/Addmin',
        name: 'Addmin',
        component:  AddMin
        
    },
    {
        path: '/Product',
        name: 'Product',
        component: ProductsPage,
        
    },
    {
        path: '/SignIn',
        name: 'SignIn',
        component: SignInPage,
        
    },
    {
        path: '/SignUp',
        name: 'SignUp',
        component: SignUpPage,
        
    },
    {
        path: '/CheckOut',
        name: 'CheckOut',
        component: CheckOutPage,
        
    },
    {
        path: '/UserProfile',
        name: 'UserProfile',
        component: UserProfile,
        
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;
