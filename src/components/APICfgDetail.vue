<template>
  <div style="margin-top: 2em">
    <el-form :model="api" ref="api" label-width="150px" style="text-align:left">
      <el-form-item v-if="api.idx" label="API ID">
        <el-input v-model="api.idx" size="small" disabled></el-input>
      </el-form-item>
      <el-form-item label="URI">
        <el-input v-model="api.path" size="small" placeholder="/gateway/uri2"></el-input>
      </el-form-item>
      <el-form-item label="Rewrite">
        <el-input v-model="api.rewrite_path" size="small" placeholder="/srv/uri1"></el-input>
      </el-form-item>
      <el-form-item label="Cluster ID">
        <el-select v-model="api.target_cluster_id" placeholder="Choose one" size="small">
          <el-option
            v-for="(cfg, idx) in clusterIds"
            :key="`comb_cfg_${idx}`"
            :value="cfg.idx"
            :label="`${cfg.name}(${cfg.idx})`"
          ></el-option>
        </el-select>
        <!-- <el-input v-model="api.target_cluster_id" size="small" placeholder="clusterID"></el-input> -->
      </el-form-item>
      <el-form-item label="Combination">
        <el-switch v-model="api.need_combine" size="small"></el-switch>
        <el-popover
          placement="top-start"
          title="Tip"
          width="400"
          trigger="hover"
          style="margin-left: 1em; font-size: 1.2em;line-height:2em;"
        >
          <i class="el-icon-info" slot="reference"></i>
          <p>If not enabled, the URI will be directly proxyed by default, and the two services will not be requested at the same time and the result will be combined.</p>
        </el-popover>
      </el-form-item>
      <el-form-item label="Method">
        <el-select v-model="api.method" placeholder="Choose one" size="small">
          <el-option value="GET" label="GET"></el-option>
          <el-option value="POST" label="POST"></el-option>
          <el-option value="DELETE" label="DELETE"></el-option>
          <el-option value="PUT" label="PUT"></el-option>
        </el-select>
      </el-form-item>
      <div v-if="api.need_combine && api.combinations && api.combinations.length">
        <el-form-item
          v-for="(cfg, idx) in api.combinations"
          :label="'Combination_Cfg_' + idx"
          :key="'Combination_Cfg_' + idx"
        >
          <i-combine-req-cfg
            :cfg="api.combinations[idx]"
            :idx="idx"
            :delFunc="removeCombineReqCfg"
            :change="updateCombineReqCfg"
            :clusterIds="clusterIds"
          ></i-combine-req-cfg>
        </el-form-item>
      </div>
      <el-form-item>
        <el-button
          type="primary"
          size="small"
          @click="hdlEditAPI"
        >{{(typ === 'new')?'New':'Update'}}</el-button>
        <el-button @click="addCombineReqCfg" size="small">New Combination</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { proxyapi } from "@/apis";
import CombineReqCfg from "@/components/APICombineReqCfg";
export default {
  name: "APIDetail",
  components: {
    iCombineReqCfg: CombineReqCfg
  },
  data() {
    return {
      typ: "edit",
      clusterIds: [],
      api: {
        idx: "",
        method: "GET",
        path: "",
        rewrite_path: "",
        target_cluster_id: "",
        combinations: [],
        need_combine: false
      }
    };
  },
  methods: {
    getAPInfo(apiID) {
      proxyapi
        .getAPInfo({ apiID })
        .then(data => {
          this.api = data.api;
          this.$message.success(data.message);
        })
        .catch(err => this.$message.error(err.message));
    },

    getAllClusterIds() {
      proxyapi
        .getClusterIDs()
        .then(data => {
          this.clusterIds = data.cluster_ids;
          console.log(this.clusterIds);
        })
        .catch(err => console.error(err));
    },

    removeCombineReqCfg(idx) {
      // var index = this.api.combinations.indexOf(item);
      // console.log("del combine-req-cfg idx", idx);
      if (idx !== -1) {
        this.api.combinations.splice(idx, 1);
      }
      if (this.api.combinations.length === 0) {
        this.api.need_combine = false;
      }
    },

    updateCombineReqCfg(idx, cfg) {
      // var index = this.api.combinations.indexOf(item);
      // console.log("update combin-req-cfg idx", idx, cfg);
      if (idx !== -1) {
        this.api.combinations[idx] = cfg;
      }
    },

    addCombineReqCfg() {
      this.api.need_combine = true;
      if (!this.api.combinations) {
        this.api.combinations = [];
      }

      this.api.combinations.push({
        target_cluster_id: "",
        path: "",
        field: "",
        method: ""
      });
    },

    hdlEditAPI() {
      console.log(this.api, this.typ);
      // new a api
      if (this.typ !== "edit") {
        proxyapi
          .newAPI(this.api)
          .then(data => {
            this.$message.success(data.message);
          })
          .catch(err => this.$message.error(err.message));
      } else {
        // update a api
        proxyapi
          .editAPI(this.api)
          .then(data => {
            this.$message.success(data.message);
          })
          .catch(err => this.$message.error(err.message));
      }
    }
  },

  created() {
    // console.log(this.$route.params)
    this.getAllClusterIds(); // get cluster ids data

    // then gat api detail
    let { apiID } = this.$route.params;
    if (apiID === "new") {
      this.typ = "new";
      return;
    }
    this.getAPInfo(apiID);
  }
};
</script>

<style scoped>
</style>
