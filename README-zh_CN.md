# README

## 项目

文件夹结构：
 - projects: 存放所有项目级别
 - configs: 存放共通的一些配置，可以直接引入进去
 - packages: 共通项目工具包
 - components: 共通UI库等

### 启动项目
进入到项目文件夹中 `project/**`， 使用 `cmd` 来运行 `pnpm run dev` 命令启动指定项目。

### 升级依赖

```shell
pnpm up --filter "./apps/**"
```

即可升级 `projects` 下所有的包
