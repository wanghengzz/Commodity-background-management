<template>
  <div>
    <Card />
    <Sale />
  </div>
</template>

<script>
import Card from './Card/index.vue'
import Sale from './Sale/index.vue'
export default {
  name: 'Dashboard',
  components: {
    Card,
    Sale
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
