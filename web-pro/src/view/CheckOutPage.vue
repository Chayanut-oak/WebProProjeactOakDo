<template>
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <div><NavBar :cart = "cart" />
    <CheckOutBar :cart = "cart"/></div>
</template>

<script>
import NavBar from '../components/NavBar.vue'
import CheckOutBar from '../components/CheckOutBar.vue'


export default {
    name: 'CheckOutPage',
    components: {
        NavBar,
        CheckOutBar,

    },
    data() {
    return{
        cart:[]
    }},
    created() {
        if (localStorage.cart == undefined) {
            this.cart = [];
        } else {
            this.cart = JSON.parse(localStorage.cart);
        }
    },
}
</script>

<style>

</style>