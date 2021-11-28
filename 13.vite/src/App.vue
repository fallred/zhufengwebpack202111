<template>
  <HelloWorld msg="hello world"/>
  <hr/>
  <img src="@/assets/kf.jpg"/>
  <img :src="imgUrl"/>
  <div class="avatar"></div>
</template>
<script setup>
import HelloWorld from '@/components/HelloWorld.vue';
import imgUrl from '@/assets/kf.jpg'
</script>
<style scoped>
.avatar{
  width:200px;
  height:200px;
  background-image: url(@/assets/kf.jpg);
  background-size: contain;
}
</style>