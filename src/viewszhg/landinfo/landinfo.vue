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
                            placeholder="请输入查询条件"
                            :picker-options="pickerOptions0">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="getList">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleAdd">录入林地信息</el-button>
                </el-form-item>

                <el-dialog title="新增林地资源" v-model="addFormVisible" :close-on-click-modal="false">
                    <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">

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
                        <el-form-item label="小地名">
                            <el-input v-model="addForm.name" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="海拔">
                            <el-input v-model="addForm.name" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="林地权属">
                            <el-input v-model="addForm.name" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="林地使用权">
                            <el-input v-model="addForm.name" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="林木权属">
                            <el-input v-model="addForm.name" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="林木使用权">
                            <el-input v-model="addForm.name" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="林权证号">
                            <el-input v-model="addForm.name" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="地类">
                            <el-input v-model="addForm.name" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="亚林种">
                            <el-input v-model="addForm.name" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="林龄">
                            <el-input v-model="addForm.name" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="起源">
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
                        <el-form-item label="郁闭度">
                            <el-input v-model="addForm.name" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="森林健康等级">
                            <el-input v-model="addForm.name" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="群落结构">
                            <el-input v-model="addForm.name" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="优势树种">
                            <el-input v-model="addForm.name" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="植被盖度">
                            <el-input v-model="addForm.name" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="每亩蓄积">
                            <el-input v-model="addForm.name" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="生态区位">
                            <el-input v-model="addForm.name" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="区位描述">
                            <el-input v-model="addForm.name" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="工程区">
                            <el-input v-model="addForm.name" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="荒漠化和沙化程度">
                            <el-input v-model="addForm.name" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="石漠化程序">
                            <el-input v-model="addForm.name" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="生态功能等级">
                            <el-input v-model="addForm.name" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="管护形式">
                            <el-input v-model="addForm.name" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="公里网格坐标">
                            <el-input v-model="addForm.name" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="补偿起始年度">
                            <el-select v-model="addForm.region" placeholder="补偿起始年度">
                                <el-option label="2001" value="2001"></el-option>
                                <el-option label="2002" value="2002"></el-option>
                                <el-option label="2003" value="2003"></el-option>
                                <el-option label="2004" value="2004"></el-option>
                                <el-option label="2005" value="2005"></el-option>
                                <el-option label="2006" value="2006"></el-option>
                                <el-option label="2007" value="2007"></el-option>
                                <el-option label="2008" value="2008"></el-option>
                                <el-option label="2009" value="2009"></el-option>
                                <el-option label="2010" value="2010"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item prop="uploadimg"   label="林地图片上传">
                            <el-upload
                                    class="upload-demo"
                                    drag
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    multiple>
                                <i class="el-icon-upload"></i>
                                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                            </el-upload>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click.native="addFormVisible = false">取消</el-button>
                        <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
                    </div>
                </el-dialog>
            </el-form>
        </el-col>
        <el-table :data="list" highlight-current-row v-loading="listLoading" @selection-change="selsChange"max-height="400" border
                  style="width: 100%;">
            <el-table-column type="selection" width="40"></el-table-column>
            <el-table-column prop="lbh"   label="林班号" fixed>
                <template scope="scope">
                    <a  href="https://mmc.mys.tech/" target="_blank">{{scope.row.lbh}}</a>
                </template>
            </el-table-column>
            <el-table-column prop="xbh"   label="小班号" fixed></el-table-column>
            <el-table-column prop="cmz"   label="村民组"></el-table-column>
            <el-table-column prop="gljb"   label="管理级别"></el-table-column>
            <el-table-column prop="qszmc"   label="权属者名称" fixed></el-table-column>
            <el-table-column prop="dwxz"   label="单位性质"></el-table-column>
            <el-table-column prop="bhdj"   label="保护等级"></el-table-column>
            <el-table-column prop="xdm"   label="小地名"></el-table-column>
            <el-table-column prop="hb"   label="海拔"></el-table-column>
            <el-table-column prop="ldqs"   label="林地权属"></el-table-column>
            <el-table-column prop="ldsyq"   label="林地使用权"></el-table-column>
            <el-table-column prop="lmqs"   label="林木权属"></el-table-column>
            <el-table-column prop="lmsyq"   label="林木使用权"></el-table-column>
            <el-table-column prop="lqzh"   label="林权证号"></el-table-column>
            <el-table-column prop="dl"   label="地类"></el-table-column>
            <el-table-column prop="ylz"   label="亚林种"></el-table-column>
            <el-table-column prop="ll"   label="林龄"></el-table-column>
            <el-table-column prop="qy"   label="起源"></el-table-column>
            <el-table-column prop="szzc"   label="树种组成"></el-table-column>
            <el-table-column prop="pjsg"   label="平均树高"></el-table-column>
            <el-table-column prop="lz"   label="龄组"></el-table-column>
            <el-table-column prop="pjxj"   label="平均胸径"></el-table-column>
            <el-table-column prop="ybd"   label="郁闭度"></el-table-column>
            <el-table-column prop="sljkdj"   label="森林健康等级"></el-table-column>
            <el-table-column prop="qljg"   label="群落结构"></el-table-column>
            <el-table-column prop="yssz"   label="优势树种"></el-table-column>
            <el-table-column prop="zbgd"   label="植被盖度"></el-table-column>
            <el-table-column prop="mmxj"   label="每亩蓄积"></el-table-column>
            <el-table-column prop="stqw"   label="生态区位"></el-table-column>
            <el-table-column prop="qwms"   label="区位描述"></el-table-column>
            <el-table-column prop="gcq"   label="工程区"></el-table-column>
            <el-table-column prop="hmhhshcd"   label="荒漠化和沙化程度"></el-table-column>
            <el-table-column prop="smhcx"   label="石漠化程序"></el-table-column>
            <el-table-column prop="stgndj"   label="生态功能等级"></el-table-column>
            <el-table-column prop="ghxs"   label="管护形式"></el-table-column>
            <el-table-column prop="glwgzb"   label="公里网格坐标"></el-table-column>
            <el-table-column prop="bcqsnd"   label="补偿起始年度"></el-table-column>

            <el-table-column>
            <template scope="scope">
                    <!--<el-button type="success" size="small" @click="handleEdit(scope.$index, scope.row)">置顶</el-button>-->
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                    <el-button type="danger" size="small" @click="shwomap(scope.$index, scope.row)">查看地图</el-button>
                    <el-button size="small" >更多操作</el-button>
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
            shwomap(index,row) {
                console.log(index,row);
                window.open('https://mmc.mys.tech/');

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
    .aclass{

    }
</style>
