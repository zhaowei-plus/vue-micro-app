<template>
  <div id="app">
    <a-locale-provider :locale="locale">
      <router-view/>
    </a-locale-provider>
  </div>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
export default {
  name: 'App',
  data () {
    return {
      locale: zhCN
    }
  }
}
</script>

<style>
html {
  margin: 0;
  padding: 0;
}

body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
}

div {
  box-sizing: border-box;
}

.icon {
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: 100% 100%;
}

::-webkit-scrollbar {
  width: 0;
  height: 2px;
}
/*小屏库图标*/
.icon-xmbase-tab {
  background-image: url("./assets/images/menu/xmbase-tab.png");
}
.icon-swipe {
  background-image: url("./assets/images/menu/swipe.png");
}
.icon-swipe-single {
  background-image: url("./assets/images/menu/swipe-single.png");
}
.icon-data-card {
  background-image: url("./assets/images/menu/data-card.png");
}

/*中屏库图标*/
.icon-screen-bar {
  background-image: url("./assets/library/screen/icon-screen-bar.png");
}
.icon-screen-bar-graph {
  background-image: url("./assets/library/screen/icon-screen-bar-graph.png");
}
.icon-screen-flat-map {
  /*background-image: url("./assets/library/screen/icon-screen-flat-map.png");*/
}
.icon-screen-graph {
  background-image: url("./assets/library/screen/icon-screen-graph.png");
}
.icon-screen-indicator {
  background-image: url("./assets/library/screen/icon-screen-indicator.png");
}
.icon-screen-line {
  background-image: url("./assets/library/screen/icon-screen-line.png");
}
.icon-screen-pie {
  background-image: url("./assets/library/screen/icon-screen-pie.png");
}
.icon-screen-ring {
  background-image: url("./assets/library/screen/icon-screen-ring.png");
}
.icon-screen-swipe-single {
  background-image: url("./assets/library/screen/icon-screen-swipe-single.png");
}
.icon-screen-table {
  background-image: url("./assets/library/screen/icon-screen-table.png");
}

.icon-back {
  background-image: url("./assets/icon-back.png");
}
/*.icon-prev {*/
/*  background-image: url("./assets/icon-prev.png");*/
/*}*/
.icon-reset {
  background-image: url("./assets/icon-reset.png");
}
.icon-position {
  background-image: url("./assets/icon-position.png");
}
.icon-layer {
  background-image: url("./assets/icon-layer.png");
}
.icon-preview {
  background-image: url("./assets/icon-preview.png");
}
.icon-save {
  background-image: url("./assets/icon-save.png");
}
.icon-more {
  background-image: url("./assets/icon-more.png");
}

.icon-editor-empty {
  background-image: url("./assets/icon-editor-empty.png");
}
.icon-setting-component {
  background-image: url("./assets/setting/icon-setting-component.png");
}
.icon-setting-layer {
  background-image: url("./assets/setting/icon-setting-layer.png");
}
.icon-setting-empty {
  background-image: url("./assets/setting/icon-setting-empty.png");
}
/*图层相关*/
.icon-layer-move {
  background-image: url("./assets/layer/icon-move.png");
}
.icon-layer-delete {
  background-image: url("./assets/layer/icon-delete.png");
}
.icon-layer-resize {
  background-image: url("./assets/layer/icon-resize.png");
  transform: rotate(90deg);
}

/*!*对齐方式*!*/
/*.icon-align-left {*/
/*  background-image: url("./assets/align/icon-align-left.png");*/
/*}*/
/*.icon-align-right {*/
/*  background-image: url("./assets/align/icon-align-right.png");*/
/*}*/
/*.icon-align-vertical-center {*/
/*  background-image: url("./assets/align/icon-align-vertical-center.png");*/
/*}*/
/*.icon-align-horizontal-center {*/
/*  background-image: url("./assets/align/icon-align-horizontal-center.png");*/
/*}*/
/*.icon-align-top {*/
/*  background-image: url("./assets/align/icon-align-top.png");*/
/*}*/
/*.icon-align-bottom {*/
/*  background-image: url("./assets/align/icon-align-bottom.png");*/
/*}*/




.drop-class {
  width: 100%;
  min-height: 40px;
}

/* 图片不可拖拽*/
img {
  -webkit-user-drag: none;
}
</style>
