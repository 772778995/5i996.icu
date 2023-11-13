# Git使用

## 配置 git 用户

配置提交人姓名：

```bash
git config --global user.name <姓名>
```

配置提交人邮箱：

```bash
git config --global user.email <xxx@xxx.com>
```

查看配置信息：

```bash
git config --list
```



## 配置码云 ssh 公钥

1. 创建.ssh文件：

   ```bash
   mkdir ~/.ssh
   ```

2. 进入.ssh文件：

   ```bash
   cd ~/.ssh
   ```

3. 生成ssh公钥：
   
   ```bash
   ssh-keygen -t rsa -C "<xxx@xxx.com>"
   ```
   
   接下来会有几个问题:
   
   Enter file in which to save the key (/c/Users/94140/.ssh/id_rsa):
   
   Enter passphrase (empty for no passphrase):
   
   Enter same passphrase again:
   
   可以不填直接连续三次回车键跳过
   
4. 查看公钥：

   ```bash
   cat ~/.ssh/id_rsa.pub
   ```

   将显示的 ssh-rsa 开头的代码复制下来

5. 打开 [[码云](https://gitee.com/profile/sshkeys)](https://gitee.com/profile/sshkeys) 添加刚才复制的公钥

6. 正常 git 操作



## Git提交步骤

1. 初始化git仓库: 

   ```bash
   git init
   ```

2. 查看文件状态: 

   ```bash
   git status
   ```

3. 提交文件到暂存区:

   "." 代表添加所有文件到暂存区

   ```bash
   git add .
   ```

   ```bash
   git add <文件路径/文件名>
   ```

4. 忽略文件: 

   在根目录下创建文件.gitignore

   在文件夹内写入要忽略的文件名

5. 向仓库提交代码: 

   ```bash
   git commit -m <这里是描述>
   ```

6. 查看提交记录: 

   ```bash
   git log
   ```



## Git撤销

1. 恢复工作区的文件: 

   ```bash
   git checkout <文件名>
   ```

2. 暂存区取消跟踪文件: 

   ```bash
   git rm --cached <文件名>
   ```

3. 取消已经 commit 的文件:

   ```bash
   git reset --soft HEAD^
   ```

4. 将git仓库记录恢复出来，覆盖工作区和暂存区: 

   ```bash
   git rest --hard <要退回的版本id，id可以通过命令git log中获取>
   ```

   

## Git分支

1. 查看分支: 

   ```bash
   git branch
   ```

2. 创建分支: 

   ```bash
   git branch <分支>
   ```

3. 切换分支: 

   ```bash
   git checkout <分支>
   ```

4. 创建并切换分支: 

   ```bash
   git checkout -b <分支>
   ```

5. 本地分支推送到远程分支: 

   ```bash
   git push origin <本地分支>:<远程分支>
   ```

6. 查看本地、远程分支: 

   ```bash
   git branch -a
   ```

7. 合并分支: 

   ```bash
   git merge <分支>
   ```

8. 删除已合并分支，未合并分支无法删除: 

   ```bash
   git branch -d <分支>
   ```

9. 删除未合并分支:

   ```bash
   git branch -D <分支>
   ```

10. 删除远程分支:

    ```bash
    git push origin :<远程分支>
    ```

11. 存储临时改动: 

    ```bash
    git stash
    ```

12. 恢复改动: 

    ```bash
    git stash pop
    ```



## Github推送

1. 推送仓库: 

   ```bash
   git push <远程仓库地址> <分支>
   ```

2. 远程仓库起别名: 

   ```bash
   git remote add <远程仓库别名/origin> <远程仓库地址>
   ```

3. 别名推送仓库: 

   ```bash
   git push <远程仓库别名/origin> <分支>
   ```

4. 记住推送地址及分支: 

   ```bash
   git push -u <远程仓库地址> <分支>
   ```

   

## Github拉取

1. 克隆远程仓库到本地仓库: 

   ```bash
   git clone <远程仓库地址>
   ```

2. 拉取远程仓库: 

   ```bash
   git pull <远程仓库地址/origin> <分支>
   ```

   

