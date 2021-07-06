# um-note

### 代码高亮插件
[prism](https://prismjs.com/extending.html)
entry: index.html

全局对象: Prism

Prism.languages  语言语法对象
Prism.highlightElement(el)  高亮一个dom元素(pre元素或者code元素)
Prism.highlight(codeString, grammar, nameString)  获取生成样式的代码字符串; codeString: 原始代码字符串, grammar: 语言语法, nameString: 名称(给hooks.run钩子使用)

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
