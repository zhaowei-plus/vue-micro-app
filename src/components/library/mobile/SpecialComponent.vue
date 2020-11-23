<script>
import { DataCard } from '@/config'
import { PageUtils } from '@/utils'
import Menu from './menu'

export default {
  name: 'SpecialComponent',
  components: {
    Menu
  },
  data () {
    return {
      items: [
        {
          icon: 'icon-data-card',
          ...DataCard.defaultValues
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
          特殊组件
        </div>
        <div class="group__components">
          {
            this.items.map((item, index) => (
              <Menu key={index} item={item} />
            ))
          }
        </div>
      </div>
    )
  }
}
</script>
