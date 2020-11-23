<script>
import Widgets from '@/components/widgets/screen/widgets'
export default {
  name: 'ScXmTabPane',
  props: {
    tab: Object
  },
  components: {
    Widgets
  },
  render () {
    console.log('xm-tab-pane render:', this.tab)
    // const { id } = this.tab
    return (
      <div class="xm-tab-pane">

      </div>
    )
  }
}

// <Widgets
//   pid={id.toString()}
//   group="tab"
// />

</script>

<style scoped>
.xm-tab-pane {
  width: 100%;
  height: 100%;
  /*min-height: 160px;*/
}
</style>
