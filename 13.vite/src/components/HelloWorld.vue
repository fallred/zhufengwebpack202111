<template>
    <h1>{{msg}}</h1>
    <a :class="style.link2">超链接</a>
    <h2>less</h2>
    <h3>sass</h3>
    <div class="postcss"></div>
</template>
<script setup>
import style from './HelloWorld.module.css';
</script>
<style scoped lang="less">
@color:red;
h2{
    color:@color;
}
</style>
<style scoped lang="scss">
$color:orange;
h3{
    color:$color;
}
</style>
<style scoped>
.postcss{
    height:50px;
    width:200px;
    background-color:orange;
    transform:rotate(90deg);
}
</style>