<script>
import {mapState, mapActions, mapMutations} from 'vuex'
import { SCREEN } from '@/assets/constant'
import Layer from '../widgets/screen/layer'
import Layout from '../widgets/screen/layout'

export default {
  name: 'ScreenEditor',
  components: {
    Layer,
    Layout
  },
  mounted () {
    window.addEventListener('mousemove', this.onWindowMouseMove)
    window.addEventListener('mouseup', this.onWindowMouseUp)
    window.addEventListener('keydown', this.onWindowKeydown)
    window.addEventListener('keyup', this.onWindowKeyUp)
  },
  beforeDestroy () {
    window.removeEventListener('mousemove', this.onWindowMouseMove)
    window.removeEventListener('mouseup', this.onWindowMouseUp)
    window.removeEventListener('keydown', this.onWindowKeydown)
    window.removeEventListener('keyup', this.onWindowKeyUp)
  },
  computed: {
    ...mapState('screen', [
      'page',
      'scale',
      'layers',
      'layoutLayers',
      'isMoveCanvas',
      'canvasPosition',
      'isMoveLayer',
      'layerPosition',
      'isResizeLayer',
      'layerSize',
      'isMoveLayout',
      'layoutPosition'
    ])
  },
  methods: {
    ...mapMutations('active', ['setActive']),
    ...mapMutations('screen', [
      'moveCanvas',
      'moveLayout',
      'addKey',
      'removeKey'
    ]),
    ...mapActions('screen', [
      'addLayer',
      'moveLayer',
      'resizeLayer',
      'updateLayoutLayersInfoToCanvas'
    ]),
    onWindowMouseMove (event) {
      const { movementX, movementY } = event
      // 移动画布
      if (this.isMoveCanvas) {
        const { x, y } = this.canvasPosition
        this.moveCanvas({
          x: x + movementX,
          y: y + movementY
        })
      }

      // 移动图层
      if (this.isMoveLayer) {
        const { id, x, y } = this.layerPosition
        this.moveLayer({
          id,
          x: x + movementX,
          y: y + movementY
        })
      }

      // Resize图层
      if (this.isResizeLayer) {
        const { id, width, height } = this.layerSize
        this.resizeLayer({
          id,
          width: width + movementX,
          height: height + movementY
        })
      }

      // 移动布局组件
      if (this.isMoveLayout) {
        const { x, y, width, height } = this.layoutPosition
        this.moveLayout({
          x: x + movementX,
          y: y + movementY,
          width,
          height
        })
      }
    },
    onWindowMouseUp () {
      this.moveCanvas()
      this.moveLayer()
      this.resizeLayer()
    },
    onWindowKeydown (event) {
      this.addKey(event.keyCode)
    },
    onWindowKeyUp (event) {
      this.removeKey(event.keyCode)
    },
    onMouseDown (event) {
      // TODO 考虑支持mac双指移动
      this.moveCanvas(this.canvasPosition)
      event.stopPropagation()
    },
    onClick (event) {
      if (this.layoutLayers.length > 1) {
        this.updateLayoutLayersInfoToCanvas()
      }

      this.setActive()
      event.stopPropagation()
    },
    onDrop (event) {
      const { clientX, clientY, layerX, layerY, offsetX, offsetY, pageX, pageY, screenX, screenY, x, y, movementX, movementY } = event
      console.log('client(%s,%s)', clientX, clientY) // 以浏览器的可视区域（inner部分，也就是body的起始位置 ) 左上角为原点，定位 (x, y) 坐标，会随滚动条的滚动而改变；
      console.log('offset(%s,%s)', offsetX, offsetY) // 以当前事件的目标对象的左上角为原点，定位 (x, y) 坐标
      console.log('page(%s,%s)', pageX, pageY) // 以 Document 对象（即文本窗口）（即 Body）左上角为原点，定位 (x, y) 坐标
      console.log('screen(%s,%s)', screenX, screenY) // 以计算机屏幕左上角为原点，定位 (x, y) 坐标
      console.log('level(%s,%s)', layerX, layerY) // 最近的绝对定位的父元素（如果没有，则为Document对象）左上角为原点，定位 (x, y) 坐标
      console.log('x-y(%s,%s)', x, y) // 相对于用 css 动态定位（position）的最内层包容元素； 由于x、y在各个浏览器中的兼容性有差别，所以要特别注意
      console.log('movement(%s,%s)', movementX, movementY) // 相对于上一次 mousemove 事件之间的鼠标 （x，y）的偏移量

      const item = event.dataTransfer.getData('item')
      if (item) {
        const { type, info } = JSON.parse(item)
        switch (type) {
          case 'addLayer': {
            const { width, height, ...rest } = info
            this.addLayer({
              ...rest,
              position: {
                x: offsetX - 30,
                y: offsetY - 30,
              },
              size: {
                width: width * this.scale,
                height: height * this.scale,
              },
              zIndex: this.layers.length
            })
            break
          }
        }
      }
      event.stopPropagation()
    },
    onDragOver (event) {
      event.preventDefault()
      event.stopPropagation()
    },
    renderLayout () {
      if (this.layoutLayers.length > 1) {
        return (
          <Layout />
        )
      }
    },
    renderContent () {
      if (this.layers.length === 0) {
        return (
          <div class="empty">
            <i class="icon icon-editor-empty" />
            <label>请从左侧拖入控件来创建表单</label>
          </div>
        )
      }

      return this.layers.map(layer => {
        return (
          <Layer
            key={layer.id}
            layer={layer}
          />
        )
      })
    }
  },
  render () {
    // backgroundImage: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2583035764,1571388243&fm=26&gp=0.jpg', // 背景图
    //   backgroundColor: '#ffffff' // 背景颜色
    const { x, y } = this.canvasPosition
    const { backgroundImage, backgroundColor } = this.page
    const { width, height } = SCREEN.SIZE

    const maskProps = {
      on: {
        mousedown: this.onMouseDown
      }
    }
    const editorProps = {
      on: {
        dragover: this.onDragOver,
        drop: this.onDrop
      },
      style: {
        top: `${y}px`,
        left: `${x}px`,
        width: `${width * this.scale + 2}px`,
        height: `${height * this.scale + 2}px`
      }
    }

    const contentProps = {
      style: {
        width: `${width * this.scale}px`,
        height: `${height * this.scale}px`,
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor
      }
    }

    return (
      <div class="editor-mask" {...maskProps} onClick={this.onClick}>
        <div
          class="editor"
          {...editorProps}
        >
          <div class="editor__title">
            页面名称({width * this.scale},{height * this.scale})
          </div>
          <div class="editor__content" {...contentProps}>
            {this.renderLayout()}
            {this.renderContent()}
          </div>
        </div>
      </div>

    )
  }
}
</script>

<style scoped lang="less">
.editor-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 900;
  background-color: rgb(229, 233, 237);

  .editor {
    position: relative;
    border: 1px solid transparent;
    box-sizing: border-box;
    background-color: #fff;

    &:hover {
      border: 1px dotted blue;
      border-radius: 4px;
    }

    &__title {
      width: 100%;
      height: 20px;
      line-height: 20px;
      color: #0000004D;
      font-size: 14px;
      background-color: transparent;
      position: absolute;
      top: -24px;
      left: 0;
    }

    &__content {
      background-color: #F7F8F9;

      .empty {
        width: 100%;
        height: 100%;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .icon {
          width: 156px;
          height: 100px;
        }

        label {
          height: 20px;
          line-height: 20px;
          font-size: 14px;
          color: #5C626B;
          margin-top: 20px;
        }
      }
    }
  }
}
</style>
