<template>
  <div>
    <el-row class="row text">
      <el-col :offset="0" :span="24">
        <h3>About Gateway Manager UI</h3>
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item title="Clusters Configuration" name="1">
            <div>Cluster is a set of server instance;</div>
            <div>it contains at least one server instance. it means a a set of services with the same functionality;</div>
          </el-collapse-item>
          <el-collapse-item title="Plugin Configuration" name="2">
            <div>Only provide for built-in plugin like: "cache", "httplog", "ratelimit";</div>
          </el-collapse-item>
          <el-collapse-item title="API Configuration" name="3">
            <div>API is a config about redirect a request that are sent to proxy to the server instance;</div>
          </el-collapse-item>
          <el-collapse-item title="Routing Configuration" name="4">
            <div>Routing is a config to forwards requests with certain characteristics to the specified Cluster;</div>
          </el-collapse-item>
        </el-collapse>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Dash",
  data() {
    return {
      activeNames: ["1", "2", "3", "4"]
    };
  },
  methods: {
    handleChange(val) {
      // console.log(val);
    }
  }
};
</script>

<style scoped>
.row {
  margin-bottom: 20px;
}
.image {
  height: 200px;
}
.card-title {
  font-size: 1.2em;
  color: #443931;
}

.text {
  text-align: left;
}
</style>
