import { Http } from 'esc-ui'
import { message } from 'ant-design-vue'
import urlMap from './url-map'

const http = new Http({
  baseUrl: '/',
  urlMap,
  notify: res => {
    message.destroy()
    message.error(res)
  },
  beforeRequest: (...params) => {
    console.log('beforeRequest:', params)
    return params
  },
  contentType: 'application/json',
  // loadingMethods: {
  //   open: () => store.dispatch({ type: 'SET_LOADING', payload: true }),
  //   close: () => store.dispatch({ type: 'SET_LOADING', payload: false }),
  // },
  beforeCatch: res => {
    if ([403, 700, 800].includes(res.code)) {
      message.error(res.msg)
    }
    return res
  }
})

export default http
