
export const getSchema = () => {
  return {
    cardName: {
      title: '卡片名称',
      'x-component': 'Input',
      'x-props': {
        placeholder: '请输入'
      }
    },
    cardId: {
      title: '卡片ID',
      'x-component': 'Input',
      'x-props': {
        placeholder: '请输入'
      }
    },
    '[startTime,endTime]': {
      title: '创建时间',
      'x-component': 'DateRangePicker'
    }
  }
}

export const getColumns = () => {
  return [
    {
      title: '指标名称',
      dataIndex: 'name',
    },
    {
      title: '指标编码',
      dataIndex: 'code',
    },
    {
      title: '分类',
      dataIndex: 'categoryName',
    }
  ]
}
