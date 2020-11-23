<script>
import { mapActions } from 'vuex'
import Field from './field'
import { virtuals, parseForm, parseArray, parsePath, parseProxy, parseArrayItem, parseValues } from './utils'

export default {
  name: 'FormGiven',
  components: {
    Field
  },
  provide () {
    return {
      change: this.onChange,
      setFieldState: this.setFieldState,
      getFieldValue: this.getFieldValue,
      addItem: this.addItem,
      removeItem: this.removeItem
    }
  },
  data () {
    return {
      formFields: {},
      formValues: {},
      arrayFields: {}
    }
  },
  props: {
    schema: {
      type: Object,
      required: true
    },
    values: {
      type: Object,
      default: () => ({})
    },
    labelAlign: {
      type: String,
      default: () => 'right'
    },
    labelCol: {
      type: Number,
      default: () => 6
    },
    labelWidth: Number,
    wrapperCol: {
      type: Number,
      default: () => 18
    }
  },
  created () {
    // console.log('FormGiven created:', JSON.stringify(this.schema, 0, 2), JSON.stringify(this.values, 0, 2))
    this.formInit()
  },
  destroyed () {
    console.log('FormGiven destroyed')
  },
  methods: {
    ...mapActions('form', ['formInit']),
    emitChange () {
      this.$emit('change', parseValues(this.formFields))
    },
    formInit () {
      this.arrayFields = parseArray(this.schema)
      this.formFields = parseForm(this.schema, this.values)
    },
    onChange (path, value) {
      const field = parsePath(path, this.formFields)
      if (field) {
        this.$set(field, 'value', value)
        this.emitChange()
      } else {
        console.error('路径：%o 解析失败', path)
      }
    },
    getFieldValue (path) {
      const field = parsePath(path, this.formFields)
      const { type, children } = field
      if (type === 'array') {
        return field.children.map(parseValues)
      } else if ([...virtuals, 'object'].includes(type)) {
        return parseValues(children)
      } else {
        return field.value
      }
    },
    setFieldState (path, callback) {
      const field = parsePath(path, this.formFields)
      if (field.type === 'array') {
        const arraySchema = this.arrayFields[path.join('.')]
        const proxy = parseProxy(field, arraySchema)
        callback(proxy)
      } else {
        const proxy = parseProxy(field)
        if (proxy) {
          callback(proxy)
        }
      }
    },
    addItem (path, index) {
      const field = parsePath(path, this.formFields)
      parseArrayItem(field, index, this.arrayFields[path.join('.')])
      this.emitChange()
    },
    removeItem (path, index) {
      const field = parsePath(path, this.formFields)
      parseArrayItem(field, index)
      this.emitChange()
    },
    submit () {

    },
    validate () {

    },
    reset () {

    },
    renderField () {
      const domFields = []
      for (let name in this.formFields) {
        const field = this.formFields[name]
        domFields.push(
          <Field
            key={name}
            field={field}
            path={[name]}
          />
        )
      }
      return domFields
    }
  },
  render () {
    return (
      <div class="form-given">
        {this.renderField()}
      </div>
    )
  }
}
</script>

<style scoped lang="less">
.form-given {
  width: 100%;
  height: 100%;
}
</style>
