<script>
import { Dropdown, Menu, Icon, Modal, message } from 'ant-design-vue'
import { mapState, mapMutations, mapActions } from 'vuex'
import { minAndMax } from '@/utils'
import { ALIGN_TYPES } from '@/assets/constant'
import Screen from '../components/screen'

export default {
  name: 'PageScreen',
  components: {
    Screen,
    Dropdown,
    Menu,
    Icon,
    Modal
  },
  computed: {
    ...mapState('screen', ['past', 'scale', 'future', 'page', 'layers', 'layoutLayers', 'layoutLayersInfo']),
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
    ...mapActions('screen', ['prev', 'next']),
    ...mapMutations('screen', [
      'setScale',
      'setLayout',
      'updateLayoutLayersInfo',
      'updateLayoutLayersInfoToCanvas'
    ]),
    changeScale ({ key }) {
      if (key !== this.scale) {
        this.setScale(key)
      }
    },
    handleBack () {
      Modal.confirm({
        title: '提示',
        content: '您的操作未保存，是否确认退出？',
        onOk: () => {
          console.log('返回')
        }
      })
    },
    handleReset () {
      Modal.confirm({
        title: '确认恢复初始吗？',
        content: '将恢复到上次保存后的状态',
        onOk: () => {
          console.log('恢复初始')
        }
      })
    },
    handlePreview () {
      console.log('预览')
    },
    handleSave () {
      const { page = {}, layers = [] } = this

      if (layers.length === 0) {
        message.error('页面为空，请拖入组件进行配置')
        return false
      }

      const params = {
        ...page,
        layers
      }

      console.log('params:', JSON.stringify(params, 0, 2))
      this.$http.post('screen/save', params).then(res => {
        Modal.success({
          title: '保存成功',
          content: '编辑内容已生效，可到客户端查看。'
        })
      })
    },
    setAlign (align) {
      if (this.layoutLayers.length === 0) {
        return false
      }
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
    renderPosition () {
      return (
        <Dropdown>
          <div class="item">
            <i class="icon icon-position"/>
            <label>对齐</label>
          </div>
          <Menu slot="overlay">
            {
              ALIGN_TYPES.map(item => (
                <Menu.Item key={item.value} onClick={() => this.setAlign(item.value)}>
                  <a>{item.label}</a>
                </Menu.Item>
              ))
            }
          </Menu>
        </Dropdown>
      )
    },
    renderLayer () {
      return (
        <Dropdown>
          <div class="item">
            <i class="icon icon-layer"/>
            <label>图层</label>
          </div>
          <Menu slot="overlay">
            {
              this.layers.map(layer => (
                <Menu.Item key={layer.id} onClick={() => this.setActive(layer)}>
                  <a>{layer.title}</a>
                </Menu.Item>
              ))
            }
          </Menu>
        </Dropdown>
      )
    },
    renderScale () {
      const options = [
        { label: '200%', value: 2 },
        { label: '100%', value: 1 },
        { label: '50%', value: 0.5 },
        // { label: '放大', value: 4 },
        // { label: '缩小', value: 5 },
        // { label: '适应屏幕', value: 1 }
      ]

      return (
        <Dropdown>
          <div class="item">
            <label class="value">{this.scale * 100}%</label>
            <label>缩放</label>
          </div>
          <Menu slot="overlay" onClick={this.changeScale}>
            {
              options.map((item, index) => (
                <Menu.Item key={item.value}>
                  <a>{item.label}</a>
                </Menu.Item>
              ))
            }
          </Menu>
        </Dropdown>
      )
    },
    renderMore () {
      const options = [
        { label: '设置', value: 1 },
        { label: '新手引导', value: 2 },
        { label: '帮助文档', value: 3 }
      ]

      return (
        <Dropdown>
          <div class="item">
            <i class="icon icon-more"/>
            <label>更多</label>
          </div>
          <Menu slot="overlay">
            {
              options.map((item, index) => (
                <Menu.Item key={index}>
                  <a>{item.label}</a>
                </Menu.Item>
              ))
            }
          </Menu>
        </Dropdown>
      )
    }
  },
  render () {
    const hasPrev = this.past.length > 0
    const hasNext = this.future.length > 0

    return (
      <div class="page">
        <div class="page__header">
          <div class="menu">
            <div class="item back" onClick={this.handleBack}>
              <i class="icon iconfont icon-back" />
              <label>编辑器</label>
            </div>
            <div class={`item ${!hasPrev && 'disabled'}`} onClick={this.prev}>
              <div class="icon">
                <i class="iconfont icon-prev"/>
              </div>
              <label>上一步</label>
            </div>
            <div class={`item ${!hasNext && 'disabled'}`} onClick={this.next}>
              <div class="icon">
                <i class="iconfont icon-next"/>
              </div>
              <label>下一步</label>
            </div>
            <div class="item" onClick={this.handleReset}>
              <i class="icon icon-reset"/>
              <label>恢复初始</label>
            </div>
          </div>
          <div class="menu">
            {this.renderPosition()}
            {this.renderLayer()}
            {this.renderScale()}
          </div>
          <div class="menu">
            <div class="item" onClick={this.handlePreview}>
              <i class="icon icon-preview"/>
              <label>预览</label>
            </div>
            <div class="item" onClick={this.handleSave}>
              <i class="icon icon-save"/>
              <label>保存</label>
            </div>
            {this.renderMore()}
          </div>
        </div>
        <div class="page__content">
          <Screen />
        </div>
      </div>
    )
  }
}
</script>

<style scoped lang="less">
.page {
  width: 100vw;
  height: 100vh;
  //background-color: rgba(0, 0, 0, .2);

  display: flex;
  flex-direction: column;

  &__header {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 50px;
    line-height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    background-color: #FFFFFF;
    box-shadow: 0 2px 4px #0000001A;
    z-index: 999;

    .menu {
      width: 180px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      &:first-of-type {
        width: 240px;
      }

      .item {
        height: 100%;
        width: 60px;
        display: flex;
        align-items: center;
        flex-direction: column;
        cursor: pointer;

        &.disabled {
          pointer-events: none;
        }

        & > .icon {
          display: flex;
          align-items: center;
          width: 20px;
          height: 20px;

          .iconfont {
            font-size: 18px;
          }
        }

        & > .value {
          height: 20px;
          line-height: 20px;
          color: #5C626B;
          font-size: 12px;
        }

        label {
          height: 10px;
          line-height: 10px;
          font-size: 10px;
          margin-top: 4px;
        }

        &.back {
          width: 120px;
          display: flex;
          flex-direction: row;

          label {
            height: 20px;
            line-height: 20px;
            font-size: 14px;
            margin-left: 4px;
          }
        }
      }
    }
  }

  &__content {
    margin-top: 50px;
    flex: 1;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }
}

</style>
