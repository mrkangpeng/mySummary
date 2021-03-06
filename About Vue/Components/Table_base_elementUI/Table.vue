<!--
 * @Description:'封装table' 
 * @Autor: kangpeng
 * @Date: 2019-11-26 11:26:20
 * @LastEditors: kangpeng
 * @LastEditTime: 2020-07-07 14:22:34
 -->
<template>
    <div class="table_wrap">
        <el-table
            :header-cell-style="headerStyle"
            :height="tableHeight"
            :data="tableData"
            :border="isShowBorder"
            :stripe="isShowStripe"
            :show-summary="isShowSummary"
            :summary-method="getSummaries"
            style="width:100%"
            :cell-style="cellStyle"
            :default-sort="{prop: 'date', order: 'descending'}"
            @selection-change="handleSelectionChange"
        >
            <el-table-column type="selection" width="60px" :align="tablePosition"></el-table-column>
            <el-table-column label="序号" width="60px" type="index" :align="tablePosition"></el-table-column>
            <template v-for="(item,index) in title">
                <slot name="img" v-if="index == positionIndex"></slot>
                <el-table-column
                    :show-overflow-tooltip="true"
                    :sortable="item.isSort"
                    :prop="item.value"
                    :label="item.label"
                    :align="tablePosition"
                    :key="index"
                    :width="item.width"
                ></el-table-column>
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
            default: () => {
                return {
                    background:
                        "linear-gradient(0,rgba(230,235,241,1),rgba(242,243,247,1)"
                };
            }
        },
        // 排序
        sortable: {
            type: Boolean,
            default: false
        },
        // 定义table的高度
        tableHeight: {
            type: Number
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
        },
        // 是否展示合计行
        isShowSummary: {
            type: Boolean,
            default: false
        },
        // 需要合计行的index(当你需要合计的时候，并且要自定义合计行index，请务必传入需要合计行的index)
        totalRowIndex: {
            type: Array,
            default: []
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
         * @param {Array}
         * @return: Array
         * @author: kangpeng
         */
        handleSelectionChange(checkedList) {
            this.$emit("getCheckList", checkedList);
        },
        cellStyle({ columnIndex }) {
            return "font-size:12px";
        },
        /**
         * @description: 自定义合计行
         * @param {type}
         * @return:
         * @author: kangpeng
         */
        getSummaries(param) {
            const { columns, data } = param;
            const sums = [];
            columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = "总计";
                    return;
                } else if (this.totalRowIndex.indexOf(index) === -1) {
                    sums[index] = "";
                    return;
                }
                const values = data.map(item => Number(item[column.property]));
                if (!values.every(value => isNaN(value))) {
                    sums[index] = values.reduce((prev, curr) => {
                        const value = Number(curr);
                        if (!isNaN(value)) {
                            return prev + curr;
                        } else {
                            return prev;
                        }
                    }, 0);
                } else {
                    sums[index] = " ";
                }
            });

            return sums;
        }
    },
    components: {}
};
</script>

<style scoped lang="stylus">
.table_wrap
    .el-table >>> thead
        color #000000
    .el-table >>> td, .el-table >>> th.is-leaf, .el-table--border, .el-table--group
        border-color #bdbdbd
    .el-table--border::after, .el-table--group::after, .el-table::before
        background-color #bdbdbd
    .el-table
        >>>.el-button
            font-size 12px
            padding 4px 6px
    .el-table__header tr, >>> .el-table__header th
        padding 0
        height 35px
    .el-table__body tr, >>> .el-table__body td
        padding 0
        height 30px
</style>

