import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Table from './views/nav1/Table.vue'
import Form from './views/nav1/Form.vue'
import user from './views/nav1/user.vue'
import Page4 from './views/nav2/Page4.vue'
import Page5 from './views/nav2/Page5.vue'
import Page6 from './views/nav3/Page6.vue'
import echarts from './views/charts/echarts.vue'

import employeeList from './viewszhg/employee/employeeList.vue';
import defaultpage from './viewszhg/defaultpage.vue';
import officeList from './viewszhg/office/officeList.vue';
import newsList from './viewszhg/office/newsList.vue';
import publicMetting from './viewszhg/office/publicMetting.vue';

import projectList from './viewszhg/project/projectList.vue'

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '导航一',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            {path: '/main', component: Main, name: '主页', hidden: true},
            {path: '/table', component: Table, name: 'Table'},
            {path: '/form', component: Form, name: 'Form'},
            {path: '/employee', component: user, name: '列表'},
        ]
    },
    {
        path: '/',
        component: Home,
        name: '导航二',
        iconCls: 'fa fa-id-card-o',
        children: [
            {path: '/page4', component: Page4, name: '页面4'},
            {path: '/page5', component: Page5, name: '页面5'}
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            {path: '/page6', component: Page6, name: '导航三'}
        ]
    },
    {
        path: '/',
        component: Home,
        name: 'Charts',
        iconCls: 'fa fa-bar-chart',
        children: [
            {path: '/echarts', component: echarts, name: 'echarts'}
        ]
    },

    {
        path: '/',
        component: Home,
        name: '林地信息管理',
        iconCls: 'fa fa-tree',
        children: [
            {path: '/defaultpage', component: defaultpage, name: '林地信息'},
            {path: '/defaultpage', component: defaultpage, name: '林地监测'},
            {path: '/defaultpage', component: defaultpage, name: '林地补偿金'},
            {path: '/defaultpage', component: defaultpage, name: '林地统计'},
        ]
    },
    {
        path: '/',
        component: Home,
        name: '人员信息管理',
        iconCls: 'fa fa-user-o',
        children: [
            {path: '/employeeList', component: employeeList, name: '员工列表'},
            {path: '/employeeList', component: employeeList, name: '工资管理'},
            {path: '/employeeList', component: employeeList, name: '人员考核审核管理'},
            {path: '/employeeList', component: employeeList, name: '人员培训管理'},
        ]
    },
    {
        path: '/',
        component: Home,
        name: '项目信息管理',
        iconCls: 'fa fa-deaf',
        children: [
            {path: '/projectList', component: projectList, name: '项目信息'},
            {path: '/employeeList', component: employeeList, name: '项目实施'}
        ]
    },
    {
        path: '/',
        component: Home,
        name: '办公文件管理',
        iconCls: 'fa fa-cubes',
        children: [
            {path: '/officeList', component: officeList, name: '基础信息'},
            {path: '/newsList', component: newsList, name: '林场新闻'},
            {path: '/publicMetting', component: publicMetting, name: '发布会议'},
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: {path: '/404'}
    }
];

export default routes;