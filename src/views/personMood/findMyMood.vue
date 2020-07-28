<template>
  <div class="app-container">

    <el-form :inline="true" :model="formInline" label-width="80px" ref="formInline">
      <el-form-item label="主题名称"  prop="title">
        <el-input v-model="formInline.title" placeholder="请输入主题名称" style="width: 250px;"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getData">查询</el-button>
        <el-button @click="cancel('formInline')">取消</el-button>
        <el-button @click="goBack">返回</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" border highlight-current-row style="width: 100%">
      <el-table-column type="index" label="序号" width="150"></el-table-column>
      <el-table-column prop="title" label="标题" min-width="150"></el-table-column>
      <!--<el-table-column prop="content" label="内容" min-width="200"></el-table-column>-->
      <el-table-column prop="time" label="时间" min-width="200"></el-table-column>
      <el-table-column fixed="right" label="操作" min-width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="deleteById(scope.row.id)">删除</el-button>
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination :total="total" :page.sync="page.pageNum" :limit.sync="page.pageSize"  @pagination="getData"/>

    <el-dialog
      title="内容如下"
      :visible.sync="dialogVisible"
      width="90%">
      <div v-html="htmlContent"></div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>

  import Pagination from '@/components/Pagination'
  import { getData,deleteById } from '../../api/friendMood'

  export default {
    name: "findMyMood",
    components:{
      Pagination
    },
    mounted() {
      this.getData();
    },
    data() {
      return {
        dialogVisible: false,
        tableData: [],
        formInline: {
          title: '',
        },

        htmlContent:'',

        total: 0,
        page: {
          pageNum: 1,
          pageSize: 10,
        }
      }
    },
    methods: {
      getData(){
        const params = {
          ...this.formInline,
          ...this.page,
        };
        getData(params).then(res=>{
          if (res.success) {
            this.$message.success(res.message)
            this.tableData = res.data.rows;
            this.total = res.data.total;
          } else {
            this.$message.error(res.message)
          }
        }).catch(e => {
          this.$message.error(e.message)
        })
      },
      handleClick(row) {
        this.htmlContent = row.content;
        this.dialogVisible = true;
      },
      deleteById(id){
        this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            deleteById(id).then(res=>{
              if (res.success) {
                this.$message.success(res.message)
                this.getData();
              } else {
                this.$message.error(res.message)
              }
            }).catch(e => {
              this.$message.error(e.message)
            })
          })
          .catch(() => {
            this.$message.info("已取消删除");
          });
      },
      cancel(formName) {
        this.$refs[formName].resetFields();
      },
      goBack(){
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>

</style>