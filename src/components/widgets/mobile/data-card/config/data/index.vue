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
          title: '卡片名称',
          ...fieldCol,
          props: {
            placeholder: '请输入'
          }
        },
        {
          type: 'switch',
          field: 'showTitle',
          title: '显示标题',
          ...fieldCol,
          props: {
            type: 'switch'
          }
        },
        {
          // 组件联动
          type: 'input',
          field: 'jumpType',
          title: '选择卡片',
          ...fieldCol
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
  },
  render () {
    return (
      <FormCreate
        v-model="fApi"
        rule={this.rule}
        option={this.option}
        onFormChange={this.formChange}
      />
    )
  }
}
</script>

<style scoped lang="less">
</style>

<style lang="less">
</style>
