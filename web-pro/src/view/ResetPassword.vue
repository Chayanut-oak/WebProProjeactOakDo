<template>
    <!-- component -->
    <div class="w-full min-h-screen bg-gray-50 flex flex-col sm:justify-center items-center pt-6 sm:pt-0">
        <div class="w-full sm:max-w-md p-5 mx-auto">
            <h2 class="mb-12 text-center text-5xl font-extrabold">Reset Password</h2>
           
                <div class="mb-4">
                    <label class="block mb-1" for="password">New Password</label>
                    <Field v-model="password" id="password" type="password" name="password"
                        class="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
                        :rules="validatePassword" />
                    <ErrorMessage class="text-red-600" name="password" />
                </div>

                <div class="mb-4">
                    <label class="block mb-1" for="conpassword">Confirm New Password</label>
                    <Field v-model="conpassword" id="conpassword" type="password" name="conpassword"
                        class="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
                        :rules="validateConPassword" />
                    <ErrorMessage class="text-red-600" name="conpassword" />
                </div>

                <div class="mt-6">
                    <button @click="resetPass()"
                        class="w-full inline-flex items-center justify-center px-4 py-2 bg-orange-500 border border-transparent rounded-md font-semibold capitalize text-white hover:bg-orange-600 active:bg-red-700 focus:outline-none focus:border-red-700 focus:ring focus:ring-red-200 disabled:opacity-25 transition">Confirm
                        Password</button>

                </div>
            
        </div>

    </div>
</template>
    
<script>
import { Form, Field, ErrorMessage } from 'vee-validate';
import axios from '@/plugins/axios'
  /* eslint-disable */ import swal from 'sweetalert2';
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    data() {
        return {
            password: "",
            id: "",
            email: "",
            conpassword: "",
        }
    }, methods: {
        validatePassword(value) {

            if (!value) {
                return 'This field is required';
            }

            if (!(value.match(/[a-z]/) && value.match(/[A-Z]/) && value.match(/[0-9]/))) {
                return 'Password is Too Easy';
            }
            return true;
        },
        validateConPassword(value) {

            if (!value) {
                return 'This field is required';
            }

            if (!value.match(this.password)) {
                return 'Password not match';
            }
            return true;
        },
        resetPass() {
            var formData = new FormData();
            formData.append("password", this.password);
            formData.append("conpassword", this.conpassword);
            axios
                .put(`http://localhost:3000/resetPass/${this.$route.params.token}`, formData, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then((response) => {
                    console.log(response.data)
                    swal.fire({
                        title: 'Reset Password Success',
                        text: 'success',
                        icon: 'success'
                    })
                    this.$router.push({ path: "/SignIn" });
                })
                .catch((error) => {
                    alert(error.response)
                });
        },


    }
}
</script>
    
<style></style>