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
                    <el-button type="primary" v-on:click="getUsers">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleAdd">发布新文件</el-button>
                </el-form-item>

                <el-dialog title="发布新文件" v-model="addFormVisible" :close-on-click-modal="false">
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
        <el-table :data="list" highlight-current-row v-loading="listLoading" @selection-change="selsChange"
                  style="width: 100%;">
            <el-table-column type="selection" width="40">
            </el-table-column>
            <el-table-column type="index" width="55">
            </el-table-column>
            <el-table-column prop="nd" label="年度" width="80" sortable></el-table-column>
            <el-table-column prop="djrq" label="登记日期" width="120" sortable>
            </el-table-column>
            <el-table-column prop="dabh" label="档案编号" min-width="120" sortable>
            </el-table-column>
            <el-table-column prop="dazh" label="档案字号" min-width="120" sortable>
            </el-table-column>
            <el-table-column prop="damc" label="档案名称" min-width="120" sortable>
            </el-table-column>
            <el-table-column prop="dalb" label="档案类别" width="120" sortable>
            </el-table-column>
            <el-table-column prop="bmdj" label="保密等级" width="100" sortable>
            </el-table-column>
            <el-table-column prop="fs" label="份数" width="80">
            </el-table-column>
            <el-table-column prop="ys" label="页数" width="80">
            </el-table-column>
            <el-table-column label="下载" width="80">
                <template scope="scope">
                    <el-button size="small" @click="down(scope.$index, scope.row)">下载</el-button>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="150">
                <template scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <!--<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>-->
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10"
                           :total="total" style="float:right;">
            </el-pagination>
        </el-col>
        <!--发布新文件-->
        <el-dialog title="发布新文件" v-model="addFormVisible" :close-on-click-modal="false" top="0">
            <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
                <el-form-item label="档案编号">
                    <el-input v-model="addForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="档案字号">
                    <el-input v-model="addForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="档案名称">
                    <el-input v-model="addForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="档案分类">
                    <el-radio class="radio" v-model="dafl" label="1">行政资料</el-radio>
                    <el-radio class="radio" v-model="dafl" label="2">合同档案</el-radio>
                    <el-radio class="radio" v-model="dafl" label="3">人事档案</el-radio>
                    <el-radio class="radio" v-model="dafl" label="4">会议记录</el-radio>
                    <el-radio class="radio" v-model="dafl" label="5">报表文件</el-radio>
                </el-form-item>
                <el-form-item label="档案类别">
                    <el-radio class="radio" v-model="dalb" label="1">干部</el-radio>
                    <el-radio class="radio" v-model="dalb" label="2">人事档案</el-radio>
                </el-form-item>
                <el-form-item label="密级">
                    <el-radio class="radio" v-model="dalb" label="1">普通</el-radio>
                    <el-radio class="radio" v-model="dalb" label="2">秘密</el-radio>
                    <el-radio class="radio" v-model="dalb" label="3">机密</el-radio>
                    <el-radio class="radio" v-model="dalb" label="4">绝密</el-radio>
                </el-form-item>
                <el-form-item label="份数">
                    <el-input v-model="number" placeholder="请输入内容" type="number"></el-input>
                </el-form-item>
                <el-form-item label="页数">
                    <el-input v-model="pageNum" placeholder="请输入内容" type="number"></el-input>
                </el-form-item>
                <el-form-item label="负责人">
                    <el-select v-model="formInline.region" placeholder="负责人">
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

                <el-form-item label="上传文件">
                    <el-upload
                            class="upload-demo"
                            drag
                            action="https://jsonplaceholder.typicode.com/posts/"
                            multiple>
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        <div class="el-upload__tip" slot="tip">文件不超过500M</div>
                    </el-upload>
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
    import officeList from '../../mock/data/officeList.json';
    export default {
        data() {
            return {
                filters: {
                    name: ''
                },
                addFormVisible: false,
                addForm: {},
                pickerOptions0: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },
                addFormRules: {
                    name: [
                        {required: true, message: '请输入姓名', trigger: 'blur'}
                    ]
                },
                addLoading: false,
                value1: '',
                caption: '请选择',
                dalb: '1',
                dafl: '1',
                number: 0,
                pageNum: 0,
                formInline: {
                    user: '',
                    region: ''
                },
                list: [],
                listLoading: false,
                total: 0,
                sels: [],//列表选中列
            }
        },
        methods: {
            onselect(id) {
                console.log(id);
                this.caption = '111';
            },
            getUsers(){
                this.query()
            },
            handleAdd() {
                this.addFormVisible = true;
                this.addForm = {
                    name: '',
                    sex: -1,
                    age: 0,
                    birth: '',
                    addr: ''
                };
            },
            selsChange(sels) {
                this.sels = sels;
            },
            handleEdit(index, row){
                console.log('handleEdit');
            },
            handleDel(index, row){
                console.log('handleDel');
            },
            query(){
                console.log('query');
                this.listLoading = true;
                setTimeout(() => {
                    this.total = 20;
                    this.list = officeList;
                    this.listLoading = false;
                }, 1000)
            },
            handleCurrentChange(){
                this.query();
            },
            down(index,row){
                console.log(index,row)
                window.open('http://note.youdao.com/noteshare?id=2f5a61ef47704b2237932e7b60e27c04','_blank');
            }
        },
        created() {
            console.log('create')
            this.query();
        }
    };
</script>

<style>
</style>
