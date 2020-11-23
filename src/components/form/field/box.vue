<script>
import { mapState } from 'vuex'
import Field from '../field'
export default {
  name: 'FGBox',
  components: {
    Field
  },
  data () {
    return {

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
    console.log('box field:', this.field)
    console.log('box path:', this.path)
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
    renderChildren () {
      const { children = {} } = this.field

      const domFields = []
      for (let name in children) {
        const field = children[name]
        const path = this.path.concat([name])

        console.log('array box field:', field, path)

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
    const { title } = this.props
    const [first, ...rest] = this.renderChildren()
    return (
      <div class="box">
        {
          title && (
            <div class="box__header">{title}</div>
          )
        }
        <div class="box__content">
          <div class="left">
            {first}
          </div>
          <div class="right">
            {rest}
          </div>
        </div>
      </div>
    )
  }
}
</script>

<style scoped lang="less">
.box {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  padding: 4px;
  flex-direction: column;

  &__header {
    height: 39px;
    line-height: 39px;
    padding: 0 4px;
  }

  &__content {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border: 1px solid #E9ECF0;
    border-radius: 2px;
    padding: 4px;

    .left {
      width: 74px;
      height: 74px;
    }

    .right {
      flex: 1;
      margin-left: 8px;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      flex-direction: column;

      .form-item {
        & + .form-item {
          margin-top: 0 !important;
        }
      }
    }
  }
}
</style>
