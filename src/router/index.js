import Vue from 'vue'
import Router from 'vue-router'

import Demo from '@/page/demo'
import Mobile from '@/page/mobile'
import Screen from '@/page/screen'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/demo',
      name: 'demo',
      component: Demo
    },
    {
      path: '/mobile',
      name: 'mobile',
      component: Mobile
    },
    {
      path: '/screen',
      name: 'screen',
      component: Screen
    }
  ]
})
