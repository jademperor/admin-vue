
<template>
  <div>
    <template>
      <el-row style="margin-bottom: 1em">
        <el-col :span="1" :offset="23">
          <el-button
            type="success"
            size="small"
            icon="el-icon-plus"
            circle
            @click="$router.push({path: 'apis/new', params: {apiID: 'new'}})"
          />
        </el-col>
      </el-row>
      <!-- table row -->
      <el-row style="margin-bottom:2em;">
        <el-table :data="apis" style="width: 100%">
          <el-table-column label="ID">
            <template slot-scope="scope">
              <router-link :to="`apis/${scope.row.idx}`">
                <span>{{ scope.row.idx }}</span>
              </router-link>
            </template>
          </el-table-column>
          <el-table-column label="Method">
            <template slot-scope="scope">
              <el-tag :type="judgeMethoTagType(scope.row.method)" size="mini">{{ scope.row.method }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="URI" width="200">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.path }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Rewrite">
            <template slot-scope="scope">
              <span>{{ scope.row.rewrite_path || 'EMPTY'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="ClusterID">
            <template slot-scope="scope">
              <span>
                <router-link
                  class="link"
                  :to="{path: `clusters/${scope.row.target_cluster_id}`, params: {group: scope.row.target_cluster_id}}"
                >{{ scope.row.target_cluster_id }}</router-link>
              </span>
            </template>
          </el-table-column>
          <el-table-column label="Combination">
            <template slot-scope="scope">
              <el-switch :value="scope.row.need_combine" disabled></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="Op">
            <template slot-scope="scope">
              <!-- <span id="more-rule-detail">
                <i class="el-icon-more" @click="hdlClickDetail(scope.row.idx)"></i>
              </span>-->
              <span id="del-rule-btn">
                <i class="el-icon-delete" @click="hdlDelAPI(scope.row.idx)"></i>
              </span>
            </template>
          </el-table-column>
        </el-table>
      </el-row>

      <!-- pagination -->
      <el-row>
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="curPage"
          :page-size="8"
          layout="total, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </el-row>
    </template>
  </div>
</template>
<script>
import { proxyapi } from "@/apis";
export default {
  name: "API",
  data() {
    return {
      curPage: 1,
      apis: [],
      total: 0
    };
  },
  methods: {
    handleCurrentChange(page) {
      this.curPage = page;
    },
    // hdlClickDetail(id) {
    //   this.$router.push({ path: `apis/${id}`, params: { apiID: id } });
    // },
    async hdlDelAPI(id) {
      await proxyapi
        .delAPI({ id })
        .then(data => this.$message.success(data.message))
        .catch(err => this.$message.error(err.message));
      this.refresh();
    },
    getAPIs() {
      let limit = 8;
      let offset = (this.curPage - 1) * limit;
      proxyapi
        .getAPIs({ limit, offset })
        .then(data => {
          if (!data) return;
          this.apis = data.apis;
          this.total = data.total;
          this.$message.success(data.message);
        })
        .catch(err => this.$message.error(err.message));
    },
    judgeMethoTagType(method) {
      switch (method.toLowerCase()) {
        case "get":
          return "success";
        case "post":
          return "error";
        default:
          return "success";
      }
    },
    refresh() {
      this.getAPIs();
    }
  },
  created() {
    this.refresh();
  }
};
</script>

<style scoped>
.group-wrapper {
  /* font-size: 1.2em; */
  background-color: #fbfbfb;
  text-align: left;
  padding: 1em;
  margin-bottom: 1em;
}
.link {
  color: green;
}
#more-rule-detail {
  margin-right: 1em;
  cursor: pointer;
}
#more-rule-detail:hover {
  color: green;
}
#del-rule-btn {
  margin-right: 1em;
  cursor: pointer;
}
#del-rule-btn:hover {
  color: red;
}
</style>
