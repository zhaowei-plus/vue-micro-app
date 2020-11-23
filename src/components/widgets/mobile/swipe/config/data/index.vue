<template>
  <FormCreate
    v-model="fApi"
    :rule="rule"
    :option="option"
    @change="formChange"
  />
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
import { mapMutations } from 'vuex'
import FormCreate from '@form-create/ant-design-vue'

// import Array from './form/Array'
// import SelfArray from './form/SelfArray'
// 注册自定义组件
// FormCreate.component(Array.name, Array)
// FormCreate.component(SelfArray.name, SelfArray)

const fieldCol = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 18
  }
}

export default {
  name: 'Data',
  components: {
    FormCreate: FormCreate.$form()
  },
  props: {
    widget: Object
  },
  data () {
    return {
      fApi: {},
      rule: [
        {
          type: 'input',
          field: 'type',
          title: '组件类型',
          ...fieldCol,
          props: {
            disabled: true
          }
        },
        {
          type: 'input',
          field: 'title',
          title: '标题名称',
          ...fieldCol,
          props: {
            placeholder: '请输入'
          }
        },
        {
          type: 'switch',
          field: 'showTitle',
          title: '显示标题',
          ...fieldCol
        },
        {
          type: 'input',
          field: 'scale',
          title: '宽高比',
          ...fieldCol,
          props: {
            placeholder: '请输入'
          }
        },
        {
          type: 'input',
          field: 'speed',
          title: '播放速度',
          ...fieldCol,
          props: {
            placeholder: '请输入'
          }
        },
        {
          type: 'SelfArray',
          field: 'children2',
          wrapperCol: { span: 24 },
          props: {
            min: 2,
            title: '轮播图',
            rules: [
              {
                type: 'input',
                field: 'name',
                title: '图片上传',
                ...fieldCol
              },
              {
                // 组件联动
                type: 'select',
                field: 'jumpType',
                title: '跳转地址',
                ...fieldCol,
                options: [
                  {label: '自定义', value: 1},
                  {label: '小程序页面', value: 2},
                  {label: '专题页面', value: 3}
                ],
                default: 1,
                // 逻辑联动
                control: [
                  {
                    handle: value => value === 1,
                    rule: [
                      {
                        type: 'input',
                        field: 'jumpUrl',
                        title: '跳转地址',
                        labelCol: { span: 6 },
                        wrapperCol: { span: 18 },
                        props: {
                          placeholder: '跳转地址'
                        }
                      }
                    ]
                  },
                  {
                    handle: value => value === 2,
                    rule: [
                      {
                        type: 'select',
                        field: 'jumpParams',
                        title: '小程序',
                        labelCol: { span: 6 },
                        wrapperCol: { span: 18 },
                        props: {
                          placeholder: '跳转小程序'
                        }
                      }
                    ]
                  },
                  {
                    handle: value => value === 3,
                    rule: [
                      {
                        type: 'select',
                        field: 'jumpApp',
                        title: '专题应用',
                        labelCol: { span: 6 },
                        wrapperCol: { span: 18 },
                        props: {
                          placeholder: '跳转上架应用名称'
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          }
        }
      ],

      // 组件参数配置
      option: {
        // 表单提交按扭事件
        onSubmit: formData => {
          console.log('获取表单中的数据：', formData)
        }
      }
    }
  },
  mounted () {
    // 数据回填
    this.fApi.setValue(this.widget)
  },
  methods: {
    ...mapMutations('widgets', ['updateWidget']),
    getJumpParamsOptions () {
      return [
        { label: '第一个页面', value: 1 },
        { label: '第二个页面', value: 2 },
        { label: '第三个页面', value: 3 }
      ]
    },
    getJumpAppOptions () {
      return [
        { label: '第一个专题', value: 1 },
        { label: '第二个专题', value: 2 },
        { label: '第三个专题', value: 3 }
      ]
    },
    formChange (field, value, $f) {
      const { id, ...rest } = this.widget
      const values = $f.formData()
      // 修改值
      this.updateWidget({
        id,
        ...rest,
        ...values
      })
    }
  }
}
</script>

<style scoped lang="less">
</style>
