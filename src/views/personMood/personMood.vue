<template>
  <div class="app-container">
    <el-form :inline="true" :model="formInline" label-width="80px" ref="formInline">
      <el-form-item label="心情主题"  prop="title">
        <el-input v-model="formInline.title" placeholder="请输入主题" style="width: 250px;"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即发布</el-button>
        <el-button type="warning" @click="cancel('formInline')">取消</el-button>
        <el-button type="primary" @click="findMyMood">查询我的个人详情</el-button>
      </el-form-item>
    </el-form>
    <div>
      <tinymce v-model="content" :height="350"/>
    </div>
  </div>
</template>

<script>
  import Tinymce from '@/components/Tinymce'
  import {addMood }from '../../api/friendMood'

  export default {
    name: "personMood",
    components: {Tinymce},
    data() {
      return {
        content: '',
        input: '',
        formInline: {
          title: '',
        },
      }
    },
    methods: {
      cancel(formName) {
        this.content = ''
        this.$refs[formName].resetFields();
      },
      findMyMood(){
        this.$router.push({  //核心语句
          path:'/findMyMood',   //跳转的路径
         /* query:{           //路由传参时push和query搭配使用 ，作用时传递参数
            id:this.id ,
          }*/
        })
      },
      onSubmit() {
        if(this.formInline.title.length === 0 || this.content.length ===0){
          this.$message.warning("请添加标题或内容")
          return;
        }
        const params = {
          ...this.formInline,
          content: this.content
        }
        addMood(params).then(res=>{
          if (res.success) {
            this.$message.success(res.message)
            this.cancel('formInline');
          } else {
            this.$message.error(res.message)
          }
        }).catch(e => {
          this.$message.error(e.message)
        })
      }
    }
  }
</script>

<style scoped>

</style>