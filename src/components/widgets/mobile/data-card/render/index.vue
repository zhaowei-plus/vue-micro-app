<script>
import { Draggable } from 'vue-smooth-dnd'

export default {
  name: 'ScDataCard',
  props: {
    widget: Object
  },
  components: {
    Draggable
  },
  methods: {},
  render () {
    const {
      title,
      showTitle
    } = this.widget

    return (
      <div class="data-card">
        {
          showTitle && (
            <div class="data-card__header">
              {title}
            </div>
          )
        }
        <div class="data-card__content">
          <img src={require(`@/assets/images/data-card.png`)} alt={title} />
        </div>
      </div>
    )
  }
}
</script>

<style scoped lang="less">
.data-card {
  border: 1px solid transparent;
  position: relative;

  &__header {
    height: 32px;
    line-height: 32px;
    color: #262A30;
  }

  &__content {
    width: 100%;
    height: 200px;

    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
