<script>
import { mapMutations } from 'vuex'
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
          props: {
            title: '区域'
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
        showNumber: {
          type: 'switch',
          title: '展示序号'
        },
        showUpdateTime: {
          type: 'switch',
          title: '展示更新时间'
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
