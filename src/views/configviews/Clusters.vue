<template>
  <div style="text-align:left">
    <!-- new cluster -->
    <el-row>
      <el-col :span="1" :offset="23">
        <el-button
          size="small"
          type="primary"
          @click="dialogFormVisible=true"
          icon="el-icon-plus"
          circle
        />
      </el-col>
    </el-row>

    <el-row style="margin-top:1em;">
      <el-table :data="clusters" style="width: 100%">
        <el-table-column label="ID" width="300">
          <template slot-scope="scope">
            <router-link :to="`clusters/${scope.row.idx}`">
              <a style="margin-left: 10px">{{scope.row.idx}}</a>
            </router-link>
          </template>
        </el-table-column>
        <el-table-column label="Name" width="300">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium" type="success">{{ scope.row.name }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Instance Count" width="300">
          <template slot-scope="scope">
            <span size="medium" type="success">{{ scope.row.instances.length }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Operation">
          <template slot-scope="scope">
            <el-button
              icon="el-icon-edit"
              size="small"
              @click="{dialogFormVisible = true, form=clusters[scope.$index]}"
              circle
            ></el-button>
            <el-button
              icon="el-icon-delete"
              size="small"
              type="danger"
              @click="hdlDelCluster(scope.row.idx)"
              circle
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <!-- new dialog -->
    <el-dialog
      :title="form.idx && form.idx.length?'Update':'New'"
      :visible.sync="dialogFormVisible"
      width="400px"
    >
      <el-form ref="refForm" :model="form" label-position="left">
        <el-form-item label="Cluster Name" label-width="100px">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="() => {dialogFormVisible = false, resetform()}" size="small">Cancel</el-button>
        <el-button type="primary" @click="hdlEditCluster" size="small">Confirm</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { proxyapi } from "@/apis";
export default {
  name: "Clusters",
  data() {
    return {
      clusters: [],
      total: 0,
      dialogFormVisible: false,
      form: {
        idx: "",
        name: "",
        instances: []
      }
    };
  },
  methods: {
    getClusters() {
      proxyapi
        .getClusters()
        .then(data => {
          // console.log(data);
          this.clusters = data.clusters;
          this.$message.success(data.message);
        })
        .catch(err => {
          console.error(err);
        });
    },
    async hdlEditCluster() {
      let { idx, name } = this.form;
      this.dialogFormVisible = false;
      this.resetform();
      // edit
      if (idx && idx.length) {
        await proxyapi
          .updateCluster({ clusterID: idx, name })
          .then(data => this.$message.success(data.message))
          .catch(err => console.error(err));
      } else {
        // new
        await proxyapi
          .newCluster({ name })
          .then(data => this.$message.success(data.message))
          .catch(err => {
            console.error(err);
            return;
          });
      }
      this.refresh();
    },
    async hdlDelCluster(idx) {
      await proxyapi
        .delCluster({ clusterID: idx })
        .then(data => this.$message.success(data.message))
        .catch(err => console.error(err));
      this.refresh();
    },
    refresh() {
      this.getClusters();
    },
    resetform() {
      this.form = { name: "" };
    }
  },
  async created() {
    await this.getClusters();
  }
};
</script>

<style scoped>
</style>
