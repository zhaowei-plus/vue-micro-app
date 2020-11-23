<script>
import { Empty } from 'ant-design-vue'
import Form from '@/components/form'
export default {
  name: 'lineMutual',
  components: {
    Form
  },
  data () {
    return {}
  },
  render () {
    return (
      <Empty description="暂无" />
    )
  }
}
</script>
<style scoped lang="less">
.empty {
  height: 180px;
  line-height: 180px;
  text-align: center;
}
</style>
