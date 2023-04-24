<template>
  <div class="d">
    <NavBar :cart = "cart" :clearCart = "clearCart" />
    <CarouselBar />
    <ProductsList :add= "addToCart" />
  </div>
</template>
  
  <script>
import CarouselBar from "../components/CarouselBar";
import NavBar from "../components/NavBar.vue";
import ProductsList from "../components/ProductsList.vue";
// import booklist from "../components/book.json"

export default {
  name: "App",
  components: {
    NavBar,
    CarouselBar,
    ProductsList,
  },
  data() {
    return {
      cart:[]
    };
  },methods:{
    addToCart(products) {87
       const exitproduct = this.cart.find(cartproduct => cartproduct.isbn === products.isbn)
       if(exitproduct){
        alert('This book is already in your cart.')
       }else if(!this.$store.state.email){
        alert("You must log in first.")
       }
       else{
        this.cart.push(products)
       }
      
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    clearCart() {
      this.cart = []
      localStorage.setItem("cart", JSON.stringify(this.cart));

    },
  },created() {
    if (localStorage.cart == undefined) {
      this.cart = [];
    } else {
      this.cart = JSON.parse(localStorage.cart);
    }
  },
};
</script>
  
  <style>
</style>
  