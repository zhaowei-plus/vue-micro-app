<template>
  <div class="fg-upload">
    <Upload
      name="file"
      :multiple="false"
      :showUploadList="false"
      listType="picture-card"
      class="fg-upload__content"
      :action="props.action"
      @change="onChange"
    >
      <div v-if="!this.value">
        <Icon type="plus" />
      </div>
      <div class="image" v-else>
        <img :src="value" />
      </div>
    </Upload>
  </div>
</template>
<script>
import { Upload, Icon } from 'ant-design-vue'

export default {
  name: 'FGUpload',
  components: {
    Upload,
    Icon
  },
  props: {
    value: String,
    field: Object
  },
  computed: {
    props () {
      if (this.field) {
        const { props = {} } = this.field
        return props
      }
      return {}
    }
  },
  methods: {
    onChange ({ file }) {
      console.log('onChange:', file)
      const { response } = file
      if (response) {
        const { data } = response
        this.$emit('change', data)
      }
    },
    beforeUpload (file) {
      console.log('beforeUpload:', file)
    }
  }
}
</script>

<style scoped lang="less">
.fg-upload {
  width: 74px !important;
  height: 74px !important;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 20px;
  border: 1px solid #E9ECF0;

  .ant-upload-select-picture-card {
    width: 72px;
    height: 72px;

    .ant-upload {
      padding: 0 2px !important;
      width: 72px;
      height: 72px;
    }
  }

  &__content {
    width: 74px !important;
    height: 74px !important;

    .image {
      width: 100%;
      height: 100%;

      img {
        width: auto;
        height: auto;
        max-width: 100%;
        max-height: 100%;
      }
    }
    &:before {
      display: none;
    }
  }
}
</style>
<style lang="less">
.ant-upload-select-picture-card {
  width: 72px !important;
  height: 72px !important;

  .ant-upload {
    width: 72px;
    height: 72px;
  }
}
</style>
