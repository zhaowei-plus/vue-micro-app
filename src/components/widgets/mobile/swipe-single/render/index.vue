<script>
import { Draggable } from 'vue-smooth-dnd'

export default {
  name: 'ScSwipeSingle',
  props: {
    widget: Object
  },
  components: {
    Draggable
  },
  render () {
    console.log('swipe-single render:', this.widget)
    const { title, showTitle, picture, size = {} } = this.widget
    const { width, height } = size

    const style = {
      width: `${width}px`,
      height: `${height}px`
    }

    const props = {
      style
    }

    return (
      <div class="swipe-single" {...props}>
        {
          showTitle && (
            <div class="swipe-single__header">
              {title}
            </div>
          )
        }

        <div class="swipe-single__content">
          {
            picture ? (
              <img src={picture} alt={title} />
            ) : (
              <img src={require(`@/assets/images/swipe-single.png`)} alt={title} />
            )
          }
        </div>
      </div>
    )
  }
}
</script>

<style scoped lang="less">
.swipe-single {
  border: 1px solid transparent;
  position: relative;
  display: flex;
  flex-direction: column;

  &__header {
    height: 32px;
    line-height: 32px;
    color: #262A30;
  }

  &__content {
    flex: 1;
    width: 100%;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
