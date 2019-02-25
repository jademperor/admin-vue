<template>
  <div>
    <el-row>
      <el-col :span="24" :offset="0">
        <el-form
          :model="form"
          :rules="rules"
          ref="form"
          label-width="100px"
          label-position="right"
          class="form"
        >
          <el-form-item label="Domain" prop="baseURL">
            <el-input v-model="form.baseURL"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="updateBasicConfig">Submit</el-button>
            <el-button type="danger" @click="reset">Reset</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { basicapi, resetBaseURL, baseURL } from "@/apis/index";
export default {
  name: "Base",
  data() {
    return {
      form: {
        baseURL: "http://localhost:8999"
      },
      rules: {
        baseURL: [{ required: true, message: "input gateway-manager domain" }]
      }
    };
  },
  methods: {
    reset() {
      this.form.baseURL = "http://localhost:8999";
      resetBaseURL({ baseURL: this.form.baseURL });
    },
    updateBasicConfig() {
      // this.$refs.form.validate((isValid, obj) => {
      //   if (isValid) {
      //     basicapi
      //       .putGlobalConfig(this.form)
      //       .then(data => {
      //         this.$message.success(data.message);
      //       }).catch(err => {
      //         this.$message.error(err.message);
      //       })
      //     return;
      //   }
      //   // invalid ...
      //   let errmsg = "";
      //   Object.keys(obj).map(key => {
      //     let errmsgInner = `${key}:`;
      //     obj[key].forEach(item => {
      //       // console.log(item)
      //       errmsgInner += item.message;
      //     });
      //     errmsg += errmsgInner + ";";
      //   });
      //   this.$message.error(errmsg);
      // });
    }
  },
  created() {
    this.form.baseURL = baseURL;
    // basicapi
    //   .getGlobalConfig()
    //   .then(data => {
    //     this.form.port = data.port
    //     this.form.logpath = data.logpath
    //   })
    //   .catch(err => {
    //     this.$notify.error({
    //       title: "错误提示",
    //       message: err.message
    //     });
    //   });
  }
};
</script>

<style scoped>
</style>
