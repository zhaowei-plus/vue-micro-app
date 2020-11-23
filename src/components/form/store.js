import Vue from 'vue'

export const Nodes = {
  button: 'a-button',
  icon: 'a-icon',
  slider: 'a-slider',
  rate: 'a-rate',
  upload: 'fc-antd-update',
  cascader: 'a-cascader',
  timePicker: 'a-time-picker',
  datePicker: 'a-date-picker',
  rangePicker: 'a-range-picker',
  weekPicker: 'a-week-picker',
  monthPicker: 'a-month-picker',
  'switch': 'a-switch',
  select: 'a-select',
  checkbox: 'a-checkbox-group',
  radio: 'a-radio-group',
  inputNumber: 'a-input-number',
  search: 'a-input-search',
  textarea: 'a-textarea',
  formItem: 'a-form-model-item',
  form: 'a-form-model',
  frame: 'fc-antd-frame',
  col: 'a-col',
  row: 'a-row',
  tree: 'a-tree',
  autoComplete: 'a-auto-complete'
  // group: 'fc-antd-group'
}

const components = {}

export default class VNode {
  constructor (vm) {
    // 绑定 vm 实例
    this.vm = vm
    this.$h = vm.$createElement
  }

  // 渲染这个节点
  render (name, data, VNodeFn) {
    const node = this.$h(name, data, VNodeFn)
    node.context = this.vm
    return node
  }

  static use (nodes) {
    for (let key in nodes) {
      // 添加类的成员方法
      VNode.prototype[key.toString().toLocaleLowerCase()] =
        VNode.prototype[key] = function (data, VNodeFunc) {
          return this.render(nodes[key], data, VNodeFunc)
        }
    }
  }
}

// 注册组件
VNode.use({ fragment: 'fcFragment' })
VNode.use(Nodes)

// 创建一个Vue实例
function create (schema, options) {
  const $vm = new Vue({
    data () {
      return {
        schema,
        options,
        values: {}
      }
    },
    render () {
      return (
        <FormGiven
          ref='fg'
          props={this.$data}
        />
      )
    }
  })
  $vm.$mount()
  return $vm
}

// $FormGiven 组件描述
function $FormGiven (FormGiven, components) {
  return {
    name: 'FormGiven',
    componentName: 'FormGiven',
    components,
    props: {
      schema: {
        type: Object,
        required: true
      },
      options: {
        type: Object,
        default: () => {
          return {}
        },
        required: false
      },
      values: Object
    },
    data: () => {
      return {
        formData: undefined,
        buttonProps: undefined,
        resetProps: undefined,
        $f: undefined,
        isShow: true,
        unique: 1
      }
    },
    beforeCreate () {
      console.log('$FormGiven beforeCreate:', this.$options)
      const { schema, options } = this.$options.propsData
      this.formGiven = new FormGiven(schema, options) // 实例化对象
      this.formGiven.beforeCreate(this)
    },
    created () {
      console.log('$FormGiven created')
      this.formGiven.created()
      this.$f = this.formGiven.api()
      this.$emit('input', this.$f)
      this.$emit('change', this.$f)
    },
    render () {
      console.log('$FormGiven render')
      return this.formGiven.render()
    },
    mounted () {
      console.log('$FormGiven mounted')
      this.$emit('change', this.$f)
    },
    beforeDestroy () {
      // this.formGiven.handle.reloadRule([]);
      // this.formGiven.handle.$render.clearCacheAll();
    },
    methods: {
      refresh () {
        ++this.unique
      }
    },
    watch: {
      option: '_refresh',
      schema (n) {
        // this.formCreate.handle.reloadRule(n)
      }
    }
  }
}

// 导出的组件
class FormGiven {
  constructor (schema, options = {}) {
    console.log('FormGiven constructor:', schema, options)
    this.fCreateApi = undefined
    this.vm = undefined
    this.schema = []
  }

  api () {
    return this.handle.fCreateApi
  }

  beforeCreate (vm) {
    console.log('FormGiven beforeCreate')
    this.vm = vm
  }

  created () {
    console.log('FormGiven created')
  }

  render () {
    console.log('FormGiven render')
  }

  mounted () {
    console.log('FormGiven mounted')
  }

  // 向父组件
  $emit (eventName, ...params) {
    console.log('FormGiven $emit')
    if (this.$parent) {
      this.$parent.$emit(`fg:${eventName}`, ...params)
    }

    this.vm.$emit(eventName, ...params)
  }

  static create (schema, options = {}, parent) {
    const $vm = create(schema, options)

    const _this = $vm.$refs.fg.formGiven
    _this.parent = parent
    _this.options.el.appendChild($vm.$el)

    return _this.handle.fCreateApi
  }

  // 安装组件
  static install (Vue, options) {
    const $formGiven = function (schema, options = {}) {
      return FormGiven.create(schema, options, this)
    }

    const formGiven = Vue.extend($FormGiven(FormGiven, components))
    Vue.prototype.$formGiven = $formGiven

    // 组件注册
    Vue.component('FormGiven', get$FormCreate());
  }

  static init(rules, _opt = {}) {
    let $vm = create(rules, _opt), formCreate = $vm.$refs.fc.formCreate;

    return {
      mount($el) {
        if ($el && isElement($el))
          formCreate.options.el = $el;
        formCreate.options.el.appendChild($vm.$el);
        return formCreate.handle.fCreateApi;
      },
      remove() {
        formCreate.options.el.removeChild($vm.$el);
      },
      destroy() {
        this.remove();
        $vm.$destroy();
      },
      $f: formCreate.handle.fCreateApi
    };
  }
}

// 注册组件类型
function component(name, component) {
  components[name] = component
}
