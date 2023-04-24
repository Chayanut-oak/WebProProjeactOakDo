
<template>
    <div>
        <div class="object-fill">
            <NavBar :cart = "cart" :clearCart = "clearCart" />
            <section class="text-gray-700 body-font overflow-hidden bg-white px-5 py-5">
                <div class="container px-0 py-0 mx-2">
                    <div class="lg:w-4/5 mx-auto flex flex-wrap">
                        <img alt="ecommerce"
                            class="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
                            :src="`http://localhost:3000/${book.book_img}`">
                        <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <h2 class="text-sm title-font text-gray-500 tracking-widest">Auther: {{ book.author_name }}</h2>
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
                                    <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        class="w-5 h-5" viewBox="0 0 24 24">
                                        <path
                                            d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z">
                                        </path>
                                    </svg>
                                </button>
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
                    <textarea id="comment" rows="6"
                        class="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none"
                        placeholder="Write a comment..." required></textarea>
                </div>
                <button type="submit"
                    class="inline-flex items-center text-xs font-medium text-center text-white  border-0 py-2 px-6 focus:outline-none bg-blue-500 hover:bg-blue-700 rounded">
                    Post comment
                </button>
            </form>
            <article class="p-6 mb-6 text-base bg-white rounded-lg dark:bg-gray-900">
                <footer class="flex justify-between items-center mb-2">
                    <div class="flex items-center">
                        <p class="inline-flex items-center mr-3 text-sm text-gray-900"><img
                                class="mr-2 w-6 h-6 rounded-full"
                                src="https://flowbite.com/docs/images/people/profile-picture-2.jpg" alt="User">User</p>
                        <p class="text-sm text-gray-600 dark:text-gray-400"><time pubdate datetime="2022-02-08"
                                title="dd-mm-yy">dd-mm-yyyy</time></p>
                    </div>
                    <button id="dropdownComment1Button" data-dropdown-toggle="dropdownComment1"
                        class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        type="button">


                    <!-- <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z">
                    </path>
                        </svg> -->

                    </button>
                    <!-- Dropdown menu -->
                    <div id="dropdownComment1"
                        class="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                        <ul class="py-1 text-sm text-gray-700 dark:text-gray-200"
                            aria-labelledby="dropdownMenuIconHorizontalButton">
                            <li>
                                <a href="#"
                                    class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                            </li>
                            <li>
                                <a href="#"
                                    class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Remove</a>
                            </li>
                            <li>
                                <a href="#"
                                    class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
                            </li>
                        </ul>
                    </div>
                </footer>
                <p class="text-gray-500 dark:text-gray-400"> comment </p>
               
            </article>
        </div>
    </div>
</template>

<script setup>
import NavBar from '../components/NavBar.vue'

</script>
<script>
import axios from 'axios';
export default {
    data() {
        return {
            book: null,
            cart: []
        };
    },
    methods: {
        addToCart(products) {
            const exitproduct = this.cart.find(cartproduct => cartproduct.isbn === products.isbn)
            if (exitproduct) {
                alert('This book is already in your cart.')
            } else {
                this.cart.push(products)
            }

            localStorage.setItem("cart", JSON.stringify(this.cart));
        },
        clearCart() {
            this.cart = []
            localStorage.setItem("cart", JSON.stringify(this.cart));

        },
    },
    created() {
        axios.get(`http://localhost:3000/product/${this.$route.params.id}`)
            .then((response) => {
                this.book = response.data.book;
            })
            .catch((err) => {
                this.error = err
                console.log(err);
            });
    }
}
</script>