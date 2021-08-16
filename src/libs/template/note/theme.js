/**
 * 主题颜色配置相关数据
 */
export const themeConfigMap = {
  default: {
    container_background: '#f5f2f0', // 最外层容器背景颜色
    head_background_hidden: 'rgb(0, 0, 0, .1)', // 折叠代码时头部bar背景颜色
    unfold_text_color: '#07a', // 左上角折叠展开按钮的字体颜色
    unfold_arrow_color: '#690', // 左上角折叠展开箭头的颜色
    soroll_thumb_background: 'rgba(0, 0, 0, .05)', // 滚动条滑块颜色
    language_color: 'rgb(180, 180, 180)', // 语言提示字体的颜色
    block_hr_background: 'rgb(230, 230, 230)', // 分割线样式
    languageSelect_container: '#eae6e3', // 添加弹框和删除弹框背景颜色
    languageSelect_border: 'rgba(0, 0, 0, .2)', // 添加弹框的包边线条颜色
    deleteSelect_border: 'rgba(0, 0, 0, .2)', // 删除弹框的包边线条颜色
    button_background: 'rgba(0, 0, 0, .05)', // 弹框里面的按钮的背景颜色
    button_hover_add: '#e90', // 添加弹框里面的按钮hover状态下的字体颜色
    button_hover_delete: '#e90', // 删除弹框里面的按钮hover状态下的字体颜色
    button_hover_background: 'rgba(0, 0, 0, .08)', // 添加弹框和删除弹框里面的按钮hover状态下的背景颜色
    edit_container: 'rgba(0, 0, 0, .05)', // 编辑二次确认弹框背景颜色
    edit_color: '#6b6b6b', // 编辑二次确认弹框按钮的字体颜色
    edit_background_hover: 'rgba(0, 0, 0, .1)', // 编辑二次确认弹框按钮hover状态下的背景颜色
    edit_color_hover_cancel: 'white', // 编辑二次确认弹框取消按钮hover状态下的字体颜色
    edit_color_hover_ok: 'white', // 编辑二次确认弹框确认按钮hover状态下的字体颜色
    delete_button_hover_minus: 'rgba(0, 0, 0, .4)', // 删除代码块按钮hover下的字体颜色
    delete_button_hover_add: 'rgba(0, 0, 0, .4)', // 添加代码块按钮hover下的字体颜色
    add_minus_color: 'rgba(0, 0, 0, .2)', // 添加删除代码块按钮的字体颜色
    confirm_message_color: '#4d4d4d', // 删除代码块弹框的提示信息字体颜色
  },
  coy: {
    container_background: '#fdfdfd', // 最外层容器背景颜色
    head_background_hidden: 'rgb(0, 0, 0, .02)', // 折叠代码时头部bar背景颜色
    unfold_text_color: '#e90', // 左上角折叠展开按钮的字体颜色
    unfold_arrow_color: '#a67f59', // 左上角折叠展开箭头的颜色
    soroll_thumb_background: 'rgba(0, 0, 0, .04)', // 滚动条滑块颜色
    language_color: 'rgb(220, 220, 220)', // 语言提示字体的颜色
    block_hr_background: 'rgb(240, 240, 240)', // 分割线样式
    languageSelect_container: 'rgb(245, 245, 245)', // 添加弹框和删除弹框背景颜色
    languageSelect_border: 'rgba(0, 0, 0, .15)', // 添加弹框的包边线条颜色
    deleteSelect_border: 'rgba(0, 0, 0, .15)', // 删除弹框的包边线条颜色
    button_background: 'rgba(0, 0, 0, .08)', // 弹框里面的按钮的背景颜色
    button_hover_add: 'white', // 添加弹框里面的按钮hover状态下的字体颜色
    button_hover_delete: 'white', // 删除弹框里面的按钮hover状态下的字体颜色
    button_hover_background: 'rgba(0, 0, 0, .15)', // 添加弹框和删除弹框里面的按钮hover状态下的背景颜色
    edit_container: 'rgba(0, 0, 0, .05)', // 编辑二次确认弹框背景颜色
    edit_color: '#6b6b6b', // 编辑二次确认弹框按钮的字体颜色
    edit_background_hover: 'rgba(0, 0, 0, .2)', // 编辑二次确认弹框按钮hover状态下的背景颜色
    edit_color_hover_cancel: 'white', // 编辑二次确认弹框取消按钮hover状态下的字体颜色
    edit_color_hover_ok: 'white', // 编辑二次确认弹框确认按钮hover状态下的字体颜色
    delete_button_hover_minus: '#979797', // 删除代码块按钮hover下的字体颜色
    delete_button_hover_add: '#979797', // 添加代码块按钮hover下的字体颜色
    add_minus_color: 'rgba(0, 0, 0, .2)', // 添加删除代码块按钮的字体颜色
    confirm_message_color: '#4d4d4d', // 删除代码块弹框的提示信息字体颜色
  },
  dark: {
    container_background: '#272822', // 最外层容器背景颜色
    head_background_hidden: 'rgb(114, 114, 114)', // 折叠代码时头部bar背景颜色
    unfold_text_color: 'orange', // 左上角折叠展开按钮的字体颜色
    unfold_arrow_color: '#e6db74', // 左上角折叠展开箭头的颜色
    soroll_thumb_background: 'rgba(255,255,255,.25)', // 滚动条滑块颜色
    language_color: 'rgb(114, 114, 114)', // 语言提示字体的颜色
    block_hr_background: 'rgb(50, 50, 50)', // 分割线样式
    languageSelect_container: '#383838', // 添加弹框和删除弹框背景颜色
    languageSelect_border: 'rgba(255, 255, 255, .2)', // 添加弹框的包边线条颜色
    deleteSelect_border: 'rgba(255, 255, 255, .2)', // 删除弹框的包边线条颜色
    button_background: 'rgba(255, 255, 255, .1)', // 弹框里面的按钮的背景颜色
    button_hover_add: '#0fec3f', // 添加弹框里面的按钮hover状态下的字体颜色
    button_hover_delete: '#66d9ef', // 删除弹框里面的按钮hover状态下的字体颜色
    button_hover_background: 'rgba(255, 255, 255, .2)', // 添加弹框和删除弹框里面的按钮hover状态下的背景颜色
    edit_container: 'rgba(255, 255, 255, .2)', // 编辑二次确认弹框背景颜色
    edit_color: 'white', // 编辑二次确认弹框按钮的字体颜色
    edit_background_hover: 'rgba(255, 255, 255, .2)', // 编辑二次确认弹框按钮hover状态下的背景颜色
    edit_color_hover_cancel: '#f96f6f', // 编辑二次确认弹框取消按钮hover状态下的字体颜色
    edit_color_hover_ok: '#0fec3f', // 编辑二次确认弹框确认按钮hover状态下的字体颜色
    delete_button_hover_minus: 'rgb(180, 180, 180)', // 删除代码块按钮hover下的字体颜色
    delete_button_hover_add: 'rgb(180, 180, 180)', // 添加代码块按钮hover下的字体颜色
    add_minus_color: 'rgb(114, 114, 114)', // 添加删除代码块按钮的字体颜色
    confirm_message_color: 'hsl(350, 40%, 70%)', // 删除代码块弹框的提示信息字体颜色
  },
  funky: {
    container_background: 'rgba(0, 0, 0, .1)', // 最外层容器背景颜色
    head_background_hidden: 'rgba(0, 0, 0, .05)', // 折叠代码时头部bar背景颜色
    unfold_text_color: 'rgba(0, 0, 0, .7)', // 左上角折叠展开按钮的字体颜色
    unfold_arrow_color: 'rgba(0, 0, 0, .5)', // 左上角折叠展开箭头的颜色
    soroll_thumb_background: 'rgba(0,0,0,.15)', // 滚动条滑块颜色
    language_color: 'rgba(0, 0, 0, .2)', // 语言提示字体的颜色
    block_hr_background: 'rgba(0, 0, 0, .1)', // 分割线样式
    languageSelect_container: 'rgba(0, 0, 0, .2)', // 添加弹框和删除弹框背景颜色
    languageSelect_border: 'rgba(255, 255, 255, .2)', // 添加弹框的包边线条颜色
    deleteSelect_border: 'rgba(255, 255, 255, .2)', // 删除弹框的包边线条颜色
    button_background: 'rgba(0, 0, 0, .15)', // 弹框里面的按钮的背景颜色
    button_hover_add: '#0fec3f', // 添加弹框里面的按钮hover状态下的字体颜色
    button_hover_delete: '#66d9ef', // 删除弹框里面的按钮hover状态下的字体颜色
    button_hover_background: 'rgba(0, 0, 0, .25)', // 添加弹框和删除弹框里面的按钮hover状态下的背景颜色
    edit_container: 'rgba(0, 0, 0, .1)', // 编辑二次确认弹框背景颜色
    edit_color: '#6b6b6b', // 编辑二次确认弹框按钮的字体颜色
    edit_background_hover: 'rgba(0, 0, 0, .25)', // 编辑二次确认弹框按钮hover状态下的背景颜色
    edit_color_hover_cancel: 'white', // 编辑二次确认弹框取消按钮hover状态下的字体颜色
    edit_color_hover_ok: 'white', // 编辑二次确认弹框确认按钮hover状态下的字体颜色
    delete_button_hover_minus: 'orange', // 删除代码块按钮hover下的字体颜色
    delete_button_hover_add: 'orange', // 添加代码块按钮hover下的字体颜色
    add_minus_color: 'rgba(0, 0, 0, .25)', // 添加删除代码块按钮的字体颜色
    confirm_message_color: 'rgba(255, 255, 255, 08)', // 删除代码块弹框的提示信息字体颜色
  },
  okaidia: {
    container_background: '#272822', // 最外层容器背景颜色
    head_background_hidden: 'rgb(114, 114, 114)', // 折叠代码时头部bar背景颜色
    unfold_text_color: 'orange', // 左上角折叠展开按钮的字体颜色
    unfold_arrow_color: '#e6db74', // 左上角折叠展开箭头的颜色
    soroll_thumb_background: 'rgba(255, 255, 255, .2)', // 滚动条滑块颜色
    language_color: 'rgb(114, 114, 114)', // 语言提示字体的颜色
    block_hr_background: 'rgb(50, 50, 50)', // 分割线样式
    languageSelect_container: '#474747', // 添加弹框和删除弹框背景颜色
    languageSelect_border: '#0A84D7', // 添加弹框的包边线条颜色
    deleteSelect_border: '#f92672', // 删除弹框的包边线条颜色
    button_background: 'rgba(255, 255, 255, .1)', // 弹框里面的按钮的背景颜色
    button_hover_add: '#0fec3f', // 添加弹框里面的按钮hover状态下的字体颜色
    button_hover_delete: '#66d9ef', // 删除弹框里面的按钮hover状态下的字体颜色
    button_hover_background: 'rgba(255, 255, 255, .2)', // 添加弹框和删除弹框里面的按钮hover状态下的背景颜色
    edit_container: 'rgba(255, 255, 255, .2)', // 编辑二次确认弹框背景颜色
    edit_color: 'white', // 编辑二次确认弹框按钮的字体颜色
    edit_background_hover: 'rgba(255, 255, 255, .2)', // 编辑二次确认弹框按钮hover状态下的背景颜色
    edit_color_hover_cancel: '#f96f6f', // 编辑二次确认弹框取消按钮hover状态下的字体颜色
    edit_color_hover_ok: '#0fec3f', // 编辑二次确认弹框确认按钮hover状态下的字体颜色
    delete_button_hover_minus: '#e6db74', // 删除代码块按钮hover下的字体颜色
    delete_button_hover_add: '#e6db74', // 添加代码块按钮hover下的字体颜色
    add_minus_color: 'rgb(114, 114, 114)', // 添加删除代码块按钮的字体颜色
    confirm_message_color: '#f92672', // 删除代码块弹框的提示信息字体颜色
  },
  solarizedlight: {
    container_background: '#fdf6e3', // 最外层容器背景颜色
    head_background_hidden: '#eee8d5', // 折叠代码时头部bar背景颜色
    unfold_text_color: '#cb4b16', // 左上角折叠展开按钮的字体颜色
    unfold_arrow_color: '#93a1a1', // 左上角折叠展开箭头的颜色
    soroll_thumb_background: 'rgba(0, 0, 0, .05)', // 滚动条滑块颜色
    language_color: 'rgba(0, 0, 0, .2)', // 语言提示字体的颜色
    block_hr_background: 'rgba(0, 0, 0, .05)', // 分割线样式
    languageSelect_container: '#eee8d5', // 添加弹框和删除弹框背景颜色
    languageSelect_border: '#93a1a1', // 添加弹框的包边线条颜色
    deleteSelect_border: '#93a1a1', // 删除弹框的包边线条颜色
    button_background: 'rgba(0, 0, 0, .08)', // 弹框里面的按钮的背景颜色
    button_hover_add: '#fdf6e3', // 添加弹框里面的按钮hover状态下的字体颜色
    button_hover_delete: '#fdf6e3', // 删除弹框里面的按钮hover状态下的字体颜色
    button_hover_background: 'rgba(0, 0, 0, .2)', // 添加弹框和删除弹框里面的按钮hover状态下的背景颜色
    edit_container: 'rgba(0, 0, 0, .05)', // 编辑二次确认弹框背景颜色
    edit_color: 'white', // 编辑二次确认弹框按钮的字体颜色
    edit_background_hover: 'rgba(0, 0, 0, .12)', // 编辑二次确认弹框按钮hover状态下的背景颜色
    edit_color_hover_cancel: '#f96f6f', // 编辑二次确认弹框取消按钮hover状态下的字体颜色
    edit_color_hover_ok: '#0fec3f', // 编辑二次确认弹框确认按钮hover状态下的字体颜色
    delete_button_hover_minus: '#268bd2', // 删除代码块按钮hover下的字体颜色
    delete_button_hover_add: '#268bd2', // 添加代码块按钮hover下的字体颜色
    add_minus_color: 'rgba(0, 0, 0, .3)', // 添加删除代码块按钮的字体颜色
    confirm_message_color: '#657b83', // 删除代码块弹框的提示信息字体颜色
  },
  tomorrow: {
    container_background: '#2d2d2d', // 最外层容器背景颜色
    head_background_hidden: 'rgb(114, 114, 114)', // 折叠代码时头部bar背景颜色
    unfold_text_color: 'orange', // 左上角折叠展开按钮的字体颜色
    unfold_arrow_color: '#e6db74', // 左上角折叠展开箭头的颜色
    soroll_thumb_background: 'rgba(255, 255, 255, .2)', // 滚动条滑块颜色
    language_color: 'rgb(114, 114, 114)', // 语言提示字体的颜色
    block_hr_background: 'rgb(50, 50, 50)', // 分割线样式
    languageSelect_container: '#474747', // 添加弹框和删除弹框背景颜色
    languageSelect_border: '#0A84D7', // 添加弹框的包边线条颜色
    deleteSelect_border: '#f92672', // 删除弹框的包边线条颜色
    button_background: 'rgba(255, 255, 255, .1)', // 弹框里面的按钮的背景颜色
    button_hover_add: '#0fec3f', // 添加弹框里面的按钮hover状态下的字体颜色
    button_hover_delete: '#66d9ef', // 删除弹框里面的按钮hover状态下的字体颜色
    button_hover_background: 'rgba(255, 255, 255, .2)', // 添加弹框和删除弹框里面的按钮hover状态下的背景颜色
    edit_container: 'rgba(255, 255, 255, .2)', // 编辑二次确认弹框背景颜色
    edit_color: 'white', // 编辑二次确认弹框按钮的字体颜色
    edit_background_hover: 'rgba(255, 255, 255, .2)', // 编辑二次确认弹框按钮hover状态下的背景颜色
    edit_color_hover_cancel: '#f96f6f', // 编辑二次确认弹框取消按钮hover状态下的字体颜色
    edit_color_hover_ok: '#0fec3f', // 编辑二次确认弹框确认按钮hover状态下的字体颜色
    delete_button_hover_minus: '#e6db74', // 删除代码块按钮hover下的字体颜色
    delete_button_hover_add: '#e6db74', // 添加代码块按钮hover下的字体颜色
    add_minus_color: 'rgb(114, 114, 114)', // 添加删除代码块按钮的字体颜色
    confirm_message_color: '#f92672', // 删除代码块弹框的提示信息字体颜色
  },
  twilight: {
    container_background: 'hsl(0, 0%, 8%)', // 最外层容器背景颜色
    head_background_hidden: 'rgb(114, 114, 114)', // 折叠代码时头部bar背景颜色
    unfold_text_color: 'orange', // 左上角折叠展开按钮的字体颜色
    unfold_arrow_color: '#e6db74', // 左上角折叠展开箭头的颜色
    soroll_thumb_background: 'rgba(255, 255, 255, .2)', // 滚动条滑块颜色
    language_color: 'rgb(114, 114, 114)', // 语言提示字体的颜色
    block_hr_background: 'rgb(50, 50, 50)', // 分割线样式
    languageSelect_container: '#474747', // 添加弹框和删除弹框背景颜色
    languageSelect_border: '#0A84D7', // 添加弹框的包边线条颜色
    deleteSelect_border: '#f92672', // 删除弹框的包边线条颜色
    button_background: 'rgba(255, 255, 255, .1)', // 弹框里面的按钮的背景颜色
    button_hover_add: '#0fec3f', // 添加弹框里面的按钮hover状态下的字体颜色
    button_hover_delete: '#66d9ef', // 删除弹框里面的按钮hover状态下的字体颜色
    button_hover_background: 'rgba(255, 255, 255, .2)', // 添加弹框和删除弹框里面的按钮hover状态下的背景颜色
    edit_container: 'rgba(255, 255, 255, .2)', // 编辑二次确认弹框背景颜色
    edit_color: 'white', // 编辑二次确认弹框按钮的字体颜色
    edit_background_hover: 'rgba(255, 255, 255, .2)', // 编辑二次确认弹框按钮hover状态下的背景颜色
    edit_color_hover_cancel: '#f96f6f', // 编辑二次确认弹框取消按钮hover状态下的字体颜色
    edit_color_hover_ok: '#0fec3f', // 编辑二次确认弹框确认按钮hover状态下的字体颜色
    delete_button_hover_minus: '#e6db74', // 删除代码块按钮hover下的字体颜色
    delete_button_hover_add: '#e6db74', // 添加代码块按钮hover下的字体颜色
    add_minus_color: 'rgb(114, 114, 114)', // 添加删除代码块按钮的字体颜色
    confirm_message_color: '#f92672', // 删除代码块弹框的提示信息字体颜色
  },
}

export const themeChoice = {
  twilight () {
    document.styleSheets[0].insertRule(`pre[class*="language-"] { color: white; background: hsl(0, 0%, 8%); font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace; font-size: 1em; text-align: left; text-shadow: 0 -.1em .2em black; white-space: pre; word-spacing: normal; word-break: normal; word-wrap: normal; line-height: 1.5; -webkit-hyphens: none; -moz-hyphens: none; -ms-hyphens: none; hyphens: none; box-shadow: 1px 1px .5em black inset; }`)
    try { document.styleSheets[0].insertRule(`pre[class*="language-"] ::selection { text-shadow: none; background: hsla(0, 0%, 93%, 0.15); }`) } catch {}
    try { document.styleSheets[0].insertRule(`pre[class*="language-"] ::-moz-selection { text-shadow: none; background: hsla(0, 0%, 93%, 0.15); }`) } catch {}
    try { document.styleSheets[0].insertRule(`pre[class*="language-"]::selection { text-shadow: none; background: hsla(0, 0%, 93%, 0.15); }`) } catch {}
    try { document.styleSheets[0].insertRule(`pre[class*="language-"]::-moz-selection { text-shadow: none; background: hsla(0, 0%, 93%, 0.15); }`) } catch {}
    document.styleSheets[0].insertRule(`.token.comment, .token.prolog, .token.doctype, .token.cdata { color: hsl(0, 0%, 47%); }`)
    document.styleSheets[0].insertRule(`.token.punctuation { opacity: .7; }`)
    document.styleSheets[0].insertRule(`.token.namespace { opacity: .7; }`)
    document.styleSheets[0].insertRule(`.token.tag, .token.boolean, .token.number, .token.deleted { color: hsl(14, 58%, 55%); }`)
    document.styleSheets[0].insertRule(`.token.keyword, .token.property, .token.selector, .token.constant, .token.symbol, .token.builtin { color: hsl(53, 89%, 79%); }`)
    document.styleSheets[0].insertRule(`.token.attr-name, .token.attr-value, .token.string, .token.char, .token.operator, .token.entity, .token.url, .language-css .token.string, .style .token.string, .token.variable, .token.inserted { color: hsl(76, 21%, 52%); }`)
    document.styleSheets[0].insertRule(`.token.atrule { color: hsl(218, 22%, 55%); }`)
    document.styleSheets[0].insertRule(`.token.regex, .token.important { color: hsl(42, 75%, 65%); }`)
    document.styleSheets[0].insertRule(`.token.important, .token.bold { font-weight: bold; }`)
    document.styleSheets[0].insertRule(`.token.italic { font-style: italic; }`)
    document.styleSheets[0].insertRule(`.token.entity { cursor: help; }`)
    document.styleSheets[0].insertRule(`pre[data-line] { padding: 1em 0 1em 3em; position: relative; }`)
    document.styleSheets[0].insertRule(`.language-markup .token.tag, .language-markup .token.attr-name, .language-markup .token.punctuation { color: hsl(33, 33%, 52%); }`)
    document.styleSheets[0].insertRule(`.token { position: relative; z-index: 1; }`)
    document.styleSheets[0].insertRule(`.line-highlight { background: hsla(0, 0%, 33%, 0.25); background: linear-gradient(to right, hsla(0, 0%, 33%, .1) 70%, hsla(0, 0%, 33%, 0)); border-bottom: 1px dashed hsl(0, 0%, 33%); border-top: 1px dashed hsl(0, 0%, 33%); left: 0; line-height: inherit; margin-top: 0.75em; padding: inherit 0; pointer-events: none; position: absolute; right: 0; white-space: pre; z-index: 0; }`)
    document.styleSheets[0].insertRule(`.line-highlight:before, .line-highlight[data-end]:after { background-color: hsl(215, 15%, 59%); border-radius: 999px; box-shadow: 0 1px white; color: hsl(24, 20%, 95%); content: attr(data-start); font: bold 65%/1.5 sans-serif; left: .6em; min-width: 1em; padding: 0 .5em; position: absolute; text-align: center; text-shadow: none; top: .4em; vertical-align: .3em; }`)
    document.styleSheets[0].insertRule(`.line-highlight[data-end]:after { bottom: .4em; content: attr(data-end); top: auto; }`)
  },
  tomorrow () {
    document.styleSheets[0].insertRule(`pre[class*="language-"] { color: #ccc; background: #2d2d2d; font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace; font-size: 1em; text-align: left; white-space: pre; word-spacing: normal; word-break: normal; word-wrap: normal; line-height: 1.5; -webkit-hyphens: none; -moz-hyphens: none; -ms-hyphens: none; hyphens: none; }`)
    document.styleSheets[0].insertRule(`.token.comment, .token.block-comment, .token.prolog, .token.doctype, .token.cdata { color: #999; }`)
    document.styleSheets[0].insertRule(`.token.punctuation { color: #ccc; }`)
    document.styleSheets[0].insertRule(`.token.tag, .token.attr-name, .token.namespace, .token.deleted { color: #e2777a; }`)
    document.styleSheets[0].insertRule(`.token.function-name { color: #6196cc; }`)
    document.styleSheets[0].insertRule(`.token.boolean, .token.number, .token.function { color: #f08d49; }`)
    document.styleSheets[0].insertRule(`.token.property, .token.class-name, .token.constant, .token.symbol { color: #f8c555; }`)
    document.styleSheets[0].insertRule(`.token.selector, .token.important, .token.atrule, .token.keyword, .token.builtin { color: #cc99cd; }`)
    document.styleSheets[0].insertRule(`.token.string, .token.char, .token.attr-value, .token.regex, .token.variable { color: #7ec699; }`)
    document.styleSheets[0].insertRule(`.token.operator, .token.entity, .token.url { color: #67cdcc; }`)
    document.styleSheets[0].insertRule(`.token.important, .token.bold { font-weight: bold; }`)
    document.styleSheets[0].insertRule(`.token.italic { font-style: italic; }`)
    document.styleSheets[0].insertRule(`.token.entity { cursor: help; }`)
    document.styleSheets[0].insertRule(`.token.inserted { color: green; }`)
  },
  solarizedlight () {
    document.styleSheets[0].insertRule(`pre[class*="language-"] { color: #657b83; font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace; font-size: 1em; text-align: left; white-space: pre; word-spacing: normal; word-break: normal; word-wrap: normal; line-height: 1.5; -webkit-hyphens: none; -moz-hyphens: none; -ms-hyphens: none; hyphens: none; background: #fdf6e3; }`)
    try { document.styleSheets[0].insertRule(`pre[class*="language-"] ::selection { background: #073642; }`) } catch {}
    try { document.styleSheets[0].insertRule(`pre[class*="language-"] ::-moz-selection { background: #073642; }`) } catch {}
    try { document.styleSheets[0].insertRule(`pre[class*="language-"]::selection { background: #073642; }`) } catch {}
    try { document.styleSheets[0].insertRule(`pre[class*="language-"]::-moz-selection { background: #073642; }`) } catch {}
    document.styleSheets[0].insertRule(`.token.comment, .token.prolog, .token.doctype, .token.cdata { color: #93a1a1; }`)
    document.styleSheets[0].insertRule(`.token.punctuation { color: #586e75; }`)
    document.styleSheets[0].insertRule(`.token.namespace { opacity: .7; }`)
    document.styleSheets[0].insertRule(`.token.property, .token.tag, .token.boolean, .token.number, .token.constant, .token.symbol, .token.deleted { color: #268bd2; }`)
    document.styleSheets[0].insertRule(`.token.selector, .token.attr-name, .token.string, .token.char, .token.builtin, .token.url, .token.inserted { color: #2aa198; }`)
    document.styleSheets[0].insertRule(`.token.entity { color: #657b83; background: #eee8d5; }`)
    document.styleSheets[0].insertRule(`.token.atrule, .token.attr-value, .token.keyword { color: #859900; }`)
    document.styleSheets[0].insertRule(`.token.function, .token.class-name { color: #b58900; }`)
    document.styleSheets[0].insertRule(`.token.regex, .token.important, .token.variable { color: #cb4b16; }`)
    document.styleSheets[0].insertRule(`.token.important, .token.bold { font-weight: bold; }`)
    document.styleSheets[0].insertRule(`.token.italic { font-style: italic; }`)
    document.styleSheets[0].insertRule(`.token.entity { cursor: help; }`)
  },
  okaidia () {
    document.styleSheets[0].insertRule(`pre[class*="language-"] { color: #f8f8f2; text-shadow: 0 1px rgba(0, 0, 0, 0.3); font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace; font-size: 1em; text-align: left; white-space: pre; word-spacing: normal; word-break: normal; word-wrap: normal; line-height: 1.5; -webkit-hyphens: none; -moz-hyphens: none; -ms-hyphens: none; hyphens: none; background: #272822; }`)
    document.styleSheets[0].insertRule(`.token.comment, .token.prolog, .token.doctype, .token.cdata { color: #8292a2; }`)
    document.styleSheets[0].insertRule(`.token.punctuation { color: #f8f8f2; }`)
    document.styleSheets[0].insertRule(`.token.namespace { opacity: .7; }`)
    document.styleSheets[0].insertRule(`.token.property, .token.tag, .token.constant, .token.symbol, .token.deleted { color: #f92672; }`)
    document.styleSheets[0].insertRule(`.token.boolean, .token.number { color: #ae81ff; }`)
    document.styleSheets[0].insertRule(`.token.selector, .token.attr-name, .token.string, .token.char, .token.builtin, .token.inserted { color: #a6e22e; }`)
    document.styleSheets[0].insertRule(`.token.operator, .token.entity, .token.url, .language-css .token.string, .style .token.string, .token.variable { color: #f8f8f2; }`)
    document.styleSheets[0].insertRule(`.token.atrule, .token.attr-value, .token.function, .token.class-name { color: #e6db74; }`)
    document.styleSheets[0].insertRule(`.token.keyword { color: #66d9ef; }`)
    document.styleSheets[0].insertRule(`.token.regex, .token.important { color: #fd971f; }`)
    document.styleSheets[0].insertRule(`.token.important, .token.bold { font-weight: bold; }`)
    document.styleSheets[0].insertRule(`.token.italic { font-style: italic; }`)
    document.styleSheets[0].insertRule(`.token.entity { cursor: help; }`)
  },
  funky () {
    document.styleSheets[0].insertRule(`pre[class*="language-"] { font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace; font-size: 1em; text-align: left; white-space: pre; word-spacing: normal; word-break: normal; word-wrap: normal; line-height: 1.5; -webkit-hyphens: none; -moz-hyphens: none; -ms-hyphens: none; hyphens: none; background: url('data:image/svg+xml;charset=utf-8,<svg%20version%3D"1.1"%20xmlns%3D"http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg"%20width%3D"100"%20height%3D"100"%20fill%3D"rgba(0%2C0%2C0%2C.05)">%0D%0A<polygon%20points%3D"0%2C50%2050%2C0%200%2C0"%20%2F>%0D%0A<polygon%20points%3D"0%2C100%2050%2C100%20100%2C50%20100%2C0"%20%2F>%0D%0A<%2Fsvg>'); background-size: 1em 1em; }`)
    document.styleSheets[0].insertRule(`.token.comment, .token.prolog, .token.doctype, .token.cdata { color: #aaa; }`)
    document.styleSheets[0].insertRule(`.token.punctuation { color: #999; }`)
    document.styleSheets[0].insertRule(`.token.namespace { opacity: .7; }`)
    document.styleSheets[0].insertRule(`.token.property, .token.tag, .token.boolean, .token.number, .token.constant, .token.symbol { color: #0cf; }`)
    document.styleSheets[0].insertRule(`.token.selector, .token.attr-name, .token.string, .token.char, .token.builtin { color: yellow; }`)
    document.styleSheets[0].insertRule(`.token.operator, .token.entity, .token.url, .language-css .token.string, .token.variable, .token.inserted { color: yellowgreen; }`)
    document.styleSheets[0].insertRule(`.token.atrule, .token.attr-value, .token.keyword { color: deeppink; }`)
    document.styleSheets[0].insertRule(`.token.regex, .token.important { color: orange; }`)
    document.styleSheets[0].insertRule(`.token.important, .token.bold { font-weight: bold; }`)
    document.styleSheets[0].insertRule(`.token.italic { font-style: italic; }`)
    document.styleSheets[0].insertRule(`.token.entity { cursor: help; }`)
    document.styleSheets[0].insertRule(`.token.deleted { color: red; }`)
    document.styleSheets[0].insertRule(`pre.diff-highlight.diff-highlight > code .token.deleted:not(.prefix), pre > code.diff-highlight.diff-highlight .token.deleted:not(.prefix) { background-color: rgba(255, 0, 0, .3); display: inline; }`)
    document.styleSheets[0].insertRule(`pre.diff-highlight.diff-highlight > code .token.inserted:not(.prefix), pre > code.diff-highlight.diff-highlight .token.inserted:not(.prefix) { background-color: rgba(0, 255, 128, .3); display: inline; }`)
  },
  dark () {
    document.styleSheets[0].insertRule(`pre[class*="language-"] { color: white; text-shadow: 0 -.1em .2em black; font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace; font-size: 1em; text-align: left; white-space: pre; word-spacing: normal; word-break: normal; word-wrap: normal; line-height: 1.5; -webkit-hyphens: none; -moz-hyphens: none; -ms-hyphens: none; hyphens: none; background: hsl(30, 20%, 25%); box-shadow: 1px 1px .5em black inset; }`)
    document.styleSheets[0].insertRule(`@media print { pre[class*="language-"] { text-shadow: none; } }`)
    document.styleSheets[0].insertRule(`.token.comment, .token.prolog, .token.doctype, .token.cdata { color: hsl(30, 20%, 50%); }`)
    document.styleSheets[0].insertRule(`.token.punctuation { opacity: .7; }`)
    document.styleSheets[0].insertRule(`.token.namespace { opacity: .7; }`)
    document.styleSheets[0].insertRule(`.token.property, .token.tag, .token.boolean, .token.number, .token.constant, .token.symbol { color: hsl(350, 40%, 70%); }`)
    document.styleSheets[0].insertRule(`.token.selector, .token.attr-name, .token.string, .token.char, .token.builtin, .token.inserted { color: hsl(75, 70%, 60%); }`)
    document.styleSheets[0].insertRule(`.token.operator, .token.entity, .token.url, .language-css .token.string, .style .token.string, .token.variable { color: hsl(40, 90%, 60%); }`)
    document.styleSheets[0].insertRule(`.token.atrule, .token.attr-value, .token.keyword { color: hsl(350, 40%, 70%); }`)
    document.styleSheets[0].insertRule(`.token.regex, .token.important { color: #e90; } `)
    document.styleSheets[0].insertRule(`.token.important, .token.bold { font-weight: bold; }`)
    document.styleSheets[0].insertRule(`.token.italic { font-style: italic; }`)
    document.styleSheets[0].insertRule(`.token.entity { cursor: help; }`)
    document.styleSheets[0].insertRule(`.token.deleted { color: red; }`)
  },
  coy () {
    document.styleSheets[0].insertRule(`pre[class*="language-"] { color: black; font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace; font-size: 1em; text-align: left; white-space: pre; word-spacing: normal; word-break: normal; word-wrap: normal; line-height: 1.5; -webkit-hyphens: none; -moz-hyphens: none; -ms-hyphens: none; hyphens: none; position: relative; background: #fdfdfd; }`)
    document.styleSheets[0].insertRule(`.token.comment, .token.block-comment, .token.prolog, .token.doctype, .token.cdata { color: #7D8B99; }`)
    document.styleSheets[0].insertRule(`.token.punctuation { color: #5F6364; }`)
    document.styleSheets[0].insertRule(`.token.property, .token.tag, .token.boolean, .token.number, .token.function-name, .token.constant, .token.symbol, .token.deleted { color: #c92c2c; }`)
    document.styleSheets[0].insertRule(`.token.selector, .token.attr-name, .token.string, .token.char, .token.function, .token.builtin, .token.inserted { color: #2f9c0a; }`)
    document.styleSheets[0].insertRule(`.token.operator, .token.entity, .token.url, .token.variable { color: #a67f59; background: rgba(255, 255, 255, 0.5); }`)
    document.styleSheets[0].insertRule(`.token.atrule, .token.attr-value, .token.keyword, .token.class-name { color: #1990b8; }`)
    document.styleSheets[0].insertRule(`.token.regex, .token.important { color: #e90; }`)
    document.styleSheets[0].insertRule(`.language-css .token.string, .style .token.string { color: #a67f59; background: rgba(255, 255, 255, 0.5); }`)
    document.styleSheets[0].insertRule(`.token.important { font-weight: normal; }`)
    document.styleSheets[0].insertRule(`.token.bold { font-weight: bold; }`)
    document.styleSheets[0].insertRule(`.token.italic { font-style: italic; }`)
    document.styleSheets[0].insertRule(`.token.entity { cursor: help; }`)
    document.styleSheets[0].insertRule(`.token.namespace { opacity: .7; }`)
    document.styleSheets[0].insertRule(`pre[class*="language-"].line-numbers.line-numbers { padding-left: 0; }`)
    document.styleSheets[0].insertRule(`pre[class*="language-"].line-numbers.line-numbers code { padding-left: 3.8em; }`)
    document.styleSheets[0].insertRule(`pre[class*="language-"].line-numbers.line-numbers .line-numbers-rows { left: 0; }`)
    document.styleSheets[0].insertRule(`pre[class*="language-"][data-line] { padding-top: 0; padding-bottom: 0; padding-left: 0; }`)
    document.styleSheets[0].insertRule(`pre[data-line] code { position: relative; padding-left: 4em; }`)
    document.styleSheets[0].insertRule(`pre .line-highlight { margin-top: 0; }`)
  },
  default () {
    document.styleSheets[0].insertRule(`pre[class*="language-"] { color: black; background: #f5f2f0; text-shadow: 0 1px white; font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace; font-size: 1em; text-align: left; white-space: pre; word-spacing: normal; word-break: normal; word-wrap: normal; line-height: 1.5; -moz-tab-size: 4; -o-tab-size: 4; tab-size: 4; -webkit-hyphens: none; -moz-hyphens: none; -ms-hyphens: none; hyphens: none; }`)
    try { document.styleSheets[0].insertRule(`pre[class*="language-"] ::selection { text-shadow: none; background: #b3d4fc; }`) } catch {}
    try { document.styleSheets[0].insertRule(`pre[class*="language-"] ::-moz-selection { text-shadow: none; background: #b3d4fc; }`) } catch {}
    try { document.styleSheets[0].insertRule(`pre[class*="language-"]::selection { text-shadow: none; background: #b3d4fc; }`) } catch {}
    try { document.styleSheets[0].insertRule(`pre[class*="language-"]::-moz-selection { text-shadow: none; background: #b3d4fc; }`) } catch {}
    document.styleSheets[0].insertRule(`@media print { pre[class*="language-"] { text-shadow: none; } }`)
    document.styleSheets[0].insertRule(`.token.comment, .token.prolog, .token.doctype, .token.cdata { color: slategray; }`)
    document.styleSheets[0].insertRule(`.token.punctuation { color: #999; }`)
    document.styleSheets[0].insertRule(`.token.namespace { opacity: .7; }`)
    document.styleSheets[0].insertRule(`.token.property, .token.tag, .token.boolean, .token.number, .token.constant, .token.symbol, .token.deleted { color: #905; }`)
    document.styleSheets[0].insertRule(`.token.selector, .token.attr-name, .token.string, .token.char, .token.builtin, .token.inserted { color: #690; }`)
    document.styleSheets[0].insertRule(`.token.operator, .token.entity, .token.url, .language-css .token.string, .style .token.string { color: #9a6e3a; background: hsla(0, 0%, 100%, .5); }`)
    document.styleSheets[0].insertRule(`.token.atrule, .token.attr-value, .token.keyword { color: #07a; }`)
    document.styleSheets[0].insertRule(`.token.function, .token.class-name { color: #DD4A68; }`)
    document.styleSheets[0].insertRule(`.token.regex, .token.important, .token.variable { color: #e90; }`)
    document.styleSheets[0].insertRule(`.token.important, .token.bold { font-weight: bold; }`)
    document.styleSheets[0].insertRule(`.token.italic { font-style: italic; }`)
    document.styleSheets[0].insertRule(`.token.entity { cursor: help; }`)
  },
  public () {
    document.styleSheets[0].insertRule(`pre[class*="language-"] { border-radius: none !important; padding: 0 0 1em 1em !important; margin: 3px 0 0 0 !important; overflow: auto !important; -webkit-box-sizing: content-box !important; -moz-box-sizing: content-box !important; box-sizing: content-box !important; border: none !important; }`)
    document.styleSheets[0].insertRule(`._um-_note-container { min-width: 260px; overflow: hidden; border-radius: 3px; transition: .3s; position: relative; }`)
    document.styleSheets[0].insertRule(`._um-_note-headbox { width: 100%; height: 16px; transition: .3s; overflow: hidden; position: relative; z-index: 100; }`)
    document.styleSheets[0].insertRule(`._um-_unfold-box { height: 30px; font-size: 10px; display: inline-block; cursor: pointer; zoom: .75; position: absolute; left: 5px; top: -3px; }`)
    document.styleSheets[0].insertRule(`._um-_unfold-text { display: inline-block; transition: .3s; position: absolute; top: 4px; }`)
    document.styleSheets[0].insertRule(`._um-_unflod-arrow { display: inline-block; zoom: 1.3; transform-origin: left center; transition: .3s; position: absolute; top: 1px; }`)
    document.styleSheets[0].insertRule(`._um-_note-config-edit { width: 10px; height: 10px; border-radius: 50%; cursor: pointer; float: right; margin-right: 3px; margin-top: 3px; }`)
    document.styleSheets[0].insertRule(`._um-_note-config-submit { width: 10px; height: 10px; border-radius: 50%; cursor: pointer; background: orange; float: right; margin-right: 3px; margin-top: 3px; }`)
    document.styleSheets[0].insertRule(`._um-_submit-confirm { height: 12px; margin-top: 2px; margin-right: 5px; padding: 0 2px; border-radius: 2px; overflow: hidden; float: right; position: relative; z-index: 10; }`)
    document.styleSheets[0].insertRule(`._um-_submit-item-cancel,._um-_submit-item-ok { width: 20px; height: 12px; line-height: 12px; text-align: center; border-radius: 6px; font-size: 12px; display: inline-block; margin: 0 4px; cursor: pointer; position: relative; top: -4px; }`)
    document.styleSheets[0].insertRule(`._um-submit-span { position: relative; top: -1px; }`)
    document.styleSheets[0].insertRule(`._um-_pre-class { width: calc(100% - 1em); position: relative; }`)
    document.styleSheets[0].insertRule(`._um-_not-chooseable { user-select: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; }`)
    document.styleSheets[0].insertRule(`._um-_code-box { position: relative; }`)
    document.styleSheets[0].insertRule(`._um-_sign-public { font-size: 10px; position: absolute; }`)
    document.styleSheets[0].insertRule(`._um-_line-dashed { position: absolute; }`)
    document.styleSheets[0].insertRule(`._um-_sign-add { width: 16px; height: 18px; line-height: 16px; text-align: center; cursor: pointer; font-size: 18px; position: absolute; }`)
    document.styleSheets[0].insertRule(`._um-_sign-minus { width: 12px; height: 18px; transform: scale(1.3, 1); line-height: 16px; text-align: center; cursor: pointer; font-size: 18px; position: absolute; }`)
    document.styleSheets[0].insertRule(`._um-_select-container { max-width: calc(100% - 40px); box-shadow: 3px 3px 7px rgba(0, 0, 0, .3); padding: 2px; position: absolute; z-index: 10; }`)
    document.styleSheets[0].insertRule(`._um-_select-item { line-height: 20px; padding: 0 5px; margin: 2px; cursor: pointer; border-radius: 3px; float: left; }`)
    document.styleSheets[0].insertRule(`._um-_confirm-container { padding: 2px; box-shadow: 3px 3px 7px rgba(0, 0, 0, .3); position: absolute; z-index: 10; }`)
    document.styleSheets[0].insertRule(`._um-_confirm-message { font-size: 10px; padding: 2px 2px 4px 2px; }`)
    document.styleSheets[0].insertRule(`._um-_confirm-item { line-height: 20px; font-size: 12px; padding: 2px 10px; margin: 2px; cursor: pointer; border-radius: 3px; float: left; }`)
    document.styleSheets[0].insertRule(`._um-_code-class { min-width: calc(100% - 1em); min-height: 1.5em; display: inline-block; padding-right: 1em; outline: none; margin: 20px 0 30px 0; }`)
  },
}

export const injectCSS = theme => {
  if (!document.styleSheets.length) document.head.appendChild(document.createElement('style'))
  themeChoice.public()
  themeChoice[theme]()
  const themesData = themeConfigMap[theme]
  document.styleSheets[0].insertRule(`._um-_confirm-item { background: ${themesData.button_background} }`)
  document.styleSheets[0].insertRule(`._um-_confirm-item:hover { color: ${themesData.button_hover_delete}; background: ${themesData.button_hover_background} }`)
  document.styleSheets[0].insertRule(`._um-_select-item { background: ${themesData.button_background} }`)
  document.styleSheets[0].insertRule(`._um-_select-item:hover { color: ${themesData.button_hover_add}; background: ${themesData.button_hover_background} }`)
  document.styleSheets[0].insertRule(`._um-_pre-class::-webkit-scrollbar { width: 8px; height: 8px; background: ${themesData.container_background}; cursor: pointer; }`)
  document.styleSheets[0].insertRule(`._um-_pre-class::-webkit-scrollbar-thumb { background: ${themesData.soroll_thumb_background}; border-radius: 2px; }`)
  document.styleSheets[0].insertRule(`._um-_pre-class::-webkit-scrollbar-corner { background: ${themesData.container_background}; }`)
  document.styleSheets[0].insertRule(`._um-_submit-item-cancel,._um-_submit-item-ok { background: ${themesData.button_background}; color: ${themesData.edit_color}; }`)
  document.styleSheets[0].insertRule(`._um-_submit-item-cancel:hover { color: ${themesData.edit_color_hover_cancel}; background: ${themesData.edit_background_hover}; }`)
  document.styleSheets[0].insertRule(`._um-_submit-item-ok:hover { color: ${themesData.edit_color_hover_ok}; background: ${themesData.edit_background_hover}; }`)
  document.styleSheets[0].insertRule(`._um-_sign-add, ._um-_sign-minus { color: ${themesData.add_minus_color}; }`)
  document.styleSheets[0].insertRule(`._um-_sign-add:hover { color: ${themesData.delete_button_hover_add}; }`)
  document.styleSheets[0].insertRule(`._um-_sign-minus:hover { color: ${themesData.delete_button_hover_minus}; }`)
}