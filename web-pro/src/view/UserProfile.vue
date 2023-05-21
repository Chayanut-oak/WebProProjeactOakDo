<template>
    <div class="bg-gray-100 w-full h-full">
        <NavBar :cart="cart" :clearCart="clearCart" :logout="logout" :key="navbar_reload" />
        <div class="bg-gray-100 w-full h-full">
            <div class="container mx-auto my-5 p-5">
                <div class="md:flex no-wrap md:-mx-2 ">
                    <!-- Left Side -->
                    <div class="w-full md:w-3/12 md:mx-2">
                        <!-- Profile Card -->
                        <div class="bg-white p-3 grid justify-center border-t-4 border-gray-700">
                            <div class="image overflow-hidden ">

                                <input v-if="editform" class="file-input hidden" type="file" id="file-input" ref="file"
                                    @change="handleFileUpload()" />
                                <label for="file-input">
                                    <img v-if="editform"
                                        class="rounded-full mt-5 w-52 h-52 lg:w-52 lg:h-52 ml-2  hover:ring-4 hover:ring-orange-300 ease-in-out duration-200"
                                        :src="img ? `http://localhost:3000/${img}` : 'https://bulma.io/images/placeholders/640x360.png'"
                                        alt="">
                                    <img v-else class="rounded-full mt-5 w-52 h-52 lg:w-52 lg:h-52 ml-2"
                                        :src="img ? `http://localhost:3000/${img}` : 'https://bulma.io/images/placeholders/640x360.png'"
                                        alt="">
                                </label>
                            </div>

                            <ul
                                class="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                                <li class="flex items-center py-3">
                                    <span>Member since</span>
                                    <span class="ml-auto">{{ member }}</span>
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
                                <div v-if="this.type == 'customer'" class="flex">
                                    <div class="px-2 py-2 font-semibold">Customer ID:</div>
                                    <div class="px-2 py-2">{{ cusid }}</div>
                                </div>
                                <div v-if="this.type == 'admin'" class="flex">
                                    <div class="px-2 py-2 font-semibold">Admin ID:</div>
                                    <div class="px-2 py-2">{{ cusid }}</div>
                                </div>
                                <div class="grid md:grid-cols-2 text-l">

                                    <div class="grid grid-cols-2">
                                        <div class="py-2 font-semibold">First Name:</div>
                                        <div class="">{{ cusfname }}</div>
                                        <input v-model="fname" v-show="editform" type="text" name="fname"
                                            placeholder="New first name">
                                    </div>
                                    <div class="grid grid-cols-2">
                                        <div class="py-2 font-semibold">Last Name:</div>
                                        <div class="">{{ cuslname }}</div>
                                        <input v-model="lname" v-show="editform" type="text" name="lname"
                                            placeholder="New last name">
                                    </div>
                                    <div class="grid grid-cols-2">
                                        <div class="py-2 font-semibold">Contact No:</div>
                                        <div class="">{{ cusphone_num }}</div>
                                        <input v-model="numphone" v-show="editform" type="text" name="numphone"
                                            placeholder="New phone number">
                                    </div>
                                    <div class="grid grid-cols-2">
                                        <div class="py-2 font-semibold">Email:</div>
                                        <div class="py-2">
                                            {{ cusemail }}
                                            <button @click="changeEmailModal = true, checkpass = true"><svg
                                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                    stroke-linecap="round" stroke-linejoin="round"
                                                    class="feather feather-settings">
                                                    <circle cx="12" cy="12" r="3"></circle>
                                                    <path
                                                        d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z">
                                                    </path>
                                                </svg></button>
                                        </div>
                                    </div>

                                </div>
                                <button v-if="editform" v-on:click="submit()" @click='editform = !editform'
                                    class="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">Confirm
                                    new information</button>
                            </div>


                            <button v-on:click="editform = !editform" @click='Editform(item)'
                                class="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">Edit
                                Profile</button>
                        </div>


                        <!-- End of about section -->

                        <div class="fixed z-10 inset-0 overflow-y-auto" v-show="changeEmailModal">
                            <div
                                class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                                <!-- Background overlay -->
                                <div class="fixed inset-0 transition-opacity">
                                    <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
                                </div>

                                <!-- Modal panel -->

                                <div class="center inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                                    role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                                    <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                                        <button @click="changeEmailModal = false, checkpass = false, emailinput = false"
                                            class="float-right m-auto">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="30"
                                                height="30" id="close">
                                                <path fill="#F94646"
                                                    d="M40 3H24C12.4 3 3 12.4 3 24v16c0 11.6 9.4 21 21 21h16c11.6 0 21-9.4 21-21V24c0-11.6-9.4-21-21-21z">
                                                </path>
                                                <path fill="#E2E2E2"
                                                    d="M36.8 32 48 20.8c.6-.6 1-1.5 1-2.4 0-.9-.4-1.8-1-2.4-1.3-1.3-3.5-1.3-4.8 0L32 27.2 20.8 16c-1.3-1.3-3.5-1.3-4.8 0-.6.6-1 1.5-1 2.4 0 .9.4 1.8 1 2.4L27.2 32 16 43.2c-.6.6-1 1.5-1 2.4s.4 1.8 1 2.4c.6.6 1.5 1 2.4 1 .9 0 1.8-.4 2.4-1L32 36.8 43.2 48c1.3 1.3 3.5 1.3 4.8 0 .6-.6 1-1.5 1-2.4 0-.9-.4-1.8-1-2.4L36.8 32z">
                                                </path>
                                            </svg>

                                        </button>
                                        <div v-show="checkpass" class="w-full sm:max-w-md p-5 mx-auto">
                                            <div class="mb-4">
                                                <label class="block mb-1" for="text">OTP</label>
                                                <input v-model="pass" id="text" type="text" name="text"
                                                    class="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full" />
                                            </div>
                                            <div class="mt-6">
                                                <button @click="sendOTP()"
                                                    class="w-full inline-flex items-center justify-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold capitalize text-white hover:bg-red-700 active:bg-red-700 focus:outline-none focus:border-red-700 focus:ring focus:ring-red-200 disabled:opacity-25 transition">Click
                                                    here to recieve OTP</button>



                                                <button @click="checkPassToEmail()"
                                                    class="w-full inline-flex items-center justify-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold capitalize text-white hover:bg-red-700 active:bg-red-700 focus:outline-none focus:border-red-700 focus:ring focus:ring-red-200 disabled:opacity-25 transition">Confirm
                                                    OTP</button>

                                            </div>


                                        </div>
                                        <div v-show="emailinput" class="w-full sm:max-w-md p-5 mx-auto">
                                            <div class="mb-4">
                                                <label class="block mb-1" for="newemail">New Email</label>
                                                <input v-model="newemail" type="text" name="newemail"
                                                    class="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full" />
                                            </div>

                                            <div class="mt-6">
                                                <button v-on:click="changeEmail()"
                                                    @click="changeEmailModal = false, emailinput = false"
                                                    class="w-full inline-flex items-center justify-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold capitalize text-white hover:bg-red-700 active:bg-red-700 focus:outline-none focus:border-red-700 focus:ring focus:ring-red-200 disabled:opacity-25 transition">Change
                                                    Email</button>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>














                        <div class="fixed z-10 inset-0 overflow-y-auto" v-show="history">
                            <div
                                class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                                <!-- Background overlay -->
                                <div class="fixed inset-0 transition-opacity">
                                    <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
                                </div>

                                <!-- Modal panel -->

                                <div class="center inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                                    role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                                    <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                                        <button @click="history = false" class="float-right m-auto">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="30"
                                                height="30" id="close">
                                                <path fill="#F94646"
                                                    d="M40 3H24C12.4 3 3 12.4 3 24v16c0 11.6 9.4 21 21 21h16c11.6 0 21-9.4 21-21V24c0-11.6-9.4-21-21-21z">
                                                </path>
                                                <path fill="#E2E2E2"
                                                    d="M36.8 32 48 20.8c.6-.6 1-1.5 1-2.4 0-.9-.4-1.8-1-2.4-1.3-1.3-3.5-1.3-4.8 0L32 27.2 20.8 16c-1.3-1.3-3.5-1.3-4.8 0-.6.6-1 1.5-1 2.4 0 .9.4 1.8 1 2.4L27.2 32 16 43.2c-.6.6-1 1.5-1 2.4s.4 1.8 1 2.4c.6.6 1.5 1 2.4 1 .9 0 1.8-.4 2.4-1L32 36.8 43.2 48c1.3 1.3 3.5 1.3 4.8 0 .6-.6 1-1.5 1-2.4 0-.9-.4-1.8-1-2.4L36.8 32z">
                                                </path>
                                            </svg>

                                        </button>
                                        <h1 class="text-4xl text-gray-900 font-bold leading-8 my-1 p-2">History</h1>
                                        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead
                                    class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" class="px-6 py-3">
                                            Name
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Start Time
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            End Time
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Status
                                        </th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="item in book_history" :key="item.isbn"
                                        class="bg-white border-b dark:bg-gray-600 ">
                                        <td v-if="item.book_name" class="px-6 py-4 text-gray-900">
                                            {{ item.book_name }}
                                        </td>
                                        <td v-if="item.date_of_borrow" class="px-6 py-4 text-gray-900">
                                            {{ item.date_of_borrow.slice(0, 10) }}
                                        </td>
                                        <td v-if="item.end_of_date" class="px-6 py-4 text-gray-900 ">
                                            {{ item.end_of_date.slice(0, 10) }}
                                        </td>
                                        <td v-if="item.status" class="px-6 py-4 text-gray-900">
                                            <div class="text-green-500" v-if="item.status == 'Borrowed' ">{{ item.status }}</div>
                                            <div v-else class = "text-red-600">{{ item.status }}</div>
                                        </td>

                                    </tr>
                                </tbody>
                            </table>

                                    </div>
                                </div>
                            </div>
                        </div>

















                        <div class="my-4"></div>

                        <h1 class="text-4xl text-gray-900 font-bold leading-8 my-1 p-2">Your Book</h1>
                        <button v-on:click="getHistory()" @click="history = true"
                            class="text-xl font-medium mx-10 my-1 btn btn-secondary">History</button>
                        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead
                                    class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" class="px-6 py-3 ">
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
                                    <tr v-for="item in book_possess" :key="item.isbn"
                                        class="bg-white border-b dark:bg-gray-300">
                                        <td v-if="item.book_img" class="px-6 py-4 text-gray-900">
                                            <img class="object-contain h-20 w-30"
                                                :src="`http://localhost:3000/${item.book_img}`" alt="Placeholder image" />
                                        </td>
                                        <td v-if="item.book_name" class="px-6 py-4 text-gray-900">
                                            {{ item.book_name }}
                                        </td>
                                        <td v-if="item.end_of_date" class="px-6 py-4 text-gray-900">
                                            {{ item.end_of_date.slice(0, 10) }}
                                        </td>

                                        <td v-if="item.book_name" class="px-6 py-4 text-right text-gray-900">
                                            <button href="#"
                                                class="text-xl font-medium mx-10 my-1 btn btn-secondary">Read</button>
                                            <button href="#" class="text-xl font-medium mx-10 my-1 btn btn-secondary"
                                                @click='returnBook(item)'>Return</button>
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
import axios from '@/plugins/axios'
import swal from 'sweetalert2';
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
            customer_info: null,
            file: null,
            book_possess: null,
            token: this.$store.state.token,
            img: null,
            member: null,
            cusid: null,
            cusfname: null,
            cuslname: null,
            cusphone_num: null,
            cusemail: null,
            type: null,
            admininfo: null,
            navbar_reload: 0,
            changeEmailModal: false,
            pass: "",
            checkpass: false,
            emailinput: false,
            history: false,
            book_history: null,
        };
    }, methods: {
        logout() {
            this.$store.commit('logout')
            this.$router.push({ path: "/" });
            this.pro = null
            this.cart = []
        }, Editform() {
            this.fname = this.cusfname,
                this.lname = this.cuslname,
                this.numphone = this.cusphone_num

        }
        ,

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
        returnBook(item) {
            axios.put('http://localhost:3000/returnBook', {
                params: {
                    isbn: item.isbn,
                    userId: this.$store.state.id
                }
            }).then((response) => {
                this.book_possess = response.data.result
                console.log(response)

            })
                .catch((error) => {
                    alert(error.response.data)
                });
        },
        submit() {
            var formData = new FormData();
            formData.append("profile_img", this.file);
            formData.append("fname", this.fname);
            formData.append("lname", this.lname);
            formData.append("numphone", this.numphone);
            formData.append("customer_id", this.cusid);
            axios
                .put("http://localhost:3000/NewUser", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((response) => {
                    this.type = response.data.role
                    if (this.type == 'customer') {
                        this.customer_info = response.data.cusinfo;
                        this.img = this.customer_info.customer_img
                        this.cusid = this.customer_info.customer_id
                        this.cusfname = this.customer_info.fname
                        this.cuslname = this.customer_info.lname
                        this.cusphone_num = this.customer_info.phone_num
                        this.cusemail = this.customer_info.email
                        this.navbar_reload++
                    }
                    else if (this.type == 'admin') {
                        this.admininfo = response.data.cusinfo
                        this.img = response.data.cusinfo.admin_img
                        this.cusid = response.data.cusinfo.admin_id
                        this.cusfname = response.data.cusinfo.admin_fname
                        this.cuslname = response.data.cusinfo.admin_lname
                        this.cusphone_num = response.data.cusinfo.admin_phone
                        this.cusemail = response.data.cusinfo.admin_email
                        this.navbar_reload++
                    }


                })
                .catch((error) => {
                    alert(error.response.data)
                });


        },

        checkPassToEmail() {
            var formData = new FormData();
            formData.append("id", this.cusid);
            formData.append("password", this.pass);
            axios
                .post("http://localhost:3000/checkP ass", formData, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then((response) => {
                    if (response.data.status == 'success') {
                        swal.fire({
                            icon: 'success',
                            title: 'You have confirm OTP',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        this.emailinput = true
                        this.checkpass = false
                        this.pass = ""
                    } else if (response.data.status == 'fail') {
                        swal.fire({
                            icon: 'error',
                            title: 'Wrong OTP',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        this.pass = ""
                    }

                })
                .catch((error) => {
                    alert(error.response.data)
                });


        },
        changeEmail() {
            var formData = new FormData();
            formData.append("email", this.newemail);
            formData.append("customer_id", this.cusid);
            axios
                .put("http://localhost:3000/NewEmail", formData, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then((response) => {
                    this.type = response.data.role
                    if (this.type == 'customer') {
                        console.log(response.data)
                        this.cusid = response.data.cusinfo.customer_id
                        this.cusemail = response.data.cusinfo.email
                        this.navbar_reload++
                    }
                    else if (this.type == 'admin') {

                        this.cusid = response.data.cusinfo.admin_id
                        this.cusemail = response.data.cusinfo.admin_email
                        this.navbar_reload++
                    }
                })
                .catch((error) => {
                    alert(error.response.data)
                });


        }, sendOTP() {
            var formData = new FormData();
            formData.append("email", this.cusemail);
            formData.append("id", this.cusid);
            axios
                .post("http://localhost:3000/otp", formData, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then((response) => {
                    swal.fire({
                        icon: 'success',
                        title: 'OTP has been sent!!!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    console.log(response)
                })
                .catch((error) => {
                    alert(error.response.data)
                });


        },
        getHistory() {
            axios
                .get("http://localhost:3000/history", { params: { token: this.$store.state.token } })
                .then((response) => {
                    console.log(response.data)
                        this.book_history = response.data.possession
                    

                })
                .catch((err) => {
                    console.log(err);
                });
        }
    },

    created() {


        if (localStorage.cart == undefined) {
            this.cart = [];
        } else {
            this.cart = JSON.parse(localStorage.cart);
        }
        axios
            .get("http://localhost:3000/User", { params: { token: this.token } })
            .then((response) => {
                this.type = response.data.role
                if (this.type == 'customer') {
                    this.customer_info = response.data.customer_info;
                    this.book_possess = response.data.possession
                    this.img = response.data.customer_info.customer_img
                    this.member = response.data.customer_info.start_membership.slice(0, 10)
                    this.cusid = response.data.customer_info.customer_id
                    this.cusfname = response.data.customer_info.fname
                    this.cuslname = response.data.customer_info.lname
                    this.cusphone_num = response.data.customer_info.phone_num
                    this.cusemail = response.data.customer_info.email
                }
                else if (this.type == 'admin') {
                    console.log(response.data.admin_info)
                    this.admininfo = response.data.admin_info
                    this.img = response.data.admin_info.admin_img
                    this.member = response.data.admin_info.start_working.slice(0, 10)
                    this.cusid = response.data.admin_info.admin_id
                    this.cusfname = response.data.admin_info.admin_fname
                    this.cuslname = response.data.admin_info.admin_lname
                    this.cusphone_num = response.data.admin_info.admin_phone
                    this.cusemail = response.data.admin_info.admin_email
                }
                console.log(this.admininfo);

            })
            .catch((err) => {
                console.log(err);
                console.log(this.customer_info);
            });
        console.log(this.customer_info);


    }
};
</script>
    
<style></style>
    