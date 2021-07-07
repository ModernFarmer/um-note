@/utils/index.js

import { _downLoadFile, _changeTitle, ... } from '@/utils'

_downLoadFile         下载非同源图片
_changeTitle          改变并显示移动端html的title(IOS环境下, 直接给document.title赋值的话页面上面的title不会改变)
_copy                 触发一个元素的事件时复制指定内容
_isIE                 判断当前浏览器是否为IE, 返回null或者IE版本号
_BD                   给一个dom元素绑定事件
_unBD                 解除一个dom元素的绑定事件
_editKeyframes        修改名为keyframeName的keyframes样式, 返回一个方法fn
_chunkTailRecursion   尾回调优化的实现
_listToTree           将扁平化数据转换成树状数据


@/utils/c2py/index.js

import c2py from '@/utils/c2py'

c2py.abbreviation     中文转拼音-简写
c2py.fullname         中文转拼音-全称
c2py.camelcase        中文转拼音-驼峰全称
c2py.lowercase        中文转拼音-小写全称
c2py.uppercase        中文转拼音-大写全称