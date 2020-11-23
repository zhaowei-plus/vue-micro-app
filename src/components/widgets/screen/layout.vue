<script>
import { Tooltip } from 'ant-design-vue'
import {mapState, mapMutations} from 'vuex'
import { ALIGN_TYPES } from '@/assets/constant'
import { minAndMax } from '@/utils'

export default {
  name: 'ScPosition',
  data () {
    return {
      align: 'none'
    }
  },
  components: {
    Tooltip
  },
  computed: {
    ...mapState('active', ['active']),
    ...mapState('screen', ['scale', 'layers', 'layoutLayers', 'layoutLayersInfo']),
    position () {
      const { x, y } = this.layers.filter(layer => this.layoutLayers.includes(layer.id))
        .map(layer => {
          const { position: { x, y }, size: { width, height } } = layer
          return [{ x, y }, { x: x + width, y: y + height }]
        })
        .reduce(({ x, y }, [lt, rb]) => {
          x.push()
          y.push(rb.y)
          return {
            x: x.concat([lt.x, rb.x]),
            y: y.concat([lt.y, rb.y])
          }
        }, { x: [], y: [] })

      const [minX, maxX] = minAndMax(x)
      const [minY, maxY] = minAndMax(y)
      return {
        x: minX,
        y: minY,
        width: maxX - minX,
        height: maxY - minY
      }
    }
  },
  methods: {
    ...mapMutations('active', ['setActive']),
    ...mapMutations('screen', [
      'setLayout',
      'updateLayoutLayersInfo',
      'updateLayoutLayersInfoToCanvas'
    ]),
    onMoveDown (event) {
      this.moveLayout(this.position)
      event.stopPropagation()
    },
    onCancel () {
      this.setLayout()
    },
    setAlign (event, align) {
      this.align = align
      event.stopPropagation()

      const [first, ...rest] = this.layoutLayers
      const {id, position: { x }, size: { width }} = this.layoutLayersInfo[first]

      // 重新计算位置位置关系
      let newPositions = []
      switch (align) {
        case 'left': {
          // 左对齐
          const targetLeft = x
          newPositions = rest.map(d => {
            const { id, position, size } = this.layoutLayersInfo[d]
            return {
              id,
              position: {
                x: targetLeft,
                y: position.y
              },
              size
            }
          })
          break
        }
        case 'right': {
          // 右对齐
          const targetRight = x + width
          newPositions = rest.map(d => {
            const { id, position, size } = this.layoutLayersInfo[d]
            return {
              id,
              position: {
                x: targetRight - size.width,
                y: position.y
              },
              size
            }
          })
          break
        }
        case 'vertical-center': {
          // 垂直居中对齐：X坐标不变，纵坐标：YCenter - height / 2
          const { y, height } = this.position
          const targetVerticalCenter = y + height / 2
          newPositions = this.layoutLayers.map(d => {
            const { id, position, size } = this.layoutLayersInfo[d]
            return {
              id,
              position: {
                x: position.x,
                y: targetVerticalCenter - size.height / 2
              },
              size
            }
          })
          break
        }
        case 'horizontal-center': {
          // 水平居中：Y坐标不变，XCenter - width / 2
          const { x, width } = this.position
          const targetHorizontalCenter = x + width / 2
          newPositions = this.layoutLayers.map(d => {
            const { id, position, size } = this.layoutLayersInfo[d]
            return {
              id,
              position: {
                x: targetHorizontalCenter - size.width / 2,
                y: position.y
              },
              size
            }
          })
          break
        }
        case 'top': {
          // 顶部对齐
          const { y } = this.position
          const targetY = y
          newPositions = this.layoutLayers.map(d => {
            const { id, position, size } = this.layoutLayersInfo[d]
            return {
              id,
              position: {
                x: position.x,
                y: targetY
              },
              size
            }
          })
          break
        }
        case 'bottom': {
          // 底部对齐
          const { y, height } = this.position
          const targetY = y + height
          newPositions = this.layoutLayers.map(d => {
            const { id, position, size } = this.layoutLayersInfo[d]
            return {
              id,
              position: {
                x: position.x,
                y: targetY - size.height
              },
              size
            }
          })
          break
        }
      }
      const newLayoutLayersInfo = newPositions.reduce((result, layoutLayer) => {
        result[layoutLayer.id] = layoutLayer
        return result
      }, {
        [id]: this.layoutLayersInfo[id]
      })
      this.updateLayoutLayersInfo(newLayoutLayersInfo)
    },
    renderAlignConfig () {
      return ALIGN_TYPES.map(item => (
        <Tooltip title={item.label} key={item.value}>
          <div
            class="item"
            onClick={(event) => this.setAlign(event, item.value)}
          >
            <i class={`iconfont icon-align-${item.value}`}/>
          </div>
        </Tooltip>
      ))
    }
  },
  render () {
    const { x, y, width, height } = this.position
    const props = {
      style: {
        top: `${y}px`,
        left: `${x - 1}px`,
        width: `${width + 2}px`,
        height: `${height}px`
      }
    }
    return (
      <div class="position" {...props}>
        <div class="position__operation">
          <div class="cancel" onClick={this.onCancel}>
            <a>取消</a>
          </div>

          <div class="align">
            {this.renderAlignConfig()}
          </div>
        </div>
      </div>
    )
  }
}
</script>

<style scoped lang="less">
@activeColor: #2266FF;
.position {
  position: absolute;
  top: 30px;
  left: 20px;

  width: 300px;
  height: 400px;
  border-radius: 2px;
  pointer-events: none;
  border: 1px solid @activeColor;
  box-shadow: 0 0 2px @activeColor;

  &__operation {
    position: absolute;
    top: -32px;
    left: 0;
    width: 100%;
    height: 32px;
    display: flex;
    padding: 0 4px;
    align-items: center;
    justify-content: space-between;
    z-index: 0;
    border: 1px solid @activeColor;
    box-shadow: 0 0 2px @activeColor;
    pointer-events: auto !important;
    box-sizing: border-box;

    .move {
      width: 30px;
      height: 30px;

      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #fff;

      .icon {
        width: 60%;
        height: 60%;
        cursor: pointer;
      }
    }

    .cancel {
      cursor: pointer;
    }

    .align {
      display: flex;
      align-items: center;

      .item {
        width: 30px;
        height: 30px;

        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #fff;

        .icon {
          width: 60%;
          height: 60%;
          cursor: pointer;
        }
      }
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
    overflow: hidden;
    width: 100%;
    height: 100%;
  }

  &.active {
    border: 1px solid @activeColor;
  }

  &:hover {
    border: 1px solid @activeColor !important;
    z-index: 9998 !important;

    .widget__operation {
      display: flex;
    }
  }

  &.active {
    & > .widget__operation {
      display: flex;
    }
  }
}

</style>
