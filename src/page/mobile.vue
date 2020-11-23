<script>
import Mobile from '../components/mobile'
export default {
  name: 'PageMobile',
  components: {
    Mobile
  },
  render () {
    return (
      <div class="page">
        <div class="page__header">
          <div clas="left">

          </div>
          <div clas="center">

          </div>
          <div clas="right">

          </div>
        </div>
        <div class="page__content">
          <Mobile />
        </div>
      </div>
    )
  }
}
</script>

<style scoped lang="less">
.page {
  //width: 1920px;
  width: 100%;
  height: 100%;
  min-height: 700px;
  background-color: rgba(0, 0, 0, .2);

  display: flex;
  flex-direction: column;

  &__header {
    height: 48px;
    line-height: 48px;
    background-color: #fff;
    border: 1px solid red;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .left {

    }

    .center {

    }

    .right {

    }
  }

  &__content {
    flex: 1;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    //padding: 0 20px;
  }
}

</style>
