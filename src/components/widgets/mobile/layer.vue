<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import { KEY_CODE } from '@/assets/constant'
import Swipe from './swipe/render'
import DataCard from './data-card/render'
import XmBaseTab from './xmbase-tab/render'
import SwipeSingle from './swipe-single/render'
import XmBaseIndicatorBlock from './xmbase-indicator-block/render'

export default {
  name: 'ScWidget',
  props: {
    widget: Object
  },
  components: {
    Swipe,
    DataCard,
    XmBaseTab,
    SwipeSingle
  },
  data () {
    return {

    }
  },
  computed: {
    ...mapState('active', ['active']),
    ...mapState('screen', ['scale', 'keys', 'select', 'selectWidgets']),
    isActive () {
      if (this.active && this.widget) {
        return this.widget.id === this.active.id
      }
      return false
    }
  },
  methods: {
    ...mapMutations('active', ['setActive']),
    ...mapMutations('screen', [
      'updateWidget',
      'deleteWidget',
      'moveWidget',
      'resizeWidget',
      'setSelect',
      'addSelect',
      'deleteSelect',
      'clearSelect'
    ]),
    onSelect (event) {
      const { id } = this.widget
      // 按住Ctrl多选
      if (this.keys.includes(KEY_CODE.CTRL)) {
        if (!this.select.includes(id)) {
          this.addSelect(id)
        } else {
          this.deleteSelect(id)
        }
      } else {
        this.clearSelect()
        this.addSelect(id)
        this.setActive(this.widget)
      }
      event.stopPropagation()
    },
    onMoveStart (event) {
      const { id, position: { x, y } } = this.widget
      this.moveWidget({id, x, y})
      event.stopPropagation()
    },
    onResizeStart (event) {
      const { id, size: { width, height } } = this.widget
      this.resizeWidget({id, width, height})
      event.stopPropagation()
    },
    renderWidget () {
      const { type } = this.widget
      switch (type) {
        case 'xmbase-tab': {
          return (<XmBaseTab widget={this.widget}/>)
        }
        case 'swipe-single': {
          return (<SwipeSingle widget={this.widget}/>)
        }
        case 'swipe': {
          return (<Swipe widget={this.widget}/>)
        }
        case 'data-card': {
          return (<DataCard widget={this.widget}/>)
        }
        case 'xmbase-indicator-block': {
          return (<XmBaseIndicatorBlock widget={this.widget}/>)
        }
      }
    }
  },
  render () {
    const {
      id,
      zIndex,
      position: {
        x,
        y
      },
      size: {
        width,
        height
      }
    } = this.widget
    const props = {
      style: {
        zIndex,
        top: `${y}px`,
        left: `${x}px`,
        width: `${width}px`,
        height: `${height}px`
      }
    }
    const isSelect = this.select.includes(id)
    console.log('isSelect:', isSelect)

    // if (isSelect) {
    //   // 计算布局后的位置
    //   console.log('isSelect:', isSelect, id, this.selectWidgets, this.selectWidgets[id])
    //   const { position } = this.selectWidgets[id]
    //   props.style.top = `${position.y}px`
    //   props.style.left = `${position.x}px`
    // }

    const moveProps = {
      on: {
        mousedown: this.onMoveStart
      }
    }

    const resizeProps = {
      on: {
        mousedown: this.onResizeStart
      }
    }

    return (
      <div
        {...props}
        class={`widget absolute ${isSelect && 'active'}`}
        onClick={this.onSelect}
      >
        <div
          class="widget__operation move"
          {...moveProps}
        >
          <i class="icon icon-widget-move"/>
        </div>
        <div
          class="widget__operation delete"
          onClick={() => this.deleteWidget(id)}
        >
          <i class="icon icon-widget-delete"/>
        </div>
        <div
          class="widget__operation resize"
          {...resizeProps}
        >
          <i class="icon icon-widget-resize"/>
        </div>
        <div class="widget__content">
          {this.renderWidget()}
        </div>
        <div
          class="widget__resize"
          {...resizeProps}
        >
        </div>
      </div>
    )
  }
}
</script>

<style scoped lang="less">
@activeColor: #2266FF;

.widget {
  //border-radius: 4px;
  border: 1px solid transparent;
  box-shadow: 0 0 4px #3B4A7424;
  box-sizing: border-box;

  // 绝对定位
  &.absolute {
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    width: 300px;
  }

  &__operation {
    position: absolute;
    width: 32px;
    height: 32px;
    align-items: center;
    justify-content: center;
    background-color: transparent !important;
    z-index: 999;
    border: 1px dotted blue;
    display: none;
    //display: flex;

    .icon {
      width: 80%;
      height: 80%;
    }

    &.move {
      top: -32px;
      left: 0;
      cursor: move;
    }
    &.delete {
      top: -32px;
      right: 0;
    }
    &.resize {
      right: -16px;
      bottom: -16px;
      background-color: #ffffff !important;
      cursor: se-resize;
    }
  }

  &__header {
    height: 28px;
    width: 100%;
    position: absolute;
    top: -28px;
    left: 0;
    background-color: transparent;

    display: flex;
    align-items: center;
    justify-content: space-between;

    .icon {
      width: 20px;
      height: 20px;
    }
  }

  &__config {
    position: absolute;
    top: -28px;
    right: 0;

    height: 28px;
    width: 200px;
    background-color: transparent;

    //display: none;
    cursor: move;
  }

  &__content {
    border: 1px solid transparent;
    overflow: hidden;
    width: 100%;
    height: 100%;
  }

  &.active {
    border: 1px solid red;
    box-shadow: 0 0 2px red;
  }

  &:hover {
    z-index: 9998 !important;
    border: 1px solid #2266FF;
    box-shadow: 0 0 2px #2266FF;

    .widget__operation {
      display: flex;
    }
  }

  //&.active {
  //  & > .widget__operation {
  //    display: flex;
  //  }
  //}
}

</style>
