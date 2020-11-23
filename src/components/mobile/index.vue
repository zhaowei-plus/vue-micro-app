<script>
import Library from '../library/mobile'
import Setting from '../setting/mobile'
import Editor from './editor'
export default {
  name: 'Mobile',
  components: {
    Library,
    Editor,
    Setting
  },
  render () {
    return (
      <div class="mobile">
        <Library/>
        <Editor/>
        <Setting/>
      </div>
    )
  }
}
</script>

<style scoped lang="less">
.mobile {
  //width: 1920px;
  width: 100%;
  height: 100%;
  min-height: 700px;
  background-color: rgba(0, 0, 0, .2);

  display: flex;
  justify-content: space-between;
}
</style>
