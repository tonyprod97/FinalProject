<template>
  <div class="main">
    <div class="row">
      <record @submit="recordSubmited"></record>
    </div>
    <div class="row">
      <statistic ref="statistic"></statistic>
    </div>
  </div>
</template>

<script>
import Record from '../record/index'
import Statistic from '../statistic/index'

export default {
  name: 'Home',
  components: {
    Record,
    Statistic
  },
  methods: {
    recordSubmited: function() {
      this.$refs.statistic.refresh();
    }
  }
}
</script>

<style>
.card {
  margin-top:40px;
  padding: 10px;
}
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>
