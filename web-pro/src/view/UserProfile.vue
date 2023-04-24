<template>
    <div class="bg-gray-100 w-full h-full">
        <NavBar :cart="cart" :clearCart="clearCart" />
        <div class="bg-gray-100 w-full h-full">
            <div class="container mx-auto my-5 p-5">
                <div class="md:flex no-wrap md:-mx-2 ">
                    <!-- Left Side -->
                    <div class="w-full md:w-3/12 md:mx-2">
                        <!-- Profile Card -->
                        <div class="bg-white p-3 border-t-4 border-gray-700  ">
                            <div class="image overflow-hidden ">

                                <input v-if="editform" class="file-input hidden" type="file" id="file-input" ref="file"
                                    @change="handleFileUpload()" />
                                <label for="file-input">
                                    <img class="h-50 w-50 mx-auto rounded-full" 
                                    :src="customer_info[0].customer_img ? `http://localhost:3000/${customer_info[0].customer_img}`:'https://bulma.io/images/placeholders/640x360.png'" alt="">
                                </label>
                            </div>
                            <h1 class="text-gray-900 font-bold text-xl leading-8 my-1">{{ customer_info[0].fname }}
                                {{ customer_info[0].lname }}</h1>
                            <ul
                                class="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                                <li class="flex items-center py-3">
                                    <span>Member since</span>
                                    <span class="ml-auto">{{ customer_info[0].start_membership.slice(0, 10) }}</span>
                                </li>
                            </ul>
                        </div>
                        <!-- End of profile card -->
                        <div class="my-4"></div>
                        <!-- Friends card -->

                        <!-- End of friends card -->
                    </div>
                    <!-- Right Side -->
                    <div class="w-full md:w-9/12 mx-2 h-64">
                        <!-- Profile tab -->
                        <!-- About Section -->

                        <div class="bg-white p-3 shadow-sm rounded-sm">
                            <form >
                                <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                                    <span clas="text-green-500">
                                        <svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </span>
                                    <span class="tracking-wide">About</span>
                                </div>

                                <div class="text-gray-700">
                                    <div class="flex">
                                        <div class="px-4 py-2 font-semibold">Customer ID:</div>
                                        <div class="px-4 py-2">{{ customer_info[0].customer_id }}</div>
                                    </div>
                                    <div class="grid md:grid-cols-2 text-l">

                                        <div class="flex">
                                            <div class="px-4 py-2 font-semibold">First Name:</div>
                                            <div class="px-4 py-2">{{ customer_info[0].fname }}</div>
                                            <input v-model="fname" v-show="editform" type="text" name="fname"
                                                placeholder="New first name">
                                        </div>
                                        <div class="flex">
                                            <div class="px-4 py-2 font-semibold">Last Name:</div>
                                            <div class="px-4 py-2">{{ customer_info[0].lname }}</div>
                                            <input v-model="lname" v-show="editform" type="text" name="lname"
                                                placeholder="New last name">
                                        </div>
                                        <div class="flex">
                                            <div class="px-4 py-2 font-semibold">Contact No:</div>
                                            <div class="px-4 py-2">{{ customer_info[0].phone_num }}</div>
                                            <input v-model="numphone" v-show="editform" type="text" name="numphone"
                                                placeholder="New phone number">
                                        </div>
                                        <div class="flex">
                                            <div class="px-4 py-2 font-semibold">Email:</div>
                                            <div class="px-4 py-2">
                                                {{ customer_info[0].email }}
                                            </div>
                                            <input v-model="newemail" v-show="editform" type="text" name="email"
                                                placeholder="New Email">
                                        </div>

                                    </div>
                                    <button v-show="editform" @click="submit()"
                                        class="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">Confirm
                                        new information</button>
                                </div>

                            </form>
                            <button v-on:click="editform = !editform"
                                class="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">Edit
                                Profile</button>
                        </div>


                        <!-- End of about section -->

                        <div class="my-4"></div>

                        <h1 class="text-4xl text-gray-900 font-bold leading-8 my-1 p-2">Your Book</h1>
                        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead
                                    class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" class="px-6 py-3">
                                            <span class="sr-only">รูปภาพ</span>
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Name
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Time
                                        </th>

                                        <th scope="col" class="px-6 py-3">
                                            <span class="sr-only">Read</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="item in customer_info" :key="item.isbn"
                                        class="bg-white border-b dark:bg-gray-300">
                                        <td v-if="item.book_img" class="px-6 py-4">
                                            <img class="object-contain h-20 w-30" :src="`http://localhost:3000/${item.book_img}`"
                                                alt="Placeholder image" />
                                        </td>
                                        <td v-if="item.book_name" class="px-6 py-4">
                                            {{ item.book_name }}
                                        </td>
                                        <td v-if="item.end_of_date" class="px-6 py-4">
                                            {{ item.end_of_date.slice(0, 10) }}
                                        </td>

                                        <td  v-if="item.book_name" class="px-6 py-4 text-right">
                                            <button href="#" class="text-xl font-medium mx-10 my-1 btn btn-secondary">Read</button>
                                            <button href="#" class="text-xl font-medium mx-10 my-1 btn btn-secondary">Return</button>
                                        </td>
                                       
                                    </tr>
                                </tbody>
                            </table>
                            <footers class="bg-gray-100 w-full h-full">

                            </footers>
                        </div>

                        <!-- End of profile tab -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
    
<script>
// import axios from "axios";
import NavBar from "../components/NavBar.vue";
// import booklist from "../components/book.json"
import axios from "axios";

export default {

    name: "App",
    components: {
        NavBar,
    },
    data() {
        return {
            editform: false,
            cart: [],
            fname: "",
            lname: "",
            numphone: "",
            newemail: "",
            email: this.$store.state.email,
            customer_info: null,
            file: null,
            
        };
    }, methods: {

        addToCart(products) {
            this.cart.push(products)
            localStorage.setItem("cart", JSON.stringify(this.cart));
        },
        clearCart() {
            this.cart = []
            localStorage.setItem("cart", JSON.stringify(this.cart));

        }, handleFileUpload() {
            this.file = this.$refs.file.files[0];
            console.log(this.file)
        },
        submit() {
            var formData = new FormData();
            formData.append("profile_img", this.file);
            formData.append("fname", this.fname);
            formData.append("lname", this.lname);
            formData.append("email", this.newemail);
            formData.append("numphone", this.numphone);
            formData.append("customer_id", this.customer_info[0].customer_id);
            axios
                .put("http://localhost:3000/NewUser", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((response) => {
                    this.$router.push({ path: "/UserProfile" }); // Success! -> redirect to home page
                    console.log(response)
                    
                    if(this.newemail == ""){
                        this.$store.commit('login',this.email)
                    }else{
                        this.$store.commit('login',this.newemail)
                    }
                    
                })
                .catch((error) => {
                    alert(error.response.data)
                });


        },
    }, created() {

        if (localStorage.cart == undefined) {
            this.cart = [];
        } else {
            this.cart = JSON.parse(localStorage.cart);
        }
        axios
            .get("http://localhost:3000/User", { params: { email: this.email } })
            .then((response) => {
                this.customer_info = response.data.customer_info;
                console.log(this.customer_info);
            })
            .catch((err) => {
                console.log(err);
            });
    }
};
</script>
    
<style></style>
    