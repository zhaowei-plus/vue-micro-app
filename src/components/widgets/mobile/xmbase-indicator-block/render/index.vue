<script>
import { Carousel } from 'ant-design-vue'
import { Draggable } from 'vue-smooth-dnd'

export default {
  name: 'ScXmBaseIndicatorBlock',
  props: {
    widget: Object
  },
  components: {
    Draggable,
    Carousel
  },
  methods: {
    renderSlide (slide) {
      const { title } = this.widget
      const { id, picture } = slide

      // this.emit('change', '111')

      return (
        <div class="slide" key={id}>
          {
            picture ? (
              <img src={picture} alt={title} />
            ) : (
              <img src={require(`@/assets/images/swipe-single.png`)} alt={title} />
            )
          }
        </div>
      )
    }
  },
  render () {
    const { size = {} } = this.widget
    const { width, height } = size

    const style = {
      width: `${width}px`,
      height: `${height}px`
    }

    const props = {
      style
    }

    return (
      <div class="xm-base-indicator-block" {...props}>
        <div class="xm-base-indicator-block__content">

          <div class="mode">
            <div class="mode__title">
            </div>
            <div class="mode__info">
              <label class="value">22222</label>
              <label class="unit">元</label>
            </div>
          </div>

          <div class="mode">
            <div class="mode__title">
              111
            </div>
            <div class="mode__info">
              <label class="value">22222</label>
              <label class="unit">元</label>
            </div>
          </div>

        </div>
      </div>
    )
  }
}
</script>

<style scoped lang="less">
.xm-base-indicator-block {
  position: relative;
  padding: 8px 4px;

  display: grid;
  gap: 8px;
  box-sizing: border-box;
  overflow: scroll;

  .mode {
    width: 100%;
    height: 70px;
    border-radius: 4px;
    padding: 4px;
    box-sizing: inherit;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    border: 1px solid #E9ECF0;
    background-color: #33B7FF;

    //background: #5A9CE5;
    //color: #fff;

    &__title {
      font-size: 14px;
    }

    &__info {
      display: flex;
      align-items: center;
      justify-content: center;

      .value {
        font-size: 20px;
      }

      .unit {
        font-size: 14px;
        vertical-align: bottom;
      }
    }
  }
}
</style>
