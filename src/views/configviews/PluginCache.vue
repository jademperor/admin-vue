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
    </el-row>
    <el-row style="margin-top:1em;">
      <el-table :data="nocaches" style="width: 100%">
        <el-table-column label="ID" width="300">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.idx }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Regular" width="300">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>expression: {{ scope.row.regexp }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium" type="success">{{ scope.row.regexp }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="Enabled" width="300">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.enabled"
              size="small"
              @change="enableNocacheRule(scope.$index)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="Operation">
          <template slot-scope="scope">
            <el-button
              icon="el-icon-edit"
              size="small"
              @click="{dialogFormVisible = true, form=nocaches[scope.$index]}"
              circle
            ></el-button>
            <el-button
              icon="el-icon-delete"
              size="small"
              type="danger"
              @click="hdlDelNocacheRule(scope.row.idx)"
              circle
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row>
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
      :title="form.idx.length?'Update':'New'"
      :visible.sync="dialogFormVisible"
      width="400px"
    >
      <el-form ref="refForm" :model="form" label-position="left">
        <el-form-item label="Regular" label-width="100px">
          <el-input v-model="form.regexp" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Enabled" label-width="100px">
          <el-switch v-model="form.enabled"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="() => {dialogFormVisible = false, resetform()}" size="small">Cancel</el-button>
        <el-button type="primary" @click="hdlEditNocacheRule" size="small">Confirm</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { cacheapi } from "@/apis";
export default {
  name: "PluginCache",
  data() {
    return {
      curPage: 1,
      nocaches: [],
      total: 0,
      dialogFormVisible: false,
      form: {
        idx: "",
        regexp: "",
        enabled: true
      }
    };
  },
  components: {},
  methods: {
    handleCurrentChange(page) {
      this.curPage = page;
      this.refresh();
    },
    getCacheRules(page) {
      let limit = 8;
      let offset = (this.curPage - 1) * limit;
      cacheapi
        .getCacheRules({ limit, offset })
        .then(data => {
          // console.log(data);
          this.nocaches = data.rules;
          this.total = data.total;
          this.$message.success(data.message);
        })
        .catch(err => {
          console.error(err);
        });
    },
    async enableNocacheRule(id) {
      // this.dialogFormVisible = false;
      let { idx, regexp, enabled } = this.nocaches[id];
      await cacheapi
        .editCacheRule({ idx, regexp, enabled })
        .then(data => this.$message.success(data.message))
        .catch(err => console.error(err));
      this.refresh();
    },
    async hdlEditNocacheRule() {
      let { idx, regexp, enabled } = this.form;
      this.dialogFormVisible = false;
      this.resetform();
      // edit
      if (idx.length) {
        await cacheapi
          .editCacheRule({ idx, regexp, enabled })
          .then(data => this.$message.success(data.message))
          .catch(err => console.error(err));
      } else {
        // new
        await cacheapi
          .newCacheRule({ enabled, regexp })
          .then(data => this.$message.success(data.message))
          .catch(err => {
            console.error(err);
            return;
          });
      }
      this.refresh();
    },
    async hdlDelNocacheRule(idx) {
      await cacheapi
        .delCacheRule({ idx })
        .then(data => this.$message.success(data.message))
        .catch(err => console.error(err));
      this.refresh();
    },
    refresh() {
      this.getCacheRules(this.curPage);
    },
    resetform() {
      this.form = { idx: "", regexp: "", enabled: true };
    }
  },
  async created() {
    await this.getCacheRules(this.curPage);
  }
};
</script>


<style scoped>
</style>
