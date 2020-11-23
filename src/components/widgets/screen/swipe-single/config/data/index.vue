<script>
import { mapMutations } from 'vuex'
import XmTransform from '@xm/transform-data'

import Form from '@/components/form'

export default {
  name: 'Data',
  components: {
    Form
  },
  props: {
    layer: Object
  },
  data () {
    return {
      schema: {
        jump: {
          type: 'block',
          title: '跳转',
          children: {
            jumpParams: {
              type: 'input',
              title: '跳转入参',
              props: {
                placeholder: '跳转入参'
              }
            },
            info: {
              type: 'box',
              children: {
                picture: {
                  type: 'upload',
                  props: {
                    action: ''
                  }
                },
                jumpType: {
                  type: 'select',
                  enum: [
                    { label: '可视化页面', value: 1 },
                    { label: '小程序页面', value: 2 }
                  ],
                  default: 1,
                  effect: (value, { setFieldState }) => {
                    setFieldState('jump.info.jumpScreen', state => {
                      state.visible = value === 1
                    })
                    setFieldState('jump.info.jumpPage', state => {
                      state.visible = value === 2
                    })
                  }
                },
                jumpScreen: {
                  type: 'select',
                  enum: [],
                  props: {
                    placeholder: '跳转可视化页面'
                  }
                },
                jumpPage: {
                  type: 'select',
                  enum: [],
                  props: {
                    placeholder: '跳转小程序页面'
                  }
                }
              }
            }
          }
        },
        indicator: {
          type: 'indicator',
          title: '指标',
          props: {
            isSingle: false
          },
          effect: (value = {}, {setFieldState}) => {
            const { id, apiId, srvId, interParams, outerParams } = value
            if (!id) {
              return false
            }
            setFieldState('indexId', state => {
              state.value = id
            })
            if ((outerParams || []).length === 0) {
              console.error('指标 %s outerParams：%o 为空', id, outerParams)
              return false
            }
            const options = (outerParams || []).map(d => {
              const key = Object.keys(d)[0]
              return {
                value: key,
                label: d[key]
              }
            })

            const fields = [
              // 'dataSource.xAxis.xLatitude',
              // 'dataSource.yAxis.yMeasure',
              // 'dataSource.yAxis.yValue',
              // 'dataSource.yAxis.yUnit'
            ]
            fields.map(path => {
              setFieldState(path, state => {
                state.enum = options
              })
            })

            return this.$http.post('indicator/run', {
              apiId,
              srvId,
              interParams
            }).then(res => {
              console.log('res:', res)
              const { success, rows } = res
              if (success) {
                const { x, y, dl, dw } = this.layer
                const config = { x, y, dl, dw }
                const formatValue = (new XmTransform()).getOption(rows, config)
                setFieldState('indicatorData', state => {
                  state.value = formatValue
                })
              }
            })
          }
        },
        indicatorData: {
          type: 'hidden',
          title: '指标数据'
        },
        indexId: {
          type: 'hidden',
          title: '指标ID'
        },
        dataSource: {
          type: 'card',
          title: '数据源',
          props: {
            enableExpand: true
          },
          children: {
            picture1: {
              type: 'select',
              title: '图片',
              enum: []
            },
            url: {
              type: 'select',
              title: 'URL',
              enum: []
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
