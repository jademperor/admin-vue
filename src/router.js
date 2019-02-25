import VueRouter from "vue-router"
import Dash from './views/Dash'
import Config from './views/Config'
// import Plugins from './views/Plugins'
import PluginConfig from './views/PluginConfig'
import BaseConfig from './views/configviews/Base'
import PluginCache from './views/configviews/PluginCache'

import PluginProxy from '@/views/configviews/PluginProxy'
import ClusterInstance from '@/views/configviews/ClusterInstance'
import Clusters from '@/views/configviews/Clusters'
import Cluster from '@/views/configviews/Cluster'
import APIs from '@/views/configviews/APIs'
import Routings from '@/views/configviews/Routings'

import APICfgDetail from '@/components/APICfgDetail'


const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: _ => {
        return '/dashbord'
      },
    },
    {
      name: 'dashbord',
      path: '/dashbord',
      component: Dash,
      meta: { breadcrumb: 'Dashboard' }
    },
    {
      name: 'gatebase',
      path: '/configs/',
      // redirect: _ => {
      //   return '/plugins'
      // },
      component: Config,
      meta: { breadcrumb: 'Config' },
      children: [
        {
          name: 'base',
          path: 'basic',
          component: BaseConfig,
          meta: { breadcrumb: 'Base' }
        },
        {
          name: 'plugin',
          path: 'plugin/',
          component: PluginConfig,
          // redirect: _ => {
          //   return '/plugins'
          // },
          meta: { breadcrumb: 'Plugin' },
          children: [
            {
              name: 'plugin.cache',
              path: 'cache',
              component: PluginCache,
              meta: { breadcrumb: 'Cache' }
            }
          ]
        },
        {
          name: 'proxy',
          path: 'proxy/',
          component: PluginProxy,
          meta: { breadcrumb: 'Proxy' },
          children: [
            {
              name: 'proxy.clusters',
              path: 'clusters',
              component: Clusters,
              meta: { breadcrumb: 'Clusters' }
            },
            {
              name: 'proxy.cluster',
              path: 'clusters/:clusterID',
              component: Cluster,
              meta: { breadcrumb: 'Cluster' },
            },
            {
              name: 'proxy.instance',
              path: 'clusters/:clusterID/:instanceID',
              component: ClusterInstance,
              meta: { breadcrumb: 'Instance' }
            },
            {
              name: 'proxy.routings',
              path: 'routings',
              component: Routings,
              meta: { breadcrumb: 'Routings' }
            },
            {
              name: 'proxy.apis',
              path: 'apis',
              component: APIs,
              meta: { breadcrumb: 'APIs' }
            },
            {
              name: 'proxy.api.detail',
              path: 'apis/:apiID',
              component: APICfgDetail,
              meta: { breadcrumb: 'API' }
            },
          ]
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  let _ = from
  // console.log('router.beforeEach called', to, from)
  to.params.breadcrumbs = []
  to.matched.forEach(matched => {
    // console.log(matched)
    to.params.breadcrumbs.push({
      name: matched.meta.breadcrumb,
      to: matched.path
    })
  })
  next()
})

// router.afterEach((to, from) => {
//   console.log("router.afterEach called", to, from)
// })

export default router