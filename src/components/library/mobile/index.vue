<script>
import { Tabs } from 'ant-design-vue'
import Container from './Container'
import NormalComponent from './NormalComponent'
import SpecialComponent from './SpecialComponent'

const { TabPane } = Tabs

export default {
  name: 'Library',
  components: {
    Container,
    NormalComponent,
    SpecialComponent,
    Tabs,
    TabPane
  },
  methods: {

  },
  render () {
    return (
      <div class="library">
        <Tabs
          default-active-key="1"
          type="card"
        >
          <TabPane key="1" tab="基础组件">
            <Container />
            <NormalComponent />
            <SpecialComponent />
          </TabPane>
          <TabPane key="2" tab="定制组件">
            定制组件
          </TabPane>
          <TabPane key="3" tab="自定义">
            自定义
          </TabPane>
        </Tabs>
      </div>
    )
  }
}
</script>
<style scoped lang="less">
.library {
  width: 300px;
  height: 100%;
  background-color: #fff;
}
</style>

<style lang="less">
.group {
  padding: 4px;

  &__title {
    height: 30px;
    line-height: 30px;
    color: #262A30;
    font-size: 12px;
  }

  &__components {
    display: grid;
    grid-template-columns: repeat(3, 70px);
    padding: 10px;
    gap: 20px;
    align-items: center;
    justify-content: center;


  }
}
</style>
