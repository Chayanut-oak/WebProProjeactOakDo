<template>
    <!-- component -->
    <div class="bg-grey-lighter min-h-screen flex flex-col">
        <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
            <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                <h1 class="mb-8 text-3xl text-center">Sign up</h1>
                <form @submit.prevent="submitForm">
                    <div class="flex gap-x-2">
                        <input v-model="fname" type="text" class=" border border-grey-light w-full p-1.5 rounded mb-4"
                            name="fname" placeholder="Full Name"  />

                        <input v-model="lname" type="text" class=" border border-grey-light w-full p-1.5 rounded mb-4"
                            name="lname" placeholder="Last Name"  />
                    </div>

                    <input v-model="email" type="email" class="block border border-grey-light w-full p-1.5 rounded mb-4"
                        name="email" placeholder="Email"  />
                    <input v-model="pnum" type="text" class="block border border-grey-light w-full p-1.5 rounded mb-4"
                        name="pnum" placeholder="Phone Number"  />
                    <input v-model="password" type="password"
                        class="block border border-grey-light w-full p-1.5 rounded mb-4" name="password"
                        placeholder="Password"  />
                    <input v-model="conpassword" type="password"
                        class="block border border-grey-light w-full p-1.5 rounded mb-4" name="conpassword"
                        placeholder="Confirm Password"  />
                    <textarea v-model="address" type="text" class="block border border-grey-light w-full p-1.5 rounded mb-4"
                        name="address" placeholder="Address"  />
                    <button type="submit" @click="submit()"
                        class="w-full inline-flex items-center justify-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold capitalize text-white hover:bg-red-700 active:bg-red-700 focus:outline-none focus:border-red-700 focus:ring focus:ring-red-200 disabled:opacity-25 transition">Create
                        Account</button>

                </form>
                


            </div>

            <div class="text-grey-dark mt-6">
                Already have an account?
                <router-link class="no-underline border-b border-blue text-blue" to="/SignIn">
                    Sign In
                </router-link> here
            </div>
        </div>
    </div>
</template>
    
<script>
import axios from 'axios';

export default {
    data() {
        return {
            fname: "",
            lname: "",
            email: "",
            password: "",
            conpassword: "",
            pnum: "",
            address: "",
            showModal: false,

        }
    }, methods: {validateForm() {
            let errors = [];
            if (!this.fname) {
                errors.push("Please enter your first name.");
            }
            if (!this.lname) {
                errors.push("Please enter your last name.");
            }
            if (!this.email) {
                errors.push("Please enter your email.");
            } else if (!/.+@.+\..+/.test(this.email)) {
                errors.push("Please enter a valid email address.");
            }
            if (!this.pnum) {
                errors.push("Please enter your phone number.");
            } else if (!/^[0-9]+$/.test(this.pnum)) {
                errors.push("Please enter a valid phone number.");
            }
            if (!this.password) {
                errors.push("Please enter your password.");
            } else if (this.password.length < 6) {
                errors.push("Your password must be at least 8 characters long.");
            }
            if (this.password !== this.conpassword) {
                errors.push("Your passwords do not match.");
            }
            if (!this.address) {
                errors.push("Please enter your address.");
            }
            return errors;
        },
        submit() {
            let errors = this.validateForm();
            
            // If there are errors, display them and stop the form from submitting
            if (errors.length > 0) {
                alert(errors.join("\n"));
                return;
            }
            
                var formData = new FormData();
            formData.append("fname", this.fname);
            formData.append("lname", this.lname);
            formData.append("email", this.email);
            formData.append("password", this.password);
            formData.append("conpassword", this.conpassword);
            formData.append("pnum", this.pnum);
            formData.append("address", this.address);
            axios
                .post("http://localhost:3000/SignUp", formData, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then((response) => {
                    this.$router.push({ path: "/SignIn" }); // Success! -> redirect to home page
                    console.log(response)
                })
                .catch((error) => {
                    alert(error.response.data)
                });
            
            
        },

    },
}
</script>
    
<style></style>