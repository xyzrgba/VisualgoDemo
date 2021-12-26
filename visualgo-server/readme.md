### Visualgo-Server

#### 1.简介：学习spring项目的工程

#### 2.部署方法

2.1 在SQLyog中执行 /Visualgo-Server/doc/visualgo-db.sql

2.2 修改 /Visualgo-Server/src/main/resources/application.properties

   ```properties
   spring.datasource.username=部署机器上MySQL的用户名
   spring.datasource.password=用户名的密码
   ```

2.3 将/Visual-Server/book文件夹下的 **server** 文件夹放入到本地的硬盘上，然后修改 **application.properties** 的配置。在**参考资源**模块中，部分资源由于Github的大文件限制暂不提供，**Githuber**可以修改数据库中 **file** 表中修改。

   ```properties
   # 配置文件
   customize.static.sources-path=file:{server文件夹在本地的绝对路径}
   ```

2.4 用IDEA打开项目，后直接运行。

2.5 项目详情请查看当前项目的Wiki文档。

