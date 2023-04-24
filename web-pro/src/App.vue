<template>
  <router-view>
   
  </router-view>
 
</template>
<script>
export default{
  methods:{
   
  },
  mounted(){
    this.$store.commit('initializeStore')
  }
}
</script> 