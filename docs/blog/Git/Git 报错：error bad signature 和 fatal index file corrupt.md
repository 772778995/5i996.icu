## Git 报错： error: bad signature 和 fatal: index file corrupt

因为上一次意外关机，再次开机进行git操作时提示错误：

```bash
error: bad signature 0x00000000
fatal: index file corrupt
```

原因是 项目中  .git/index  这个文件受到损坏，（.git目录默认为隐藏的）

解决办法：

将 .git/index 这个文件删除重新创建

进入 .git目录 -> 删除index文件 -> 执行命令git reset重新创建

```bash
git reset
```

 

