<template>
  <div style="text-align:left">
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
      <!-- <el-col :span="22" :offset="0">规则数总计：{{total}}</el-col> -->
    </el-row>
    <el-row style="margin-top:1em;">
      <el-table :data="routings" style="width: 100%">
        <el-table-column label="ID">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{scope.row.idx}}</span>
          </template>
        </el-table-column>
        <el-table-column label="Prefix">
          <template slot-scope="scope">
            <el-tag size="medium" type="success">{{ scope.row.prefix }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="Target Cluster ID">
          <template slot-scope="scope">
            <router-link :to="`clusters/${scope.row.target_cluster_id}`">
              <span style="margin-left: 10px">{{scope.row.target_cluster_id}}</span>
            </router-link>
          </template>
        </el-table-column>
        <el-table-column label="Strip prefix">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.need_strip_prefix"/>
          </template>
        </el-table-column>
        <el-table-column label="Operation">
          <template slot-scope="scope">
            <el-button
              icon="el-icon-edit"
              size="small"
              @click="{dialogFormVisible = true, routingForm=routings[scope.$index]}"
              circle
            ></el-button>
            <el-button
              icon="el-icon-delete"
              size="small"
              type="danger"
              @click="hdlDelRouting(scope.row.idx)"
              circle
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>

    <el-row style="margin-top: 1em">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="curPage"
        :page-size="8"
        layout="total, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-row>

    <!-- new dialog -->
    <el-dialog
      :title="(routingForm.idx && routingForm.idx.length > 0)?'Update':'New'"
      :visible.sync="dialogFormVisible"
      width="400px"
    >
      <el-form ref="refNewForm" :model="routingForm" label-position="left" label-width="120px">
        <el-form-item label="ID">
          <el-input v-model="routingForm.idx" disabled></el-input>
        </el-form-item>
        <el-form-item label="Prefix">
          <el-input v-model="routingForm.prefix" placeholder="/prefix"></el-input>
        </el-form-item>
        <el-form-item label="Target Cluster ID">
          <el-select v-model="routingForm.target_cluster_id">
            <el-option
              v-for="(opt, idx) in clusterIds"
              :value="opt.idx"
              :label="`${opt.name}:${opt.idx}`"
              :key="idx"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Strip Prefix">
          <el-switch v-model="routingForm.need_strip_prefix"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false, resetNewForm()" size="small">Cancel</el-button>
        <el-button type="primary" @click="hdlEditRouting" size="small">Confirm</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
/* eslint-disable */
// import RoutingCfgDetail from "@/components/RoutingCfgDetail";
import { proxyapi } from "@/apis";
export default {
  name: "Routing",
  data() {
    return {
      curPage: 1,
      total: 0,
      routings: [],
      clusterIds: [],
      dialogFormVisible: false,
      routingForm: {
        idx: "",
        target_cluster_id: "",
        prefix: "",
        need_strip_prefix: true
      }
    };
  },
  components: {},
  methods: {
    handleCurrentChange(page) {
      this.curPage = page;
      this.refresh();
    },

    async hdlEditRouting() {
      this.dialogFormVisible = false;
      if (this.routingForm.idx && this.routingForm.idx.length > 0) {
        // edit
        await proxyapi
          .updateRouting(this.routingForm)
          .then(data => console.log(data.message))
          .catch(err => console.error(err));
      } else {
        // new
        await proxyapi
          .newRouting(this.routingForm)
          .then(data => console.log(data.message))
          .catch(err => console.error(err));
      }
      this.resetNewForm();
      this.refresh();
    },

    async hdlDelRouting(id) {
      await proxyapi
        .delRouting({ id })
        .then(data => console.log(data.message))
        .catch(err => console.error(err));
      this.refresh();
    },

    getClusterIDs() {
      this.clusterIds = [];
      proxyapi
        .getClusterIDs()
        .then(data => {
          this.clusterIds = data.cluster_ids;
          console.log(data.message);
        })
        .catch(err => console.error(err.message));
    },

    getRoutings(page) {
      let limit = 8;
      let offset = (this.curPage - 1) * limit;
      proxyapi
        .getRoutings({ limit, offset })
        .then(data => {
          this.routings = data.routings;
          this.total = data.total;
          console.log(data.message);
        })
        .catch(err => console.error(err));
    },

    refresh() {
      this.getRoutings(this.curPage);
      this.getClusterIDs();
    },

    resetNewForm() {
      this.routingForm = {
        idx: "",
        server_name: "",
        need_strip_prefix: true,
        prefix: ""
      };
    }
  },
  async created() {
    this.refresh();
  }
};
</script>


<style scoped>
</style>
