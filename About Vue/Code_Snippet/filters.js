/*
 * @Description: 定义过滤器
 * @Autor: kangpeng
 * @Date: 2019-12-12 16:50:10
 * @LastEditors: kangpeng
 * @LastEditTime: 2019-12-12 16:55:33
 */
const ellipsis = (value, num = 10) => {
    if (!value) return '';
    if (value.length > num) {
        return value.slice(0, num) + '...'
    }
    return value
}

export {
    ellipsis
}