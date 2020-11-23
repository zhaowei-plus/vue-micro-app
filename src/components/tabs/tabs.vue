<template>
  <div class="tabs">
    <div class="tabs__header">
      <div
        class="tab"
        :class="{ active: current === item.key }"
        v-for="item in tabs"
        :key="item.key"
        @click="onChange(item.key)"
      >
        {{item.tab}}
      </div>
    </div>
    <div class="tabs__content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'tabs',
  data () {
    return {
      current: undefined,
      tabs: []
    }
  },
  props: {
    defaultActiveKey: [String, Number]
  },
  created () {
    if (this.defaultActiveKey) {
      this.onChange(this.defaultActiveKey)
    }
  },
  methods: {
    addTab (tab) {
      this.tabs.push(tab)
    },
    onChange (tab) {
      if (this.current !== tab) {
        this.current = tab
        this.$emit('change', tab)
      }
    }
  }
}
</script>
<style scoped lang="less">
.tabs {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;

  &__header {
    min-width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    overflow: auto;
    height: 32px;
    line-height: 32px;

    .tab {
      border: 1px solid #e8e8e8;
      flex: 1;
      white-space: nowrap;
      min-width: min-content;
      padding: 0 8px;
      font-size: 14px;
      text-align: center;
      border-radius: 6px 6px 0 0;
      color: #5C626B;
      background-color: rgb(245, 246, 247);

      &.active {
        color: #488FF9;
        background-color: rgb(255, 255, 255);
      }
    }
  }

  &__content {
    width: 100%;
    height: calc(100% - 32px);
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    margin-top: 4px;

    .tab-pane {
      width: 100%;
      height: 100%;
      overflow: auto;

      &.hidden {
        display: none !important;
      }
    }
  }
}
</style>
