<template>
  <FormCreate
    v-model="fApi"
    :rule="rule"
    :option="option"
    @change="formChange"
  />
</template>

<script>
import FormCreate from '@form-create/ant-design-vue'
import { mapMutations } from 'vuex'
// import SelfComponent from './form/SelfComponent'
// import Array from './form/Array'
// import SelfField from './form/SelfField'

// 注册自定义组件
// FormCreate.component(SelfComponent.name, SelfComponent)
// FormCreate.component(Array.name, Array)
// FormCreate.component(SelfField.name, SelfField)

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
          field: 'picture',
          title: '图片上传',
          ...fieldCol
        },
        {
          // 组件联动
          type: 'select',
          field: 'dataSource',
          title: '数据来源',
          ...fieldCol,
          options: [
            {label: '自定义', value: 1},
            {label: '小程序页面', value: 2}
          ],
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
                  options: this.getJumpParamsOptions(),
                  labelCol: { span: 6 },
                  wrapperCol: { span: 18 },
                  props: {
                    placeholder: '跳转小程序'
                  }
                }
              ]
            }
          ]
        }
      ],
      option: {}
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

<style lang="less">
</style>
