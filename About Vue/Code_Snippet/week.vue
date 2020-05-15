<!--
 * @Description: 周日历
 * @Autor: kangpeng
 * @Date: 2020-05-15 10:05:42
 * @LastEditors: kangpeng
 * @LastEditTime: 2020-05-15 11:02:05
--> 
<template>
    <div class="harf_wrap">
        <i class="el-icon-caret-left left_icon" @click="handleAdd(currentFirstDate,-7)"></i>
        <div class="top_date">
            <ul class="list">
                <li class="date_item" v-for="(dayName,index) in weekList" :key="index">
                    <span class="date">{{dayName.date}}</span>
                    <span class="name">{{dayName.name}}</span>
                    <span
                        :class="Mtils.extention.formatDate(new Date(),'yyyy-MM-dd') === dayName.date ? 'color_line' : 'line'"
                    ></span>
                </li>
            </ul>
        </div>
        <div class="bottom_list">
            
            <ul class="list">
                <li class="date_item" v-for="(day,index) in weekList" :key="index">
                    <div class="item_box" v-show="setTimeIntervalShow(day.date) === 'is_open'">
                        <span
                            class="open_is_true item"
                            v-for="(timeInterval,index) in dayTimeList"
                            :key="index"
                        >{{timeInterval.name}}</span>
                    </div>
                    <div class="item_box" v-show="setTimeIntervalShow(day.date) === 'is_expire'">
                        <span
                            class="item"
                            v-for="(timeInterval,index) in dayTimeList"
                            :key="index"
                        >已过期</span>
                    </div>
                    <div class="item_box" v-show="setTimeIntervalShow(day.date) === 'is_not_open'">
                        <span
                            class="item"
                            v-for="(timeInterval,index) in dayTimeList"
                            :key="index"
                        >暂未开放</span>
                    </div>
                </li>
            </ul>
        </div>
        <i class="el-icon-caret-right right_icon" @click="handleAdd(currentFirstDate,7)"></i>
    </div>
</template>

<script>
export default {
    data() {
        return {
            weekList: [
                {
                    name: "星期日",
                    type: 0
                },
                {
                    name: "星期一",
                    type: 1
                },
                {
                    name: "星期二",
                    type: 2
                },
                {
                    name: "星期三",
                    type: 3
                },
                {
                    name: "星期四",
                    type: 4
                },
                {
                    name: "星期五",
                    type: 5
                },
                {
                    name: "星期六",
                    type: 6
                }
            ],
            dayTimeList: [
                {
                    name: "上午",
                    halfType: 1
                },
                {
                    name: "下午",
                    halfType: 2
                },
                {
                    name: "晚上",
                    halfType: 3
                }
            ],
            currentFirstDate: new Date()
        };
    },
    computed: {},
    created() {},
    mounted() {
        this.setDate(this.currentFirstDate);
    },
    watch: {},
    methods: {
        /**
         * @description: 格式化时间
         * @param {type}
         * @return:
         * @author: kangpeng
         */
        formatDate(date) {
            return this.Mtils.extention.formatDate(date, "yyyy-MM-dd");
        },
        /**
         * @description: 加 / 减时间
         * @param {type}
         * @return:
         * @author: kangpeng
         */
        addDate(date, n) {
            date.setDate(date.getDate() + n);
            return date;
        },
        /**
         * @description: 设置日期
         * @param {type}
         * @return:
         * @author: kangpeng
         */
        setDate(date) {
            var week = date.getDay();
            date = this.addDate(date, week * -1);
            this.currentFirstDate = new Date(date);
            this.weekList.forEach((item, index) => {
                this.$set(
                    item,
                    "date",
                    this.formatDate(index == 0 ? date : this.addDate(date, 1))
                );
            });
        },
        /**
         * @description: 切换上一周 / 下一周
         * @param {type}
         * @return:
         * @author: kangpeng
         */
        handleAdd(currentFirstDate, day) {
            this.setDate(this.addDate(currentFirstDate, day));
        },
        /**
         * @description: 设置有效时间区间
         * @param {type}
         * @return:
         * @author: kangpeng
         */
        setTimeIntervalShow(date) {
            const currTime = new Date(date);
            const endTime = new Date("2020-12-12");
            const todayTime = new Date(Date.now() - 8.64e7);
            if (currTime < todayTime) {
                return "is_expire";
            } else if (currTime > todayTime && currTime < endTime) {
                return "is_open";
            } else if (currTime > endTime) {
                return "is_not_open";
            }
        }
    }
};
</script>

<style scoped lang="less">
.harf_wrap {
    border: 1px solid #ccc;
    box-sizing: border-box;
    padding: 20px;
    margin: 20px;
    position: relative;
    .left_icon {
        cursor: pointer;
        font-size: 20px;
        position: absolute;
        left: 10px;
        top: 50%;
    }
    .right_icon {
        cursor: pointer;
        font-size: 20px;
        position: absolute;
        right: 10px;
        top: 50%;
    }
    .top_date {
        .list {
            display: flex;
            .date_item {
                flex: 1;
                height: 50px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                .date {
                    margin-bottom: 5px;
                }
                .color_line {
                    width: 20px;
                    height: 5px;
                    margin-top: 5px;
                    background: #10baaa;
                    border-radius: 2px;
                }
                .line {
                    width: 20px;
                    height: 5px;
                    margin-top: 5px;
                    background: #fff;
                    border-radius: 2px;
                }
            }
        }
    }
    .bottom_list {
        .list {
            display: flex;
            .date_item {
                flex: 1;
                display: flex;
                flex-direction: column;
                align-items: center;
                .item_box {
                    .item {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        width: 100px;
                        height: 50px;
                        box-sizing: border-box;
                        margin: 2px;
                        padding: 10px;
                        border: 1px solid #eee;
                    }
                }
            }
        }
    }
}
</style>
