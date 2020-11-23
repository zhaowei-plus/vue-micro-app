<script>
import { Draggable } from 'vue-smooth-dnd'
import { Tabs } from 'ant-design-vue'

import XmTabPane from './xm-tab-pane'

const { TabPane } = Tabs

export default {
  name: 'ScXmBaseTab',
  props: {
    widget: Object
  },
  components: {
    Tabs,
    Draggable,
    TabPane,
    XmTabPane
  },
  created () {
    const { children = [] } = this.widget
    if (children.length > 0) {
      this.defaultActiveKey = children[0].id
    }
  },
  methods: {},
  render () {
    const { title, showTitle, children = [], size = {} } = this.widget
    const { width, height } = size

    const style = {
      width: `${width}px`,
      height: `${height}px`
    }

    const props = {
      // style
    }

    console.log('this.$children:', this.$children)
    // console.log('this:', this)
    // console.log('this.scopedSlots:', this.$scopedSlots)
    // {this.$scopedSlots.default()}

    return (
      <div
        class="xm-base-tab"
        {...props}
      >
        {this.$children}
        {
          showTitle && (
            <div class="xm-base-tab__header">
              {title}
            </div>
          )
        }
        <div class="xm-base-tab__content">
          <Tabs>
            {
              children.map((tab, index) => (
                <TabPane
                  key={index}
                  tab={tab.name}
                >
                  <XmTabPane tab={tab} />
                </TabPane>
              ))
            }
          </Tabs>
        </div>
      </div>
    )
  }
}
</script>

<style scoped lang="less">
.xm-base-tab {
  border: 1px solid transparent;
  position: relative;
  background-color: #ffffff;
  width: 100%;
  height: 100%;

  &__header {
    height: 32px;
    line-height: 32px;
    color: #262A30;
  }

  &__content {}
}
</style>
