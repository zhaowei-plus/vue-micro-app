<script>
import cloneDeep from 'lodash/cloneDeep'
import { Button, Modal, Table, Spin, message } from 'ant-design-vue'
import http from '@/api'
import Item from './item'
import { getColumns } from '../config'

import data from '../config/data.json'

console.log('data:', data)

export default {
  name: 'FGIndicatorSelect',
  components: {
    Button,
    Item
  },
  props: {},
  data () {
    return {
      loading: true,
      value: undefined,
      dataSource: []
    }
  },
  created () {
    this.fetchList()
  },
  methods: {
    fetchList (params = {}) {
      http.get('indicator/list', { ...params, pageIndex: 1, pageSize: 20 })
        .then(res => {
          const { success, data = {} } = res
          if (success) {
            this.dataSource = data.list
          }
        }).finally(() => {
        this.loading = false
      })
    },
    handleOk () {
      if (this.value) {
        this.$emit('ok', this.value)
      } else {
        message.warn('请选择指标')
      }
    },
    handleCancel () {
      this.$emit('cancel')
    }
  },
  render () {
    const columns = getColumns()
    const rowSelection = {
      type: 'radio',
      onSelect: (record) => {
        const { id, apiId, srvId, interParams, name, outerParams, categoryName, srvName } = record
        this.value = {
          id,
          apiId,
          srvId,
          name,
          interParams,
          categoryName,
          srvName,
          outerParams: JSON.parse((outerParams || '[]'))
        }
      }
    }
    return (
      <Modal
        visible
        centered
        width={760}
        title="选择指标"
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <Spin spinning={this.loading}>
          <Table
            rowKey="id"
            columns={columns}
            rowSelection={rowSelection}
            dataSource={this.dataSource}
          />
        </Spin>
      </Modal>
    )
  }
}
</script>

<style scoped lang="less">
.indicator {
  &__header {
    height: 39px;
    line-height: 39px;
  }

  &__content {
    padding: 4px;
    margin-left: -68px;
    border: 1px solid #E9ECF0;
  }
}
</style>
