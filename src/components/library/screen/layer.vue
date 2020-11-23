<script>
import { mapState, mapMutations } from 'vuex'
import { Dropdown, Menu, Icon } from 'ant-design-vue'
export default {
  name: 'layer',
  props: {
    layer: Object
  },
  data () {
    return {

    }
  },
  computed: {
    ...mapState('active', ['active']),
    isActive () {
      if (this.active && this.layer) {
        return this.layer.id === this.active.id
      }
      return false
    }
  },
  methods: {
    ...mapMutations('active', ['setActive']),
    onClick () {
      this.setActive(this.layer)
    },
    setLevel (level) {
      const { id } = this.layer
      this.$emit('setLevel', { id, level })
    },
    renderOperation () {
      const options = [
        { label: '置顶', value: 'top' },
        { label: '置底', value: 'bottom' }
      ]
      return (
        <Dropdown
          overlayClassName="dropdown"
          getPopupContainer={node => node.parentNode}
        >
          <div class="item">
            <Icon type="more" />
          </div>
          <Menu slot="overlay">
            {
              options.map(option => (
                <Menu.Item
                  key={option.value}
                  onClick={() => this.setLevel(option.value)}
                >
                  <a>{option.label}</a>
                </Menu.Item>
              ))
            }
          </Menu>
        </Dropdown>
      )
    }
  },
  render () {
    const { title, type } = this.layer
    return (
      <div class={`layer ${this.isActive && 'active'}`} onClick={this.onClick}>
        <div class="layer__icon">
          <i class={`icon icon-screen-${type}`} />
        </div>
        <div class="layer__info">
          <label class="title">{title}</label>
        </div>

        <div class="layer__operation">
          {this.renderOperation()}
        </div>
      </div>
    )
  }
}
</script>
<style scoped lang="less">
.layer {
  padding: 4px;
  border: 1px solid #E9ECF0;

  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 64px;
  position: relative;

  & + .layer {
    margin-top: 4px;
  }

  &.active {
    border: 1px solid #2266FF;
    box-shadow: 0 0 2px #2266FF;
  }

  &__icon {
    width: 64px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;

    .icon {
      width: 60%;
      height: 60%;
    }
  }

  &__info {
    margin-left: 10px;
  }

  &__operation {
    position: absolute;
    bottom: 4px;
    right: 4px;
  }
}
</style>
