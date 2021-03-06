
import Vue from 'vue'
import Router from 'vue-router'
import Indexs from '../components/page/indexs.vue'
import Logins from '../components/page/Logins.vue'
import Mains from '../components/page/Mains.vue'
import Index from '../components/page/index.vue'
import Login from '../components/page/Login.vue'
import Workshop from '../components/HR/Workshop.vue'
import Department from '../components/HR/Department.vue'
import Group from '../components/HR/Group.vue'
import Classes from '../components/HR/Classes.vue'
import Person from '../components/HR/Person.vue'
import Role from '../components/HR/Role.vue'
import Duty from '../components/HR/Duty.vue'

import Home from '../components/common/Home.vue'

import Product from '../components/MDM/Product_bom.vue'
import Products from '../components/MDM/Product_data.vue'
import Path from '../components/MDM/Path.vue'
import Worktype from '../components/MDM/Worktype.vue'
import Deploy from '../components/MDM/Deploy.vue'
import Check from '../components/MDM/Check.vue'
import Assembly from '../components/MDM/Assembly.vue'
import Work from '../components/MDM/Work.vue'
import Attribute from '../components/MDM/Attribute.vue'

import PlanTo from '../components/Plan/PlanTo.vue'
import Planlook from '../components/Plan/Planlook.vue'
import Equnplan from '../components/Plan/Equnplan.vue'
import Equncheck from '../components/Plan/Equncheck.vue'

import Machine from '../components/Equn/Machine.vue'
import MachineCheck from '../components/Equn/MachineCheck.vue'
import MachineUnkeep from '../components/Equn/MachineUnkeep.vue'
import Spare from '../components/Equn/Spare.vue'
import MachineMeasure from '../components/Equn/MachineMeasure.vue'

import MeasureCheck from '../components/Measure/MeasureCheck.vue'

import Batchgenerat from '../components/PMS/Batchgenerat.vue'
import Taguser from '../components/PMS/Taguser.vue'
import Tagwarn from '../components/PMS/Tagwarn.vue'
import Cheak from '../components/PMS/Cheak.vue'

import Inhouse from '../components/PH/Inhouse.vue'
import Tocheck from '../components/PH/Tocheck.vue'
import Print from '../components/PH/Print.vue'
import Outku from '../components/PH/Outku.vue'
import Zprint from '../components/PH/Zprint.vue'

import Productpage from '../components/Workshop/Productpage.vue'
import Shift from '../components/Workshop/Shift.vue'
import Q from '../components/Workshop/Q.vue'
import Warehouse from '../components/Workshop/Warehouse.vue'
import Abnormal from '../components/Workshop/Abnormal.vue'
import MachineWX from '../components/Workshop/MachineWX.vue'
import Board from '../components/Workshop/Board.vue'

import Feedback from '../components/product/Feedback.vue'
import Selfcheck from '../components/product/Selfcheck.vue'
import Startws from '../components/product/Startws.vue'
import Works from '../components/product/Work.vue'
import Rework from '../components/product/Rework.vue'

import FactoryZJ from '../components/Q/FactoryZJ.vue'
import ZJ from '../components/Q/ZJ.vue'
import WorkZJ from '../components/Q/WorkZJ.vue'
import WorkCJ from '../components/Q/WorkCJ.vue'
import CJ from '../components/Q/CJ.vue'
import Checkout from '../components/Q/Checkout.vue'
import Intensity from '../components/Q/Intensity.vue'
import Certificateprint from '../components/Q/Certificateprint.vue'
import Broken from '../components/Q/Broken.vue'
import Disqualificat from '../components/Q/Disqualificat.vue'
import FXdefinition from '../components/Q/FXdefinition.vue'
import Reworks from '../components/Q/Reworks.vue'
import DJprint from '../components/Q/DJprint.vue'
import Wzj from '../components/Q/Wzj.vue'
import Sustom from '../components/Q/Sustom.vue'

import Authority from '../components/deploy/Authority.vue'
import Pwd from '../components/deploy/Pwd.vue'

import Toolhouse from '../components/warehouse/Toolhouse.vue'
import ToolCheck from '../components/warehouse/ToolCheck.vue'
import Withapply from '../components/warehouse/Withapply.vue'
import Outkutool from '../components/warehouse/Outku.vue'
import Toolchange from '../components/warehouse/Toolchange.vue'
import Toolbfsq from '../components/warehouse/Toolbfsq.vue'
import Toolscrap from '../components/warehouse/Toolscrap.vue'
import Sparepart from '../components/warehouse/Sparepart.vue'
import Sparecheck from '../components/warehouse/Sparecheck.vue'
import Spareapply from '../components/warehouse/Spareapply.vue'
import Spareoutku from '../components/warehouse/Spareoutku.vue'
import Sparechange from '../components/warehouse/Sparechange.vue'
import Toolquery from '../components/warehouse/Toolquery.vue'
import Sparequery from '../components/warehouse/Sparequery.vue'

import Typewh from '../components/YC/Typewh.vue'
import Sponsor from '../components/YC/Sponsor.vue'
import Dispose from '../components/YC/dispose.vue'
import Border from '../components/YC/Border.vue'
import Record from '../components/YC/Record.vue'

import Gatherwarn from '../components/MachineWX/Gatherwarn.vue'
import Repairs from '../components/MachineWX/Repairs.vue'
import RepairFP from '../components/MachineWX/RepairFP.vue'
import WXprocess from '../components/MachineWX/WXprocess.vue'
import WXrecord from '../components/MachineWX/WXrecord.vue'
import Sparechanges from '../components/MachineWX/Sparechanges.vue'
import Lifetime from '../components/MachineWX/Lifetime.vue'
import KPI from '../components/MachineWX/KPI.vue'
Vue.use(Router)
const router = new Router({
  // mode: 'history',
  mode: 'hash',
  routes: [
    { path: '/', redirect: '/indexs' },
    {
      path: '/indexs',
      component: Indexs
    },
    {
      path: '/login',
      component: Login,
      meta: {title: '?????????????????????'}
    },
    {
      path: '/logins',
      component: Logins,
      meta: {title: '??????????????????'}
    },
    {
      path: '/index',
      component: Home,
      meta: { title: '??????' },
      children: [
        { path: '/index',
          component: Index,
          meta: { title: '??????' }
        },
        { path: '/workshop',
          component: Workshop,
          meta: { title: '??????' }
        },
        { path: '/department',
          component: Department,
          meta: { title: '??????' }
        },
        { path: '/group',
          component: Group,
          meta: { title: '??????' }
        },
        { path: '/classes',
          component: Classes,
          meta: { title: '??????' }
        },
        { path: '/person',
          component: Person,
          meta: { title: '??????' }
        },
        { path: '/role',
          component: Role,
          meta: { title: '??????' }
        },
        { path: '/duty',
          component: Duty,
          meta: { title: '??????' }
        },
        { path: '/product_bom',
          component: Product,
          meta: { title: '??????Bom' }
        },
        { path: '/product_data',
          component: Products,
          meta: { title: '????????????' }
        },
        { path: '/path',
          component: Path,
          meta: { title: '????????????' }
        },
        { path: '/worktype',
          component: Worktype,
          meta: { title: '??????' }
        },
        { path: '/attribute',
          component: Attribute,
          meta: { title: '??????????????????' }
        },
        { path: '/delopy',
          component: Deploy,
          meta: { title: '??????????????????' }
        },
        { path: '/check',
          component: Check,
          meta: { title: '????????????' }
        },
        { path: '/assembly',
          component: Assembly,
          meta: { title: '????????????' }
        },
        { path: '/work',
          component: Work,
          meta: { title: '????????????' }
        },
        { path: '/planto',
          component: PlanTo,
          meta: { title: '????????????' }
        },
        { path: '/planlook',
          component: Planlook,
          meta: { title: '????????????' }
        },
        { path: '/equnplan',
          component: Equnplan,
          meta: { title: '????????????' }
        },
        { path: '/equncheck',
          component: Equncheck,
          meta: { title: '??????????????????' }
        },
        { path: '/machine',
          component: Machine,
          meta: { title: '????????????' }
        },
        { path: '/mcheck',
          component: MachineCheck,
          meta: { title: '????????????' }
        },
        { path: '/munkeep',
          component: MachineUnkeep,
          meta: { title: '????????????' }
        },
        { path: '/spare',
          component: Spare,
          meta: { title: '????????????' }
        },
        { path: '/mmeasure',
          component: MachineMeasure,
          meta: { title: '????????????' }
        },
        { path: '/measureCheck',
          component: MeasureCheck,
          meta: { title: '??????????????????' }
        },
        { path: '/batchgenerat',
          component: Batchgenerat,
          meta: { title: '????????????' }
        },
        { path: '/taguser',
          component: Taguser,
          meta: { title: '????????????' }
        },
        { path: '/tagwarn',
          component: Tagwarn,
          meta: { title: '????????????' }
        },
        { path: '/cheak',
          component: Cheak,
          meta: { title: '????????????' }
        },
        { path: '/inhouse',
          component: Inhouse,
          meta: { title: '??????' }
        },
        { path: '/tocheck',
          component: Tocheck,
          meta: { title: '??????' }
        },
        { path: '/print',
          component: Print,
          meta: { title: '???????????????' }
        },
        { path: '/outku',
          component: Outku,
          meta: { title: '??????' }
        },
        { path: '/zprint',
          component: Zprint,
          meta: { title: '???????????????' }
        },
        { path: '/authority',
          component: Authority,
          meta: { title: '????????????' }
        },
        { path: '/pwd',
          component: Pwd,
          meta: { title: '????????????' }
        }
      ]
    },
    {
      path: '/mains',
      component: Mains,
      meta: { title: '????????????' }
    },
    { path: '/page',
      component: Productpage,
      meta: { title: '???????????????' },
      children: [
        {
          path: '/feedback',
          component: Feedback,
          meta: { title: '????????????' }
        },
        {
          path: '/selfcheck',
          component: Selfcheck,
          meta: { title: '????????????????????????' }
        },
        {
          path: '/startws',
          component: Startws,
          meta: { title: '????????????????????????' }
        },
        {
          path: '/works',
          component: Works,
          meta: { title: '????????????????????????' }
        },
        {
          path: '/rework',
          component: Rework,
          meta: { title: '??????????????????' }
        }
      ]
    },
    {
      path: '/shift',
      component: Shift,
      meta: { title: '?????????' }
    },
    {
      path: '/q',
      component: Q,
      meta: { title: '????????????' },
      children: [
        {
          path: '/factoryzj',
          component: FactoryZJ,
          meta: { title: '????????????' }
        },
        {
          path: '/zj',
          component: ZJ,
          meta: { title: '??????' }
        },
        {
          path: '/workzj',
          component: WorkZJ,
          meta: { title: '????????????' }
        },
        {
          path: '/workcj',
          component: WorkCJ,
          meta: { title: '????????????' }
        },
        {
          path: '/wzj',
          component: Wzj,
          meta: { title: '??????---??????' }
        },
        {
          path: '/cj',
          component: CJ,
          meta: { title: '??????' }
        },
        {
          path: '/checkout',
          component: Checkout,
          meta: { title: '??????' }
        },
        {
          path: '/intensity',
          component: Intensity,
          meta: { title: '?????????' }
        },
        {
          path: '/broken',
          component: Broken,
          meta: { title: '????????????' }
        },
        {
          path: '/certificateprint',
          component: Certificateprint,
          meta: { title: '???????????????' }
        },
        {
          path: '/disqualificat',
          component: Disqualificat,
          meta: { title: '???????????????' }
        },
        {
          path: '/fxdefinition',
          component: FXdefinition,
          meta: { title: '??????????????????' }
        },
        {
          path: '/sustom',
          component: Sustom,
          meta: { title: '?????????' }
        },
        {
          path: '/reworks',
          component: Reworks,
          meta: { title: '??????????????????' }
        },
        {
          path: '/djprint',
          component: DJprint,
          meta: { title: '?????????????????????' }
        }
      ]
    },
    {
      path: '/warehouse',
      component: Warehouse,
      meta: { title: '????????????' },
      children: [
        { path: '/toolhouse',
          component: Toolhouse,
          meta: { title: '????????????' }
        },
        { path: '/toolcheck',
          component: ToolCheck,
          meta: { title: '??????????????????' }
        },
        { path: '/withapply',
          component: Withapply,
          meta: { title: '??????????????????' }
        },
        { path: '/outkutool',
          component: Outkutool,
          meta: { title: '????????????' }
        },
        { path: '/toolquery',
          component: Toolquery,
          meta: { title: '?????????????????????' }
        },
        { path: '/toolchange',
          component: Toolchange,
          meta: { title: '????????????' }
        },
        { path: '/toolbfsq',
          component: Toolbfsq,
          meta: { title: '??????????????????' }
        },
        { path: '/toolscrap',
          component: Toolscrap,
          meta: { title: '??????????????????' }
        },
        { path: '/sparepart',
          component: Sparepart,
          meta: { title: '??????????????????' }
        },
        { path: '/sparecheck',
          component: Sparecheck,
          meta: { title: '????????????????????????' }
        },
        { path: '/spareapply',
          component: Spareapply,
          meta: { title: '??????????????????' }
        },
        { path: '/spareoutku',
          component: Spareoutku,
          meta: { title: '??????????????????' }
        },
        { path: '/sparequery',
          component: Sparequery,
          meta: { title: '???????????????????????????' }
        },
        { path: '/sparechange',
          component: Sparechange,
          meta: { title: '??????????????????' }
        }
      ]
    },
    { path: '/abnormal',
      component: Abnormal,
      meta: { title: '????????????' },
      children: [
        {
          path: '/typewh',
          component: Typewh,
          meta: { title: '????????????' }
        },
        {
          path: '/sponsor',
          component: Sponsor,
          meta: { title: '????????????' }
        },
        {
          path: '/dispose',
          component: Dispose,
          meta: { title: '????????????' }
        },
        {
          path: '/border',
          component: Border,
          meta: { title: '????????????' }
        },
        {
          path: '/record',
          component: Record,
          meta: { title: '????????????' }
        }
      ]
    },
    { path: '/machinewx',
      component: MachineWX,
      meta: { title: '??????????????????' },
      children: [
        {
          path: '/gatherwarn',
          component: Gatherwarn,
          meta: { title: '??????????????????' }
        },
        {
          path: '/repairs',
          component: Repairs,
          meta: { title: '????????????' }
        },
        {
          path: '/RepairFP',
          component: RepairFP,
          meta: { title: '????????????' }
        },
        {
          path: '/wxprocess',
          component: WXprocess,
          meta: { title: '????????????' }
        },
        {
          path: '/wxrecord',
          component: WXrecord,
          meta: { title: '????????????' }
        },
        {
          path: '/sparechanges',
          component: Sparechanges,
          meta: { title: '??????????????????' }
        },
        {
          path: '/lifetime',
          component: Lifetime,
          meta: { title: '????????????????????????' }
        },
        {
          path: '/kpi',
          component: KPI,
          meta: { title: '??????KPI????????????' }
        }
      ]
    },
    { path: '/board',
      component: Board,
      meta: { title: '????????????' },
      children: [
        {
          path: '/typewh',
          component: Typewh,
          meta: { title: '??????????????????' }
        },
        {
          path: '/sponsor',
          component: Sponsor,
          meta: { title: '????????????' }
        },
        {
          path: '/startws',
          component: Startws,
          meta: { title: '????????????????????????' }
        },
        {
          path: '/works',
          component: Works,
          meta: { title: '????????????????????????' }
        },
        {
          path: '/rework',
          component: Rework,
          meta: { title: '??????????????????' }
        }
      ]
    }
  ]
})
// ????????????????????????
// router.beforeEach((to, from, next) => {
//   // to ?????????????????????
//   // from ?????????????????????????????????
//   // next ??????????????????????????????
//   //     next()  ??????    next('/login')  ????????????

//   if (to.path === '/indexs') return next()
//   // ??????token
//   const tokenStr = window.sessionStorage.getItem('token')
//   if (!tokenStr) return next('/indexs')
//   next()
// })
export default router
