<!--<template>-->
<!--  <div class="layers">-->
<!--    <Container @drop="onDrop" v-if="sequenceLayers.length > 0">-->
<!--      <Draggable v-for="layer in sequenceLayers" :key="layer.id">-->
<!--        <layer :layer="layer" @set-level="setLevel" />-->
<!--      </Draggable>-->
<!--    </Container>-->
<!--    <Empty description="暂无" v-else/>-->
<!--  </div>-->
<!--</template>-->
<script>
import { mapGetters, mapMutations } from 'vuex'
import { Empty } from 'ant-design-vue'
import { Container, Draggable } from 'vue-smooth-dnd'
import Layer from './layer'

export default {
  name: 'layers',
  components: {
    Container,
    Draggable,
    Layer
  },
  computed: {
    ...mapGetters('screen', ['sequenceLayers'])
  },
  methods: {
    ...mapMutations('screen', ['resetLayersLevel']),
    setLevel ({ id, level }) {
      console.log('setLevel:', id, level)
      const levels = this.sequenceLayers.map(({ id, zIndex }) => ({ id, zIndex }))
      const sourceIndex = levels.findIndex(item => id === item.id)
      const source = levels[sourceIndex]
      let needUpdate = false
      switch (level) {
        case 'top': {
          // 置顶
          if (sourceIndex < levels.length - 1) {
            needUpdate = true
            levels.splice(sourceIndex, 1)
            levels.push(source)
          }
          break
        }
        case 'bottom': {
          // 置底
          if (sourceIndex > 0) {
            needUpdate = true
            levels.splice(sourceIndex, 1)
            levels.unshift(source)
          }
          break
        }
      }
      if (needUpdate) {
        const newLevel = levels.map((item, zIndex) => ({ ...item, zIndex }))
          .reduce((result, { id, zIndex }) => {
            result[id] = zIndex
            return result
          }, {})
        this.resetLayersLevel(newLevel)
      }
    },
    onDrop (dropResult) {
      console.log('onDrop dropResult:', dropResult)
      const { addedIndex, removedIndex } = dropResult
      const levels = this.sequenceLayers.map(({ id, zIndex }) => ({ id, zIndex }))
      const moveLayer = levels[removedIndex]
      levels.splice(removedIndex, 1)
      levels.splice(addedIndex, 0, moveLayer)
      const newLevel = levels.map((item, zIndex) => ({ ...item, zIndex }))
        .reduce((result, { id, zIndex }) => {
          result[id] = zIndex
          return result
        }, {})
      this.resetLayersLevel(newLevel)
    }
  },
  render () {
    const hasLayer = this.sequenceLayers.length > 0
    return (
      <div class="layers">
        {
          hasLayer ? (
            <Container onDrop={this.onDrop}>
              {
                this.sequenceLayers.map(layer => (
                  <Draggable key={layer.id} class="layer">
                    <Layer
                      key={layer.id}
                      layer={layer}
                      onSetLevel={this.setLevel}
                    />
                  </Draggable>
                ))
              }
            </Container>
          ) : (<Empty description="暂无"/>)
        }
      </div>
    )
  }
}
</script>
<style scoped lang="less">
.layers {
  padding: 4px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  position: relative;

  .layer {
    margin: 4px 0;
  }
}
</style>
