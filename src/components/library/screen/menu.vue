<script>
export default {
  name: 'Menu',
  props: {
    item: Object,
    icon: String,
    getItem: Function
  },
  data () {
    return {
      items: [

      ]
    }
  },
  methods: {
    onMouseDown (event) {
      event.stopPropagation()
    },
    onDragStart (event) {
      event.dataTransfer.setData('item', JSON.stringify({
        type: 'addLayer',
        info: this.getItem()
      }))
      event.stopPropagation()
    }
  },
  render () {
    const { item } = this
    const props = {
      on: {
        dragstart: this.onDragStart,
        mousedown: this.onMouseDown
      }
    }
    return (
      <div
        class="menu"
        {...props}
        draggable="true"
      >
        <div class="menu__icon">
          <i class={`icon icon-screen-${item.type}`}/>
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
  width: 80px;
  height: 80px;
  cursor: pointer;
  border-radius: 4px;
  padding: 7px;

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
    height: 18px;
    line-height: 18px;
    font-size: 12px;
  }
}
</style>
