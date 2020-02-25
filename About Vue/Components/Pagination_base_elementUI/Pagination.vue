<!--
 * @Description: 分页组件
 * @Autor: kangpeng
 * @Date: 2020-02-25 10:14:24
 * @LastEditors  : kangpeng
 * @LastEditTime : 2020-02-25 14:50:18
 -->
<template>
  <div class="pagination_wrap">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="page"
      :page-sizes="pageSize"
      :page-size.sync="size"
      :background="background"
      :layout="layout"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    // 总数
    total: {
      type: Number,
      required: true
    },
    // 页数
    page: {
      type: Number,
      default: 1
    },
    // 每页条数
    size: {
      type: Number,
      default: 10
    },
    // 只有一页是否隐藏
    isShow: {
      type: Boolean,
      default: false
    },
    // 一页可设置的条数
    pageSize: {
      type: Array,
      default: () => {
        return [10, 20, 50, 100];
      }
    },
    // 分页布局
    layout: {
      type: String,
      default: "total, sizes, prev, pager, next, jumper"
    },
    background: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    page() {
      this.$emit("update:page", this.page);
    },
    size() {
      this.$emit("update:page", this.size);
    }
  },
  //   computed: {
  //     page: {
  //       get() {
  //         return this.page;
  //       },
  //       set(val) {
  //         this.$emit("update:page", val);
  //       }
  //     },
  //     size: {
  //       get() {
  //         return this.size;
  //       },
  //       set(val) {
  //         this.$emit("update:size", val);
  //       }
  //     }
  //   },
  created() {},
  mounted() {},
  methods: {
    handleSizeChange(val) {
      this.$emit("pagination", { page: this.page, size: val });
    },
    handleCurrentChange(val) {
      this.$emit("pagination", { page: val, size: this.size });
    }
  }
};
</script>

<style scoped lang="stylus">
.pagination_wrap
  display flex
  justify-content flex-end
  margin-top 10px
</style>
