<script>
import { Container, Draggable } from 'vue-smooth-dnd'
import { mapState, mapMutations } from 'vuex'

import Widget from './Widget'

export default {
  name: 'ScWidgets',
  props: {
    group: {
      type: String,
      default: 'page'
    },
    widgets: {
      type: Array,
      default: []
    }
  },
  components: {
    Container,
    Draggable,
    Widget
  },
  computed: {
    currWidgets () {
      if (this.pid) {
        return this.widgets.filter(item => item.pid === this.pid)
      }
      return this.widgets.filter(item => !item.pid)
    }
  },
  methods: {},
  render () {
    return (
      <Container
        class="widgets"
        onDrop={this.onDrop}
        drop-ready={this.dropReady}
        group-name={this.group}
        drop-class="drop-class"
        drop-placeholder="drop-placeholder"
        should-accept-drop={this.shouldAcceptDrop}
        get-child-payload={this.getChildComponent}
      >
        {
          this.currWidgets.map(widget => (
            <Widget
              widget={widget}
              key={widget.id}
            />
          ))
        }
      </Container>
    )
  }
}
</script>
<style scoped>
.widgets {
  height: auto;
  padding: 2px;
  min-height: 100%;
}
</style>
<style>
.drop-placeholder {
  width: 100%;
  min-height: 80px;
  border: 1px solid red;
}
</style>
