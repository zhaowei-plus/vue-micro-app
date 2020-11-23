<template>
  <div class="tab-pane" :class="{ hidden: !active }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'tabPane',
  props: {
    tabKey: [String, Number],
    tab: String
  },
  created () {
    this.$parent && this.$parent.addTab({
      key: this.tabKey,
      tab: this.tab
    })
  },
  computed: {
    active () {
      if (this.$parent) {
        return this.$parent.current === this.tabKey
      }
      return true
    }
  }
}
</script>
<style scoped lang="less">
.tab-pane {
  padding: 0 4px;
}
</style>
