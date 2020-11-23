<script>
import { Tabs } from 'ant-design-vue'
import Data from './data'
import Style from './style'
import Mutual from './mutual'

const { TabPane } = Tabs

export default {
  name: 'config',
  components: {
    Tabs,
    TabPane,
    Data,
    Style,
    Mutual
  },
  props: {
    widget: Object
  },
  render () {
    return (
      <div class="config">
        <Tabs
          default-active-key="1"
          type="card"
        >
          <TabPane key="1" tab="数据">
            <Data widget={this.widget} />
          </TabPane>
          <TabPane key="2" tab="样式">
            <Style widget={this.widget} />
          </TabPane>
          <TabPane key="3" tab="交互">
            <Mutual widget={this.widget} />
          </TabPane>
        </Tabs>
      </div>
    )
  }
}
</script>

<style scoped>
.config {}
</style>
