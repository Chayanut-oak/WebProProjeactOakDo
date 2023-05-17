<template>
  <!-- component -->
  <div class="w-full min-h-screen bg-gray-50 flex flex-col sm:justify-center items-center pt-6 sm:pt-0">
    <div class="w-full sm:max-w-md p-5 mx-auto">
      <h2 class="mb-12 text-center text-5xl font-extrabold">Welcome.</h2>
      <div class="mb-4">
        <label class="block mb-1" for="email">Email-Address</label>
        <input v-model="e" id="email" type="email" name="email"
          class="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full" />
      </div>
      <div class="mb-4">
        <label class="block mb-1" for="password">Password</label>
        <input v-model="pass" id="password" type="password" name="password"
          class="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full" />
        <div class="mt-1 text-right">
          <a @click="changeEmailModal = true, checkpass = true" class="underline">Forgot password?</a>
        </div>
      </div>

      <div class="mt-6">
        <button @click="submit()"
          class="w-full inline-flex items-center justify-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold capitalize text-white hover:bg-red-700 active:bg-red-700 focus:outline-none focus:border-red-700 focus:ring focus:ring-red-200 disabled:opacity-25 transition">Sign
          In</button>
      </div>
      <div class="mt-6 text-center">
        <router-link to="/SignUp" class="underline">Sign up for an account</router-link>
      </div>

    </div>

    <div class="fixed z-10 inset-0 overflow-y-auto" v-show="changeEmailModal">
      <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <!-- Background overlay -->
        <div class="fixed inset-0 transition-opacity">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <!-- Modal panel -->

        <div
          class="center inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog" aria-modal="true" aria-labelledby="modal-headline">
          <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <button @click="changeEmailModal = false" class="float-right m-auto">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="30" height="30" id="close">
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
                <label class="block mb-1" for="password">Email</label>
                <input v-model="email" id="password" type="password" name="password"
                  class="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full" />
              </div>
              <div class="mt-6">
                <button @click="checkEmail()"
                  class="w-full inline-flex items-center justify-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold capitalize text-white hover:bg-red-700 active:bg-red-700 focus:outline-none focus:border-red-700 focus:ring focus:ring-red-200 disabled:opacity-25 transition">Confirm
                  Email to Change Password</button>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import axios from '@/plugins/axios'
import swal from 'sweetalert2';
export default {
  data() {
    return {
      e: "",
      pass: "",
      id: "",
      changeEmailModal: false,
      email:null
    }
  }, methods: {
    checkEmail(){
    var formData = new FormData();
            formData.append("email", this.email);
            axios
                .post("http://localhost:3000/checkmail", formData, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then((response) => {
                    console.log(response.data)
                    this.changeEmailModal = false
                })
                .catch((error) => {
                    alert(error.response.data)
                });
  },
    submit() {
      var formData = new FormData();
      formData.append("email", this.e);
      formData.append("password", this.pass);
      axios
        .post("/SignIn", formData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          if (response.data.message == "Addmin") {
            swal.fire({
              title: 'You login as an Admin!',
              text: 'success',
              icon: 'success'
            }).then((next) => {
              if (next) {
                this.id = response.data.result[0].admin_id
                this.$store.commit('login', this.e)
                this.$store.commit('login2', this.id)
                this.$store.commit('token', response.data.token)
                this.$emit('auth-change')
                this.$router.push({ path: "/" });
              }
            })
          } else {
            swal.fire({
              title: 'Login Successful',
              text: '',
              icon: 'success'
            }).then((next) => {
              if (next) {
                this.id = response.data.result[0].customer_id
                this.$store.commit('login', this.e)
                this.$store.commit('login2', this.id)
                this.$store.commit('token', response.data.token)
                this.$emit('auth-change')
                this.$router.push({ path: "/" });

              }
            })
          }
          // Success! -> redirect to home page
          console.log(response)

        })
        .catch((error) => {
          alert(error.response.data)
          this.e = ""
          this.pass = ""
        });
    },

  }, mounted() {
    if (this.$store.state.token) {
      this.$router.push({ path: "/" })
    }
  }
}
</script>
  
<style></style>