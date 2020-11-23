<script>
import { mapActions } from 'vuex'
import Input from './field/input'
import Number from './field/number'
import Select from './field/select'
import Switch from './field/switch'
import Upload from './field/upload'
import Cascader from './field/cascader'
import Indicator from './field/indicator'
import ColorPicker from './field/color-picker'

import FGBox from './field/box'
import FGBlock from './field/block'
import FGArray from './field/array'

export default {
  name: 'FGField',
  components: {
    Input,
    Select,
    Switch,
    Upload,
    Cascader,
    Indicator,

    FGBox,
    FGBlock,
    FGArray
  },
  inject: ['change', 'setFieldState', 'getFieldValue'],
  data () {
    return {
      preValue: undefined
    }
  },
  props: {
    field: {
      type: Object,
      require: true
    },
    path: {
      type: Array,
      require: true
    }
  },
  created () {
    const { value } = this.field
    // 初始化的时候调用一次 onChange
    this.onChange(value)
  },
  methods: {
    ...mapActions('form', ['getFieldState']),
    onChange (value) {
      const { effect } = this.field
      this.change(this.path, value)

      // 当值发生改变时，触发副作用
      if (typeof effect === 'function') {
        console.log('field %o effect preValue: %s value:%s', this.path, this.preValue, value)
        if (this.preValue !== value) {
          // 数组中的索引
          const index = this.path.reduce((result, item) => {
            return new RegExp('[0-9]').test(item) ? item : result
          }, -1)
          effect(value, {
            getFieldValue: path => this.getFieldValue(path.replace('*', index).split('.')),
            // getFieldState: path => this.getFieldState(path.replace('*', index).split('.')),
            setFieldState: (path, callback) => {
              this.setFieldState(path.replace('*', index).split('.'), callback)
            }
          })
        }
      }
      this.preValue = value
    },
    renderControl () {
      const { type, value } = this.field
      switch (type) {
        case 'box': {
          return (
            <FGBox
              field={this.field}
              value={value}
              path={this.path}
              onChange={this.onChange}
            />
          )
        }
        case 'card': {
          return (
            <FGBlock
              border
              field={this.field}
              value={value}
              path={this.path}
              onChange={this.onChange}
            />
          )
        }
        case 'object':
        case 'block': {
          return (
            <FGBlock
              field={this.field}
              value={value}
              path={this.path}
              onChange={this.onChange}
            />
          )
        }
        case 'array': {
          return (
            <FGArray
              field={this.field}
              value={value}
              path={this.path}
              onChange={this.onChange}
            />
          )
        }
        case 'cascader': {
          return (
            <Cascader
              field={this.field}
              value={value}
              onChange={this.onChange}
            />
          )
        }
        case 'number': {
          return (
            <Number
              field={this.field}
              value={value}
              onChange={this.onChange}
            />
          )
        }
        case 'input': {
          return (
            <Input
              field={this.field}
              value={value}
              onChange={this.onChange}
            />
          )
        }
        case 'select': {
          return (
            <Select
              field={this.field}
              value={value}
              onChange={this.onChange}
            />
          )
        }
        case 'switch': {
          return (
            <Switch
              field={this.field}
              value={value}
              onChange={this.onChange}
            />
          )
        }
        case 'upload': {
          return (
            <Upload
              field={this.field}
              value={value}
              onChange={this.onChange}
            />
          )
        }
        case 'indicator': {
          return (
            <Indicator
              field={this.field}
              value={value}
              onChange={this.onChange}
            />
          )
        }
        case 'color-picker': {
          return (
            <ColorPicker
              field={this.field}
              value={value}
              onChange={this.onChange}
            />
          )
        }
      }
    },
    renderField () {
      const { type, name, title } = this.field
      const hasTitle = !!title
      const isRenderTitle = !['block', 'card', 'object', 'box'].includes(type)

      return (
        <div class="form-item" key={name}>
          {
            (hasTitle && isRenderTitle) && (
              <div class="form-item__label">
                {title}：
              </div>
            )
          }
          <div class="form-item__control">
            {this.renderControl()}
          </div>
        </div>
      )
    }
  },

  render () {
    const { type, visible = true } = this.field
    const isRender = !(type === 'hidden' || !visible)
    if (isRender) {
      return this.renderField()
    }
  }
}
</script>

<style scoped lang="less">
.form-item {
  width: 100%;
  display: flex;
  align-items: start;
  justify-content: flex-start;
  position: relative;
  margin-bottom: 4px;
  line-height: 39px;

  & + .form-item {
    margin-top: 24px;
  }

  &__label {
    width: 70px;
    text-align: right;
  }

  &__control {
    flex: 1;
    width: 100%;

    .ant-input-number,
    .ant-select {
      width: 100%;
    }
  }
}
</style>
