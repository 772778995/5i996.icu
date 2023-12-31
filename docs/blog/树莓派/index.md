# 树莓派搭建 web 服务

## 安装操作系统

### 下载树莓派镜像烧录器

[下载地址](https://downloads.raspberrypi.org/imager/imager_latest.exe)

### 准备读卡器和 tf 卡

买树莓派的时候套餐一般包含这个东西，如果没有也可以用闲置的 U 盘 替代。如果都没有的话，可以去买闪迪的 32g tf 卡，淘宝或京东上面会送一个 usb2.0 的读卡器，如果要单独买读卡器的话，可以买川宇牌子的读卡器，usb 最好是 3.0 的，读卡器记得要看支不支持 Linux 系统。

最好还是用 tf 卡，因为如果硬件出现故障的话，使用读卡器+ tf 卡只会烧毁读卡器，而 U 盘 就会整个损坏。而且使用 U 盘 作为系统盘并不稳定，经常跑着跑着就出现读写错误

### 烧录系统

将 读卡器 + tf 卡 插进你的电脑

选择你的 tf 卡(U 盘)，注意对准型号，不要弄错了，不然会被格式化数据就没了

![image-20220205182700880](https://img.wuhaochao.top/20220205182703.png)

打开刚才下载好的树莓派镜像烧录器，点击选择系统，点击第二个 Raspberry Pi OS(other)，选择 Paspberry Pi OS Lite(64-bit)系统，在这里我是要当服务器的，所以选择了无桌面版的的操作系统，Paspberry Pi OS 是在 Debian 基础上修改的操作系统

![image-20220205182502965](https://img.wuhaochao.top/20220205182512.png)

![image-20220205183426020](https://img.wuhaochao.top/20220205183428.png)

点击设置

![image-20220205183745528](https://img.wuhaochao.top/20220205183748.png)

开启 SSH 服务，记住账号密码，等下要用

![image-20220205183634408](https://img.wuhaochao.top/20220205183652.png)

配置 wifi，如果有以太网接口，可以不做配置。最好还是用以太网接口联网比较好，因为一旦设备重新连接 wifi，那么路由给设备分配的**内网 IP** 地址就会重新分配，不方便我们操作下一步的 ssh 远程登录。需要在路由器上设置绑定 mac 的 IP 地址。而且以太网接口的网速肯定是比 wifi 快 n 倍的，所以有条件的话还是插网线优先

![image-20220205183952255](https://img.wuhaochao.top/20220205183954.png)

点击保存后，点击烧录慢慢等待即可，烧录完成，就可以拔掉 tf 读卡器，插进你的树莓派安装系统了

![image-20220205184513489](https://img.wuhaochao.top/20220205184517.png)

## 搭建 web 服务

### 外接设备(键盘、显示器)

如果你有闲置的键盘和显示器，可以跳过下一步 SSH 的远程登陆直接操作命令行，当然最好还是用跳过这里直接用 SSH 登录操作最好，毕竟我们以后都是用 SSH 远程操作服务器的。

### SSH 远程登录

先将读卡器插进树莓派，再开机(这里可能要等待一会)。第一次启动使用 DHCP 获取 IP 地址, 你可以从路由器管理页面，如 192.168.1.1。每个路由器的管理页面都不尽相同，请看你家的路由器的背面查看路由管理面板的 IP 地址查看树莓派 IP 地址，树莓派的设备名默认是 **raspberrypi**，打开路由管理页面查看名为 raspberrypi 的设备，记住他的 **ip** 地址。因为大家的路由器都不一样，管理页面自然不一样，我这里就简略带过…如果你没有路由器管理账号密码，可以考虑重置路由，或者按照这个[方法](https://zhidao.baidu.com/question/179916193.html)来找到树莓派的内网 IP 地址。亦或者使用手机 下载 **fing** App 软件，获取内网下的所有设备信息找到 树莓派

![image-20220205185840359](https://img.wuhaochao.top/20220205185843.png)

下载并打开 putty 远程登录工具

[下载链接](https://gsf-fl.softonic.com/a2f/168/8ad1e902d4b19d4003eecdb8ed992adbc7/putty-0.76-installer.msi?Expires=1644094562&Signature=d341d05d32385e71a26b55bd30c4d0bd0dd9db6d&url=https://putty.en.softonic.com&Filename=putty-0.76-installer.msi)

粘贴刚才的树莓派设备的 ip 地址，点击 Open 后弹出一个小窗口，点击 accept，如果是弹出连接超时的提示，那么你的 ip 地址应该是错误的。另外连接成功后在路由管理页面设置 mac 和 ip 地址绑定，否则树莓派重新连接 wifi，ip 地址就可能不是之前的 ip 地址了。

![image-20220205190239146](https://img.wuhaochao.top/20220205190241.png)

![image-20220205190751445](https://img.wuhaochao.top/20220205190754.png)

这里画红圈的地方就是刚才 [](#烧录系统) 时候设置的 ssh 账号密码，要注意的是，在填写密码的时候，黑窗口是没有反应的，直接输入回车就好了，登录以后看到一下图片那就代表成功了。

![image-20220205191139275](https://img.wuhaochao.top/20220205191141.png)

### 安装宝塔面板

安装宝塔面板需要 root 权限

在小黑窗口，输入以下命令设置 root 密码，回车后会他会让你重复输入两次 root 的密码

```bash
sudo passwd root
```

激活 root 账号

```bash
sudo passwd -unlock root
```

切换 root 账号，输入刚才的密码

```bash
su root
```

输入安装宝塔的命令，回车后等待一小会，它会提示你要不要安装宝塔面板，输入 y 回车然后慢慢等待即可

```bash
wget -O install.sh http://download.bt.cn/install/install-ubuntu_6.0.sh && bash install.sh
```

![image-20220206232607646](https://img.wuhaochao.top/20220206232913.png)

耗时 15 分钟终于下载安装完了，复制上面的内网面板地址，在浏览器打开后输入上面的账号密码。

如果你报了这样的错误：

![](https://www.bt.cn/bbs/data/attachment/forum/202201/16/195449efiz56qp9yzc06c5.png)

这是因为网络差的原因导致某些 Python 的依赖没有成功下载，输入以下命令重装 Python 环境：

```bash
rm -rf /www/server/panel/pyenv
curl -sSO http://download.bt.cn/install/install_panel.sh && bash install_panel.sh
```

![image-20220206232845426](https://img.wuhaochao.top/20220206232847.png)

成功登录后，可以直接用宝塔内的终端进行操作，也就是不需要再用 putty 了

### 部署 web 站点

首次安装宝塔会提示你装 web 服务的套件，你装哪一个都可以。

![image-20220206233020982](https://img.wuhaochao.top/20220206233023.png)

点击 网站》PHP 项目》添加站点》域名输入 127.0.0.1:5408》提交。其中 127.0.0.1:5408 中的 5408 是端口号，可以自定义端口号，不要占用其他端口号即可。

![image-20220207012854439](https://img.wuhaochao.top/20220207012903.png)

成功创建完站点后，复制宝塔面板左上角的 IP 地址，也就是你的树莓派的局域网 IP 地址，粘贴到你的浏览器的地址输入栏，再加上我们刚才设置的端口号 5408，如下图

![image-20220207013211833](https://img.wuhaochao.top/20220207013213.png)

如果出现下图，代表你成功部署站点了！

![image-20220207013443617](https://img.wuhaochao.top/20220207013445.png)

如果需要更改网页内容，到 文件》根目录>www>wwwroot>127.0.0.1>index.html，这个文件在我们刚刚部署站点的时候，宝塔就已经为我们创建好了，双击 index.html 修改内容，剩下的就不用我多说了，相信能看到这里的帅逼们都知道应该怎么做

![image-20220207013808838](https://img.wuhaochao.top/20220207013810.png)

## FRP 内网穿透

我们已经成功部署好站点了，但是此时只能够是我们内网访问，外放还是访问不到的。如果你的宽带有公网 IP 的话，一般只需要 DDOS 动态解析 IP 地址就好了，这是最优也是最简单的方案。但是普通用户通常是没有公网 IP 地址的，所以在这里不过多描述。

这里我用 [SAKURA FRP](https://www.natfrp.com/) 来穿透内网，当然你也可以用花生壳、网云穿之类的其他软件也是可以的。

### 准备域名

首先你要有两个域名，一个穿透宝塔面板，一个穿透你的部署的 web 站点。只有一个域名的话可以使用 VPN 来穿透所有端口号。这里我刚好有几个域名，就不费事了

如果没有 **已备案** 的 **域名** 就不要往下看了，去找其他的有赠送免费域名的穿透软件的文档吧（花生壳、网云穿等好像都有赠送免费域名）。

### 创建穿透隧道

首先到 [官网](https://www.natfrp.com/) 注册账号

实名认证、验证备案，这里实名认证是要收钱的，好像是 1 块钱还是忘了。

![image-20220208005251585](https://img.wuhaochao.top/20220208005254.png)

创建隧道列表

![image-20220208005115853](https://img.wuhaochao.top/20220208005119.png)

勾选可建站，本地端口号是你的服务的端口号。宝塔面板的端口号是 8888，所以这里穿透内网让外网也可以访问你的宝塔面板。上面我们部署的项目的端口号是 5408，那么我们要穿透这个服务就填端口号 5408

![image-20220208005814139](https://img.wuhaochao.top/20220208005815.png)

创建完毕后在终端输入以下命令安装 frp 软件并检验 md5 值

```bash
cd /usr/local/bin
wget -O frpc https://getfrp.sh/d/frpc_linux_arm64
chmod 755 frpc
ls -ls frpc
md5sum frpc
frpc -v
```

![image-20220208004209675](https://img.wuhaochao.top/20220208004211.png)

黄色框是穿透软件的版本号

出现上图划红线的 MD5 值代表安装成功，如果不一致则代表安装错误。当然你安装的版本应该比我高，可以自行到 [官网](https://www.natfrp.com/tunnel/download) 对比 md5 确认安装成功

### 编辑 frpc 配置文件

打开宝塔面板，进入文件，输入 `/etc/systemd/system`

![image-20220208011946615](https://img.wuhaochao.top/20220208011948.png)

创建文件 `frpc@.service`

![image-20220208012335229](https://img.wuhaochao.top/20220208012336.png)

点击 **编辑**，然后复制并粘贴下面提供的服务文件内容，请注意 **不要** 多复制或少复制任何东西，确保粘贴后的内容和图中一模一样

```bash
[Unit]
Description=SakuraFrp Service
After=network.target

[Service]
Type=idle
User=nobody
Restart=on-failure
RestartSec=60s
ExecStart=/usr/local/bin/frpc -f %i

[Install]
WantedBy=multi-user.target
```

回到终端，执行下面的命令重载 Systemd，这样服务就配置完成了

```bash
systemctl daemon-reload
```

### 启动穿透隧道

启动隧道需要你的 访问密匙 和 隧道 ID

点击访问密匙后，就能看到你的密匙

![image-20220208010513486](https://img.wuhaochao.top/20220208010515.png)

隧道 ID：

![image-20220208010632829](https://img.wuhaochao.top/20220208010634.png)

启动/停止隧道非常简单，使用下面的命令即可，`start` 是启动，`stop` 是停止

```bash
systemctl start frpc@wb3q7trzx4tq6gaceydjb51daphxxxxx:xxxxxxx
systemctl stop frpc@wb3q7trzx4tq6gaceydjb51daphxxxxx:xxxxxxx
```

配置开机自动穿透：

```bash
systemctl enable frpc@wb3q7trzx4tq6gaceydjb51daphxxxxx:xxxxxxx
systemctl enable frpc@wb3q7trzx4tq6gaceydjb51daphxxxxx:xxxxxxx
```
