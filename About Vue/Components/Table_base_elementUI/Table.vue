<!--
 * @Description:'封装table' 
 * @Autor: kangpeng
 * @Date: 2019-11-26 11:26:20
 * @LastEditors: kangpeng
 * @LastEditTime: 2019-12-09 14:06:01
 -->
<template>
  <div class="table_wrap">
    <el-table
      :header-cell-style="headerStyle"
      :height="tableHeight"
      :data="tableData"
      :border="isShowBorder"
      :stripe="isShowStripe"
      style="width:95%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="45px" :align="tablePosition"></el-table-column>
      <el-table-column label="序号" width="60px" type="index" :align="tablePosition"></el-table-column>
      <template v-for="(item,index) in title">
        <slot name="img" v-if="index == positionIndex"></slot>
        <el-table-column :prop="item.value" :label="item.label" :align="tablePosition" :key="index"></el-table-column>
      </template>
      <slot name="operation"></slot>
    </el-table>
  </div>
</template>

<script>
export default {
  // title 示例
  // title: [{
  //   label:'姓名', // 当前列标题
  //   value:'name' // 当前列内容,后台给的字段名
  // }],
  props: {
    // 表格数据
    tableData: {
      type: Array,
      required: true
    },
    // 渲染数据
    title: {
      type: Array,
      required: true
    },
    // 表头样式
    headerStyle: {
      type: Object,
      default: { background: "#F9F8F8" }
    },
    // 定义table的高度
    tableHeight: {
      type: Number,
      default: 500
    },
    // 对齐方式'center--居中,left--靠左,right--靠右'
    tablePosition: {
      type: String,
      default: "center"
    },
    // 是否带边框
    isShowBorder: {
      type: Boolean,
      default: true
    },
    // 是否带斑马纹
    isShowStripe: {
      type: Boolean,
      default: true
    },
    // 当表格中存在图片,图片所在的位置
    positionIndex: {
      type: Number
    }
  },
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
    /**
     * @description: 选中的数组集合
     * @param {type:Array}
     * @return: Array
     * @author: kangpeng
     */
    handleSelectionChange(checkedList) {
      return checkedList;
    }
  },
  components: {}
};
</script>

<style scoped lang="stylus"></style>
