<script>
import { mapMutations } from 'vuex'
import XmTransform from '@xm/transform-data'

import Form from '@/components/form'

export default {
  name: 'data',
  components: {
    Form
  },
  props: {
    layer: Object
  },
  data () {
    return {
      schema: {
        dataType: {
          type: 'select',
          title: '数据类型',
          enum: [
            { label: '指标数据', value: 1 },
            { label: '业务数据', value: 2 }
          ]
        },
        area: {
          type: 'select',
          title: '区域',
          enum: []
        },
        longitude: {
          type: 'select',
          title: '经度',
          enum: []
        },
        latitude: {
          type: 'select',
          title: '纬度',
          enum: []
        },
        dataPopup: {
          type: 'select',
          title: '数据弹窗',
          enum: []
        }
      }
    }
  },
  methods: {
    ...mapMutations('screen', ['updateLayer']),
    onChange (values) {
      const newValues = {
        ...this.layer,
        ...values
      }
      this.updateLayer(newValues)
    }
  },
  render () {
    return (
      <Form
        schema={this.schema}
        values={this.layer}
        onChange={this.onChange}
      />
    )
  }
}
</script>
