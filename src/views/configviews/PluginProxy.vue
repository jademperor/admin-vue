<template>
  <div>
    <template v-if="current">
      <router-link to="proxy/apis">
        <el-tag type="success">API</el-tag>
      </router-link>
      <br>
      <br>

      <router-link to="proxy/routings">
        <el-tag type="success">Routing</el-tag>
      </router-link>
      <br>
      <br>

      <router-link to="proxy/clusters">
        <el-tag type="success">Cluster</el-tag>
      </router-link>
      <br>
      <br>
    </template>

    <div style="width:90%;margin:0 auto;">
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>
<script>
export default {
  name: "PluginProxy",
  data() {
    return {
      current: false
    };
  },
  watch: {
    $route: function(newVal, oldVal) {
      // console.log("config router", newVal);
      if (newVal.path === "/configs/proxy") {
        this.current = true;
      } else {
        this.current = false;
      }
    }
  },
  created() {
    // console.log(this.$route.path === "/configs/proxy");
    if (this.$route.path === "/configs/proxy") {
      this.current = true;
      return;
    }
    this.current = false;
  }
};
</script>

<style scoped>
</style>
