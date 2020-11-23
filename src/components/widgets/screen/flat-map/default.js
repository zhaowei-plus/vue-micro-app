export const defaultValues = {
  type: 'flat-map',
  // 数据
  dataType: 1, // 数据类型
  area: 1, // 区域
  longitude: 115, // 经度
  latitude: 116, // 纬度
  dataPopup: 1, // 数据弹窗

  // 样式
  version: '0.0.1',
  componentType: 2,
  title: '2D地图',
  showTitle: true,

  // 地图样式
  styleType: 1, // 样式
  areaType: 1, // 地图区域

  // 底图样式
  width: 0,
  height: 0,
  mapScale: 1, // 地图缩放
  popupType: 1, // 弹窗设置

  // 区域填充颜色
  level: 1, // 分级
  levels: [], // 区域

  // 区块边线样式
  borderColor: '#ffffff',
  borderWidth: 2,

  // 热力区域标注
  markType: 1 // 标注样式

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
