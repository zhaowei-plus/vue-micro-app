export const defaultValues = {
  type: 'bar',
  // 数据
  dataType: 1, // 数据类型
  indicator: {}, // 指标
  indicatorData: [], // 指标数据
  indexId: undefined,
  x: '',
  y: '',
  dl: '',
  dw: '',

  // 样式
  version: '0.0.1',
  componentType: 4,
  width: 0,
  height: 0,
  title: '柱状图',
  showTitle: true
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
