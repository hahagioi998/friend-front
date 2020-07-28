<template>
  <div class="navbar" style="display: flex;justify-content: space-between;background: #545c64;">
    <!--<hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />-->

    <!--<breadcrumb class="breadcrumb-container" />-->
    <sidebar />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click" :hide-on-click="false">
        <div class="avatar-wrapper">
          <img src="@/assets/img/avatar.jpg" class="user-avatar">
          <i class="el-icon-caret-bottom"/>
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              个人中心
            </el-dropdown-item>
          </router-link>
          <router-link to="/">
            <el-dropdown-item>
              访问权限
              <el-switch
                v-model="value"
                active-color="#13ce66"
                inactive-color="#ff4949"
                @change="change"
              >
              </el-switch>
            </el-dropdown-item>
          </router-link>
          <!-- <a target="_blank" href="https://github.com/PanJiaChen/vue-admin-template/">
             <el-dropdown-item>Github</el-dropdown-item>
           </a>
           <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">
             <el-dropdown-item>Docs</el-dropdown-item>
           </a>-->
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  // import Breadcrumb from '@/components/Breadcrumb'
  // import Hamburger from '@/components/Hamburger'
  import Sidebar from './Sidebar'
  import {changeSpace} from '@/api/friendList'

  export default {
    components: {
      // Breadcrumb,
      // Hamburger,
      Sidebar
    },
    computed: {
      ...mapGetters([
        'sidebar',
        'avatar'
      ])
    },
    data() {
      return {
        value: true
      }
    },
    methods: {
      toggleSideBar() {
        this.$store.dispatch('app/toggleSideBar')
      },
      async logout() {
        await this.$store.dispatch('user/logout')
        this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      },
      change(value) {
        let params = {
          value:value
        };
        changeSpace(params).then(res=>{
          if (res.success) {
            this.$message.success(res.message)
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

<style lang="scss" scoped>
  .navbar {
    height: 50px;
    overflow: hidden;
    position: relative;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, .08);

    .hamburger-container {
      line-height: 46px;
      height: 100%;
      float: left;
      cursor: pointer;
      transition: background .3s;
      -webkit-tap-highlight-color: transparent;

      &:hover {
        background: rgba(0, 0, 0, .025)
      }
    }

    .breadcrumb-container {
      float: left;
    }

    .right-menu {
      float: right;
      height: 100%;
      line-height: 50px;

      &:focus {
        outline: none;
      }

      .right-menu-item {
        display: inline-block;
        padding: 0 8px;
        height: 100%;
        font-size: 18px;
        color: #5a5e66;
        vertical-align: text-bottom;

        &.hover-effect {
          cursor: pointer;
          transition: background .3s;

          &:hover {
            background: rgba(0, 0, 0, .025)
          }
        }
      }

      .avatar-container {
        margin-right: 30px;

        .avatar-wrapper {
          margin-top: 5px;
          position: relative;

          .user-avatar {
            cursor: pointer;
            width: 40px;
            height: 40px;
            border-radius: 10px;
          }

          .el-icon-caret-bottom {
            cursor: pointer;
            position: absolute;
            right: -20px;
            top: 25px;
            font-size: 12px;
          }
        }
      }
    }
  }
</style>
