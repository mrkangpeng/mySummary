## 关于使用element中联级选择器的一个bug

###	描述 :

> 根据下面的删除图标取消上面的选中状态,实现上下联动

### 如图 :

<img src="C:\Users\len\Desktop\front_end_summary By Peng\About Vue\File\cascader.png" alt="cascader" style="zoom:50%;" />

### 代码如下 :

```javascript
delteServer(index,item){
    this.addServers.splice(index,1)
    this.serveTypeId.forEach((value,idx)=>{
        let id = value[value.length-1]
        if(id == item.id){
            this.fromData.amount = this.fromData.amount-item.price
            this.serveTypeId.splice(idx,1)
        }
    })
    this.$forceUpdate()
},
```

### 实际上的效果如图 :



<img src="C:\Users\len\Desktop\front_end_summary By Peng\About Vue\File\cascader_bug.gif" alt="cascader_bug" style="zoom:50%;" />

> 使用数组的方法即使删除了下面的数据,但是上面的选中状态并没有改变

---

> 仔细看文档发现这么一个方法`clearCheckedNodes()`,传入id,成功解决了问题

### 代码如下 : 

```javascript
delteServer(index,item){
    this.addServers.splice(index,1)
    this.serveTypeId.forEach((value,idx)=>{
        let id = value[value.length-1]
        if(id == item.id){
            this.fromData.amount = this.fromData.amount-item.price
            this.serveTypeId.splice(idx,1)
            // 必须调用它的方法才能去除选中,传入id,直接改变可选数组是不起作用的
            this.$refs.myCascader.clearCheckedNodes(idx)
        }
    })
    this.$forceUpdate()
},
```

