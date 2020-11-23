<script>
import { Container, Draggable } from 'vue-smooth-dnd'
export default {
  name: 'SimpleScroller',
  components: {Container, Draggable},
  data () {
    return {
      items: [
        { label: 'item1', value: 1 },
        { label: 'item2', value: 2 },
        { label: 'item3', value: 3 },
        { label: 'item4', value: 4 }
      ]
    }
  },
  mounted () {},
  beforeDestroy () {},
  methods: {
    onClick (event) {
      console.log('onClick')
    }
  },
  render: (h, params) => {
    console.log('render params:', params)
    return h('div', [
      h('a', {
        class: {
          'a-font-size': true
        }
      }, '111'),
      h('p', {
        class: {
          'p-margintb': true
        }
      }, '从 '+111+ ' 到 ' + '1111'),
      h('p',{
        class: {
          'p-marginb': true
        }
      },'负责人：'+ '张三')
    ])
  }
}
</script>
<style scoped lang="less">
.page {
  min-height: 32px;
  width: 100%;
  height: 100%;
  position: relative;
  border: 1px solid red;

  .container {
    position: absolute;
    left: 100px;
    top: 20px;
    width: 320px;
    height: 800px;
    border: 1px solid red;

    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;

    .item {
      width: 320px;
      height: 48px;
      line-height: 48px;
      background-color: #5A9CE5;
      border-radius: 4px;
      margin-bottom: 8px;
      text-align: center;
      cursor: pointer;
    }
  }
}
</style>
