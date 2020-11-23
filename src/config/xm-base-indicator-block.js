export default {
  type: 'xmbase-indicator-block',
  title: '指标图',
  showTitle: true,
  row: 1,
  col: 1,
  scale: 0.6,

  // 颜色配置
  modeStyle: [
    {
      backgroundColor: '',
      color: ''
    }
  ],

  // 跳转配置
  interParams: '',
  jumpType: 1,
  jumpUrl: '',
  jumpParams: '',
  jumpApp: '',

  // 数据设置
  dataType: 1,
  target: '',
  mode: [
    {
      name: [],
      value: [],
      unit: [],
      jumpType: 1,
      jumpUrl: '',
      jumpParams: ''
    }
  ]
}
