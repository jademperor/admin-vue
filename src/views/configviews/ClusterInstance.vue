<template>
  <div>
    <template v-if="instance">
      <el-row style="margin-bottom: 1em;text-align:left">
        <el-form label-position="left" :data="instance" label-width="150px">
          <el-form-item label="Instance ID">
            <el-input v-model="instance.idx" disabled/>
          </el-form-item>
          <el-form-item label="Cluster ID">
            <el-input v-model="instance.cluster_id" disabled/>
          </el-form-item>
          <el-form-item label="Instance Name">
            <el-input v-model="instance.name"/>
          </el-form-item>
          <el-form-item label="Weight">
            <el-input v-model="instance.weight"/>
          </el-form-item>
          <el-form-item label="Server Addr">
            <el-input v-model="instance.addr"/>
          </el-form-item>
          <el-form-item label="Need Check Health">
            <el-switch v-model="instance.need_check_health"/>
          </el-form-item>
          <el-form-item label="Health Check URL" v-if="instance.need_check_health">
            <el-input v-model="instance.health_check_url"/>
          </el-form-item>
          <el-form-item label="Alive">
            <el-tag :type="instance.is_alive?'success':'warning'">{{instance.is_alive}}</el-tag>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="updateClusterInstance">Update</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </template>
  </div>
</template>
<script>
import { proxyapi } from "@/apis";
export default {
  name: "ClusterInstance",
  data() {
    return {
      routeParam: {
        clusterID: "",
        instanceID: ""
      },
      instance: {
        idx: "",
        name: "",
        addr: "",
        weight: "",
        cluster_id: "",
        need_check_health: true,
        health_check_url: "",
        is_alive: true // prop only for view
      }
    };
  },
  methods: {
    async updateClusterInstance() {
      await proxyapi
        .updateClusterInstance(this.instance)
        .then(data => this.$message.success(data.message))
        .catch(err => this.$message.error(err.message));
      this.getClusterInstance();
    },
    getClusterInstance() {
      proxyapi
        .getClusterInstance({
          clusterID: this.routeParam.clusterID,
          instanceID: this.routeParam.instanceID
        })
        .then(data => {
          this.instance = data.instance;
          this.$message.success(data.message);
        })
        .catch(err => this.$notify.error(err.message));
    },
    refresh() {
      this.getClusterInstance();
    }
  },
  created() {
    console.log(this.$route.params);
    let { clusterID, instanceID } = this.$route.params;
    this.routeParam = { clusterID, instanceID };
    console.log(this.routeParam);
    this.refresh();
  }
};
</script>

<style scoped>
</style>
