<template>
  <InputNumber
    :value="value"
    @change="onChange"
    placeholder="请输入"
    :disabled="props.disabled"
  />
</template>
<script>
import { InputNumber } from 'ant-design-vue'
export default {
  name: 'FGInput',
  components: {
    InputNumber
  },
  props: {
    value: Number,
    field: Object
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
      this.$emit('change', Number(value))
    }
  }
}
</script>

<style scoped lang="less">
</style>
