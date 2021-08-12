
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
      meta: {title: '办公室登录页面'}
    },
    {
      path: '/logins',
      component: Logins,
      meta: {title: '车间登录页面'}
    },
    {
      path: '/index',
      component: Home,
      meta: { title: '主页' },
      children: [
        { path: '/index',
          component: Index,
          meta: { title: '首页' }
        },
        { path: '/workshop',
          component: Workshop,
          meta: { title: '车间' }
        },
        { path: '/department',
          component: Department,
          meta: { title: '科室' }
        },
        { path: '/group',
          component: Group,
          meta: { title: '班组' }
        },
        { path: '/classes',
          component: Classes,
          meta: { title: '班次' }
        },
        { path: '/person',
          component: Person,
          meta: { title: '人员' }
        },
        { path: '/role',
          component: Role,
          meta: { title: '角色' }
        },
        { path: '/duty',
          component: Duty,
          meta: { title: '职责' }
        },
        { path: '/product_bom',
          component: Product,
          meta: { title: '产品Bom' }
        },
        { path: '/product_data',
          component: Products,
          meta: { title: '产品数据' }
        },
        { path: '/path',
          component: Path,
          meta: { title: '工艺路线' }
        },
        { path: '/worktype',
          component: Worktype,
          meta: { title: '工种' }
        },
        { path: '/attribute',
          component: Attribute,
          meta: { title: '生产资源属性' }
        },
        { path: '/delopy',
          component: Deploy,
          meta: { title: '生产资源配置' }
        },
        { path: '/check',
          component: Check,
          meta: { title: '工艺检验' }
        },
        { path: '/assembly',
          component: Assembly,
          meta: { title: '工艺装配' }
        },
        { path: '/work',
          component: Work,
          meta: { title: '工艺报工' }
        },
        { path: '/planto',
          component: PlanTo,
          meta: { title: '计划导入' }
        },
        { path: '/planlook',
          component: Planlook,
          meta: { title: '计划查看' }
        },
        { path: '/equnplan',
          component: Equnplan,
          meta: { title: '设备计划' }
        },
        { path: '/equncheck',
          component: Equncheck,
          meta: { title: '设备计划查看' }
        },
        { path: '/machine',
          component: Machine,
          meta: { title: '设备信息' }
        },
        { path: '/mcheck',
          component: MachineCheck,
          meta: { title: '设备点检' }
        },
        { path: '/munkeep',
          component: MachineUnkeep,
          meta: { title: '设备保养' }
        },
        { path: '/spare',
          component: Spare,
          meta: { title: '备品备件' }
        },
        { path: '/mmeasure',
          component: MachineMeasure,
          meta: { title: '设备量具' }
        },
        { path: '/measureCheck',
          component: MeasureCheck,
          meta: { title: '量具管理定检' }
        },
        { path: '/batchgenerat',
          component: Batchgenerat,
          meta: { title: '批次生成' }
        },
        { path: '/taguser',
          component: Taguser,
          meta: { title: '标签补打' }
        },
        { path: '/tagwarn',
          component: Tagwarn,
          meta: { title: '标签预警' }
        },
        { path: '/cheak',
          component: Cheak,
          meta: { title: '批次查询' }
        },
        { path: '/inhouse',
          component: Inhouse,
          meta: { title: '入库' }
        },
        { path: '/tocheck',
          component: Tocheck,
          meta: { title: '提检' }
        },
        { path: '/print',
          component: Print,
          meta: { title: '提检单打印' }
        },
        { path: '/outku',
          component: Outku,
          meta: { title: '出库' }
        },
        { path: '/zprint',
          component: Zprint,
          meta: { title: '转移单打印' }
        },
        { path: '/authority',
          component: Authority,
          meta: { title: '权限管理' }
        },
        { path: '/pwd',
          component: Pwd,
          meta: { title: '密码管理' }
        }
      ]
    },
    {
      path: '/mains',
      component: Mains,
      meta: { title: '车间主页' }
    },
    { path: '/page',
      component: Productpage,
      meta: { title: '生产执行页' },
      children: [
        {
          path: '/feedback',
          component: Feedback,
          meta: { title: '生产反馈' }
        },
        {
          path: '/selfcheck',
          component: Selfcheck,
          meta: { title: '报工里的自检界面' }
        },
        {
          path: '/startws',
          component: Startws,
          meta: { title: '报工里的开工界面' }
        },
        {
          path: '/works',
          component: Works,
          meta: { title: '报工里的报工界面' }
        },
        {
          path: '/rework',
          component: Rework,
          meta: { title: '返工返修确认' }
        }
      ]
    },
    {
      path: '/shift',
      component: Shift,
      meta: { title: '交接班' }
    },
    {
      path: '/q',
      component: Q,
      meta: { title: '质量管理' },
      children: [
        {
          path: '/factoryzj',
          component: FactoryZJ,
          meta: { title: '分厂专检' }
        },
        {
          path: '/zj',
          component: ZJ,
          meta: { title: '专检' }
        },
        {
          path: '/workzj',
          component: WorkZJ,
          meta: { title: '车间专检' }
        },
        {
          path: '/workcj',
          component: WorkCJ,
          meta: { title: '车间抽检' }
        },
        {
          path: '/wzj',
          component: Wzj,
          meta: { title: '车间---专检' }
        },
        {
          path: '/cj',
          component: CJ,
          meta: { title: '抽检' }
        },
        {
          path: '/checkout',
          component: Checkout,
          meta: { title: '检验' }
        },
        {
          path: '/intensity',
          component: Intensity,
          meta: { title: '密集度' }
        },
        {
          path: '/broken',
          component: Broken,
          meta: { title: '飞行破裂' }
        },
        {
          path: '/certificateprint',
          component: Certificateprint,
          meta: { title: '合格证打印' }
        },
        {
          path: '/disqualificat',
          component: Disqualificat,
          meta: { title: '不合格审理' }
        },
        {
          path: '/fxdefinition',
          component: FXdefinition,
          meta: { title: '返工返修定义' }
        },
        {
          path: '/sustom',
          component: Sustom,
          meta: { title: '自定义' }
        },
        {
          path: '/reworks',
          component: Reworks,
          meta: { title: '返工返修确认' }
        },
        {
          path: '/djprint',
          component: DJprint,
          meta: { title: '不合格单据打印' }
        }
      ]
    },
    {
      path: '/warehouse',
      component: Warehouse,
      meta: { title: '辅助库房' },
      children: [
        { path: '/toolhouse',
          component: Toolhouse,
          meta: { title: '工具入库' }
        },
        { path: '/toolcheck',
          component: ToolCheck,
          meta: { title: '工具库存查询' }
        },
        { path: '/withapply',
          component: Withapply,
          meta: { title: '工具领用申请' }
        },
        { path: '/outkutool',
          component: Outkutool,
          meta: { title: '工具出库' }
        },
        { path: '/toolquery',
          component: Toolquery,
          meta: { title: '工具出入库记录' }
        },
        { path: '/toolchange',
          component: Toolchange,
          meta: { title: '工具更换' }
        },
        { path: '/toolbfsq',
          component: Toolbfsq,
          meta: { title: '工具报废申请' }
        },
        { path: '/toolscrap',
          component: Toolscrap,
          meta: { title: '工具报废确认' }
        },
        { path: '/sparepart',
          component: Sparepart,
          meta: { title: '备品备件入库' }
        },
        { path: '/sparecheck',
          component: Sparecheck,
          meta: { title: '备品备件库存查询' }
        },
        { path: '/spareapply',
          component: Spareapply,
          meta: { title: '备品备件申请' }
        },
        { path: '/spareoutku',
          component: Spareoutku,
          meta: { title: '备品备件出库' }
        },
        { path: '/sparequery',
          component: Sparequery,
          meta: { title: '备品备件出入库记录' }
        },
        { path: '/sparechange',
          component: Sparechange,
          meta: { title: '备品备件更换' }
        }
      ]
    },
    { path: '/abnormal',
      component: Abnormal,
      meta: { title: '异常管理' },
      children: [
        {
          path: '/typewh',
          component: Typewh,
          meta: { title: '异常设定' }
        },
        {
          path: '/sponsor',
          component: Sponsor,
          meta: { title: '异常发起' }
        },
        {
          path: '/dispose',
          component: Dispose,
          meta: { title: '异常处理' }
        },
        {
          path: '/border',
          component: Border,
          meta: { title: '异常看板' }
        },
        {
          path: '/record',
          component: Record,
          meta: { title: '异常查询' }
        }
      ]
    },
    { path: '/machinewx',
      component: MachineWX,
      meta: { title: '设备维修管理' },
      children: [
        {
          path: '/gatherwarn',
          component: Gatherwarn,
          meta: { title: '设备采集预警' }
        },
        {
          path: '/repairs',
          component: Repairs,
          meta: { title: '设备报修' }
        },
        {
          path: '/RepairFP',
          component: RepairFP,
          meta: { title: '报修分配' }
        },
        {
          path: '/wxprocess',
          component: WXprocess,
          meta: { title: '维修处理' }
        },
        {
          path: '/wxrecord',
          component: WXrecord,
          meta: { title: '维修记录' }
        },
        {
          path: '/sparechanges',
          component: Sparechanges,
          meta: { title: '备品备件更换' }
        },
        {
          path: '/lifetime',
          component: Lifetime,
          meta: { title: '备品备件寿命分析' }
        },
        {
          path: '/kpi',
          component: KPI,
          meta: { title: '设备KPI指标管理' }
        }
      ]
    },
    { path: '/board',
      component: Board,
      meta: { title: '看板管理' },
      children: [
        {
          path: '/typewh',
          component: Typewh,
          meta: { title: '异常类型维护' }
        },
        {
          path: '/sponsor',
          component: Sponsor,
          meta: { title: '异常发起' }
        },
        {
          path: '/startws',
          component: Startws,
          meta: { title: '报工里的开工界面' }
        },
        {
          path: '/works',
          component: Works,
          meta: { title: '报工里的报工界面' }
        },
        {
          path: '/rework',
          component: Rework,
          meta: { title: '返工返修确认' }
        }
      ]
    }
  ]
})
// 挂载路由导航守卫
// router.beforeEach((to, from, next) => {
//   // to 将要访问的路径
//   // from 代表从哪个路径跳转而来
//   // next 是一个函数，表示放行
//   //     next()  放行    next('/login')  强制跳转

//   if (to.path === '/indexs') return next()
//   // 获取token
//   const tokenStr = window.sessionStorage.getItem('token')
//   if (!tokenStr) return next('/indexs')
//   next()
// })
export default router
