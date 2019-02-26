<template>
  <div id="app">
    <el-container style="height:100%">
      <!-- header -->
      <el-header style="background-color:#f56c6c" height="60px">
        <el-row>
          <el-col :span="2" :offset="0">
            <el-row type="flex" align="middle" style="height:60px">
              <img src="@/assets/logo.png" alt="logo" width="40px" style="border-radius:20px">
            </el-row>
          </el-col>
        </el-row>
      </el-header>

      <el-container>
        <!-- aside  subMenu -->
        <el-aside style="text-align:left">
          <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            @select="handleSelect"
            active-text-color="#f56c6c"
            :collapse="isCollapse"
            :default-openeds="['gate.plugin', 'gate.proxy']"
          >
            <el-menu-item index="gate.overview">
              <i class="el-icon-location"></i>
              <span slot="title">Overview</span>
            </el-menu-item>
            <el-menu-item index="gate.basic">
              <i class="el-icon-setting"></i>
              <span slot="title">Basic Config</span>
            </el-menu-item>
            <el-submenu index="gate.plugin">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span slot="title">Plugins Config</span>
              </template>
              <el-menu-item index="gate.plugin.cache">
                <template slot="title">
                  <i class="el-icon-success"></i>
                  <span slot="title">Cache</span>
                </template>
              </el-menu-item>
              <el-menu-item index="gate.plugin.ratelimit" disabled>
                <template slot="title">
                  <i class="el-icon-sort"></i>
                  <span slot="title">Ratelimit(not support yet)</span>
                </template>
              </el-menu-item>
              <el-menu-item index="gate.plugin.httplog" disabled>
                <template slot="title">
                  <i class="el-icon-document"></i>
                  <span slot="title">HTTP Log(not support yet)</span>
                </template>
              </el-menu-item>
            </el-submenu>
            <el-submenu index="gate.proxy">
              <template slot="title">
                <i class="el-icon-share"></i>
                <span slot="title">Proxier</span>
              </template>
              <el-menu-item index="gate.proxy.clusters">
                <template slot="title">
                  <i class="el-icon-document"></i>
                  <span slot="title">Clusters</span>
                </template>
              </el-menu-item>
              <el-menu-item index="gate.proxy.apis">
                <template slot="title">
                  <i class="el-icon-document"></i>
                  <span slot="title">APIs</span>
                </template>
              </el-menu-item>
              <el-menu-item index="gate.proxy.routings">
                <template slot="title">
                  <i class="el-icon-document"></i>
                  <span slot="title">Routings</span>
                </template>
              </el-menu-item>
            </el-submenu>

            <el-menu-item index="github">
              <template slot="title">
                <i class="el-icon-info"></i>
                <!-- Place this tag where you want the button to render. -->
                <a href="https://github.com/jademperor" target="_">github@jademperor</a>
              </template>
            </el-menu-item>
          </el-menu>
        </el-aside>

        <!-- main body -->
        <el-main>
          <!-- breadcrumb -->
          <el-breadcrumb separator="/" class="breadcrumb">
            <el-breadcrumb-item
              v-for="(breadcrumb,idx) in breadcrumbs"
              :key="idx"
              :to="breadcrumb.to"
            >{{breadcrumb.name}}</el-breadcrumb-item>
            <!-- <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item> -->
          </el-breadcrumb>

          <transition name="fade">
            <router-view/>
          </transition>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { saveBreadcrumbs, loadBreadcrumbs } from "./config";
export default {
  name: "app",
  data() {
    return {
      isCollapse: false,
      activeIndex: "gate.overview",
      breadcrumbs: [
        {
          name: "导航页",
          to: "/dashbord"
        }
      ]
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log("menu selectd: ", key);
      this.activeIndex = key;
      switch (key) {
        case "gate.overview":
          this.$router.push("/dashbord");
          break;
        case "gate.basic":
          this.$router.push("/configs/basic");
          break;
        case "gate.plugin.cache":
          this.$router.push("/configs/plugin/cache");
          break;
        case "gate.proxy.clusters":
          this.$router.push("/configs/proxy/clusters");
          break;
        case "gate.proxy.apis":
          this.$router.push("/configs/proxy/apis");
          break;
        case "gate.proxy.routings":
          this.$router.push("/configs/proxy/routings");
          break;
        case "gate.plugins":
          this.$router.push("/plugins");
      }
    }
  },
  watch: {
    $route(newVal, oldVal) {
      if (newVal.params.breadcrumbs) {
        this.breadcrumbs = newVal.params.breadcrumbs;
        saveBreadcrumbs(this.breadcrumbs);
      }
    }
  },
  created() {
    let breadcrumbs = loadBreadcrumbs();
    // console.log(breadcrumbs)
    if (breadcrumbs) {
      this.breadcrumbs = breadcrumbs;
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}

.breadcrumb {
  margin: 1em 1em 1em 0;
}
</style>
