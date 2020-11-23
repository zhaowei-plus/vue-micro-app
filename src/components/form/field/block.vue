<script>
import { mapState } from 'vuex'
import { Icon } from 'ant-design-vue'
import Field from '../field'

export default {
  name: 'FGBlock',
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
    },
    border: {
      type: Boolean,
      default: () => true
    }
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
    const { props = {}, title } = this.field
    const { enableExpand = false } = props

    return (
      <div class="block">
        {
          title && (
            <div class="block__header">
              <label class="title">{title}</label>
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
          )
        }
        <div class={`block__content ${!this.expand && 'hidden'} ${this.border && 'border'} `}>
          {this.renderChildren()}
        </div>
      </div>
    )
  }
}
</script>

<style scoped lang="less">
.block {
  //border: 1px solid red;
  .hidden {
    display: none !important;
  }

  &__header {
    height: 39px;
    line-height: 39px;
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
    padding: 4px 0 4px 8px;
    &.border {
      padding-right: 4px;
      border: 1px solid #E9ECF0;
    }
  }
}
</style>
