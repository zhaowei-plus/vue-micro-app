<template>
  <a-input
    :value="value"
    @change="onChange"
    :placeholder="props.placeholder || '请选择'"
    :disabled="props.disabled"
  />
</template>
<script>
import { Input } from 'ant-design-vue'
export default {
  name: 'FGInput',
  components: {
    Input
  },
  props: {
    value: [String, Number],
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
    onChange (event) {
      const value = event.target.value
      this.$emit('change', value)
    }
  }
}
</script>

<style scoped lang="less">
</style>
