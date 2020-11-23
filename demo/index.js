const schema = {
  name: {
    type: 'input',
    title: '名称',
    visible: true,
    props: {
      isSingle: true
    }
  },
  // node: {
  //   type: 'array',
  //   title: '模块',
  //   children: {
  //     jumpType: {
  //       type: 'select',
  //       title: '跳转类型'
  //     }
  //   }
  // }
}
//
// const fieldProxy = {
//
// }
//
// for (let name in schema) {
//   const field = schema[name]
//   if (field.type === 'array') {
//
//   } else {
//     const fieldProxy = new Proxy(field, {
//       get (target, key, receiver) {
//         console.log(`getting ${key}!`)
//         return Reflect.get(target, key, receiver)
//       },
//       set (target, key, value, receiver) {
//         console.log('set key:', key)
//         return Reflect.set(target, key, value, receiver)
//       }
//     })
//     fieldProxy[name] = fieldProxy
//   }
// }


const proxy = new Proxy(schema, {
  get (target, key) {
    console.log('createProxy get key:%s', key)
    if (key === 'props') {
      // 代理props
      return new Proxy(target.props, {
        get (target, key) {
          console.log('createProxy props get key:%s value:%s', key, target.props[key])
          return target.props[key]
        },
        set (target, key, value) {
          console.log('createProxy props set key:%s value:%s', key, value)
          target.props[key] = value
          console.log('createProxy props set key:%s value:%s after:', target.props)
        }
      })
    } else {
      return target[key]
    }
  },
  set (target, key, value) {
    target[key] = value
    return true
  }
})

proxy.visible = false
proxy.props.isSingle = false
