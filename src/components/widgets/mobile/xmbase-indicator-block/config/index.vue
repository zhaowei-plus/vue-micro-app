<template>
  <div class="config">
    <a-tabs default-active-key="1" @change="callback">
      <a-tab-pane key="1" tab="数据">
        <Data :widget="widget"/>
      </a-tab-pane>
      <a-tab-pane key="2" tab="样式" force-render>
        <Style :widget="widget"/>
      </a-tab-pane>
      <a-tab-pane key="3" tab="交互">
        <Mutual :widget="widget"/>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>

import Data from './data'
import Style from './style'
import Mutual from './mutual'

export default {
  name: 'config',
  components: {
    Data,
    Style,
    Mutual
  },
  props: {
    widget: Object
  }
}
</script>

<style scoped lang="less">
</style>

<style lang="less">
</style>
