<template>
  <div class="app-container">
    <el-form :inline="true" :model="formInline" label-width="80px" ref="formInline">
      <el-form-item label="好友名称"  prop="title">
        <el-input v-model="formInline.title" placeholder="请输入好友名称" style="width: 250px;"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getData">查询</el-button>
        <el-button @click="cancel('formInline')">取消</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" border highlight-current-row style="width: 100%">
      <el-table-column type="index" label="序号" width="150"></el-table-column>
      <el-table-column prop="name" label="名字" min-width="150"></el-table-column>
      <el-table-column fixed="right" label="操作" min-width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="deleteById(scope.row.id)">删除该好友</el-button>
          <el-button @click="handleClick(scope.row.id)" type="text" size="small">进入好友空间</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination :total="total" :page.sync="page.pageNum" :limit.sync="page.pageSize"  @pagination="getData"/>

  </div>
</template>

<script>

  import Pagination from '@/components/Pagination'
  import {getData,deleteById} from "../../api/friendList";

  export default {
    name: "friendList",
    components:{
      Pagination
    },
    mounted() {
      this.getData();
    },
    data() {
      return {
        tableData: [],
        formInline: {
          title: '',
        },

        total: 0,
        page: {
          pageNum: 1,
          pageSize: 10,
        }
      }
    },
    methods: {
      getData() {
        const params = {
          ...this.formInline,
          ...this.page,
        };
        getData(params).then(res => {
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
      cancel(formName) {
        this.$refs[formName].resetFields();
      },
      handleClick(row) {
        this.$router.push({
          path:'/friendDynamic',
          query:{
            id:row,
          }
        })
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
      }

    }
  }
</script>

<style scoped>
  .el-row {
    margin-bottom: 20px;
  &:last-child {
     margin-bottom: 0;
   }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
    margin-bottom: 15px;

  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>