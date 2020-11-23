<script>
import { Icon } from 'ant-design-vue'

import Menu from './menu'
import Line from '@/components/widgets/screen/line'
import Graph from '@/components/widgets/screen/graph'
import Bar from '@/components/widgets/screen/bar'
import Pie from '@/components/widgets/screen/pie'
import Ring from '@/components/widgets/screen/ring'
import Table from '@/components/widgets/screen/table'
import FlatMap from '@/components/widgets/screen/flat-map'
import BarGraph from '@/components/widgets/screen/bar-graph'
import Indicator from '@/components/widgets/screen/indicator'
import SwipeSingle from '@/components/widgets/screen/swipe-single'

export default {
  name: 'dataComponent',
  components: {
    Menu,
    Icon
  },
  data () {
    return {
      expand: true,
      items: [
        {
          icon: 'icon-xmbase-tab',
          ...FlatMap.defaultValues,
          init: FlatMap.init
        }
      ]
    }
  },
  methods: {
    expandChange () {
      this.expand = !this.expand
    }
  },
  render () {
    return (
      <div class="group">
        <div class="group__header">
          <div class="operation">
            <Icon
              type="caret-right"
              onClick={this.expandChange}
              class={`${this.expand && 'expand'}`}
            />
          </div>
          <label class="title">地图组件</label>
        </div>
        <div class={`group__content ${!this.expand && 'hidden'}`}>
          {
            this.items.map((item, index) => {
              const { init, icon, ...rest } = item
              return (
                <Menu
                  key={index}
                  icon={icon}
                  item={rest}
                  getItem={() => init()}
                />
              )
            })
          }
        </div>
      </div>
    )
  }
}
</script>
<style scoped lang="less">
.group {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  padding: 0 20px;

  .hidden {
    display: none !important;
  }

  &__header {
    height: 39px;
    line-height: 39px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    .operation {
      margin-right: 4px;
      .anticon {
        transition-duration: .25s;
        &.expand {
          transform: rotateZ(90deg);
        }
      }
    }

    .title {
      color: #262A30;
      font-size: 14px;
      height: 39px;
      line-height: 39px;
      text-align: right;
    }
  }

  &__content {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }
}
</style>
