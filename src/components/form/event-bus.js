import Vue from 'vue'

// 消息总线
export default new Vue()

// 参考文章
// https://www.cnblogs.com/kadima-zy/p/emit.html

// mounted() {
//   const _self = this;
//   EventBus.$on('change', function () {
//     // 需要做的事情
//     // _self.changeColor();
//   })
// },
// destroyed: function() {
//   EventBus.$off('change');
// }
