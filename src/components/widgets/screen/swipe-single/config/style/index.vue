<script>
import { mapState, mapMutations } from 'vuex'
import Form from '@/components/form'
import { COMPONENT_TYPE } from '@/assets/constant'

export default {
  name: 'lineStyle',
  components: {
    Form
  },
  props: {
    layer: Object
  },
  data () {
    return {
      schema: {
        version: {
          type: 'input',
          title: '版本号',
          props: {
            disabled: true
          }
        },
        componentType: {
          type: 'select',
          title: '组件类型',
          enum: COMPONENT_TYPE,
          props: {
            disabled: true
          }
        },
        size: {
          type: 'object',
          title: '区域',
          props: {
            enableExpand: true
          },
          children: {
            width: {
              type: 'number',
              title: '宽'
            },
            height: {
              type: 'number',
              title: '高'
            }
          }
        },
        title: {
          type: 'input',
          title: '标题名称'
        },
        showTitle: {
          type: 'switch',
          title: '显示标题',
          effect: (value, { setFieldState }) => {
            setFieldState('title', state => {
              state.visible = value
            })
          }
        },
        fullScreen: {
          type: 'switch',
          title: '铺满全屏'
        }
      }
    }
  },
  methods: {
    ...mapMutations('screen', ['updateLayer']),
    onChange (values) {
      const newValues = {
        ...this.layer,
        ...values
      }
      this.updateLayer(newValues)
    }
  },
  render () {
    return (
      <Form
        schema={this.schema}
        values={this.layer}
        onChange={this.onChange}
      />
    )
  }
}
</script>
