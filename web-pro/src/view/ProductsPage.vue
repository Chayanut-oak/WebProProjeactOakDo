
<template>
    <div>
        <div class="object-fill">
            <NavBar :cart="cart" :clearCart="clearCart" :logout="logout" />
            <section class="text-gray-700 body-font overflow-hidden bg-white">
                <div class="container my-5 mx-auto">
                    <div class="lg:w-4/5 mx-auto flex flex-wrap justify-center">
                        <div class="basic1/2">
                            <img alt="ecommerce" class="w-96 object-cover object-center rounded border border-gray-200"
                                :src="`http://localhost:3000/${book.book_img}`">
                        </div>
                        <div class="lg:basis-1/2">
                            <div class="w-full lg:pl-10 py-6 mt-6 lg:mt-0">
                                <h2 class="text-sm title-font text-gray-500 tracking-widest">Author: {{ book.author_name }}
                                </h2>
                                <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">{{ book.book_name }}</h1>
                                <div class="flex mb-4 text-sm title-font text-gray-500 tracking-widest">
                                    ISBN : {{ book.isbn }}
                                </div>
                                <p class="leading-relaxed">{{ book.book_desc }}</p>
                                <div class="bottom-0 inset-x-0  m-1 flex">
                                    <button
                                        class="flex ml-auto text-white  border-0 py-2 px-6 focus:outline-none bg-blue-500 hover:bg-blue-700 rounded "
                                        @click="addToCart(book)">Borrow</button>
                                    <button
                                        class="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                                        <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                            stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                                            <path
                                                d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z">
                                            </path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        <div class="max-w mx-auto px-5 ">
            <div class="flex justify-between items-center mb-6">
            </div>
            <form class="mb-6">
                <div class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200">
                    <label for="comment" class="sr-only">Your comment</label>
                    <textarea v-model="comment" id="comment" rows="6"
                        class="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none"
                        placeholder="Write a comment..." required></textarea>
                </div>
                <button type="submit" @click="addComment()"
                    class="inline-flex items-center text-xs font-medium text-center text-white  border-0 py-2 px-6 focus:outline-none bg-blue-500 hover:bg-blue-700 rounded">
                    Post comment
                </button>
            </form>
            <article v-for="item in allcom" :key="item.isbn" class="p-6 mb-6 text-base bg-gray-200 rounded-lg ">
                <footer class="flex justify-between items-center mb-2">
                    <div class="flex items-center">
                        <p class="inline-flex items-center mr-3 text-sm text-gray-900"><img
                                class="mr-2 w-6 h-6 rounded-full" :src="`http://localhost:3000/${item.customer_img}`"
                                alt="Michael Gough">{{ item.fname }}</p>
                        <p class="text-sm text-gray-600 dark:text-gray-400">{{ item.created_when.slice(0, 16) }}</p>
                    </div>

                    <!-- Dropdown menu -->


                </footer>
                <p class="text-gray-900 dark:text-gray-500 px-5"> {{ item.comment }} </p>

            </article>
        </div>
    </div>
</template>

<script setup>
import NavBar from '../components/NavBar.vue'

</script>
<script>
import axios from '@/plugins/axios'
export default {
    data() {
        return {
            book: null,
            cart: [],
            comment: null,
            allcom: null
        };
    },
    methods: {
        logout() {
            this.$store.commit('logout')
            this.$router.push({ path: "/" });
            this.pro = null
            this.cart = []
        },
        addToCart(products) {
            const exitproduct = this.cart.find(cartproduct => cartproduct.isbn === products.isbn)
            if (exitproduct) {
                alert('This book is already in your cart.')
            } else if (!this.$store.state.email) {
                alert("You must log in first.")
            }
            else {
                axios.get(`http://localhost:3000/checkcart/`, { params: { user: this.$store.state.id, bookisbn: products.isbn } })
                    .then((response) => {
                        this.cart.push(products)
                        console.log(response)
                    })
                    .catch((err) => {
                        alert(err.response.data)
                        console.log(err);
                    });

            }

            localStorage.setItem("cart", JSON.stringify(this.cart));
        },
        clearCart() {
            this.cart = []
            localStorage.setItem("cart", JSON.stringify(this.cart));

        }, addComment() {
            var formData = new FormData();
            formData.append("comment", this.comment);
            formData.append("mail", this.$store.state.email);
            axios
                .post(
                    `http://localhost:3000/${this.$route.params.id}/comments`,
                    formData,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                )
                .then((response) => {
                    console.log(response.data);
                })
                .catch((error) => {
                    console.log(error.message);
                });
        },

    },
    created() {
        if (localStorage.cart == undefined) {
            this.cart = [];
        } else {
            this.cart = JSON.parse(localStorage.cart);
        }
        axios.get(`http://localhost:3000/product/${this.$route.params.id}`)
            .then((response) => {
                this.book = response.data.book;
                this.allcom = response.data.comment;
                console.log(response.data.comment)
            })
            .catch((err) => {
                this.error = err
                console.log(err);
            });
        axios
            .get("http://localhost:3000/checkbook", { params: { user: this.$store.state.id } })
            .then((response) => {
                console.log(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }
}
</script>