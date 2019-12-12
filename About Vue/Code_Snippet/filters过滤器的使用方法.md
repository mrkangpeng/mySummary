###  filters过滤器的使用方法

> 在使用Vue开发过程中,我们可能经常会使用到一些时间格式化,字符超出省略号的一些操作,其实都可以使用过滤器来完成

#### 使用方式

> 在对应的文件夹新建一个js文件,名字你自己定义,如图,我在utils文件夹里面定义了一个filters.js的文件

<img src="C:\Users\len\Desktop\front_end_summary By Peng\About Vue\File\文件位置.png" alt="文件位置" style="zoom:75" />

####	书写一个简单的过滤器

> 然后我们来书写一个超出生成省略号的过滤器,代码如下:

```javascript
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
```

####	在main.js中全局引入

> 如上代码,我们像这样暴露,然后在`ain.js`全局引入,代码如下:

```javascript
import * as filters from './utils/filters'
Object.keys(filters).forEach(key => {
	Vue.filter(key, filters[key])
})
```

#### 在vue文件中使用

> 定义好了以后,我们就可以在`vue`文件中愉快地使用了,如下图:

![vue文件中书写方式](C:\Users\len\Desktop\front_end_summary By Peng\About Vue\File\vue文件中书写方式.png)