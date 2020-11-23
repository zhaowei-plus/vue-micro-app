import VNode from './vNode'

export default class Field {
  constructor (props) {
    this.vNode = new VNode(props)
  }

  render (children) {
    this.vNode.render(children)
  }
}
