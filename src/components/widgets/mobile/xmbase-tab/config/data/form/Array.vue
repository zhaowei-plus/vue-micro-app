<script>
import { cloneDeep } from 'lodash'
import { Button, Icon, Empty, Input, Select } from 'ant-design-vue'

export default {
  name: 'array1',
  components: {
    Button,
    Icon,
    Empty
  },
  props: {
    rules: Array,
    title: String,
    button: {
      type: Boolean,
      default: true
    },
    formCreate: Object,
    max: {
      type: Number,
      default: 0
    },
    min: {
      type: Number,
      default: 0
    },
    value: {
      type: Array,
      default: () => []
    },
    values: {
      type: Array,
      default: () => []
    },
    disabled: {
      type: Boolean,
      default: false
    },
    fontSize: {
      type: Number,
      default: 28
    }
  },
  created () {
    // 1、解析
    // 2、渲染
    // 3、数据回填
    // 3、联动 handler
    // 4、异步
    // 5、自定义布局
    const { rules, value, values } = this
    console.log('SelfArray props rules:', rules, value, values)

    // TODO 数据统计
    const { fields, effectFields } = this.rules.reduce(({ fields, effectFields }, ruleField) => {
      const { field, control } = ruleField
      fields[field] = ruleField

      if (Array.isArray(control)) {
        // TODO 先只支持一级
        control.map(({ rule, handle }) => {
          rule.map(item => {
            const { field } = item
            fields[field] = item

            effectFields[field] = {
              target: ruleField.field,
              handle,
              ...item
            }
          })
        })
      }
      return {
        fields,
        effectFields
      }
    }, { fields: {}, effectFields: {} })

    this.fields = fields
    this.effectFields = effectFields
  },
  data () {
    return {
      option: Object.assign(cloneDeep(this.formCreate.config), {
        submitBtn: false,
        resetBtn: false,
        mounted: undefined,
        onReload: undefined
      }),
      len: 0,
      fields: {},
      effectFields: {},
      cacheRule: {},
      array$: [] // form-create 实例数组
    }
  },
  computed: {
    // 第一个规则，即规则模板
    formRule () {
      if (this.rule) {
        return [this.rule]
      } else if (this.rules) {
        return this.rules
      }
      return []
    }
  },
  watch: {
    // values (value) {
    //   console.log('values change:', JSON.stringify(value, 0, 2))
    //   this.$emit('input', value)
    //   this.$emit('change', value)
    // }
  },
  methods: {
    emitChange (value) {
      console.log('emitChange:', JSON.stringify(value, 0, 2))
      this.$emit('input', JSON.parse(JSON.stringify(value)))
      this.$emit('change', JSON.parse(JSON.stringify(value)))
    },
    addItem () {
      const value = Object.keys(this.fields).reduce((result, key) => {
        const field = this.fields[key]
        // 处理默认值
        if (field.default) {
          if (typeof field.default === 'function') {
            result[field.field] = field.default()
          } else {
            result[field.field] = field.default
          }
        }
        return result
      }, {})
      this.value.push(value)
      this.emitChange(this.value)
    },
    removeItem (index) {
      this.value.splice(index, 1)
      this.emitChange(this.value)
    },
    onItemChange (index, field, value) {
      const itemValues = cloneDeep(this.value[index])
      itemValues[field] = value
      this.$set(this.value, index, itemValues)
      console.log('emitChange:', JSON.stringify(this.value, 0, 2))
      this.emitChange(this.value)
    },
    renderTitle () {
      if (this.title) {
        return (
          <div class="array__header">
            <label class="title">
              {this.title}：
            </label>
          </div>
        )
      }
    },
    renderAddition () {
      const { max = 0 } = this
      const size = Array.isArray(this.value) ? this.value.length : 0
      const canAdd = !max ? true : size <= max
      if (canAdd) {
        return (
          <div class="array__addition">
            <Button
              block
              type="link"
              icon="plus"
              onClick={this.addItem}
            >
              新增
            </Button>
          </div>
        )
      }
    },
    renderItem (index) {
      const itemValues = this.value[index] ? this.value[index] : {}
      return Object.keys(this.fields).map(field =>
        this.renderField(
          this.fields[field],
          itemValues[field],
          (field, value) => this.onItemChange(index, field, value),
          itemValues
        )
      )
    },
    renderField (field, value, onChange, values = {}) {
      const { title, type } = field
      if (type === 'hidden') {
        return false
      }

      // 是否是联动组件
      const linkage = this.effectFields[field.field]
      if (linkage) {
        const { target, handle } = linkage
        const targetValue = values[target]
        if (typeof handle !== 'function' || !handle(targetValue)) {
          return false
        }
      }

      return (
        <div class="form-item">
          <label class="form-item__label">
            {title}：
          </label>
          <div class="form-item__control">
            {
              this.renderComponent(
                field,
                value,
                value => onChange(field.field, value)
              )
            }
          </div>
        </div>
      )
    },
    renderComponent (field, value, onChange) {
      const { type, props = {} } = field
      switch (type) {
        case 'input': {
          const { placeholder = '请输入' } = props
          return (
            <Input
              value={value}
              onChange={e => onChange(e.target.value)}
              placeholder={placeholder}
              {...props}
            />
          )
        }
        case 'select': {
          const { options } = field
          const { placeholder = '请选择' } = props
          return (
            <Select
              value={value}
              options={options}
              onChange={onChange}
              placeholder={placeholder}
              {...props}
            />
          )
        }
      }
    },
    renderForm () {
      const { min = 0 } = this
      const value = this.value ? this.value : []
      const size = Array.isArray(this.value) ? this.value.length : 0
      const canRemove = !min ? true : size > min

      return (
        <div class="form">
          {
            value.map((value, index) => (
              <div class={`array-item ${canRemove && 'has-operation'}`}>
                <div class="array-item__content">
                  {this.renderItem(index)}
                </div>
                {
                  canRemove && (
                    <div class="array-item__operation">
                      <Icon
                        type="delete"
                        onClick={() => this.removeItem(index)}
                      />
                    </div>
                  )
                }
              </div>
            ))
          }
        </div>
      )
    },
    renderContent () {
      const { min = 0 } = this
      // if (keys.length === 0) {
      //   return (
      //     <Empty
      //       description="暂无数据"
      //     />
      //   )
      // }

      return (
        <div class="array__content">
          {this.renderForm()}
        </div>
      )
    }
  },
  render () {
    return (
      <div class="array">
        {this.renderTitle()}
        {this.renderContent()}
        {this.renderAddition()}
      </div>
    )
  }
}
</script>

<style scoped lang="less">
.array {
  width: 100%;
  //border: 1px solid #E9ECF0;
  background-color: #ffffff;

  &__header {
    padding: 0 4px;
    height: 39px;
    line-height: 39px;

    .title {
      width: 74px;
      color: rgba(0, 0, 0, 0.85);
      text-align: right;
    }
  }

  &__content {
    //padding: 0 8px;
    border: 1px solid #E9ECF0;
  }

  &__addition {
    margin-top: 10px;
    height: 32px;
    line-height: 32px;
    padding: 0 10px;
    text-align: center;
    border: 1px solid #E9ECF0;
    color: #488FF9;
    cursor: pointer;
  }
}

.form {
  .array-item {
    position: relative;
    padding: 4px;

    &__operation {
      width: 24px;
      height: 24px;
      position: absolute;
      top: 12px;
      right: 0;
      font-size: 16px;

      display: flex;
      align-items: center;
      justify-content: center;

      .anticon {
        cursor: pointer;
      }
    }

    &.has-operation {
      .form-item {
        &:first-of-type {
          padding-right: 20px;
        }
      }
    }
  }

  &-item {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    position: relative;
    margin-bottom: 4px;

    &__label {
      width: 60px;
      text-align: right;
    }

    &__control {
      flex: 1;
    }
  }
}
</style>
