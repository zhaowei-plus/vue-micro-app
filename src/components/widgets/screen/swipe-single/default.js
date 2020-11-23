export const defaultValues = {
  type: 'swipe-single',
  title: '静态图',
  // 数据
  picture: '', // 图片
  jumpParams: '', // 跳转入参
  jumpType: '', // 跳转类型
  jumpScreen: '', // 可视化页面
  jumpPage: '', // 小程序页面

  dataType: 1, // 数据类型
  indicator: {}, // 指标
  indicatorData: [], // 指标数据
  indexId: undefined,

  // TODO 数据源 图片/Url是什么意思？
  url: '',

  // 样式
  version: '0.0.1',
  componentType: 13,
  showTitle: true,
  width: 0,
  height: 0,
  fullScreen: false
}

export const init = () => {
  return {
    ...defaultValues,
    id: Date.now(),
    width: 380,
    height: 260,

    // TODO 测试数据
    title: `${defaultValues.title}(${Date.now()})`,
    indicator: {
      id: 2,
      apiId: 2,
      srvId: 2,
      name: '街道事件指标2',
      srvName: '社会治理',
      categoryName: 'roma数据',
      interParams: '1输入参数',
      outerParams: null
    },
    indicatorData: []
  }
}
