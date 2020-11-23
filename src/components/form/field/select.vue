<template>
  <a-select
    :value="value"
    :disabled="props.disabled"
    :placeholder="props.placeholder || '请选择'"
    @change="onChange"
    :getPopupContainer="triggerNode => triggerNode.parentNode"
  >
    <a-select-option v-for="option in options" :key="option.value">
      {{option.label}}
    </a-select-option>
  </a-select>
</template>
<script>
import { Select } from 'ant-design-vue'
export default {
  name: 'FGSelect',
  components: {
    Select
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
    },
    options () {
      console.log('options:', this.field.enum)
      if (Array.isArray(this.field.enum)) {
        return JSON.parse(JSON.stringify(this.field.enum))
      }
      return []
    }
  },
  methods: {
    onChange (value) {
      this.$emit('change', value)
    }
  }
}
</script>
