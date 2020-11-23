<template>
  <div class="config">
    交互配置
  </div>
</template>

<script>
import formCreate from '@form-create/ant-design-vue'

export default {
  name: 'Setting',
  components: {
    // formCreate: formCreate.$form()
  },
  data () {
    return {
      username: '',
      password: '',
      fApi: {},
      rule: [
        {
          type: 'input',
          field: 'userName',
          title: '组件类型',
          value: 'xmbase-tab',
          labelCol: { span: 6 },
          wrapperCol: { span: 18 },
          // 组件属性
          props: {
            disabled: false,
            readonly: false,
            clearable: true // 是否显示清空按钮
          }
          // 组件校验
          // validate: [
          //   {
          //     trigger: 'blur',
          //     required: true,
          //     message: '非空项'
          //   }
          // ]
        },
        {
          type: 'input',
          field: 'title',
          title: '标题名称',
          value: 'tab',
          labelCol: { span: 6 },
          wrapperCol: { span: 18 },
          props: {
            type: 'input',
            placeholder: '请输入'
          },
          emit: [{
            name: 'change',
            inject: ['title']
          }],
          emitPrefix: 'field'
        },
        {
          type: 'switch',
          field: 'showTitle',
          title: '显示标题',
          labelCol: { span: 6 },
          wrapperCol: { span: 18 },
          props: {
            type: 'switch'
          },
          emit: [{
            name: 'change',
            inject: ['showTitle']
          }],
          emitPrefix: 'field'
        },
        {
          // 组件联动
          type: 'select',
          field: 'jumpType',
          title: '跳转地址',
          value: 1,
          labelCol: { span: 6 },
          wrapperCol: { span: 18 },
          options: [
            {label: '自定义', value: 1},
            {label: '小程序页面', value: 2},
            {label: '专题页面', value: 3}
          ],
          // 添加事件监听
          emit: ['change'],
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
            },
            {
              handle: value => value === 3,
              rule: [
                {
                  type: 'select',
                  field: 'jumpApp',
                  title: '专题应用',
                  options: this.getJumpAppOptions(),
                  labelCol: { span: 6 },
                  wrapperCol: { span: 18 },
                  props: {
                    placeholder: '跳转上架应用名称'
                  }
                }
              ]
            }
          ]
        },
        {
          // 自定义组件
          type: 'SelfComponent',
          value: '啦啦啦德玛西亚',
          field: 'selfField',
          title: '自定义组件',
          labelCol: { span: 6 },
          wrapperCol: { span: 18 },
          emit: [{
            name: 'input',
            inject: ['selfField']
          }],
          emitPrefix: 'field'
        },
        {
          type: 'group',
          title: '批量添加',
          field: 'children',
          labelCol: { span: 6 },
          wrapperCol: { span: 18 },
          value: [],
          props: {
            min: 3,
            max: 5,
            expand: 2,
            rules: [
              {
                type: 'hidden',
                field: 'id'
              },
              {
                type: 'input',
                field: 'tab',
                title: '名称',
                labelCol: { span: 6 },
                wrapperCol: { span: 18 }
              }
            ]
          }
        },
        {
          type: 'ArrayComponent',
          field: 'children2',
          labelCol: { span: 6 },
          wrapperCol: { span: 18 },
          value: [],
          props: {
            min: 3,
            max: 5,
            expand: 2,
            rules: [
              {
                type: 'input',
                field: 'tab',
                title: '名称',
                labelCol: { span: 6 },
                wrapperCol: { span: 18 }
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
    this.$nextTick(() => {
      // this.$fApi.component(SelfComponent.name, SelfComponent)
      // this.fApi.on('prefix1-change', this.change)
      // this.fApi.on('input-field2-blur', this.blur)
    })
  },
  methods: {
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
    jumpTypeChange (value) {
      console.log('jumpTypeChange:', value)
    },
    fieldChange (params) {
      const { inject: [field], $f } = params
      console.log('fieldChange:', field, $f.getValue(field), this.fApi.getValue(field))
      this.$nextTick(() => {
        console.log('fieldChange:', field, $f.getValue(field), this.fApi.getValue(field))
      })
    }
  }
}
</script>

<style scoped lang="less">

</style>
