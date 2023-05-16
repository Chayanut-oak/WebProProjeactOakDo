<template>
  <div class="d">
    <NavBar :cart = "cart" :clearCart = "clearCart" :logout = "logout" />
    <CarouselBar />
    <ProductsList :add= "addToCart" />
  </div>
</template>
  
  <script>
  import axios from '@/plugins/axios'
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
  },methods:{logout() {
    
      this.$store.commit('logout')
      this.$router.push({ path: "/" });
      this.pro = null
      this.cart = []
    },
    addToCart(products) {
       const exitproduct = this.cart.find(cartproduct => cartproduct.isbn === products.isbn)
       if(exitproduct){
        alert('This book is already in your cart.')
       }else if(!this.$store.state.token){
        alert("You must log in first.")
       }
       else{
        axios.get(`http://localhost:3000/checkcart/`, { params: { user: this.$store.state.id, bookisbn: products.isbn } })
        .then((response) => {
          this.cart.push(products)
            localStorage.setItem("cart", JSON.stringify(this.cart));
          console.log(response)
        })
        .catch((err) => {
          alert(err.response.data)
          console.log(err);
        });
        
       }
      
    
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
    axios
            .get("http://localhost:3000/checkbook", { params: { user: this.$store.state.id } })
            .then((response) => {
                console.log(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    
  },
};
</script>
  
  <style>
</style>
  