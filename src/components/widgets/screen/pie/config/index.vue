<script>
import Tabs from '@/components/tabs'
import Data from './data'
import Style from './style'
import Mutual from './mutual'

const { TabPane } = Tabs

export default {
  name: 'lineConfig',
  components: {
    Tabs,
    TabPane,
    Data,
    Style,
    Mutual
  },
  props: {
    layer: Object
  },
  render () {
    return (
      <Tabs default-active-key="1">
        <TabPane tab-key="1" tab="数据">
          <Data layer={this.layer} />
        </TabPane>
        <TabPane tab-key="2" tab="样式">
          <Style layer={this.layer} />
        </TabPane>
        <TabPane tab-key="3" tab="交互">
          <Mutual layer={this.layer} />
        </TabPane>
      </Tabs>
    )
  }
}
</script>
