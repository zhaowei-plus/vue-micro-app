<script>
import { Carousel } from 'ant-design-vue'
import { Draggable } from 'vue-smooth-dnd'

export default {
  name: 'ScSwipe',
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
    const {
      title,
      showTitle,
      scale, // 宽高比
      playSpeed, // 播放速度
      children = []
    } = this.widget

    return (
      <div class="carousel">
        {
          showTitle && (
            <div class="carousel__header">
              {title}
            </div>
          )
        }
        <div
          class="carousel__content"
        >
          <Carousel
            autoplay
          >
            {
              children.map(this.renderSlide)
            }
          </Carousel>
        </div>
      </div>
    )
  }
}
</script>

<style scoped lang="less">
.carousel {
  border: 1px solid transparent;
  position: relative;

  &__header {
    height: 32px;
    line-height: 32px;
    color: #262A30;
  }

  &__content {
    width: 100%;

    .slide {
      width: 100%;

      img {
        width: 100%;
        height: 100%;
      }
    }

  }
}
</style>
