<script>
import { Empty } from 'ant-design-vue'
import Tabs from '@/components/tabs'
import Layers from './layers'

import DataComponent from './data-component'
import MapComponent from './map-component'
import PageComponent from './page-component'

const { TabPane } = Tabs

export default {
  name: 'ScreenLibrary',
  components: {
    Tabs,
    TabPane
  },
  data () {
    return {
      expand: true
    }
  },
  methods: {
    onClick (event) {
      event.stopPropagation()
    },
    onMouseDown (event) {
      // event.stopPropagation()
    },
    onExpand () {
      this.expand = !this.expand
    }
  },
  render () {
    const props = {
      on: {
        mousedown: this.onMouseDown
      }
    }
    return (
      <div class={`library ${this.expand && 'expand'}`} onClick={this.onClick} {...props}>
        <div class="library__content">
          <Tabs default-active-key="1">
            <TabPane tab-key="1" tab="基础组件">
              <DataComponent />
              <MapComponent />
              <PageComponent />
            </TabPane>
            <TabPane tab-key="2" tab="定制组件">
              <Empty description="暂无" />
            </TabPane>
            <TabPane tab-key="3" tab="已添加列表">
              <Layers />
            </TabPane>
          </Tabs>
        </div>
        <div class="library__operation">
          <a class="expand" onClick={this.onExpand}>{this.expand ? '关闭' : '展开'}</a>
        </div>
      </div>
    )
  }
}
</script>
<style scoped lang="less">
.library {
  width: 0;
  height: 100%;
  background-color: #fff;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 999;
  cursor: auto;

  &__content {
    display: none;
  }

  &__operation {
    position: absolute;
    top: calc(50% - 26px);
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    right: -16px;
    width: 16px;
    height: 52px;
  }

  &.expand {
    width: 300px;
    .library__content {
      display: flex;
    }
  }
}
</style>
