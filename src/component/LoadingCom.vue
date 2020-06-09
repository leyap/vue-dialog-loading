<template>
  <div class="busy-dialog">
    <div :key=i :style="{animationDelay: (i*250)+'ms'}" v-for="i in 4"></div>
  </div>
</template>

<script>
  export default {
    name: 'LoadingCom',
  }
</script>

<style scoped>
  .busy-dialog {
    width: 120px;
    /*height: 40px;*/
    min-height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  .busy-dialog > div {
    width: 12px;
    height: 12px;
    background: #999;
    border-radius: 3px;
    right: 10px;
    animation: circleKey 1s linear infinite;
    margin: 5px;
  }

  @keyframes circleKey {
    0% {
      background: #888;
      transform: scale(1);
    }
    50% {
      background: #f3f3f3;
      transform: scale(1.3);
    }
    100% {
      background: #888;
      transform: scale(1);
    }
  }

</style>
