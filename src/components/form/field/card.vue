<script>
import { Icon } from 'ant-design-vue'
import Field from '../field'

export default {
  name: 'FGCard',
  components: {
    Icon,
    Field
  },
  data () {
    return {
      expand: true
    }
  },
  props: {
    field: Object,
    path: {
      type: Array,
      default: () => []
    }
  },
  created () {
    console.log('block field:', this.field)
    console.log('block path:', this.path)
  },
  computed: {
    props () {
      if (this.field) {
        const { props = {} } = this.field
        return props
      }
      return {}
    }
  },
  methods: {
    expandChange () {
      this.expand = !this.expand
    },
    renderChildren () {
      const { children = {} } = this.field

      const domFields = []
      for (let name in children) {
        const field = children[name]
        const path = this.path.concat([name])

        domFields.push(
          <Field
            path={path}
            field={field}
            key={domFields.length}
          />
        )
      }
      return domFields
    }
  },

  render () {
    const { props = {} } = this.field
    const { title, enableExpand = false } = props

    return (
      <div class="area">
        <div class="area__header">
          {
            title && (
              <label className="title">{title}</label>
            )
          }
          {
            enableExpand && (
              <div class="operation">
                <Icon
                  type="caret-right"
                  onClick={this.expandChange}
                  class={`${this.expand && 'expand'}`}
                />
              </div>
            )
          }
        </div>
        <div class={`area__content ${ !this.expand && 'hidden' }`}>
          {this.renderChildren()}
        </div>
      </div>
    )
  }
}
</script>

<style scoped lang="less">
.area {
  //border: 1px solid red;
  .hidden {
    display: none !important;
  }

  &__header {
    height: 39px;
    line-height: 39px;
    padding: 0 4px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    .title {
      font-size: 14px;
      height: 39px;
      line-height: 39px;
      text-align: right;
    }

    .operation {
      margin-left: 4px;
      .anticon {
        transition-duration: .25s;
        &.expand {
          transform: rotateZ(90deg);
        }
      }
    }
  }

  &__content {
    border: 1px solid #E9ECF0;
    //border-bottom: 1px solid #E9ECF0;
    padding-left: 8px;
    //margin-left: -70px;
  }
}
</style>
