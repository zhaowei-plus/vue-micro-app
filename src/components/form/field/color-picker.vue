<template>
  <div class="color-picker">
    <div class="color-picker__select">
      <colorPicker :value="value" @change="onChange"/>
    </div>
    <div class="color-picker__value">{{value}}</div>
  </div>
</template>
<script>
import Vue from 'vue'
import VColorPicker from 'vcolorpicker'

Vue.use(VColorPicker)

export default {
  name: 'FGColorPicker',
  components: {
    VColorPicker
  },
  props: {
    value: String,
    field: Object
  },
  data () {
    return {
      color: ''
    }
  },
  computed: {
    props () {
      if (this.field) {
        const { props = {} } = this.field
        return props
      }
      return {}
    }
  },
  methods: {
    onChange (value) {
      console.log('color-picker value:', value)
      this.$emit('change', value)
    }
  }
}
</script>
<style scoped lang="less">
.color-picker {
  display: flex;
  align-items: center;
  justify-content: flex-start;

  height: 39px;
  line-height: 39px;

  &__select {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    padding: 0 10px;

    .colorBtn {
      border: 1px solid #E9ECF0;
    }
  }

  &__value {
    flex: 1;
    width: 60%
  }
}
</style>
