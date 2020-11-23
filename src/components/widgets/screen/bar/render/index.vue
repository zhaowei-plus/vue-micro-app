<script>
export default {
  name: 'line',
  props: {
    layer: Object
  },
  render () {
    const { title, showTitle, size = {} } = this.layer
    const { width, height } = size

    return (
      <div class="item">
        {
          showTitle && (
            <div class="item__title">
              {title}
            </div>
          )
        }
        <div class="item__content">
          绘制区域
        </div>
      </div>
    )
  }
}
</script>

<style scoped lang="less">
.item {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  &__title {
    height: 32px;
    line-height: 32px;
    color: #262A30;
  }

  &__content {
    width: 100%;
    flex: 1;
    border: 1px solid #E9ECF0;
    //display: flex;
    //align-items: center;
    //justify-content: center;
  }
}
</style>
