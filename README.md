<br>

### um-note是基于[prismjs](https://prismjs.com/extending.html)开发的语法高亮`vue3`组件, 支持编辑和提交

### &diams; `vue2版um-note` -> 请看 [doc-note](https://www.npmjs.com/package/doc-note)
<br>

### Um-note is a syntax highlighting `vue3` component developed based on [prismjs](https://prismjs.com/extending.html), which supports editing and submission

### &diams; `um-note for vue2` -> see [doc-note](https://www.npmjs.com/package/doc-note)
<br>

## <a id="chApi">`中文文档`</a> | [English Api](#enApi)
<br>

## 完整demo -> **[Demo & Sound Code](https://github.com/ModernFarmer/um-note)**
<br>

![](https://pic.imgdb.cn/item/611befad4907e2d39c137f7a.gif)
<br><br>

## \-\- 基本用法 \-\-
<br>

\- 下载依赖
```javascript
npm i um-note -S
```
<br>

\-&nbsp;&nbsp;&nbsp;注册组件
```javascript
// main.js
import { UmNote, UmNoteConfig } from 'um-note'

// UmNoteConfig是um-note组件的配置方法, 相当于初始化方法, 必须在createApp(App).use(UmNote)之前执行.
UmNoteConfig()

createApp(App).use(UmNote).mount('#app')
```
\* [UmNoteConfig 配置](#UmNoteConfig)
<br>

\-&nbsp;&nbsp;&nbsp;.vue文件中使用
```html
<template>
  <um-note :codes="code"/>
</template>
```
```javascript
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    const code = ref(`const helloWord = 'Hello, um-note!'`)

    return {
      code,
    }
  }
})
```
<br>

## \-\- props \-\-
<br>

|参数|说明|类型|默认值|
|-|-|-|-|
|width|组件的宽度. *\*必须带单位.*|string|'100%'|
|height|组件的高度. *\*必须带单位.*|string|'auto'|
|editable|是否开启可编辑功能. 如果`editable`的值是false, 则隐藏组件右上角的编辑开关.|boolean|false|
|foldable|是否开启折叠功能. 如果`foldable`的值是false, 则`unfold`属性将失效, 组件将保持展开状态.|boolean|true|
|unfold|是否默认展开组件.|boolean|false|
|\*codes|需要展示的代码. [查看属性codes的格式](#codeFormat).|string \| object \| array|[]|
|language|组件的默认语言.|string|'javascript'|
<br>

## \-\- event \-\-
<br>

|名称|说明|回调参数|回调参数类型|回调参数说明|
|-|-|-|-|-|
|submit|组件提交操作时的回调函数. [完整示例demo](https://github.com/ModernFarmer/um-note)|[submitInfo](#submitInfo)|object|当前提交的内容信息和初始化编辑状态方法.|
<br>

### \-\-\- <a id="codeFormat">codes的格式</a> \-\-\-

|类型|格式|示例|
|-|-|-|
|string|-|\`const value = 'Hello Word!'\`|
|object|{<br>&nbsp;&nbsp;&nbsp;&nbsp;`language`:&nbsp;&nbsp;[ `string` \| *可选* \| 默认: 'javascript' ],<br>&nbsp;&nbsp;&nbsp;&nbsp;`code`:&nbsp;&nbsp;[ `string` \| *可选* \| 默认: '' ]<br>}|{<br>&nbsp;&nbsp;&nbsp;&nbsp;`language`:&nbsp;&nbsp;'javascript',<br>&nbsp;&nbsp;&nbsp;&nbsp;`code`:&nbsp;&nbsp;\`const value = 'Hello Word!'\`<br>}|
|array|[<br>&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`language`:&nbsp;&nbsp;[ `string` \| *可选* \| 默认: 'javascript' ],<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`code`:&nbsp;&nbsp;[ `string` \| *可选* \| 默认: '' ]<br>&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;......<br>]|[<br>&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`language`:&nbsp;&nbsp;'html',<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`code`:&nbsp;&nbsp;\`\<div>{{ msg }}\<div>\`<br>&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`language`:&nbsp;&nbsp;'javascript',<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`code`:&nbsp;&nbsp;\`const msg = 'Hello Word!'\`<br>&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;......<br>]|
<br>

### \-\-\- <a id="submitInfo">submitInfo</a> \-\-\-

|submitInfo的属性|类型|说明|
|-|-|-|
|data|array|需要提交的数据. \[<br>&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;code : \[ 原始展示用代码 \| string \],<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;language : \[ 实际代码语言 \| string \],<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;processedCode : \[ prismjs处理过的代码 \| string \],<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;showingLanguage : \[ 展示的语言 \| string \]<br>&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;......<br>\]|
|close|function|初始化组件的编辑状态为'未编辑'状态.|
<br>

## \-\- <a id="UmNoteConfig">UmNoteConfig 配置</a> \-\- &nbsp;&nbsp;\[[完整UmNoteConfig示例](#UmNoteConfig-example)\]

\- UmNoteConfig&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;* *`UmNoteConfig必须在组件挂载之前被调用`*
<br>

|名称|类型|功能|回调参数|回调参数类型|回调参数说明|
|-|-|-|-|-|-|
|UmNoteConfig|function|配置um-note的主题、支持语言、权限等.|[Configure](#Configure)|object|UmNoteConfig方法的配置对象|
<br>

### \-\-\- <a id="Configure">Configure</a> \-\-\-

|Configure的属性|类型|功能|默认值|回调参数|回调参数类型|回调参数说明|
|-|-|-|-|-|-|-|
|theme|string|配置um-note的主题. \[[所有主题](#theme)\]. \[[示例](#example-theme)\].|'default'|-|-|-|
|languages|array|配置um-note支持的语言. \[[所有可被支持的语言](#language)\]. \[[示例](#example-language)\]|['html', 'javascript', 'css']|-|-|-|
|contentNames|object|配置um-note中删除代码块弹框中的相关文字描述. \[[示例](#contentNames)\]|undefined|-|-|-|
|editConfigure|function|配置um-note中的编辑权限. \[[示例](#editConfigure)\]|undefined|`next`|function|继续下一步.|
|addConfigure|function|配置um-note中添加代码块权限. \[[示例](#addConfigure)\]|undefined|`next`|function|继续下一步.|
|removeConfigure|function|配置um-note中删除代码块权限. \[[示例](#removeConfigure)\]|undefined|`next`|function|继续下一步.|
|submitConfigure|function|配置um-note中的提交权限. \[[示例](#submitConfigure)\]|undefined|`next`|function|继续下一步.|
<br>

### $ - 配置示例
<br>

### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\- 配置主题
#### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\- <a id="theme">所有支持的主题</a>

```javascript
// 本组件一共可支持8中主题, 分别是: 'default', 'coy', 'dark', 'funky', 'okaidia', 'solarizedlight', 'tomorrow', 'twilight'
// 可通过全局属性Prism.allThemes来获取所有支持的主题
console.log(Prism.allThemes) // ['default', 'coy', 'dark', 'funky', 'okaidia', 'solarizedlight', 'tomorrow', 'twilight']
```

#### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\- <a id="example-theme">主题配置示例</a>

```javascript
UmNoteConfig({
  theme: 'okaidia'
})
```
----------
<br>

### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\- 配置语言
#### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\- <a id="language">所有支持的语言</a>

```javascript
// 本组件一共可支持270+种语言
// 可通过全局属性Prism.allLanguages来获取所有支持的语言
console.log(Prism.allLanguages) // ['html', 'javascript', 'css', ...]

// 可通过全局方法Prism.hasLanguage来判断某种语言是否被支持
/**
 * 检测语言是否被支持
 * 
 * @param {String} 被检测的语言字符串
 * 
 * @returns {Boolean} 
 */
console.log(Prism.hasLanguage('html')) // true
```

#### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\- <a id="example-language">语言配置示例</a>

```javascript
UmNoteConfig({
  languages: ['html', 'javascript', 'css', 'c++', 'ASP.NET (C#)']
})
```
![](https://pic.imgdb.cn/item/611befad4907e2d39c138035.png)

----------
<br>

### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\- <a id="contentNames">配置删除文本</a>
<br>

```javascript
UmNoteConfig({
  contentNames: {
    cancel: 'cancel', // 取消按钮展示文本
    confirm: 'done', // 确定按钮展示文本
    explain: 'Are you sure to delete??', // 删除弹框内容展示文本
  }
})
```
![](https://pic.imgdb.cn/item/611befad4907e2d39c137fd6.png)

----------
<br>

### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\- <a id="editConfigure">配置编辑权限</a>
<br>

```javascript
UmNoteConfig({
  // 如果不想配置edit权限, 请不要设置editConfigure, 或者在editConfigure内部直接调用next()方法
  editConfigure (next) {
    if (store.getters.isLogin) { // 如果用户已登录
      next() // 继续下一步
    } else {
      alert(`You don't have permission! Please log in first!!!`)
    }
  }
})
```

----------
<br>

### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\- <a id="addConfigure">配置添加权限</a>
<br>

```javascript
UmNoteConfig({
  // 如果不想配置add权限, 请不要设置addConfigure, 或者在addConfigure内部直接调用next()方法
  addConfigure (next) {
    if (store.getters.isLogin) { // 如果用户已登录
      next() // 继续下一步
    } else {
      alert(`You don't have permission! Please log in first!!!`)
    }
  }
})
```

----------
<br>

### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\- <a id="removeConfigure">配置删除权限</a>
<br>

```javascript
UmNoteConfig({
  // 如果不想配置remove权限, 请不要设置removeConfigure, 或者在removeConfigure内部直接调用next()方法
  removeConfigure (next) {
    if (store.getters.isLogin) { // 如果用户已登录
      next() // 继续下一步
    } else {
      alert(`You don't have permission! Please log in first!!!`)
    }
  }
})
```

----------
<br>

### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\- <a id="submitConfigure">配置提交权限</a>
<br>

```javascript
UmNoteConfig({
  // 如果不想配置submit权限, 请不要设置submitConfigure, 或者在submitConfigure内部直接调用next()方法
  submitConfigure (next) {
    if (store.getters.isLogin) { // 如果用户已登录
      next() // 继续下一步
    } else {
      alert(`You don't have permission! Please log in first!!!`)
    }
  }
})
```

----------
<br>

### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\- <a id="UmNoteConfig-example">完整UmNoteConfig配置</a>
<br>

```javascript
UmNoteConfig({
  /**
   * 权限配置-使页面可被编辑
   * 
   * @param {Function} next 继续下一步
   */
  editConfigure (next) { // 如果不想配置edit权限, 请不要设置editConfigure, 或者在editConfigure内部直接调用next()方法
    if (store.getters.isLogin) { // 如果用户已登录
      next()
    } else {
      alert(`Oh, no! You don't have 'edit' permission! Please log in first!!!`)
    }
  },
  /**
   * 权限配置-添加代码块
   * 
   * @param {Function} next 继续下一步
   */
  addConfigure (next) { // 如果不想配置add权限, 请不要设置addConfigure, 或者在addConfigure内部直接调用next()方法
    if (store.getters.isLogin) {
      next()
    } else {
      alert(`Oh, no! You don't have 'add' permission! Please log in first!!!`)
    }
  },
  /**
   * 权限配置-删除代码块
   * 
   * @param {Function} next 继续下一步
   */
  removeConfigure (next) { // 如果不想配置remove权限, 请不要设置removeConfigure, 或者在removeConfigure内部直接调用next()方法
    if (store.getters.isLogin) {
      next()
    } else {
      alert(`Oh, no! You don't have 'remove' permission! Please log in first!!!`)
    }
  },
  /**
   * 权限配置-确认编辑的代码
   * 
   * @param {Function} next 继续下一步
   */
  submitConfigure (next) { // 如果不想配置submit权限, 请不要设置submitConfigure, 或者在submitConfigure内部直接调用next()方法
    if (store.getters.isLogin) {
      next()
    } else {
      alert(`Oh, no! You don't have 'submit' permission! Please log in first!!!`)
    }
  },
  /**
   * 配置删除代码块弹框内的文字描述
   * 
   * {Object} contentNames
   * {String} contentNames.cancel 取消按钮描述
   * {String} contentNames.confirm 确定按钮描述
   * {String} contentNames.explain 弹框内容描述
   */
  contentNames: {
    cancel: '取消',
    confirm: '确定',
    explain: '确定删除?',
  },
  /**
   * 配置添加代码块时可选择的语言
   * 
   * {Array} languages
   * 你可以通过 console.log(Prism.allLanguages) 打印出所有被支持的语言, 返回一个数组
   * 你可以通过 console.log(Prism.hasLanguage(<languageName>)) 打印出 <languageName> 语言是否被支持, 返回 true 或 false
   */
  languages: ['html', 'javascript', 'css', 'c++', 'ASP.NET (C#)'],
  /**
   * 配置主题
   * 
   * {String} theme
   * 可配置主题一共有8种: ['default', 'coy', 'dark', 'funky', 'okaidia', 'solarizedlight', 'tomorrow', 'twilight']
   */
  theme: 'default',
})
```

----------
<br>

## [中文文档](#chApi) | <a id="enApi">`English Api`</a>
<br>

## \-\- <a id="chApi">Basic Usage</a> \-\-
<br>

\- Download dependency
```javascript
npm i um-note -S
```
<br>

\-&nbsp;&nbsp;&nbsp;Register components
```javascript
// main.js
import { UmNote, UmNoteConfig } from 'um-note'

// Umnoteconfig is the configuration method of um-note components, Equivalent to initialization method, Must be executed before createapp(APP).use(UmNote).
UmNoteConfig()

createApp(App).use(UmNote).mount('#app')
```
\* [Umnoteconfig configuration](#UmNoteConfigEn)
<br>

\-&nbsp;&nbsp;&nbsp;Used in .vue files
```html
<template>
  <um-note :codes="code"/>
</template>
```
```javascript
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    const code = ref(`const helloWord = 'Hello, um-note!'`)

    return {
      code,
    }
  }
})
```
<br>

## \-\- props \-\-
<br>

|Params|Description|Type|Default|
|-|-|-|-|
|width|Width of component. *\*Must bring unit.*|string|'100%'|
|height|Height of component. *\*Must bring unit.*|string|'auto'|
|editable|Whether to turn on the editable function. If the value of `editable` is false, the edit switch in the upper right corner of the component is hidden.|boolean|false|
|foldable|Whether to turn on the folding function. If the value of `foldable` is false, the `unfold` attribute will become invalid and the component will remain unfold.|boolean|true|
|unfold|Whether to unfold components by default.|boolean|false|
|\*codes|Code to show. [View the format of attribute codes](#codeFormatEn).|string \| object \| array|[]|
|language|The default language of the component.|string|'javascript'|
<br>

## \-\- event \-\-
<br>

|Name|Description|CB Arguments|Arg Type|Arg Description|
|-|-|-|-|-|
|submit|Callback function when component submits operation. [Full sample demo](https://github.com/ModernFarmer/um-note)|[submitInfo](#submitInfoEn)|object|Content information currently submitted and method of initializing editing status.|
<br>

### \-\-\- <a id="codeFormatEn">Format of codes</a> \-\-\-

|Type|Format|Example|
|-|-|-|
|string|-|\`const value = 'Hello Word!'\`|
|object|{<br>&nbsp;&nbsp;&nbsp;&nbsp;`language`:&nbsp;&nbsp;[ `string` \| *Optional* \| Default: 'javascript' ],<br>&nbsp;&nbsp;&nbsp;&nbsp;`code`:&nbsp;&nbsp;[ `string` \| *Optional* \| Default: '' ]<br>}|{<br>&nbsp;&nbsp;&nbsp;&nbsp;`language`:&nbsp;&nbsp;'javascript',<br>&nbsp;&nbsp;&nbsp;&nbsp;`code`:&nbsp;&nbsp;\`const value = 'Hello Word!'\`<br>}|
|array|[<br>&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`language`:&nbsp;&nbsp;[ `string` \| *Optional* \| Default: 'javascript' ],<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`code`:&nbsp;&nbsp;[ `string` \| *Optional* \| Default: '' ]<br>&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;......<br>]|[<br>&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`language`:&nbsp;&nbsp;'html',<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`code`:&nbsp;&nbsp;\`\<div>{{ msg }}\<div>\`<br>&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`language`:&nbsp;&nbsp;'javascript',<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`code`:&nbsp;&nbsp;\`const msg = 'Hello Word!'\`<br>&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;......<br>]|
<br>

### \-\-\- <a id="submitInfoEn">submitInfo</a> \-\-\-

|Props of submitinfo|Type|Description|
|-|-|-|
|data|array|Data to be submitted. \[<br>&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;code : \[ Original display code \| string \],<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;language : \[ Actual code language \| string \],<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;processedCode : \[ Processed code by prismjs \| string \],<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;showingLanguage : \[ Language of presentation \| string \]<br>&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;......<br>\]|
|close|function|Initialize the edit state of the component to the 'not edited' state.|
<br>

## \-\- <a id="UmNoteConfigEn">Umnoteconfig configuration</a> \-\- &nbsp;&nbsp;\[[Complete example](#UmNoteConfig-exampleEn)\]

\- UmNoteConfig&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;* *`Umnoteconfig must be called before the component is mounted`*
<br>

|Name|Type|Description|CB Arguments|Arg Type|Arg Description|
|-|-|-|-|-|-|
|UmNoteConfig|function|Configure the theme, supported language, permissions, etc. of um-note.|[Configure](#Configure)|object|Configuration object of UmNoteConfig method|
<br>

### \-\-\- <a id="Configure">Configure</a> \-\-\-

|Props of Configure|Type|Description|Default|CB Arguments|Arg Type|Arg Description|
|-|-|-|-|-|-|-|
|theme|string|Configure topics for um-note. \[[All themes](#themeEn)\]. \[[Example](#example-themeEn)\].|'default'|-|-|-|
|languages|array|Configure languages supported for 'um-note'. \[[All supported languages](#languageEn)\]. \[[Example](#example-languageEn)\]|\['html', 'javascript', 'css'\]|-|-|-|
|contentNames|object|Configure the relevant text description in the delete code block pop-up box for 'um-note'. \[[Example](#contentNamesEn)\]|undefined|-|-|-|
|editConfigure|function|Configure edit permissions for 'um-note'. \[[Example](#editConfigureEn)\]|undefined|`next`|function|Continue to the next step.|
|addConfigure|function|Configure add code block permissions for 'um-note'. \[[Example](#addConfigureEn)\]|undefined|`next`|function|Continue to the next step.|
|removeConfigure|function|Configure delete code block permission for 'um-note'. \[[Example](#removeConfigureEn)\]|undefined|`next`|function|Continue to the next step.|
|submitConfigure|function|Configure submit permissions for 'um-note'. \[[Example](#submitConfigureEn)\]|undefined|`next`|function|Continue to the next step.|
<br>

### $ - Configuration example
<br>

### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\- Configure theme
#### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\- <a id="themeEn">All supported themes</a>

```javascript
// um-note supports a total of 8 themes: 'default', 'coy', 'dark', 'funky', 'okaidia', 'solarizedlight', 'tomorrow', 'twilight'
// All supported topics can be obtained through the global attribute Prism.allThemes
console.log(Prism.allThemes) // ['default', 'coy', 'dark', 'funky', 'okaidia', 'solarizedlight', 'tomorrow', 'twilight']
```

#### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\- <a id="example-themeEn">Theme configuration example</a>

```javascript
UmNoteConfig({
  theme: 'okaidia'
})
```
----------
<br>

### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\- Configuration language
#### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\- <a id="languageEn">All supported languages</a>

```javascript
// um-note can support 270+ languages
// All supported languages can be obtained through the global attribute Prism.allLanguages
console.log(Prism.allLanguages) // ['html', 'javascript', 'css', ...]

// The global method Prism.hasLanguage can be used to determine whether a language is supported
/**
 * Check whether the language is supported
 * 
 * @param {String} language to be detected
 * 
 * @returns {Boolean} 
 */
console.log(Prism.hasLanguage('html')) // true
```

#### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\- <a id="example-languageEn">Language configuration example</a>

```javascript
UmNoteConfig({
  languages: ['html', 'javascript', 'css', 'c++', 'ASP.NET (C#)']
})
```
![](https://pic.imgdb.cn/item/611befad4907e2d39c138035.png)

----------
<br>

### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\- <a id="contentNamesEn">Configure delete text</a>
<br>

```javascript
UmNoteConfig({
  contentNames: {
    cancel: 'cancel', // text of cancel butto
    confirm: 'done', // text of confirm butto
    explain: 'Are you sure to delete??', // text of delete popup
  }
})
```
![](https://pic.imgdb.cn/item/611befad4907e2d39c137fd6.png)

----------
<br>

### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\- <a id="editConfigureEn">Configure edit permissions</a>
<br>

```javascript
UmNoteConfig({
  // If you do not want to configure 'edit' permission, please do not set 'editconfiguration', or directly call the 'next()' method inside 'editconfiguration'
  editConfigure (next) {
    if (store.getters.isLogin) { // If the user is logged in
      next() // Continue to the next step
    } else {
      alert(`You don't have permission! Please log in first!!!`)
    }
  }
})
```

----------
<br>

### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\- <a id="addConfigureEn">Configure add permissions</a>
<br>

```javascript
UmNoteConfig({
  // If you do not want to configure 'add' permission, please do not set 'addConfigure', or directly call the 'next()' method inside 'addConfigure'
  addConfigure (next) {
    if (store.getters.isLogin) { // If the user is logged in
      next() // Continue to the next step
    } else {
      alert(`You don't have permission! Please log in first!!!`)
    }
  }
})
```

----------
<br>

### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\- <a id="removeConfigureEn">Configure delete permissions</a>
<br>

```javascript
UmNoteConfig({
  // If you do not want to configure 'remove' permission, please do not set 'removeConfigure', or directly call the 'next()' method inside 'removeConfigure'
  removeConfigure (next) {
    if (store.getters.isLogin) { // If the user is logged in
      next() // Continue to the next step
    } else {
      alert(`You don't have permission! Please log in first!!!`)
    }
  }
})
```

----------
<br>

### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\- <a id="submitConfigureEn">Configure submit permissions</a>
<br>

```javascript
UmNoteConfig({
  // If you do not want to configure 'submit' permission, please do not set 'submitConfigure', or directly call the 'next()' method inside 'submitConfigure'
  submitConfigure (next) {
    if (store.getters.isLogin) { // If the user is logged in
      next() // Continue to the next step
    } else {
      alert(`You don't have permission! Please log in first!!!`)
    }
  }
})
```

----------
<br>

### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\- <a id="UmNoteConfig-exampleEn">Full UmNoteConfig configuration</a>
<br>

```javascript
UmNoteConfig({
  /**
   * Permission configuration-Make the page editable
   * 
   * @param {Function} next Continue to the next step
   */
  editConfigure (next) { // If you do not want to configure 'edit' permission, please do not set 'editconfiguration', or directly call the 'next()' method inside 'editconfiguration'
    if (store.getters.isLogin) { // If the user is logged in
      next()
    } else {
      alert(`Oh, no! You don't have 'edit' permission! Please log in first!!!`)
    }
  },
  /**
   * Permission configuration-Add code block
   * 
   * @param {Function} next Continue to the next step
   */
  addConfigure (next) { // If you do not want to configure 'add' permission, please do not set 'addConfigure', or directly call the 'next()' method inside 'addConfigure'
    if (store.getters.isLogin) {
      next()
    } else {
      alert(`Oh, no! You don't have 'add' permission! Please log in first!!!`)
    }
  },
  /**
   * Permission configuration-Delete code block
   * 
   * @param {Function} next Continue to the next step
   */
  removeConfigure (next) { // If you do not want to configure 'remove' permission, please do not set 'removeConfigure', or directly call the 'next()' method inside 'removeConfigure'
    if (store.getters.isLogin) {
      next()
    } else {
      alert(`Oh, no! You don't have 'remove' permission! Please log in first!!!`)
    }
  },
  /**
   * Permission configuration-Confirm edited code
   * 
   * @param {Function} next Continue to the next step
   */
  submitConfigure (next) { // If you do not want to configure 'submit' permission, please do not set 'submitConfigure', or directly call the 'next()' method inside 'submitConfigure'
    if (store.getters.isLogin) {
      next()
    } else {
      alert(`Oh, no! You don't have 'submit' permission! Please log in first!!!`)
    }
  },
  /**
   * Configure the text description in the delete code block pop-up box
   * 
   * {Object} contentNames
   * {String} contentNames.cancel text of cancel butto
   * {String} contentNames.confirm text of confirm butto
   * {String} contentNames.explain text of delete popup
   */
  contentNames: {
    cancel: '取消',
    confirm: '确定',
    explain: '确定删除?',
  },
  /**
   * Configure the language that can be selected when adding code blocks
   * 
   * {Array} languages
   * You can print out all supported languages through 'console.log(Prism.allLanguages)', return an array
   * You can print out whether the '<languename>' language is supported through 'console.log(Prism.hasLanguage(<languageName>))', return true or false
   */
  languages: ['html', 'javascript', 'css', 'c++', 'ASP.NET (C#)'],
  /**
   * Configure theme
   * 
   * {String} theme
   * There are 8 configurable themes: ['default', 'coy', 'dark', 'funky', 'okaidia', 'solarizedlight', 'tomorrow', 'twilight']
   */
  theme: 'default',
})
```

----------
<br>
