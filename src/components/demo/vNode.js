export default class VNode {
  constructor (vm) {
    this.vm = vm
    this.$h = vm.$createElement
  }

  render (name, data, vNode) {
    const Node = this.$h(name, data, vNode)
    Node.context = this.vm
    return Node
  }

  input (data, vNode) {
    return this.render(data, vNode)
  }

  static use (nodes) {
    console.log('nodes:', nodes)
  }
}
