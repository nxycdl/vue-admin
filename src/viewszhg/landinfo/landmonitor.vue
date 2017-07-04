<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">

                <el-form-item>
                    <el-button type="primary" v-on:click="getList">查询</el-button>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary">新增监测点</el-button>
                </el-form-item>

            </el-form>
        </el-col>
        <el-table :data="list" highlight-current-row v-loading="listLoading" @selection-change="selsChange"
                  style="width: 100%;">
            <el-table-column prop="xdm" label="小地名"></el-table-column>
            <el-table-column prop="nhsyx" label="耐旱适应性"></el-table-column>
            <el-table-column prop="gsyx" label="光适应性 "></el-table-column>
            <el-table-column prop="gaisyx" label="钙适应性"></el-table-column>
            <el-table-column prop="lgjl" label="林冠截留"></el-table-column>
            <el-table-column prop="klcjl" label="枯落层截留"></el-table-column>
            <el-table-column prop="trcjl" label="土壤层截留"></el-table-column>
            <el-table-column prop="kcx" label="抗冲性"></el-table-column>
            <el-table-column prop="kfx" label="抗蚀性"></el-table-column>
            <el-table-column prop="klx" label="抗拉性"></el-table-column>
            <el-table-column prop="dyxzs" label="多样性指数"></el-table-column>
            <el-table-column prop="pd" label="频度"></el-table-column>
            <el-table-column prop="zyx" label="重要值 "></el-table-column>
            <el-table-column>
                <template scope="scope">
                    <!--<el-button type="success" size="small" @click="handleEdit(scope.$index, scope.row)">置顶</el-button>-->
                   <!-- <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>-->
                </template>
            </el-table-column>
        </el-table>
    </section>
</template>

<script>
    import newsDataList from '../../mock/data/landmonitor.json';
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
