<script>
import { Tabs } from 'ant-design-vue'
import Data from './data/index'
import Style from './style/index'
import Mutual from './mutual/index'

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
        <Tabs default-active-key="1">
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
