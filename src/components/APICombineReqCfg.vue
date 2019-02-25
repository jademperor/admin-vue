<template>
  <div class="wrapper" v-if="cfg">
    <el-row>
      <el-col :span="1" :offset="23">
        <i class="el-icon-delete del-combine-req-cfg" @click="delCombineReqCfg"></i>
      </el-col>
    </el-row>
    <el-form :model="cfg" label-width="120px">
      <el-form-item v-if="cfg.id" label="id">
        <el-tag type="info" size="small">{{cfg.id}}</el-tag>
      </el-form-item>
      <el-form-item label="Request URI">
        <el-input v-model="cfg.path" size="small" placeholder="/gateway/uri2"></el-input>
      </el-form-item>
      <el-form-item label="Response Field">
        <el-input v-model="cfg.field" size="small" placeholder="repsonse field"></el-input>
      </el-form-item>
      <el-form-item label="Target Cluster">
        <el-input v-model="cfg.target_cluster_id" size="small" placeholder="targetClusterID"></el-input>
      </el-form-item>
      <el-form-item label="Method" size="small">
        <el-select v-model="cfg.method" placeholder="Choose one">
          <el-option value="GET" label="GET"></el-option>
          <el-option value="POST" label="POST"></el-option>
          <el-option value="DELETE" label="DELETE"></el-option>
          <el-option value="PUT" label="PUT"></el-option>
        </el-select>
        <!-- <el-input v-model="cfg.method" size="small"></el-input> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "CombineReqCfg",
  props: {
    cfg: Object,
    idx: Number,
    delFunc: Function,
    change: Function
  },
  methods: {
    delCombineReqCfg() {
      this.delFunc(this.idx);
    }
  },
  watch: {
    cfg: {
      handler: function(newVal, oldVal) {
        console.log("changed:", newVal, oldVal);
        this.change(this.idx, this.cfg);
      },
      deep: true
    }
  }
};
</script>

<style scoped>
.wrapper {
  background-color: #f3f3f5;
  padding: 0.5em;
  border-radius: 5px;
}
.del-combine-req-cfg {
  cursor: pointer;
}
.del-combine-req-cfg:hover {
  color: red;
}
</style>

