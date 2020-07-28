<template>
  <div class="app-container" id="box">
    <div class="infinite-list-wrapper" style="overflow:auto">
      <div class="list"
           v-infinite-scroll="load"
           infinite-scroll-disabled="disabled"
           infinite-scroll-distance="5">
        <div v-for="(item,index) in tableData" :key="index" class="list-item">
          <el-row>
            <el-col :span="24">
              <div class="grid-content bg-purple-dark">
               {{index}} ：{{item.friendList.name}}
                <br/><br/><br/>
                《{{item.title}} 》 -- {{item.time}}
                <br/><br/><br/>
                <div v-html="item.content"></div>
                <br/>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <p v-if="loading">加载中...</p>
      <p v-if="noMore">没有更多了</p>
    </div>
    <el-button @click="goBack">返回</el-button>
  </div>
</template>

<script>

  import {getDataByLimit} from "../../api/friendMood";

  export default {
    name: "friendDynamic",
    data() {
      return {
        count: 0, //起始页数值为0
        loading: false,
        totalPages: "",//取后端返回内容的总页数
        tableData: [],
        limit : 5,
        id:0
      }
    },
    mounted() {
      this.getData();
    },
    created(){  //生命周期里接收参数
      this.id = this.$route.query.id //接受参数关键代码
    },
    computed: {
      noMore() {
        //当起始页数大于总页数时停止加载
        return this.count >= this.totalPages - 1;
      },
      disabled() {
        return this.loading || this.noMore
      }
    },
    methods: {
      getData() {
        let params = {
          origin:this.count,
          limit:this.limit,
          id:this.id
        }
        getDataByLimit(params).then(res => {
          if (res.success) {
            // this.tableData.push(res.data.rows);
            this.tableData = this.tableData.concat(res.data.rows)
            this.totalPages = (res.data.total + this.limit -1)/this.limit;
            this.loading = false;
          } else {
            this.$message.error(res.message)
          }
        }).catch(e => {
          this.$message.error(e.message)
        })
      },
      load() {
        this.loading = true
        setTimeout(() => {
          this.count += 1; //页数+1
          this.getData();//调用接口，此时页数+1，查询下一页数据
        }, 2000)
      },
      goBack(){
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>
  .list{
    width: 100%;
    height: 500px;
    overflow-y: auto;
  }
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