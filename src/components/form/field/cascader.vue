<template>
  <Cascader
    style="width: 100%"
    placeholder="请选择"
    :value="value"
    @change="onChange"
    :options="options"
    :getPopupContainer="triggerNode => triggerNode.parentNode"
  >
    <template slot="displayRender" slot-scope="{ labels, selectedOptions }">
      <span v-for="(label, index) in labels" :key="selectedOptions[index].value">
        <span v-if="index === labels.length - 1">
          {{ label }}
        </span>
        <span v-else @click="onChange"> {{ label }} / </span>
      </span>
    </template>
  </Cascader>
</template>
<script>
import { Cascader } from 'ant-design-vue'
export default {
  name: 'FGCascader',
  components: {
    Cascader
  },
  props: {
    value: {
      type: Array,
      default: () => []
    },
    field: Object
  },
  created () {
    console.log('FGCascader value:', this.value)
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
      if (Array.isArray(this.field.enum)) {
        return this.field.enum
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

<style scoped lang="less">
</style>
