export const defaultValues = {
  type: 'indicator',
  title: '指标图',
  // 数据
  dataType: 1, // 数据类型
  indicator: {}, // 指标
  indicatorData: [], // 指标数据
  indexId: undefined, // 指标id
  mode: [
    // {
    //   dl: '', // 度量
    //   dw: '', // 数值
    //   value: '' // 单位
    // }
  ],

  // 样式
  version: '0.0.1',
  componentType: 1,
  width: 0,
  height: 0,
  modeNum: 4,
  backgroundImage: '', // 底图样式
  modeStyle: []
}

export const init = () => {
  console.log('indicator init')
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
