export const defaultValues = {
  type: 'line',
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
  componentType: 2,
  width: 0,
  height: 0,
  title: '折线图',
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
  }
}
