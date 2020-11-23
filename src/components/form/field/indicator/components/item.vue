<template>
  <div class="item">
    <div class="item__header">
      <Tooltip :title="value.name">
        <label class="title">{{value.name}}</label>
      </Tooltip>
      <div class="operation">
        <a @click="$emit('delete')">移除</a>
      </div>
    </div>
    <div class="item__content form">
      <div class="form-item">
        <label class="form-item__label">指标名称：</label>
        <label class="form-item__input">
          <Tooltip :title="value.name">{{value.name}}</Tooltip>
        </label>
      </div>
      <div class="form-item">
        <label class="form-item__label">指标分类：</label>
        <label class="form-item__input">
          <Tooltip :title="value.categoryName">{{value.categoryName}}</Tooltip>
        </label>
      </div>
      <div class="form-item">
        <label class="form-item__label">数据来源：</label>
        <label class="form-item__input">
          <Tooltip :title="value.srvName">{{value.srvName}}</Tooltip>
        </label>
      </div>
    </div>
  </div>
</template>
<script>
import { Button, Tooltip } from 'ant-design-vue'

export default {
  name: 'indicatorItem',
  components: {
    Button,
    Tooltip
  },
  props: {
    value: {
      type: Object,
      default () {
        return {}
      }
    },
    title: String
  },
  methods: {
    onDelete () {
      this.$emit('delete')
    }
  }
}
</script>

<style scoped lang="less">
.item {
  width: 100%;
  line-height: 32px;
  padding: 0 4px;
  display: flex;
  flex-direction: column;

  & + .item {
    margin-top: 4px;
  }

  &__header {
    height: 40px;
    line-height: 40px;
    display: flex;
    justify-content: space-between;

    .title {
      flex: 1;
      padding-left: 4px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .operation {
      margin-left: 10px;
      cursor: pointer;
    }
  }

  &__content {
    padding: 4px;
    border: 1px solid #E9ECF0;

    &.form {
      background-color: #E9ECF0;

      .form-item {
        height: 32px;
        line-height: 32px;
        display: flex;
        justify-content: flex-start;

        &__label {
          width: 33%;
          text-align: right;
        }

        &__input {
          flex: 1;
          height: 32px;
          line-height: 32px;

          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
}

</style>
