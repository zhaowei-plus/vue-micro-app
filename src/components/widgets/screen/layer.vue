<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import cloneDeep from 'lodash/cloneDeep'
import { Tooltip } from 'ant-design-vue'

import { KEY_CODE } from '@/assets/constant'
import Bar from './bar/render'
import Pie from './pie/render'
import Line from './line/render'
import Ring from './ring/render'
import Graph from './graph/render'
import Table from './table/render'
import FlatMap from './flat-map/render'
import BarGraph from './bar-graph/render'
import Indicator from './indicator/render'
import SwipeSingle from './swipe-single/render'

export default {
  name: 'ScLayer',
  props: {
    layer: Object
  },
  components: {
    Line
  },
  data () {
    return {

    }
  },
  computed: {
    ...mapState('active', ['active']),
    ...mapState('screen', ['scale', 'keys', 'layers', 'layoutLayers', 'layoutLayersInfo']),
    isActive () {
      if (this.active && this.layer) {
        return this.layer.id === this.active.id
      }
      return false
    }
  },
  methods: {
    ...mapMutations('active', ['setActive']),
    ...mapMutations('screen', [
      'setLayout',
      'addToLayout',
      'removeFromLayout'
    ]),
    ...mapActions('screen', [
      'addLayer',
      'removeLayer',
      'moveLayer',
      'resizeLayer',
      'resetLayersLevel'
    ]),
    onClick (event) {
      const { id } = this.layer
      if (this.keys.includes(KEY_CODE.CTRL)) {
        // 处理
        if (!this.layoutLayers.includes(id)) {
          this.addToLayout(id)
        } else {
          this.removeFromLayout(id)
        }
      } else {
        this.setLayout(id)
        this.setActive(this.layer)
      }
      event.stopPropagation()
    },
    onMoveDown (event) {
      const { id, position: { x, y } } = this.layer
      this.moveLayer({ id, x, y })
      event.stopPropagation()
    },
    onResizeStart (event) {
      const { id, size: { width, height } } = this.layer
      this.resizeLayer({id, width, height})
      event.stopPropagation()
    },
    setLevel (event, level) {
      const { id } = this.layer
      const levels = this.layers.map(({ id, zIndex }) => ({ id, zIndex })).sort((a, b) => a.zIndex - b.zIndex)
      const sourceIndex = levels.findIndex(item => id === item.id)
      const source = levels[sourceIndex]

      let needUpdate = false
      switch (level) {
        case 'top': {
          if (sourceIndex < levels.length - 1) {
            needUpdate = true
            levels.splice(sourceIndex, 1)
            levels.push(source)
          }
          // 置顶
          break
        }
        case 'bottom': {
          // 置底
          if (sourceIndex > 0) {
            needUpdate = true
            levels.splice(sourceIndex, 1)
            levels.unshift(source)
          }
          break
        }
        case 'up': {
          // 上移一层
          if (sourceIndex < levels.length - 1) {
            needUpdate = true
            const target = levels[sourceIndex + 1]
            levels[sourceIndex] = target
            levels[sourceIndex + 1] = source
          }
          break
        }
        case 'down': {
          // 下移一层
          if (sourceIndex > 0) {
            needUpdate = true
            const target = levels[sourceIndex - 1]
            levels[sourceIndex] = target
            levels[sourceIndex - 1] = source
          }
          break
        }
      }

      if (needUpdate) {
        const newLevel = levels.map((item, zIndex) => ({ ...item, zIndex }))
          .reduce((result, { id, zIndex }) => {
            result[id] = zIndex
            return result
          }, {})
        this.resetLayersLevel(newLevel)
      }
      event.stopPropagation()
    },
    renderLevelOperation () {
      const options = [
        { label: '置底', value: 'bottom' },
        { label: '置顶', value: 'top' },
        { label: '上移一层', value: 'up' },
        { label: '下移一层', value: 'down' }
      ]
      return options.map(item => (
        <Tooltip title={item.label} key={item.value}>
          <div
            class="item"
            onClick={(event) => this.setLevel(event, item.value)}
          >
            <i class={`iconfont icon-level-${item.value}`}/>
          </div>
        </Tooltip>
      ))
    },
    renderLayer () {
      const { type } = this.layer
      console.log('renderLayer:', type, JSON.stringify(this.layer, 0, 2))
      switch (type) {
        case 'line': {
          return (<Line layer={this.layer}/>)
        }
        case 'bar': {
          return (<Bar layer={this.layer}/>)
        }
        case 'bar-graph': {
          return (<BarGraph layer={this.layer}/>)
        }
        case 'flat-map': {
          return (<FlatMap layer={this.layer}/>)
        }
        case 'graph': {
          return (<Graph layer={this.layer}/>)
        }
        case 'indicator': {
          return (<Indicator layer={this.layer}/>)
        }
        case 'pie': {
          return (<Pie layer={this.layer}/>)
        }
        case 'ring': {
          return (<Ring layer={this.layer}/>)
        }
        case 'swipe-single': {
          return (<SwipeSingle layer={this.layer}/>)
        }
        case 'table': {
          return (<Table layer={this.layer}/>)
        }
      }
    }
  },
  render () {
    const {id, zIndex, position: { x, y }, size: { width, height }} = this.layer
    const props = {
      on: {
        mousedown: this.onMoveDown
      },
      style: {
        zIndex,
        top: `${y}px`,
        left: `${x}px`,
        width: `${width}px`,
        height: `${height}px`
      }
    }

    const isLayout = this.layoutLayers.length > 1 && this.layoutLayers.includes(id)
    if (isLayout) {
      const { position } = this.layoutLayersInfo[id]
      props.style.top = `${position.y}px`
      props.style.left = `${position.x}px`
    }

    const resizeProps = {
      on: {
        mousedown: this.onResizeStart
      }
    }
    return (
      <div
        {...props}
        onClick={this.onClick}
        class={`layer absolute ${(isLayout || this.isActive) && 'active'}`}
      >
        <div class="layer__header">
          {this.renderLevelOperation()}
          <Tooltip title="删除">
            <div
              class="item"
              onClick={() => this.removeLayer(id)}
            >
              <i class="icon icon-layer-delete"/>
            </div>
          </Tooltip>
        </div>

        <div
          class="layer__operation resize"
          {...resizeProps}
        >
          <i class="icon icon-layer-resize"/>
        </div>
        <div class="layer__content">
          {this.renderLayer()}
        </div>
      </div>
    )
  }
}
</script>

<style scoped lang="less">
@activeColor: #2266FF;

.layer {
  box-shadow: 0 0 4px #3B4A7424;
  box-sizing: border-box;
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  justify-content: center;
  border: 1px solid transparent;
  background-color: transparent;

  // 绝对定位
  &.absolute {
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    width: 300px;
  }

  &__header {
    position: absolute;
    top: 0;
    right: 0;
    width: auto;
    height: 32px;
    line-height: 32px;
    align-items: center;
    justify-content: space-between;
    z-index: 999;
    display: none;
    //display: flex;

    .item {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;

      .icon {
        width: 18px;
        height: 18px;
      }
    }
  }

  &__content {
    border: 1px solid transparent;
    overflow: hidden;
    width: 100%;
    height: 100%;
  }

  &__operation {
    position: absolute;
    width: 32px;
    height: 32px;
    align-items: center;
    justify-content: flex-end;
    background-color: transparent !important;
    z-index: 999;
    border: 1px dotted blue;
    //display: flex;
    display: none;

    .icon {
      width: 80%;
      height: 80%;
    }

    &.resize {
      right: 0;
      bottom: 0;
      background-color: #ffffff;
      cursor: se-resize;
    }
  }

  &:hover,
  &.active {
    z-index: 999 !important;
    border: 1px solid #2266FF;
    box-shadow: 0 0 2px #2266FF;
  }

  &:hover {
    .layer__header,
    .layer__operation {
      display: flex;
    }
  }
}

</style>
