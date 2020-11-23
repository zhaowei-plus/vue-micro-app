<template>
  <a-switch default-checked @change="onChange" />
</template>
<script>
import { Switch } from 'ant-design-vue'

export default {
  name: 'FGSwitch',
  components: {
    Switch
  },
  props: {
    value: Boolean,
    field: Object
  },
  methods: {
    onChange (value) {
      this.$emit('change', value)
    }
  }
}
</script>
