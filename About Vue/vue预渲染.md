#### vue预渲染

需要用到的核心插件

```javascript
npm install prerender-spa-plugin --save-dev
```

>如果你调研服务器端渲染 (`SSR`) 只是用来改善少数营销页面（例如 `/`, `/about`, `/contact` 等）的 `SEO`，那么你可能需要**预渲染**。无需使用 web 服务器实时动态编译 HTML，而是使用预渲染方式，在构建时 (build time) 简单地生成针对特定路由的静态 HTML 文件。优点是设置预渲染更简单，并可以将你的前端作为一个完全静态的站点。
>
>如果你使用 `webpack`，你可以使用 [prerender-spa-plugin](https://github.com/chrisvfritz/prerender-spa-plugin) 轻松地添加预渲染。它已经被 `Vue `应用程序广泛测试 - 事实上，[作者](https://github.com/chrisvfritz)是 `Vue` 核心团队的成员。

##### 在`vue-cli3.0`中的配置

* 在`vue.config.js`中的配置

```javascript
const path = require('path');
const PrerenderSPAPlugin = require('prerender-spa-plugin');
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;
module.exports = {
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            // 为生产环境修改配置...
            return {
                plugins: [
                    // 预渲染配置
                    new PrerenderSPAPlugin({
                        //要求-给的WebPack-输出应用程序的路径预渲染。
                        staticDir: path.join(__dirname, 'dist'),
                        //必需，要渲染的路线。
                        // 对应自己的路由文件，比如a有参数，就需要写成 /a/param1。
                        routes: ['/home', '/venueCenter'],
                        //必须，要使用的实际渲染器，没有则不能预编译
                        renderer: new Renderer({
                            inject: {
                                foo: 'bar'
                            },
                            headless: false, //渲染时显示浏览器窗口。对调试很有用。  
                            //等待渲染，直到检测到指定元素。
                            //例如，在项目入口使用`document.dispatchEvent(new Event('custom-render-trigger'))` 
                            renderAfterDocumentEvent: 'render-event',
                            renderAfterTime: 5000 //renderAfer 多中条件选一个
                        })
                    })
                ],
            }
        } else {
            // 为开发环境修改配置...
            return;
        }
    }
}
```

* 在`main.js`中的配置

  ```javascript
  new Vue({
    router,
    store,
    render: h => h(App),
    mounted () {
      document.dispatchEvent(new Event('render-event'))
    }
  }).$mount('#app')
  ```

##### 注意事项：

* ##### `.router.js` 中路由必须设置 mode: “history”模式 

* ##### `npm run build`打包，生成的 dist 目录里有配置的每个路由名称对应的文件夹，里面的`index.html`有内容，就代表成功了。反之，请重新按步骤检查

