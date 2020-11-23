<script>

export default {
  name: 'MobileEditor',
  components: {
    // Widgets
  },
  render () {
    return (
      <div class="mobile">
        <div class="mobile__title">
          页面
        </div>
        <div class="mobile__content">
        </div>
      </div>
    )
  }
}
</script>

<style scoped lang="less">
.mobile {
  width: 395px;
  height: 100%;
  //max-height: 680px;
  border-radius: 40px;
  border: 10px solid gray;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  &__title {
    width: 100%;
    height: 50px;
    line-height: 50px;

    color: #262A30;
    font-size: 16px;
    text-align: center;
    border-bottom: 1px solid gray;
  }

  &__content {
    flex: 1;
    width: 100%;
    overflow: hidden auto;
    border-bottom-left-radius: 24px;
    border-bottom-right-radius: 24px;
  }
}

img {
  -webkit-user-drag: none;
}
</style>
