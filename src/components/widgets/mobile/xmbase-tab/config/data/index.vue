<template>
  <form-create
    v-model="fApi"
    :rule="rule"
    :option="option"
    @change="formChange"
  />
</template>

<script>
import { mapMutations } from 'vuex'
import FormCreate from '@form-create/ant-design-vue'

import Array from './form/Array'
// 注册自定义组件
FormCreate.component(Array.name, Array)

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
      option: {
        submitBtn: false,
        resetBtn: false
      },
      rule: [
        {
          type: 'input',
          field: 'type',
          title: '组件类型',
          ...fieldCol,
          options: [
            {label: 'tab', value: 'xmbase-tab'}
          ],
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
          type: 'array',
          field: 'children',
          wrapperCol: { span: 24 },
          props: {
            min: 2,
            title: '数据来源',
            rules: [
              {
                type: 'hidden',
                field: 'id',
                title: 'ID',
                default: Date.now,
                ...fieldCol
              },
              {
                type: 'input',
                field: 'name',
                title: '导航名',
                ...fieldCol,
                props: {
                  placeholder: '请输入导航名'
                }
              }
              // {
              //   // 组件联动
              //   type: 'select',
              //   field: 'jumpType',
              //   title: '跳转地址',
              //   options: [
              //     {label: '自定义', value: 1},
              //     {label: '小程序页面', value: 2},
              //     {label: '专题页面', value: 3}
              //   ],
              //   // 逻辑联动
              //   control: [
              //     {
              //       handle: value => value === 1,
              //       rule: [
              //         {
              //           type: 'input',
              //           field: 'jumpUrl',
              //           title: '跳转地址',
              //           labelCol: { span: 6 },
              //           wrapperCol: { span: 18 },
              //           props: {
              //             placeholder: '跳转地址'
              //           }
              //         }
              //       ]
              //     },
              //     {
              //       handle: value => value === 2,
              //       rule: [
              //         {
              //           type: 'select',
              //           field: 'jumpParams',
              //           title: '小程序',
              //           labelCol: { span: 6 },
              //           wrapperCol: { span: 18 },
              //           props: {
              //             placeholder: '跳转小程序'
              //           }
              //         }
              //       ]
              //     },
              //     {
              //       handle: value => value === 3,
              //       rule: [
              //         {
              //           type: 'select',
              //           field: 'jumpApp',
              //           title: '专题应用',
              //           labelCol: { span: 6 },
              //           wrapperCol: { span: 18 },
              //           props: {
              //             placeholder: '跳转上架应用名称'
              //           }
              //         }
              //       ]
              //     }
              //   ]
              // }
            ]
          }
        }
      ]
    }
  },
  mounted () {
    // 数据回填
    this.fApi.setValue(this.widget)
  },
  methods: {
    ...mapMutations('widgets', ['updateWidget']),
    formChange (field, value, $f) {
      console.log('formChange:', field, value, $f.formData())
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
