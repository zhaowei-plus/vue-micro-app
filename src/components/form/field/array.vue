<script>
import { mapMutations } from 'vuex'
import { Button, Icon, Empty } from 'ant-design-vue'

import Field from '../field'

export default {
  name: 'FGArray',
  components: {
    Button,
    Icon,
    Empty
  },
  inject: ['addItem', 'removeItem'],
  data () {
    return {}
  },
  props: {
    field: Object,
    path: {
      type: Array,
      default: () => []
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
  created () {
    console.log('array field:', this.field)
    console.log('array value:', this.value)
  },
  methods: {
    // ...mapMutations('form', ['addItem', 'removeItem']),
    renderTitle () {
      const { title } = this.props
      if (title) {
        return (
          <div class="array__header">
            <label class="title">
              {title}：
            </label>
          </div>
        )
      }
    },
    renderAddition () {
      const { max = 0 } = this.props
      console.log('renderForm:', this.field)
      const { children = [] } = this.field
      const size = children.length
      const canAdd = !max ? true : size <= max
      if (canAdd) {
        return (
          <div class="array__addition">
            <Button
              block
              type="link"
              icon="plus"
              onClick={() => this.addItem(this.path, size)}
            >
              新增
            </Button>
          </div>
        )
      }
    },
    renderItem (index) {
      const itemFields = this.field.children[index]
      const domFields = []
      for (let name in itemFields) {
        const field = itemFields[name]
        const path = this.path.concat([index, name])
        domFields.push(
          <Field
            path={path}
            field={field}
          />
        )
      }
      return domFields
    },
    renderForm () {
      console.log('renderForm:', this.field)
      const { children = [] } = this.field
      const { min = 0, subTitle } = this.props
      const size = children.length
      const canRemove = !min ? true : size > min

      if (size === 0) {
        return (<Empty description="暂无数据"/>)
      }

      return children.map((value, index) => (
        <div class={`array-item ${canRemove && 'has-operation'}`}>
          {
            subTitle && (
              <div class="array-item__header">
                <label class="title">{subTitle.replace('$index', index + 1)}</label>
              </div>
            )
          }
          <div class="array-item__content">
            {this.renderItem(index)}
          </div>
          {
            canRemove && (
              <div class="array-item__operation">
                <Icon
                  type="delete"
                  onClick={() => this.removeItem(this.path, index)}
                />
              </div>
            )
          }
        </div>
      ))
    },
    renderContent () {
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

    .operation {
      //border: 1px solid red;
    }
  }

  &__content {
    padding: 4px 4px 0 4px;
    border: 1px solid #E9ECF0;
    border-radius: 2px;

    .array-item {
      position: relative;
      padding: 4px;
      border: 1px solid #E9ECF0;
      border-radius: 2px;

      & + .array-item {
        margin-top: 12px;
      }

      &__header {
        height: 39px;
        line-height: 39px;
        padding: 0 4px;
        border-bottom: 1px solid #E9ECF0;
      }

      &__content {
        //border: 1px solid #E9ECF0;
        padding: 4px 0;

        .form-item {
          & + .form-item {
            margin-top: 0 !important;
          }
        }
      }

      &__operation {
        width: 24px;
        height: 24px;
        position: absolute;
        top: 12px;
        right: 4px;
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
            //padding-right: 20px;
          }
        }
      }
    }
  }

  &__addition {
    margin-top: 4px;
    height: 39px;
    line-height: 39px;
    padding: 0 10px;
    text-align: center;
    border: 1px solid #E9ECF0;
    color: #488FF9;
    cursor: pointer;
  }
}
</style>
