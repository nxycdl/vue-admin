<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-dropdown>
                    <el-button type="primary">
                        {{caption}}<i class="el-icon-caret-bottom el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item selected @click="onselect(0)">按文件名查询</el-dropdown-item>
                        <el-dropdown-item>按发布人查询</el-dropdown-item>
                        <el-dropdown-item>按文件类型查询</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <el-form-item>
                    <el-date-picker
                            v-model="value1"
                            type="date"
                            placeholder="请选择会议开始日期"
                            :picker-options="pickerOptions0">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="getMettingList">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleAdd">发布新会议信息</el-button>
                </el-form-item>

                <el-dialog title="发布会议信息" v-model="addFormVisible" :close-on-click-modal="false">
                    <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
                        <el-form-item label="姓名" prop="name">
                            <el-input v-model="addForm.name" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="性别">
                            <el-radio-group v-model="addForm.sex">
                                <el-radio class="radio" :label="1">男</el-radio>
                                <el-radio class="radio" :label="0">女</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="年龄">
                            <el-input-number v-model="addForm.age" :min="0" :max="200"></el-input-number>
                        </el-form-item>
                        <el-form-item label="生日">
                            <el-date-picker type="date" placeholder="选择日期" v-model="addForm.birth"></el-date-picker>
                        </el-form-item>
                        <el-form-item label="地址">
                            <el-input type="textarea" v-model="addForm.addr"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click.native="addFormVisible = false">取消</el-button>
                        <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
                    </div>
                </el-dialog>
            </el-form>
        </el-col>
        <el-table :data="mettingList" highlight-current-row v-loading="listLoading" @selection-change="selsChange"
                  style="width: 100%;">
            <el-table-column type="selection" width="40">
            </el-table-column>
            <el-table-column type="index" width="55">
            </el-table-column>
            <el-table-column prop="title" label="会议内容" width="200" sortable></el-table-column>
            <el-table-column prop="startdate" label="会议开始日期" min-width="120" sortable>
            </el-table-column>
            <el-table-column prop="mettingUser" label="参会人员" width="120" sortable>
            </el-table-column>
            <el-table-column prop="publicUser" label="发布人员" min-width="120" sortable>
            </el-table-column>
            <el-table-column prop="publicdate" label="发布时间" min-width="120" sortable>
            </el-table-column>
            <el-table-column label="操作" width="200">
                <template scope="scope">
                    <el-button type="success" size="small" @click="handleEdit(scope.$index, scope.row)">置顶</el-button>
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--发布新文件-->
        <el-dialog title="发布新会议" v-model="addFormVisible" :close-on-click-modal="false">
            <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
                <el-form-item label="会议标题">
                    <el-input v-model="addForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="会议开始时间">
                    <el-date-picker
                            v-model="startdate"
                            type="date"
                            placeholder="选择日期"
                            :picker-options="pickerOptions0">
                    </el-date-picker>
                </el-form-item>

                <el-form-item label="参会人员">
                    <el-select v-model="formInline.region" placeholder="参会人员" multiple-limit="99" multiple="true"
                               size="large">
                        <el-option label="刘备" value="1"></el-option>
                        <el-option label="关羽" value="2"></el-option>
                        <el-option label="张飞" value="3"></el-option>
                        <el-option label="赵云" value="4"></el-option>
                        <el-option label="马超" value="5"></el-option>
                        <el-option label="黄忠" value="6"></el-option>
                        <el-option label="诸葛亮" value="7"></el-option>
                        <el-option label="姜维" value="8"></el-option>
                        <el-option label="魏延" value="9"></el-option>
                        <el-option label="月英" value="10"></el-option>
                        <el-option label="庞统" value="11"></el-option>
                    </el-select>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="addFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="addSubmit" :loading="addLoading">立即发布</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
    import mettingDataList from '../../mock/data/mettingList.json';
    export default {
        data() {
            return {
                filters: {
                    name: ''
                },
                addFormVisible: false,
                caption: '请选择',
                pickerOptions0: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },
                value1: '',
                addFormVisible: false,
                addForm: {},
                addFormRules: {
                    name: [
                        {required: true, message: '请输入姓名', trigger: 'blur'}
                    ]
                },
                addLoading: false,
                mettingList: [],
                total: 0,
                listLoading: false,
                sels: [],
                formInline: {
                    user: '',
                    region: ''
                },
                startdate: "",
            }
        },
        methods: {
            getMettingList(){
                this.listLoading = true;
                setTimeout(() => {
                    this.listLoading = false;
                    this.total = mettingDataList.length;
                    this.mettingList = mettingDataList;
                }, 2000)
            },
            handleAdd(){
                this.addFormVisible = true;
                this.addForm = {
                    name: '',
                    sex: -1,
                    age: 0,
                    birth: '',
                    addr: ''
                };
            },
            handleEdit(){
            },
            handleDek(){
            },
            selsChange(sels) {
                this.sels = sels;
            },
        },
        created() {
            this.getMettingList();
        }
    };
</script>

<style>
</style>
