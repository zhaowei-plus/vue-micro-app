import cloneDeep from 'lodash/cloneDeep'

const recordSelectLayers = (layerIDs, layers) => {
  return layerIDs.reduce((result, id) => {
    const layer = layers.find(item => id === item.id)
    if (layer) {
      const { id, position: { x, y }, size: { width, height } } = layer
      result[id] = {
        id,
        position: { x, y },
        size: { width, height }
      }
    }
    return result
  }, {})
}

export default {
  namespaced: true,
  state: {
    // 画布
    page: {
      // backgroundImage: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2583035764,1571388243&fm=26&gp=0.jpg', // 背景图
      backgroundColor: '#ffffff' // 背景颜色
    },

    // 图层
    past: [],
    layers: [],
    future: [],

    /** ********画布******** **/
    // 缩放比例
    isMoveCanvas: false,
    // 画布位置
    canvasPosition: {
      x: 300 + 30,
      y: 30
    },
    scale: 1,

    /** ********图层******** **/
    isMoveLayer: false,
    layerPosition: {
      id: 1,
      x: 0,
      y: 0
    },
    isResizeLayer: false,
    layerSize: {
      id: 1,
      width: 0,
      height: 0
    },

    // 按键code
    keys: [],

    /** ********布局******** **/
    isMoveLayout: false,
    layoutPosition: {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    },
    layoutLayers: [],
    layoutLayersInfo: {}
  },
  getters: {
    sequenceLayers (state) {
      return state.layers.sort((a, b) => a.zIndex - b.zIndex)
    }
  },
  mutations: {
    /** ****************图层时间旅行**************** **/
    setPrev (state) {
      if (state.past.length === 20) {
        state.past.shift()
      }
      state.past.push(JSON.parse(JSON.stringify(state.layers)))
    },
    getPrev (state) {
      if (state.past.length > 0) {
        const item = cloneDeep(state.past.pop())
        state.layers = item
      }
    },
    setNext (state) {
      state.future.unshift(JSON.parse(JSON.stringify(state.layers)))
    },
    getNext (state) {
      if (state.future.length > 0) {
        const item = cloneDeep(state.future.shift())
        state.layers = item
      }
    },

    updatePage (state, page) {
      state.page = page
    },
    /** ****************画布**************** **/
    setScale (state, scale) {
      const calcScale = scale / state.scale
      state.scale = scale
      state.layers = state.layers.map(layer => {
        const { size, position: { x, y }, size: { width, height }, ...rest } = layer
        return {
          ...rest,
          position: {
            x: x * calcScale,
            y: y * calcScale
          },
          size: {
            width: width * calcScale,
            height: height * calcScale
          }
        }
      })
    },
    // 移动画布
    moveCanvas (state, position) {
      state.isMoveCanvas = !!position
      if (state.isMoveCanvas) {
        state.canvasPosition = position
      }
    },

    /** ****************图层**************** **/
    addLayer (state, layer) {
      state.layers.push(layer)
    },
    removeLayer (state, layerId) {
      const index = state.layers.findIndex(item => layerId === item.id)
      if (index > -1) {
        state.layers.splice(index, 1)
      }
    },
    updateLayer (state, layer) {
      const index = state.layers.findIndex(item => layer.id === item.id)
      if (index > -1) {
        state.layers.splice(index, 1, layer)
      }
    },
    moveLayer (state, position) {
      state.isMoveLayer = !!position
      if (state.isMoveLayer) {
        state.layerPosition = position
        const { id, x, y } = position
        const index = state.layers.findIndex(item => id === item.id)
        if (index > -1) {
          const layer = cloneDeep(state.layers[index])
          layer.position = { x, y }
          state.layers.splice(index, 1, layer)
        }
      }
    },
    resizeLayer (state, size) {
      state.isResizeLayer = !!size
      if (state.isResizeLayer) {
        state.layerSize = size
        const { id, width, height } = size
        const index = state.layers.findIndex(item => id === item.id)
        if (index > -1) {
          const layer = cloneDeep(state.layers[index])
          layer.size = { width, height }
          state.layers.splice(index, 1, layer)
        }
      }
    },
    resetLayersLevel (state, levels = {}) {
      state.layers = cloneDeep(state.layers.map(layer => {
        return {
          ...layer,
          zIndex: levels[layer.id]
        }
      }))
    },

    /** ****************布局**************** **/
    moveLayout (state, position) {
      state.isMoveLayout = !!position
      if (state.isMoveLayout) {
        state.layoutPosition = position
        state.layoutLayersInfo = {}
      }
    },
    setLayout (state, id) {
      state.layoutLayers = !id ? [] : [id]
      state.layoutLayersInfo = recordSelectLayers(state.layoutLayers, state.layers)
    },
    addToLayout (state, id) {
      if (!state.layoutLayers.includes(id)) {
        state.layoutLayers.push(id)
        state.layoutLayersInfo = recordSelectLayers(state.layoutLayers, state.layers)
      }
    },
    removeFromLayout (state, id) {
      if (state.layoutLayers.includes(id)) {
        const index = state.layoutLayers.findIndex(d => id === d)
        if (index > -1) {
          state.layoutLayers.splice(index, 1)
          state.layoutLayersInfo = recordSelectLayers(state.layoutLayers, state.layers)
        }
      }
    },
    updateLayoutLayersInfo (state, layoutLayersInfo) {
      state.layoutLayersInfo = layoutLayersInfo
    },
    updateLayoutLayersInfoToCanvas (state) {
      state.layers = state.layers.map(layer => {
        const info = state.layoutLayersInfo[layer.id]
        if (info) {
          const { position, size } = info
          return {...layer, position, size}
        }
      })
      // 清空数据
      state.layoutLayers = []
      state.layoutLayersInfo = {}
    },

    /** ****************键盘**************** **/
    addKey (state, keyCode) {
      if (!state.keys.includes(keyCode)) {
        state.keys.push(keyCode)
      }
    },
    removeKey (state, keyCode) {
      if (state.keys.includes(keyCode)) {
        state.keys = state.keys.filter(key => key !== keyCode)
      }
    }
  },
  actions: {
    prev ({ commit }) {
      commit('setNext')
      commit('getPrev')
    },
    next ({ commit }) {
      commit('setPrev')
      commit('getNext')
    },
    addLayer ({ dispatch, commit }, payload) {
      commit('setPrev')
      commit('addLayer', payload)
    },
    removeLayer ({ commit }, payload) {
      commit('setPrev')
      commit('removeLayer', payload)
    },
    updateLayer ({ commit }, payload) {
      commit('setPrev')
      commit('updateLayer', payload)
    },
    moveLayer ({ state, dispatch, commit }, position) {
      const isMoveLayer = !!position
      if (isMoveLayer && !state.isMoveLayer) {
        commit('setPrev')
      }
      commit('moveLayer', position)
    },
    resizeLayer ({ state, commit }, size) {
      const isResizeLayer = !!size
      if (isResizeLayer && !state.isResizeLayer) {
        commit('setPrev')
      }
      commit('resizeLayer', size)
    },
    resetLayersLevel ({ commit }, payload) {
      commit('setPrev')
      commit('resetLayersLevel', payload)
    },
    updateLayoutLayersInfoToCanvas ({ commit }, payload) {
      commit('setPrev')
      commit('updateLayoutLayersInfoToCanvas', payload)
    }
  }
}
