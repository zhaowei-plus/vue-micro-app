import Vue from 'vue'
import cloneDeep from 'lodash/cloneDeep'

// 虚拟节点
export const virtuals = ['block', 'card', 'box']

export const isType = (target, type) => {
  if (target) {
    return target.toString() === `[object ${type}]`
  }
  return false
}

export const responsiveObject = (params) => {
  if (isType(params, 'Object')) {
    if (params !== null) {
      const newObject = {}
      for (let name in params) {
        if (isType(params[name], 'Object')) {
          Vue.set(newObject, name, responsiveObject(params[name]))
        } else {
          Vue.set(newObject, name, params[name])
        }
      }
      return newObject
    }
  } else if (isType(params, 'Array')) {
    return params.reduce((result, item, index) => {
      Vue.set(result, index, responsiveObject(item))
      return result
    }, [])
  }
  return params
}

export const parseForm = (schema, values = {}) => {
  console.log('parseForm:', schema, values)
  const formFields = {}
  for (let name in schema) {
    const field = schema[name]
    const { type, children } = field
    const fieldValues = values[name] || (typeof field.default === 'function' ? field.default() : field.default)

    if (type === 'array') {
      // 数组组件
      const childrenField = (fieldValues || []).map(itemValues => {
        return parseForm(children, itemValues)
      }).reduce((result, item, index) => {
        Vue.set(result, index, item)
        return result
      }, [])

      Vue.set(formFields, name, {
        ...field,
        children: childrenField
      })
    } else if (type === 'object') {
      Vue.set(formFields, name, {
        ...field,
        children: parseForm(children, fieldValues)
      })
    } else if (virtuals.includes(type)) {
      // 虚拟组件
      Vue.set(formFields, name, {
        ...field,
        children: parseForm(children, values)
      })
    } else {
      // 表单组件
      // console.log('parseForm fieldValues:', fieldValues, fieldValues || (typeof field.default === 'function' ? field.default() : field.default))
      Vue.set(formFields, name, {
        ...field,
        value: fieldValues || (typeof field.default === 'function' ? field.default() : field.default)
      })
    }
  }

  console.log('parseForm:', formFields)
  return formFields
}

export const parseValues = (fields) => {
  const values = {};
  (function parseValue (fields, values = {}) {
    for (let name in fields) {
      const field = fields[name]
      const { type, children } = field
      if (type === 'array') {
        values[name] = (children || []).map(item => parseValue(item))
      } else if (type === 'object') {
        values[name] = parseValue(children)
      } else if (virtuals.includes(type)) {
        parseValue(children, values)
      } else {
        // 表单组件
        values[name] = field.value
      }
    }
    return values
  })(fields, values)
  return values
}

export const parseArray = (schema) => {
  const arrayFields = {};
  (function parseArrayFields (schema, path = []) {
    Object.keys(schema).map(name => {
      const field = schema[name]
      const { type, children } = field
      if (type === 'array') {
        arrayFields[[...path, name].join('.')] = field
      }

      if (children) {
        parseArrayFields(children, [...path, name])
      }
    })
  })(schema)
  return arrayFields
}

export const parseArrayItem = (target, index, source) => {
  if (source) {
    // 添加节点
    const field = parseForm(source.children)
    Vue.set(target.children, index, field)
  } else {
    // 删除
    target.children.splice(index, 1)
  }
}

export const parsePath = (path, fields) => {
  const backupPath = cloneDeep(path)
  const name = backupPath.shift()
  return backupPath.reduce((field, name) => {
    // console.log('parsePath:', path, name, field.children ? field.children[name] : field[name])
    return field.children ? field.children[name] : field[name]
  }, fields[name])
}

export const parseProxy = (field, fieldSchema) => {
  return new Proxy(field, {
    get (target, key) {
      if (key === 'props') {
        if (isType(target.props, 'Object')) {
          // 代理props
          return createProxy(target.props)
        }
      } else {
        return Reflect.get(target, key)
      }
    },
    set (target, key, value) {
      console.log('parseProxy set:', key, field.type, value)
      if (key === 'value' && field.type === 'array') {
        const children = (value || []).map(val => parseForm(fieldSchema.children, val)).map(responsiveObject)
        console.log('parseProxy children:', children)
        Vue.set(target, 'children', children)
      } else {
        Vue.set(target, key, value)
      }
      return true
    }
  })
}
export const createProxy = (object) => {
  return new Proxy(object, {
    get (target, key) {
      return Reflect.get(target, key)
    },
    set (target, key, value) {
      Vue.set(target, key, value)
      return true
    }
  })
}
