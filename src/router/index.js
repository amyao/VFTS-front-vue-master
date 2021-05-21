import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import login from '@/components/log/login'
import fundList from '@/components/fund/fundList'
import fundInfo from '@/components/fund/fundInfo'
import myAccount from '@/components/account/myAccount'
import accountHome from '@/components/account/accountHome'
import selfListedFund from '@/components/account/selfListedFund'
import holdingFund from '@/components/account/holdingFund'
import accountInfo from '@/components/account/accountInfo'
import knowFundKnowledge from '@/components/info/knowFundKnowledge'
import homePage from '@/components/info/homePage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      /* 主页 */
      path: '/',
      component: Home,
      children: [
        {
          /* 首页 */
          path: '/homePage',
          component: homePage,
          meta: {
            activeMenu: '/homePage',
            requireAuth: false
          }
        },
        {
          /* 登陆 */
          path: '/login',
          component: login,
          meta: {
            activeMenu: '/login',
            requireAuth: false
          }
        },
        {
          /* 基金净值 */
          path: '/fundList',
          component: fundList,
          meta: {
            activeMenu: '/fundList',
            requireAuth: false
          }
        },
        {
          /* 基金档案 */
          path: '/fundList/fundInfo',
          component: fundInfo,
          meta: {
            activeMenu: '/fundList',
            requireAuth: false
          }
        },
        {
          /* 我的账户 */
          path: '/myAccount',
          component: myAccount,
          meta: {
            activeMenu: '/myAccount',
            requireAuth: true
          },
          children: [
            {
              /* 我的主页 */
              path: '/myAccount/accountHome',
              component: accountHome,
              meta: {
                activeMenu: '/myAccount',
                requireAuth: true
              }
            },
            {
              /* 自选基金 */
              path: '/myAccount/selfListedFund',
              component: selfListedFund,
              meta: {
                activeMenu: '/myAccount',
                requireAuth: true
              }
            },
            {
              path: '/myAccount/selfListedFund/fundInfo',
              component: fundInfo,
              meta: {
                activeMenu: '/myAccount',
                requireAuth: true
              }
            },
            {
              /* 持有基金 */
              path: '/myAccount/holdingFund',
              component: holdingFund,
              meta: {
                activeMenu: '/myAccount',
                requireAuth: true
              }
            },
            {
              path: '/myAccount/holdingFund/fundInfo',
              component: fundInfo,
              meta: {
                activeMenu: '/myAccount',
                requireAuth: true
              }
            },
            {
              /* 账户信息 */
              path: '/myAccount/accountInfo',
              component: accountInfo,
              meta: {
                activeMenu: '/myAccount',
                requireAuth: true
              }
            }
          ]
        },
        {
          /* 了解基金 */
          path: '/knowFundKnowledge',
          component: knowFundKnowledge,
          meta: {
            activeMenu: '/knowFundKnowledge',
            requireAuth: false
          }
        }
      ]
    }
  ]
})
