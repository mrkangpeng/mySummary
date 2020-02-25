#### 基于element_UI的分页组件再封装

>详细代码直接看文件，这里具体展示父组件中如何调用，代码如下：

```javascript
<Pagination 
    @pagination="pageChange" 
    :page="this.page" 
    :size="this.size" 
    :total="this.total"
></Pagination>
```

>methods方法中写监听事件的方法拿到监听的数据

```javascript
pageChange(currInfo){
    this.page = currInfo.page
    this.size = currInfo.size
    this.refreshTableData(); // 刷新列表数据
},
```

