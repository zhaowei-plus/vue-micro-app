<script>
import { Swipe, SwipeSingle, XmBaseIndicatorBlock } from '@/config'
import { PageUtils } from '@/utils'

import Menu from './menu'

export default {
  name: 'NormalComponent',
  components: {
    Menu
  },
  data () {
    return {
      items: [
        {
          icon: 'icon-swipe',
          ...Swipe
        },
        {
          icon: 'icon-swipe-single',
          ...SwipeSingle
        },
        {
          icon: 'icon-swipe-single',
          ...XmBaseIndicatorBlock
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
          组件
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
