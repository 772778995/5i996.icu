# 在 HbuilderX 安装使用 Scss 插件

## 安装 scss

​ 在 Hbuilder 中安装 scss，只需要到插件市场直接导入插件就 Ok。[附上地址](https://ext.dcloud.net.cn/plugin?name=compile-node-sass)

​ 直接导入 scss 插件的方式的时候要保证 HbuilderX 版本不要太低。

​ 安装成功后直接在 HbuilderX 中右击要编译的 scss 文件：

![image-20210228173959200](https://img.wuhaochao.top/scss-20210326014544.png)

​ 编译后即可在当前目录下生成相应的 css 文件。

## 报错

​ 如果在控制台中出现这样的报错信息：node-sass-china\vendor\win32-x64-64\binding.node 缺失。

​ 则需要去 [github](https://github.com/sass/node-sass/releases) 下载相应的 binding.node 文件。

​ 譬如上面报错信息，提示的是 win32-x64-64\binding.node 缺失，那我们就下载这个文件。

![image-20210228174718588](https://img.wuhaochao.top/scss-20210326014612.png)

​ 下载完毕之后，我们会得到一个压缩文件，我的 HbuilderX 是放在电脑的 D 盘，以此为例，将它放入以下目录：

​ D:\HBuilderX\plugins\compile-node-sass\node_modules\node-sass-china\vendor

​ 将解压好的那个文件改名为 win32-x64-64（缺失的文件名，下载的哪个就改成什么名），然后将里面的文件 改名为 _binding.node_，以上操作完毕后，重启一下 HbuilderX，再次编译。

## 常用配置

​ 觉得每次写完 scss 文件后编译太麻烦了，只需要简单配置一下 scss 插件的 pakeage.json 就好了。

​ 点击 Hubilder 菜单栏中的 工具》外部命令插件配置》compile-node-sass》pakeage.json

![image-20210228175902577](https://img.wuhaochao.top/scss-20210326014620.png)

​ 出现以下文件：

```json
{
  "name": "sass",
  "id": "compile-node-sass",
  "version": "0.0.4",
  "displayName": "scss/sass编译",
  "description": "编译scss/sass为css。uni-app编译或对文件右键-外部命令编译时使用",
  "engines": {
    "HBuilderX": "^1.0.0"
  },
  "external": {
    "type": "node",
    "programPath": "${pluginPath}",
    "executable": "/node_modules/.bin/node-sass",
    "programName": "node-sass-china",
    "commands": [
      {
        "id": "SASS_COMPILE",
        "name": "编译scss/sass",
        "command": [
          "${programPath}",
          "${file}",
          "${fileBasename}.css" // 编译后的 css 文件位置，默认是当前目录
        ],
        "extensions": "scss,sass",
        "key": "",
        "showInParentMenu": false,
        "onDidSaveExecution": false // 改为 true后，每次保存 scss 文件后都会自动编译。
      }
    ]
  },
  "dependencies": {
    "node-sass-china": "^4.7.2"
  },
  "extensionDependencies": ["npm"]
}
```

​ 将 onDidSaveExecution 的值改为 true，则在每次保存 scss 文件后自动编译生成 css 文件到当前目录。

​ 若要更改保存目录，则可以更改 command 中第三个参数 “${fileBasename}.css”。

​ 如更改为把编译后的 css 文件 保存当前目录下的 myCss 文件目录下，则将其更改为：

```json
"command": [
    "${programPath}",
    "${file}",
    "./myCss/${fileBasename}.css"
],
```

​ 若当前目录下没有 myCss 目录，则会自动创建 myCss 目录并将编译后的 文件 保存到 myCss 文件目录下。

---

编辑于 2021 年 3 月 19 日 20 点 21 分
