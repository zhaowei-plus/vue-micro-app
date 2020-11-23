<script>
import Library from '../library/screen'
import Setting from '../setting/screen'
import Editor from './editor'
export default {
  name: 'Screen',
  components: {
    Library,
    Screen,
    Setting
  },
  render () {
    return (
      <div class="screen">
        <Library/>
        <Editor/>
        <Setting/>
      </div>
    )
  }
}
</script>

<style scoped lang="less">
.screen {
  //width: 1920px;
  width: 100%;
  height: 100%;
  background-color: rgba(129, 129, 129, .2);
  position: relative;
  overflow: hidden;

  display: flex;
  justify-content: space-between;

  cursor: pointer;
}
</style>
