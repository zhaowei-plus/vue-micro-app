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
        dataType: {
          type: 'select',
          title: '数据类型',
          // TODO 业务数据是什么？？？
          enum: [
            {label: '指标数据', value: 1},
            {label: '业务数据', value: 2}
          ],
          effect: (value, {setFieldState}) => {
            console.log('dataType effect:', value)
          }
        },
        indicator: {
          type: 'indicator',
          title: '指标',
          props: {
            isSingle: false
          },
          effect: (value = {}, {setFieldState}) => {
            const {id, apiId, srvId, interParams, outerParams} = value
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
              'dataSource.xAxis.xLatitude',
              'dataSource.yAxis.yMeasure',
              'dataSource.yAxis.yValue',
              'dataSource.yAxis.yUnit'
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
              const {success, rows} = res
              if (success) {
                const {x, y, dl, dw} = this.layer
                const config = {x, y, dl, dw}
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
          props: {
            title: '数据源'
            // enableExpand: true
          },
          children: {
            x: {
              type: 'select',
              title: '纬度',
              enum: []
            },
            dl: {
              type: 'select',
              title: '度量',
              enum: []
            },
            y: {
              type: 'select',
              title: '数值',
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
