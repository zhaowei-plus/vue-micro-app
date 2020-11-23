<script>
import { PageUtils } from '@/utils'
import Menu from './menu'
import { XmBaseTab } from '@/config'

export default {
  name: 'Container',
  components: {
    Menu
  },
  data () {
    return {
      items: [
        {
          icon: 'icon-xmbase-tab',
          ...XmBaseTab
        }
      ]
    }
  },
  methods: {
    getChildComponent (index) {
      return PageUtils.initWidget(this.items[index])
    }
  },
  render () {
    return (
      <div class="group">
        <div class="group__title">
          布局容器
        </div>
        {
          this.items.map((item, index) => (
            <Menu key={index} item={item} />
          ))
        }
      </div>
    )
  }
}
</script>
