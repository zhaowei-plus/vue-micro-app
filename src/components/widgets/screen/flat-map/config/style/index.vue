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
        mapStyle: {
          type: 'card',
          title: '地图样式',
          children: {
            styleType: {
              type: 'select',
              title: '样式',
              enum: []
            },
            areaType: {
              type: 'select',
              title: '区域',
              enum: []
            }
          }
        },
        backgroundStyle: {
          type: 'card',
          title: '底图样式',
          children: {
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
            mapScale: {
              type: 'number',
              title: '地图缩放',
              enum: []
            },
            popupType: {
              type: 'select',
              title: '弹窗设置',
              enum: []
            }
          }
        },
        colorFill: {
          type: 'card',
          title: '区块填充颜色',
          children: {
            level: {
              type: 'select',
              title: '分级',
              enum: []
            },
            levels: {
              type: 'array',
              props: {
                subTitle: '$index区域'
              },
              children: {
                color: {
                  type: 'color-picker',
                  title: '颜色'
                },
                valueRange: {
                  type: 'number-range',
                  title: '值区间',
                  props: {
                    min: 0,
                    max: 20
                  }
                }
              }
            }
          }
        },
        blockBorderStyle: {
          type: 'card',
          title: '区块边线颜色',
          children: {
            borderColor: {
              type: 'color-picker',
              title: '边线颜色'
            },
            borderWidth: {
              type: 'number',
              title: '边线宽度'
            }
          }
        },
        heatAreaMark: {
          type: 'card',
          title: '热力区域标注',
          children: {
            markType: {
              type: 'select',
              title: '标注样式'
            }
          }
        }
      }
    }
  },

  computed: {
    ...mapState('active', ['active'])
  },

  methods: {
    ...mapMutations('screen', ['updateLayer']),
    onChange (values) {
      const newValues = {
        ...this.layer,
        ...values
      }
      console.log('onChange newValues:', values)
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
