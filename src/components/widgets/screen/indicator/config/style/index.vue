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
          title: '区域',
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
        modeNum: {
          type: 'number',
          title: '模块数',
          props: {
            min: 1,
            max: 8
          },
          effect: (value, { getFieldValue, setFieldState }) => {
            const values = getFieldValue('modeStyle')
            const modeValues = []
            for (let i = 0; i < value; i += 1) {
              modeValues.push(values[i])
            }
            setFieldState('modeStyle', state => {
              state.value = modeValues
            })
          }
        },
        backgroundImage: {
          type: 'upload',
          title: '底图样式'
        },
        modeStyle: {
          type: 'array',
          props: {
            title: '模块样式',
            subTitle: '模块$index'
          },
          children: {
            textColor: {
              type: 'color-picker',
              title: '文本',
              default: '#000000'
            },
            valueColor: {
              type: 'color-picker',
              title: '数值',
              default: '#000000'
            },
            unitColor: {
              type: 'color-picker',
              title: '单位',
              default: '#000000'
            }
          }
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
