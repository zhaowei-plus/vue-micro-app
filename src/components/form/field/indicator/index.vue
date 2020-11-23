<template>
  <div class="indicator">
    <div class="indicator__header">
      <a @click="triggerModal()">选择指标</a>
    </div>
    <div class="indicator__content" v-show="value">
      <Item
        :value="value"
        @delete="onDelete"
      />
    </div>
    <Select
      v-if="model"
      @ok="selectOk"
      @cancel="triggerModal"
    />
  </div>
</template>
<script>
import cloneDeep from 'lodash/cloneDeep'
import Item from './components/item'
import Select from './components/select'

export default {
  name: 'FGIndicator',
  components: {
    Item,
    Select
  },
  props: {
    value: Object,
    field: Object
  },
  data () {
    return {
      model: false,
      params: undefined
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
      this.$emit('change', value)
    },
    onDelete () {
      this.onChange()
    },
    triggerModal (params) {
      this.model = !this.model
      this.params = params
    },
    selectOk (params) {
      this.onChange(cloneDeep(params))
      this.triggerModal()
    }
  }
}
</script>

<style scoped lang="less">
.indicator {
  &__header {
    height: 39px;
    line-height: 39px;
  }

  &__content {
    padding: 4px;
    margin-left: -68px;
    border: 1px solid #E9ECF0;
  }
}
</style>
