<template>
    <div class="bg-white rounded-lg shadow overflow-hidden">
        <table class="w-full">
            <thead class="border-b">
                <tr>
                    <th> </th>
                    <th class="px-4 py-2 text-left">Title</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in cart" :key="item.isbn">
                    <td class="px-4 py-2">
                        <img class="w-37 h-40" :src="`http://localhost:3000/${item.book_img}`" alt="">
                    </td>
                    <td class="px-4 py-2">{{ item.book_name }}</td>
                </tr>
            </tbody>
        </table>
        <div class="flex flex-col justify-center items-center">
            <form class="mt-8 flex flex-col space-y-4 place-content-center">
            <label class="block font-bold mb-2" for="borrow-time">Select Borrow Time:</label>
            <input v-model="timeinput" class="w-6/12 bg-white rounded-lg border border-gray-400 p-2" type="datetime-local"
                id="borrow-time" placeholder="" name="borrow-time">
            <div class="mb-6">
                <label for="default-input" class="block font-bold mb-2">หมายเหตุ:</label>
                <textarea v-model="textareainput" rows="4" class="w-6/12 bg-white rounded-lg border border-gray-400 p-2"
                    placeholder="Write your thoughts here..."></textarea>
            </div>
            <button class=" w-6/12 mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                type="submit">Submit</button>

        </form>
        </div>

    </div>
</template>

<script>
import axios from 'axios';


export default {
    props: {
        cart: Array,
    },
    data() {
        return {
            
            timeinput: {},
            textareainput: ""
        }
    },

    methods: {
        // put to Storage
        getLength: function () {
            this.length = this.myInput.length;
        }
    },created() {
    axios
      .get("http://localhost:3000/" )
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }


}
</script>

<style></style>