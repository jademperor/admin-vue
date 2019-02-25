<template>
  <div>
    <el-row style="margin-bottom: 1em; text-align:left">
      <el-col :span="6">Cluster Name:
        <el-tag type="primary" size="small">{{clusterName}}</el-tag>
      </el-col>
      <el-col :span="6">Instance Count:
        <el-tag type="primary" size="small">{{instanceCnt}}</el-tag>
      </el-col>
      <el-col :span="2" :offset="10">
        <el-button
          type="info"
          size="small"
          icon="el-icon-edit"
          circle
          @click="dialogUpdateClusterInfoVisible = true"
        />
        <el-button
          size="small"
          type="success"
          @click="openNewClusterInstanceDialog"
          icon="el-icon-plus"
          circle
        />
      </el-col>
    </el-row>

    <!-- instance list -->
    <template v-if="instances && instances.length">
      <el-row style="margin-top:1em;">
        <el-table :data="instances" style="width: 100%">
          <el-table-column label="ID" width="100">
            <template slot-scope="scope">
              <router-link :to="`${clusterID}/${scope.row.idx}`">
                <a style="margin-left: 10px">{{scope.row.idx}}</a>
              </router-link>
            </template>
          </el-table-column>
          <el-table-column label="Instance Name" width="200">
            <template slot-scope="scope">
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium" type="success">{{ scope.row.name }}</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="Instance Addr" width="200">
            <template slot-scope="scope">
              <span size="medium">{{ scope.row.addr }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Weight" width="100">
            <template slot-scope="scope">
              <span size="medium">{{ scope.row.weight }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Health check">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.need_check_health" disabled/>
            </template>
          </el-table-column>
          <el-table-column label="Alive">
            <template slot-scope="scope">
              <span>{{scope.row.is_alive}}</span>
            </template>
          </el-table-column>
          <el-table-column label="Operation">
            <template slot-scope="scope">
              <el-button
                icon="el-icon-delete"
                size="small"
                type="danger"
                @click="hdlDelClusterInstance(scope.row.idx)"
                circle
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </template>
    <!-- <template v-else>
      <h2 style="color:gray">
        <i class="el-icon-info"></i> 暂无配置
      </h2>
    </template>-->
    <!-- new server instance config dialog -->
    <el-dialog
      :title="!newInstanceForm.idx?'New Instance':'Update '"
      :visible.sync="dialogNewInstanceVisible"
      width="500px"
    >
      <el-form
        ref="refForm"
        :model="newInstanceForm"
        label-position="left"
        label-width="150px"
        style="text-align: left"
      >
        <el-form-item label="Cluser ID">
          <el-input v-model="clusterID" disabled></el-input>
        </el-form-item>
        <el-form-item label="Name">
          <el-input v-model="newInstanceForm.name" autocomplete="off" placeholder="api.dev or api1"></el-input>
        </el-form-item>
        <el-form-item label="Server Addr">
          <el-input
            v-model="newInstanceForm.addr"
            autocomplete="off"
            placeholder="http://api.example.com"
          ></el-input>
        </el-form-item>
        <el-form-item label="Weight">
          <el-input v-model="newInstanceForm.weight" placeholder="5"></el-input>
        </el-form-item>
        <el-form-item label="Health Check">
          <el-switch v-model="newInstanceForm.need_check_health"></el-switch>
        </el-form-item>
        <el-form-item label="Health Check Addr" v-if="newInstanceForm.need_check_health">
          <el-input
            v-model="newInstanceForm.health_check_url"
            placeholder="http://api.example.com/health"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogNewInstanceVisible = false" size="small">Cancel</el-button>
        <el-button type="primary" @click="hdlNewClusterInstance" size="small">Submit</el-button>
      </div>
    </el-dialog>

    <!-- new reverse server config dialog -->
    <el-dialog title="Update Cluster Info" :visible.sync="dialogUpdateClusterInfoVisible">
      <el-form ref="refForm" label-position="left" label-width="100px">
        <el-form-item label="Old name">
          <el-input v-model="clusterName" disabled></el-input>
        </el-form-item>
        <el-form-item label="New Name">
          <el-input v-model="newClusterName" placeholder="newClusterName"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogUpdateClusterInfoVisible = false" size="small">Cancel</el-button>
        <el-button type="primary" @click="hdlUpdateClusterInfo" size="small">Update</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { proxyapi } from "@/apis";
export default {
  name: "Cluster",
  data() {
    return {
      instances: [],
      instanceCnt: 0,

      clusterID: "",
      clusterName: "",
      newClusterName: "",

      dialogNewInstanceVisible: false,
      dialogUpdateClusterInfoVisible: false,

      newInstanceForm: {
        idx: "",
        name: "",
        clusterID: "",
        addr: "",
        weight: 5,
        need_check_health: true,
        health_check_url: ""
      }
    };
  },
  methods: {
    async hdlUpdateClusterInfo() {
      this.dialogUpdateClusterInfoVisible = false;
      await proxyapi
        .updateCluster({
          clusterID: this.clusterID,
          name: this.newClusterName
        })
        .then(data => {
          this.$message.success(data.message);
          this.getClusterInfo();
        })
        .catch(err => this.$message.error(err.message));
    },

    async hdlDelClusterInstance(instanceID) {
      await proxyapi
        .delClusterInstance({ clusterID: this.clusterID, instanceID })
        .then(data => this.$message.success(data.message))
        .catch(err => this.$message.error(err.message));
      this.getClusterInfo();
    },

    openNewClusterInstanceDialog() {
      this.dialogNewInstanceVisible = true;
      this.newInstanceForm.cluster_id = this.clusterID;
    },

    getClusterInfo() {
      proxyapi
        .getClusterInfo({ clusterID: this.clusterID })
        .then(data => {
          this.clusterName = data.cluster.name;
          this.instances = data.cluster.instances;
          this.instanceCnt = data.cluster.instances.length;
          this.$message.success(data.message);
        })
        .catch(err => this.$message.error(err.message));
    },

    async delClusterInstance(instanceID) {
      await proxyapi
        .delClusterInstance({ clusterID: this.clusterID, instanceID })
        .then(data => this.$message.success(data.message))
        .catch(err => this.$message.error(err.message));
      this.getClusterInfo();
    },

    async hdlNewClusterInstance() {
      this.dialogNewInstanceVisible = false;
      await proxyapi
        .newClusterInstance(this.newInstanceForm)
        .then(data => this.$message.success(data.message))
        .catch(err => this.$message.error(err.message));
      this.getClusterInfo();
    }
  },
  created() {
    // console.log(this.$route.params);
    let { clusterID } = this.$route.params;
    this.clusterID = clusterID;
    this.getClusterInfo();
  }
};
</script>

<style scoped>
</style>
