<script>
import { PageUtils } from '@/utils'
export default {
  name: 'Menu',
  props: {
    item: Object
  },
  data () {
    return {
      items: [

      ]
    }
  },
  methods: {
    getItem () {
      return PageUtils.initWidget(this.item)
    },
    onDragStart (event) {
      console.log('dragStart:', this.getItem())
      event.dataTransfer.setData('item', JSON.stringify(this.getItem()))
    }
  },
  render () {
    const { item } = this
    const props = {
      on: {
        dragstart: this.onDragStart
      }
    }
    return (
      <div
        class="menu"
        {...props}
        draggable="true"
      >
        <div class="menu__icon">
          <i class={`icon ${item.icon}`}/>
        </div>
        <label class="menu__title">
          {item.title}
        </label>
      </div>
    )
  }
}
</script>
<style scoped lang="less">
.menu {
  width: 70px;
  height: 70px;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    border: 1px dashed #409eff;
  }

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &__icon {
    width: 40px;
    height: 40px;
    display: flex;
  }

  &__title {
    width: 100%;
    text-align: center;
    margin-top: 2px;
    height: 20px;
    line-height: 20px;
    font-size: 12px;
  }
}
</style>
