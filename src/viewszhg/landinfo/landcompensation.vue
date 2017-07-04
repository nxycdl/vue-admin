<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">

                <el-form-item>
                    <el-button type="primary" v-on:click="getList">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleAdd">重点林区采集</el-button>
                </el-form-item>

                <el-dialog title="重点林地资源" v-model="addFormVisible" :close-on-click-modal="false">
                    <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
                        <el-form-item label="小地名">
                            <el-input v-model="addForm.name" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="林班号">
                            <el-input v-model="addForm.name" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="小班号">
                            <el-input v-model="addForm.name" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="村民组">
                            <el-input v-model="addForm.name" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="管理级别">
                            <el-select v-model="addForm.region" placeholder="请选择管理级别">
                                <el-option label="特级" value="shanghai"></el-option>
                                <el-option label="普通" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="权属者名称">
                            <el-input v-model="addForm.name" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="单位性质">
                            <el-select v-model="addForm.dwxz" placeholder="请选择单位性质">
                                <el-option label="企业" value="shanghai"></el-option>
                                <el-option label="事业单位" value="beijing"></el-option>
                                <el-option label="国家行政机关" value="xzjg"></el-option>
                                <el-option label="政府" value="zf"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="保护等级">
                            <el-select v-model="addForm.region" placeholder="请选择保护等级">
                                <el-option label="特级" value="shanghai"></el-option>
                                <el-option label="普通" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>


                        <el-form-item label="林种">
                            <el-input v-model="addForm.name" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="林龄">
                            <el-input v-model="addForm.name" auto-complete="off"></el-input>
                        </el-form-item>

                        <el-form-item label="树种组成">
                            <el-input v-model="addForm.name" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="平均树高">
                            <el-input v-model="addForm.name" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="龄组">
                            <el-input v-model="addForm.name" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="平均胸径">
                            <el-input v-model="addForm.name" auto-complete="off"></el-input>
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
            <el-table-column type="selection" width="40"></el-table-column>
            <el-table-column prop="xdm"   label="小地名"></el-table-column>
            <el-table-column prop="lbh"   label="林班号"></el-table-column>
            <el-table-column prop="xbh"   label="小班号"></el-table-column>
            <el-table-column prop="cmz"   label="村民组"></el-table-column>
            <el-table-column prop="gljb"   label="管理级别"></el-table-column>
            <el-table-column prop="qszmc"   label="权属者名称"></el-table-column>
            <el-table-column prop="dwxz"   label="单位性质"></el-table-column>
            <el-table-column prop="bhdj"   label="保护等级"></el-table-column>

            <el-table-column prop="ylz"   label="林种"></el-table-column>
            <el-table-column prop="ll"   label="林龄"></el-table-column>
            <el-table-column prop="szzc"   label="树种组成"></el-table-column>
            <el-table-column prop="pjsg"   label="平均树高"></el-table-column>
            <el-table-column prop="lz"   label="龄组"></el-table-column>
            <el-table-column prop="pjxj"   label="平均胸径"></el-table-column>

            <el-table-column>
                <template scope="scope">
                    <!--<el-button type="success" size="small" @click="handleEdit(scope.$index, scope.row)">置顶</el-button>-->
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </section>
</template>

<script>
    import newsDataList from '../../mock/data/landinfo.json';
    import {quillEditor} from 'vue-quill-editor'
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
                list: [],
                total: 0,
                listLoading: false,
                sels: [],
                formInline: {
                    user: '',
                    region: ''
                },
                startdate: "",
                content: "",
                editorOption: {
                    placeholder: "请输入您的内容",
                    modules: {
                        toolbar: [
                            [{'size': ['small', false, 'large']}],
                            ['bold', 'italic'],
                            [{'list': 'ordered'}, {'list': 'bullet'}],
                            ['link', 'image']
                        ],
                        history: {
                            delay: 1000,
                            maxStack: 50,
                            userOnly: false
                        }
                    }
                }
            }
        },
        methods: {
            getList(){
                this.listLoading = true;
                setTimeout(() => {
                    this.listLoading = false;
                    this.total = newsDataList.length;
                    this.list = newsDataList;
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
            onEditorBlur(editor) {
                console.log('editor blur!', editor)
            },
            onEditorFocus(editor) {
                console.log('editor focus!', editor)
            },
            onEditorReady(editor) {
                console.log('editor ready!', editor)
            },
            contentFormat(row,column) {
                var data = row[column.property];
                console.log(data);
                return data.substr(1,20) + '...'
            }
        },
        created() {
            this.getList();
        },
        components: {
            quillEditor
        },
        computed: {
            editor() {
                return this.$refs.myTextEditor.quillEditor
            }
        },
    };
</script>

<style>
</style>
