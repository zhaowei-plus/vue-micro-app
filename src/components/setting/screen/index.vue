<script>
import { mapState } from 'vuex'
import { Tooltip } from 'ant-design-vue'

import Tabs from '@/components/tabs'
import Form from '@/components/form'
import ScreenSetting from '@/components/screen/setting'
import Bar from '@/components/widgets/screen/bar/config'
import Pie from '@/components/widgets/screen/pie/config'
import Ring from '@/components/widgets/screen/ring/config'
import Line from '@/components/widgets/screen/line/config'
import Table from '@/components/widgets/screen/table/config'
import Graph from '@/components/widgets/screen/graph/config'
import FlatMap from '@/components/widgets/screen/flat-map/config'
import BarGraph from '@/components/widgets/screen/bar-graph/config'
import Indicator from '@/components/widgets/screen/indicator/config'
import SwipeSingle from '@/components/widgets/screen/swipe-single/config'

const { TabPane } = Tabs

export default {
  name: 'Setting',
  data () {
    return {
      rules: [],
      options: {},
      values: {}
    }
  },
  components: {
    Form,
    Tabs,
    TabPane
  },
  computed: {
    ...mapState('active', ['active'])
  },

  methods: {
    onChange (values) {
      console.log('from onChange:', JSON.stringify(values, 0, 2))
    },
    onClick (event) {
      event.stopPropagation()
    },
    onMouseDown (event) {
      event.stopPropagation()
    },
    renderContent () {
      const { active = {} } = this
      const { type } = active

      switch (type) {
        case 'bar': {
          return (
            <Bar
              layer={active}
            />
          )
        }
        case 'bar-graph': {
          return (
            <BarGraph
              layer={active}
            />
          )
        }
        case 'flat-map': {
          return (
            <FlatMap
              layer={active}
            />
          )
        }
        case 'graph': {
          return (
            <Graph
              layer={active}
            />
          )
        }
        case 'indicator': {
          return (
            <Indicator
              layer={active}
            />
          )
        }
        case 'line': {
          return (
            <Line
              layer={active}
            />
          )
        }
        case 'pie': {
          return (
            <Pie
              layer={active}
            />
          )
        }
        case 'ring': {
          return (
            <Ring
              layer={active}
            />
          )
        }
        case 'swipe-single': {
          return (
            <SwipeSingle
              layer={active}
            />
          )
        }
        case 'table': {
          return (
            <Table
              layer={active}
            />
          )
        }
      }
    },
    renderEmpty () {
      return (
        <div class="setting__empty">
          <div class="empty-icon">
            <i class="icon icon-setting-empty"/>
          </div>
          <div class="empty-info">设置组件</div>
        </div>
      )
    },
    renderTrigger () {
      return (
        <div class="setting__trigger">
          <Tooltip title="组件">
            <div class="item">
              <i class="icon icon-setting-component"/>
            </div>
          </Tooltip>
          <Tooltip title="图层">
            <div class="item">
              <i class="icon icon-setting-layer"/>
            </div>
          </Tooltip>
        </div>
      )
    }
  },
  render () {
    const { active = {} } = this
    const { id } = active
    const isSetting = !!id

    return (
      <div class="setting" onClick={this.onClick}>
        { this.renderTrigger() }
        <Tabs default-active-key="1">
          <TabPane tab-key="1" tab="组件设置">
            {
              isSetting ? (
                <div class="setting__content" key={id}>
                  {this.renderContent()}
                </div>
              ) : this.renderEmpty()
            }
          </TabPane>
          <TabPane tab-key="2" tab="页面设置">
            <ScreenSetting />
          </TabPane>
        </Tabs>
      </div>
    )
  }
}
</script>

<style scoped lang="less">
.setting {
  width: 300px;
  height: 100%;
  background-color: #fff;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 999;

  &__trigger {
    position: absolute;
    top: 10px;
    left: -45px;
    width: 40px;
    height: 80px;
    z-index: 999;
    background-color: #ffffff;
    //display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    display: none;

    .item {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;

      .icon {
        width: 18px;
        height: 18px;
      }

      &.active {
        background-color: #488FF9;
      }
    }
  }

  &__content {
    width: 100%;
    flex: 1;
    padding: 0 4px;
    overflow: auto;
  }

  &__empty {
    margin-top: 50%;
    width: 100%;

    .empty-icon {
      width: 100%;
      height: 62px;

      display: flex;
      align-items: center;
      justify-content: center;

      .icon {
        width: 78px;
        height: 62px;
      }
    }

    .empty-info {
      width: 100%;
      margin-top: 42px;
      color: #959BA3;
      font-size: 14px;
      height: 20px;
      line-height: 20px;
      text-align: center;
    }
  }
}
</style>
