<script>
import { mapState, mapMutations } from 'vuex'
import XmTransform from '@xm/transform-data'

import Form from '@/components/form'

const mockData = {
  "type": "FIELDTABLE",
  "type": "FIELDTABLE",
  "count": null,
  "rows": [
    {
      "sqbm_year": "2016",
      "zbmc": "森林覆盖率",
      "dlzbz": "43",
      "jldw": "%",
      "zbdm": "YT03_00001023"
    },
    {
      "sqbm_year": "2017",
      "zbmc": "森林覆盖率",
      "dlzbz": "41",
      "jldw": "%",
      "zbdm": "YT03_00001023"
    },
    {
      "sqbm_year": "2018",
      "zbmc": "森林覆盖率",
      "dlzbz": "44",
      "jldw": "%",
      "zbdm": "YT03_00001023"
    },
    {
      "sqbm_year": "2019",
      "zbmc": "森林覆盖率",
      "dlzbz": "45",
      "jldw": "%",
      "zbdm": "YT03_00001023"
    },
    {
      "sqbm_year": "2016",
      "zbmc": "建成区绿化覆盖率",
      "dlzbz": "45.1",
      "jldw": "%",
      "zbdm": "YT03_00001024"
    },
    {
      "sqbm_year": "2017",
      "zbmc": "建成区绿化覆盖率",
      "dlzbz": "45.1",
      "jldw": "%",
      "zbdm": "YT03_00001024"
    },
    {
      "sqbm_year": "2018",
      "zbmc": "建成区绿化覆盖率",
      "dlzbz": "44.98",
      "jldw": "%",
      "zbdm": "YT03_00001024"
    },
    {
      "sqbm_year": "2019",
      "zbmc": "建成区绿化覆盖率",
      "dlzbz": "43.4",
      "jldw": "%",
      "zbdm": "YT03_00001024"
    },
    {
      "sqbm_year": "2016",
      "zbmc": "人均公园绿地面积",
      "dlzbz": "16.45",
      "jldw": "m2",
      "zbdm": "YT03_00001025"
    },
    {
      "sqbm_year": "2017",
      "zbmc": "人均公园绿地面积",
      "dlzbz": "15.95",
      "jldw": "m2",
      "zbdm": "YT03_00001025"
    },
    {
      "sqbm_year": "2018",
      "zbmc": "人均公园绿地面积",
      "dlzbz": "15.32",
      "jldw": "m2",
      "zbdm": "YT03_00001025"
    },
    {
      "sqbm_year": "2019",
      "zbmc": "人均公园绿地面积",
      "dlzbz": "14.94",
      "jldw": "m2",
      "zbdm": "YT03_00001025"
    },
    {
      "sqbm_year": "2016",
      "zbmc": "森林覆盖率变化率",
      "dlzbz": "5.00",
      "jldw": "%",
      "zbdm": "YT03_00001051"
    },
    {
      "sqbm_year": "2017",
      "zbmc": "森林覆盖率变化率",
      "dlzbz": "4.76",
      "jldw": "%",
      "zbdm": "YT03_00001051"
    },
    {
      "sqbm_year": "2018",
      "zbmc": "森林覆盖率变化率",
      "dlzbz": "4.55",
      "jldw": "%",
      "zbdm": "YT03_00001051"
    },
    {
      "sqbm_year": "2019",
      "zbmc": "森林覆盖率变化率",
      "dlzbz": "4.35",
      "jldw": "%",
      "zbdm": "YT03_00001051"
    },
    {
      "sqbm_year": "2016",
      "zbmc": "建成区绿化覆盖率变化率",
      "dlzbz": "0.00",
      "jldw": "%",
      "zbdm": "YT03_00001052"
    },
    {
      "sqbm_year": "2017",
      "zbmc": "建成区绿化覆盖率变化率",
      "dlzbz": "0.00",
      "jldw": "%",
      "zbdm": "YT03_00001052"
    },
    {
      "sqbm_year": "2018",
      "zbmc": "建成区绿化覆盖率变化率",
      "dlzbz": "-.27",
      "jldw": "%",
      "zbdm": "YT03_00001052"
    },
    {
      "sqbm_year": "2019",
      "zbmc": "建成区绿化覆盖率变化率",
      "dlzbz": "-3.51",
      "jldw": "%",
      "zbdm": "YT03_00001052"
    },
    {
      "sqbm_year": "2016",
      "zbmc": "人均公园绿地面积变化率",
      "dlzbz": "-2.72",
      "jldw": "%",
      "zbdm": "YT03_00001053"
    },
    {
      "sqbm_year": "2017",
      "zbmc": "人均公园绿地面积变化率",
      "dlzbz": "-3.04",
      "jldw": "%",
      "zbdm": "YT03_00001053"
    },
    {
      "sqbm_year": "2018",
      "zbmc": "人均公园绿地面积变化率",
      "dlzbz": "-3.95",
      "jldw": "%",
      "zbdm": "YT03_00001053"
    },
    {
      "sqbm_year": "2019",
      "zbmc": "人均公园绿地面积变化率",
      "dlzbz": "-2.48",
      "jldw": "%",
      "zbdm": "YT03_00001053"
    },
    {
      "sqbm_year": "2016",
      "zbmc": "建成区绿化覆盖率十三五目标值",
      "dlzbz": "45.1",
      "jldw": "%",
      "zbdm": "YT03_00001054"
    },
    {
      "sqbm_year": "2017",
      "zbmc": "建成区绿化覆盖率十三五目标值",
      "dlzbz": "45.1",
      "jldw": "%",
      "zbdm": "YT03_00001054"
    },
    {
      "sqbm_year": "2018",
      "zbmc": "建成区绿化覆盖率十三五目标值",
      "dlzbz": "45.1",
      "jldw": "%",
      "zbdm": "YT03_00001054"
    },
    {
      "sqbm_year": "2019",
      "zbmc": "建成区绿化覆盖率十三五目标值",
      "dlzbz": "45.1",
      "jldw": "%",
      "zbdm": "YT03_00001054"
    }
  ]
}

const config = {
  x: 'zbmc',
  y: 'dlzbz', // 度量
  dl: 'jldw', // 数值
  dw: 'zbdm' // 单位
}

const formatValue = (new XmTransform()).getOption(mockData.rows, config)
console.log('formatValue:', formatValue)

export default {
  name: 'lineData',
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
          enum: [
            { label: '单值数据', value: 1 },
            { label: '多值数据', value: 2 }
          ],
          effect: (value, { getFieldValue, setFieldState }) => {
            const dataSource = getFieldValue('dataSource')
            console.log('effect dataSource:', dataSource)
            setFieldState('indicator', state => {
              state.props.isSingle = value === 1
            })
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
            xAxis: {
              type: 'block',
              title: 'X轴',
              children: {
                x: {
                  type: 'select',
                  title: '纬度',
                  enum: []
                }
              }
            },
            yAxis: {
              type: 'block',
              title: 'Y轴',
              children: {
                dl: {
                  type: 'select',
                  title: '度量',
                  enum: []
                },
                y: {
                  type: 'select',
                  title: '数值',
                  enum: []
                },
                dw: {
                  type: 'select',
                  title: '单位',
                  enum: []
                }
              }
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
