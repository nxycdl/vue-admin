<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.name" placeholder="项目名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="getUsers">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleAdd">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange"
                  style="width: 100%;">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column type="index" width="60">
            </el-table-column>
            <el-table-column prop="projectname" label="项目名称" width="120">

            </el-table-column>
            <el-table-column prop="content" label="建设内容" width="120"></el-table-column>
            <el-table-column prop="startdate" label="实施时间" width="120"></el-table-column>
            <el-table-column prop="unit" label="施工单位" width="120"></el-table-column>
            <el-table-column prop="manager" label="负责人" width="120"></el-table-column>
            <el-table-column prop="tel" label="联系电话" width="140"></el-table-column>
            <el-table-column prop="mount" label="投资金额" width="120"></el-table-column>
            <el-table-column prop="desginmap" label="设计图纸" width="120">
                <template scope="scope">
                    <a href="http://pic.to8to.com/ask/day_130619/20130619_d350fb6f6532678df6fb5L7DK5LCK6eO.png" target="_blank"><i class="el-icon-document"></i></a>
                </template>
            </el-table-column>
            <el-table-column prop="buildmap" label="施工图纸" width="120">
                <template scope="scope">
                    <a href="http://pic.to8to.com/ask/day_130619/20130619_d350fb6f6532678df6fb5L7DK5LCK6eO.png" target="_blank"><i class="el-icon-message"></i></a>
                </template>
            </el-table-column>
            <el-table-column prop="report" label="验收报告" width="120">
                <template scope="scope">
                    <a href="http://pic.to8to.com/ask/day_130619/20130619_d350fb6f6532678df6fb5L7DK5LCK6eO.png" target="_blank"><i class="el-icon-picture"></i></a>
                </template>
            </el-table-column>
            <el-table-column prop="controlunit" label="监理单位" width="120"></el-table-column>
            <el-table-column prop="charge" label="负责人" width="120"></el-table-column>
            <el-table-column prop="chargete" label="联系电话" width="140"></el-table-column>
            <el-table-column prop="status" label="项目状态" width="120"></el-table-column>
            <el-table-column prop="process" label="项目进度" width="120"></el-table-column>
            <el-table-column label="操作" width="150">
                <template scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20"
                           :total="total" style="float:right;">
            </el-pagination>
        </el-col>

        <!--编辑界面-->
        <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
            <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="editForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio-group v-model="editForm.sex">
                        <el-radio class="radio" :label="1">男</el-radio>
                        <el-radio class="radio" :label="0">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="年龄">
                    <el-input-number v-model="editForm.age" :min="0" :max="200"></el-input-number>
                </el-form-item>
                <el-form-item label="生日">
                    <el-date-picker type="date" placeholder="选择日期" v-model="editForm.birth"></el-date-picker>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input type="textarea" v-model="editForm.addr"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
            </div>
        </el-dialog>

        <!--新增界面-->
        <el-dialog title="新增项目" v-model="addFormVisible" :close-on-click-modal="false">
            <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
                <el-form-item label="项目名称"prop="name"><el-input v-model="addForm.name" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="建设内容"prop="name"><el-input v-model="addForm.name" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="实施时间"prop="name"><el-input v-model="addForm.name" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="施工单位"prop="name"><el-input v-model="addForm.name" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="负责人" prop="name"><el-input v-model="addForm.name" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="联系电话"prop="name"><el-input v-model="addForm.name" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="投资金额"prop="name">
                    <el-input-number v-model="addForm.age" :min="0" :max="100"></el-input-number>
                </el-form-item>
                <el-form-item label="设计图纸"prop="name">
                    <el-col :span="6">
                    <el-upload
                            class="upload-demo"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :file-list="fileList">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                    </el-col>
                    <el-col :span="5">
                        <el-button type="info" size="small">高拍仪</el-button>
                    </el-col>
                </el-form-item>
                <el-form-item label="施工图纸"prop="name">
                    <el-col :span="6">
                    <el-upload
                            class="upload-demo"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :file-list="fileList">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                    </el-col>
                    <el-col :span="5">
                        <el-button type="info" size="small">高拍仪</el-button>
                    </el-col>
                </el-form-item>
                <el-form-item label="验收报告"prop="name">
                    <el-col :span="6">
                    <el-upload
                            class="upload-demo"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :file-list="fileList">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                    </el-col>
                    <el-col :span="5">
                    <el-button type="info" size="small">高拍仪</el-button>
                    </el-col>
                </el-form-item>
                <el-form-item label="监理单位"prop="name"><el-input v-model="addForm.name" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="负责人" prop="name"><el-input v-model="addForm.name" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="联系电话"prop="name"><el-input v-model="addForm.name" auto-complete="off"></el-input></el-form-item>
                <el-form-item label="项目状态"prop="name">
                    <el-select v-model="addForm.region" placeholder="请选择项目状态">
                        <el-option label="新建" value="shanghai"></el-option>
                        <el-option label="进行中" value="beijing"></el-option>
                        <el-option label="已完成" value="beijing"></el-option>
                        <el-option label="已验收" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="项目进度"prop="name">
                    <el-slider
                            v-model="value8"
                            show-input>
                    </el-slider>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="addFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
    import util from '../../common/js/util'
    //import NProgress from 'nprogress'
    import {getUserListPage, removeUser, batchRemoveUser, editUser, addUser} from '../../api/api';
    import pageList from '../../mock/data/projectData.json';
    export default {
        data() {
            return {
                filters: {
                    name: ''
                },
                users: [],
                total: 0,
                page: 1,
                listLoading: false,
                sels: [],//列表选中列

                editFormVisible: false,//编辑界面是否显示
                editLoading: false,
                editFormRules: {
                    name: [
                        {required: true, message: '请输入姓名', trigger: 'blur'}
                    ]
                },
                //编辑界面数据
                editForm: {
                    id: 0,
                    name: '',
                    sex: -1,
                    age: 0,
                    birth: '',
                    addr: ''
                },

                addFormVisible: false,//新增界面是否显示
                addLoading: false,
                addFormRules: {
                    name: [
                        {required: true, message: '请输入姓名', trigger: 'blur'}
                    ]
                },
                //新增界面数据
                addForm: {
                    name: '',
                    sex: -1,
                    age: 0,
                    birth: '',
                    addr: ''
                },
                value8:0,
                fileList:[]

            }
        },
        methods: {
            //性别显示转换
            formatSex: function (row, column) {
                return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
            },
            handleCurrentChange(val) {
                this.page = val;
                this.getUsers();
            },
            //获取用户列表
            getUsers() {
                let para = {
                    page: this.page,
                    name: this.filters.name
                };
                this.listLoading = true;
                //NProgress.start();
                /*getUserListPage(para).then((res) => {
                 this.total = res.data.total;
                 this.users = res.data.users;
                 this.listLoading = false;
                 //NProgress.done();
                 });*/
                setTimeout(() => {
                    this.total = pageList.length;
                    this.users = pageList;
                    this.listLoading = false;
                    if (this.filters.name){
                        this.users =this.users.filter((item) => {
                            return item.name == this.filters.name;
                        });
                    }
                }, 2000);
            },
            //删除
            handleDel: function (index, row) {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    //NProgress.start();
                    let para = {id: row.id};
                    removeUser(para).then((res) => {
                        this.listLoading = false;
                        //NProgress.done();
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getUsers();
                    });
                }).catch(() => {

                });
            },
            //显示编辑界面
            handleEdit: function (index, row) {
                this.editFormVisible = true;
                this.editForm = Object.assign({}, row);
            },
            //显示新增界面
            handleAdd: function () {
                this.addFormVisible = true;
                this.addForm = {
                    name: '',
                    sex: -1,
                    age: 0,
                    birth: '',
                    addr: ''
                };
            },
            //编辑
            editSubmit: function () {
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.editLoading = true;
                            //NProgress.start();
                            let para = Object.assign({}, this.editForm);
                            para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
                            editUser(para).then((res) => {
                                this.editLoading = false;
                                //NProgress.done();
                                this.$message({
                                    message: '提交成功',
                                    type: 'success'
                                });
                                this.$refs['editForm'].resetFields();
                                this.editFormVisible = false;
                                this.getUsers();
                            });
                        });
                    }
                });
            },
            //新增
            addSubmit: function () {
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.addLoading = true;
                            //NProgress.start();
                            let para = Object.assign({}, this.addForm);
                            para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
                            addUser(para).then((res) => {
                                this.addLoading = false;
                                //NProgress.done();
                                this.$message({
                                    message: '提交成功',
                                    type: 'success'
                                });
                                this.$refs['addForm'].resetFields();
                                this.addFormVisible = false;
                                this.getUsers();
                            });
                        });
                    }
                });
            },
            selsChange: function (sels) {
                this.sels = sels;
            },
            //批量删除
            batchRemove: function () {
                var ids = this.sels.map(item => item.id).toString();
                this.$confirm('确认删除选中记录吗？', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    //NProgress.start();
                    let para = {ids: ids};
                    batchRemoveUser(para).then((res) => {
                        this.listLoading = false;
                        //NProgress.done();
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getUsers();
                    });
                }).catch(() => {

                });
            },
            handlePreview() {

            },
            handleRemove(){}
        },
        created () {
            this.getUsers();
        }
    }

</script>

<style scoped>

</style>