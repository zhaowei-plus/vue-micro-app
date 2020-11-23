<script>
import { mapState, mapMutations } from 'vuex'
import Form from '@/components/form'

export default {
  name: 'screenSetting',
  components: {
    Form
  },
  props: {
    layer: Object
  },
  data () {
    return {
      schema: {
        backgroundImage: {
          type: 'upload',
          title: '背景图',
          props: {
            action: '/smallapp/fileManager/upload.json'
          }
        },
        backgroundColor: {
          type: 'color-picker',
          title: '背景颜色',
          default: '#fffffff'
        }
      },
      values: {}
    }
  },
  computed: {
    ...mapState('screen', ['page'])
  },
  methods: {
    ...mapMutations('screen', ['updatePage']),
    onChange (values) {
      console.log('page onChange:', JSON.stringify(values, 0, 2))
      this.updatePage(values)
    }
  },
  render () {
    return (
      <Form
        schema={this.schema}
        values={this.page}
        onChange={this.onChange}
      />
    )
  }
}
</script>
