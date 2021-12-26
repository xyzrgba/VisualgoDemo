/*
SQLyog Enterprise v12.08 (64 bit)
MySQL - 5.7.28-log : Database - algorithmic_support_database
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`algorithmic_support_database` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `algorithmic_support_database`;

/*Table structure for table `account` */

DROP TABLE IF EXISTS `account`;

CREATE TABLE `account` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `role_id` int(2) NOT NULL DEFAULT '3',
  `email` varchar(255) NOT NULL COMMENT '电子邮件',
  `location` varchar(255) DEFAULT NULL COMMENT '位置',
  `state_id` int(4) NOT NULL DEFAULT '1',
  `avatar` varchar(255) DEFAULT NULL,
  `user_number` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`,`email`),
  UNIQUE KEY `account_email` (`email`),
  UNIQUE KEY `user_number` (`user_number`),
  KEY `account_level` (`role_id`),
  KEY `account_state` (`state_id`),
  CONSTRAINT `account_level` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`),
  CONSTRAINT `account_state` FOREIGN KEY (`state_id`) REFERENCES `account_state` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

/*Data for the table `account` */

insert  into `account`(`id`,`name`,`password`,`role_id`,`email`,`location`,`state_id`,`avatar`,`user_number`) values (1,'教师账号测试','666666',2,'airacoon@qq.com','江西丰城',1,NULL,'2016101811'),(4,'测试员先生','admin',1,'admin@airacoon.tech','中国山东',1,NULL,'2016101809'),(5,'雪山','student',3,'student@airacoon.tech','中国丰城罗山',1,NULL,'2016101866'),(6,'老师','teacher',2,'teacher@airacoon.tech','中国南昌',1,NULL,'2005101866'),(8,'liguiyang','muzi331107',1,'li.guiyang@foxmail.com','中国',1,NULL,'20200409210748'),(9,'学生','666666',3,'student@nit.edu.cn','中国',1,NULL,'20200409210749'),(10,'李','thinkpad',3,'thinkpad@airacoon.tech',NULL,1,NULL,'20200409210750'),(11,'电脑','t430',3,'t430@qq.com','中国景德镇',1,NULL,'20200409210751'),(12,'Jack','muzi',3,'jack@qq.com',NULL,1,NULL,'20200409210752'),(13,'使用者','okcn',3,'jacker@ok.cn','中国西藏',1,NULL,'20200409211130');

/*Table structure for table `account_state` */

DROP TABLE IF EXISTS `account_state`;

CREATE TABLE `account_state` (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL COMMENT '状态名称',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

/*Data for the table `account_state` */

insert  into `account_state`(`id`,`name`) values (1,'激活'),(2,'注销'),(3,'在线'),(4,'离线');

/*Table structure for table `answer` */

DROP TABLE IF EXISTS `answer`;

CREATE TABLE `answer` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `content` longtext NOT NULL,
  `question_id` int(11) NOT NULL,
  `account_id` int(11) NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `state` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `question_id` (`question_id`),
  KEY `account_id` (`account_id`),
  KEY `state` (`state`),
  CONSTRAINT `answer_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `question` (`id`),
  CONSTRAINT `answer_ibfk_2` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`),
  CONSTRAINT `answer_ibfk_3` FOREIGN KEY (`state`) REFERENCES `answer_state` (`state`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

/*Data for the table `answer` */

insert  into `answer`(`id`,`content`,`question_id`,`account_id`,`date`,`state`) values (1,'你好a',6,1,'2020-04-09 12:00:03',2),(2,'hello1',1,1,'2020-04-09 12:10:22',2),(3,'相加',1,5,'2020-04-09 14:41:46',2),(4,'知道',9,5,'2020-04-09 13:19:53',2),(5,'匹配算法\r\n',12,5,'2020-04-09 14:46:41',2),(6,'a+b',1,9,'2020-04-09 14:53:51',2),(7,'aaabbbb',6,9,'2020-04-10 15:17:56',2),(8,'hello',15,1,'2020-04-10 15:13:34',1),(9,'hello',7,1,'2020-04-10 15:17:08',1),(10,'1111111',20,5,'2020-04-10 15:19:45',1),(11,'组合111abcd测试',11,5,'2020-04-10 15:42:10',1),(12,'poweXXX中文测试，11111',18,5,'2020-04-10 15:51:02',2);

/*Table structure for table `answer_state` */

DROP TABLE IF EXISTS `answer_state`;

CREATE TABLE `answer_state` (
  `state` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`state`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Data for the table `answer_state` */

insert  into `answer_state`(`state`,`name`) values (1,'未通过'),(2,'通过');

/*Table structure for table `appraisal` */

DROP TABLE IF EXISTS `appraisal`;

CREATE TABLE `appraisal` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `answer_id` int(11) NOT NULL,
  `content` longtext NOT NULL,
  `account_id` int(11) NOT NULL,
  `date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `account_id` (`account_id`),
  KEY `answer_id` (`answer_id`),
  CONSTRAINT `appraisal_ibfk_2` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`),
  CONSTRAINT `appraisal_ibfk_3` FOREIGN KEY (`answer_id`) REFERENCES `answer` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

/*Data for the table `appraisal` */

insert  into `appraisal`(`id`,`answer_id`,`content`,`account_id`,`date`) values (1,1,'通过',1,'2020-04-09 11:56:50'),(2,2,'通过',1,'2020-04-09 12:09:50'),(4,4,'通过',1,'2020-04-09 13:19:53'),(5,3,'测试：good',1,'2020-04-09 14:41:46'),(6,5,'试一试',1,'2020-04-09 14:46:41'),(7,6,'可以',1,'2020-04-09 14:53:51'),(8,7,'好的',1,'2020-04-10 15:17:56'),(9,12,'测试yu12.,/',1,'2020-04-10 15:51:02');

/*Table structure for table `blog` */

DROP TABLE IF EXISTS `blog`;

CREATE TABLE `blog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `author_id` int(11) NOT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `content` longtext COMMENT '正文,再用markdown,图片等资源全部采用路径',
  PRIMARY KEY (`id`),
  KEY `blog_author` (`author_id`),
  CONSTRAINT `blog_author` FOREIGN KEY (`author_id`) REFERENCES `account` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `blog` */

/*Table structure for table `comment` */

DROP TABLE IF EXISTS `comment`;

CREATE TABLE `comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `blog_id` int(11) NOT NULL,
  `account_id` int(11) NOT NULL,
  `content` longtext NOT NULL,
  PRIMARY KEY (`id`),
  KEY `comment_blog_id` (`blog_id`),
  KEY `comment_author_id` (`account_id`),
  CONSTRAINT `comment_author_id` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`),
  CONSTRAINT `comment_blog_id` FOREIGN KEY (`blog_id`) REFERENCES `blog` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `comment` */

/*Table structure for table `file` */

DROP TABLE IF EXISTS `file`;

CREATE TABLE `file` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `type` int(4) NOT NULL,
  `path` varchar(255) NOT NULL COMMENT '这是相对于基础路径的地址',
  `author_id` int(11) NOT NULL DEFAULT '0',
  `state` int(11) NOT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `literature_id` int(10) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `file_author` (`author_id`),
  KEY `file_type` (`type`),
  KEY `file_state` (`state`),
  KEY `literature_id` (`literature_id`),
  CONSTRAINT `file_author` FOREIGN KEY (`author_id`) REFERENCES `account` (`id`),
  CONSTRAINT `file_ibfk_1` FOREIGN KEY (`literature_id`) REFERENCES `literature` (`id`),
  CONSTRAINT `file_state` FOREIGN KEY (`state`) REFERENCES `file_state` (`state`),
  CONSTRAINT `file_type` FOREIGN KEY (`type`) REFERENCES `file_type` (`type`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

/*Data for the table `file` */

insert  into `file`(`id`,`name`,`type`,`path`,`author_id`,`state`,`create_time`,`update_time`,`literature_id`) values (1,'第一章',3,'ds_learn_guide/第一章.pdf',1,3,'2020-03-09 18:50:08','2020-03-09 18:50:11',1),(2,'第二章',3,'ds_learn_guide/第二章.pdf',1,3,'2020-03-09 18:52:28','2020-03-09 18:52:25',1),(3,'第三章',3,'ds_learn_guide/第三章.pdf',1,3,'2020-03-09 18:58:38','2020-03-09 18:58:36',1),(4,'第四章',3,'ds_learn_guide/第四章.pdf',1,3,'2020-03-12 17:21:56','2020-03-12 17:22:02',1),(5,'第五章',3,'ds_learn_guide/第五章.pdf',1,3,'2020-03-12 17:30:57','2020-03-12 17:31:07',1),(6,'第六章',3,'ds_learn_guide/第六章.pdf',1,3,'2020-03-12 17:32:43','2020-03-12 17:32:45',1),(7,'第七章',3,'ds_learn_guide/第七章.pdf',1,3,'2020-03-12 17:33:07','2020-03-12 17:33:09',1),(8,'第八章',3,'ds_learn_guide/第八章.pdf',1,3,'2020-03-12 17:33:26','2020-03-12 17:33:29',1),(9,'第九章',3,'ds_learn_guide/第九章.pdf',1,3,'2020-03-12 17:33:46','2020-03-12 17:33:49',1),(10,'数据结构C语言版',3,'ds_text_book/数据结构.pdf',1,3,'2020-03-12 22:12:28','2020-03-12 22:12:30',2),(11,'大话数据结构',3,'ds_text_book/大话数据结构.pdf',1,3,'2020-03-13 16:35:49','2020-03-13 16:35:51',2),(12,'图解数据结构',3,'ds_text_book/图解数据结构.pdf',1,3,'2020-03-13 16:41:04','2020-03-13 16:41:06',2),(13,'算法导论',3,'ds_text_book/算法导论.pdf',1,3,'2020-03-13 17:29:47','2020-03-13 17:29:49',2);

/*Table structure for table `file_state` */

DROP TABLE IF EXISTS `file_state`;

CREATE TABLE `file_state` (
  `state` int(11) NOT NULL,
  `name` varchar(255) NOT NULL COMMENT '状态名称',
  PRIMARY KEY (`state`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `file_state` */

insert  into `file_state`(`state`,`name`) values (1,'正在编辑'),(2,'待发布'),(3,'已发布'),(4,'已删除');

/*Table structure for table `file_type` */

DROP TABLE IF EXISTS `file_type`;

CREATE TABLE `file_type` (
  `type` int(11) NOT NULL AUTO_INCREMENT COMMENT '文件类型',
  `name` varchar(255) NOT NULL,
  `base_path` varchar(255) DEFAULT NULL COMMENT '不同的图片存在不同的文件夹',
  PRIMARY KEY (`type`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

/*Data for the table `file_type` */

insert  into `file_type`(`type`,`name`,`base_path`) values (1,'avator','avator/'),(2,'image','image/'),(3,'pdf','pdf/'),(4,'ppt','ppt/'),(5,'word','word/');

/*Table structure for table `literature` */

DROP TABLE IF EXISTS `literature`;

CREATE TABLE `literature` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `type` int(10) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `literature_type` (`type`),
  CONSTRAINT `literature_type` FOREIGN KEY (`type`) REFERENCES `literature_type` (`type`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Data for the table `literature` */

insert  into `literature`(`id`,`name`,`type`) values (1,'数据结构学习指导',1),(2,'数据结构',2);

/*Table structure for table `literature_type` */

DROP TABLE IF EXISTS `literature_type`;

CREATE TABLE `literature_type` (
  `type` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`type`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Data for the table `literature_type` */

insert  into `literature_type`(`type`,`name`) values (1,'学习指导'),(2,'教科书');

/*Table structure for table `question` */

DROP TABLE IF EXISTS `question`;

CREATE TABLE `question` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `account_id` int(11) NOT NULL DEFAULT '1',
  `content` longtext NOT NULL,
  `title` varchar(255) NOT NULL,
  `difficulty` int(11) DEFAULT NULL,
  `en_name` varchar(255) NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `en_name` (`en_name`),
  KEY `account_id` (`account_id`),
  KEY `difficulty` (`difficulty`),
  CONSTRAINT `question_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`),
  CONSTRAINT `question_ibfk_2` FOREIGN KEY (`difficulty`) REFERENCES `question_difficulty` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;

/*Data for the table `question` */

insert  into `question`(`id`,`account_id`,`content`,`title`,`difficulty`,`en_name`,`date`) values (1,1,'给定一个整数数组 nums 和一个目标值 target， 请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。 你可以假设每种输入只会对应一个答案。 但是，你不能重复利用这个数组中同样的元素。 利用Java解决','两数之和',1,'two_sum','2020-04-10 15:50:37'),(2,1,'给出两个非空的链表用来表示两个非负的整数。 <br/>\r\n其中，它们各自的位数是按照逆序的方式存储的，并且它们的每个节点只能存储一位数字。<br/>\r\n如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。 <br/>\r\n您可以假设除了数字 0 之外，这两个数都不会以 0 开头。 <br/>\r\n示例： <br/>\r\n输入：(2 -> 4 -> 3) + (5 -> 6 -> 4) <br/>\r\n输出：7 -> 0 -> 8 <br/>\r\n原因：342 + 465 = 807 <br/>\r\n','两数相加',2,'two_add','2020-04-08 21:16:36'),(3,1,'给定两个大小为 m 和 n 的有序数组 nums1 和 nums2。 <br/>\r\n请你找出这两个有序数组的中位数，并且要求算法的时间复杂度为 O(log(m + n))。 <br/>\r\n你可以假设 nums1 和 nums2 不会同时为空。 <br/>\r\n示例 1: <br/>\r\nnums1 = [1, 3] <br/>\r\nnums2 = [2] <br/>\r\n则中位数是 2.0 <br/>\r\n示例 2: <br/>\r\nnums1 = [1, 2] <br/>\r\nnums2 = [3, 4] <br/>\r\n则中位数是 (2 + 3)/2 = 2.5 <br/>','寻找两个有序数组的中位数',3,'find_mid','2020-04-08 21:16:38'),(4,1,'给定一个 没有重复 数字的序列，返回其所有可能的全排列。 <br/>\r\n示例: <br/>\r\n输入: [1,2,3] <br/>\r\n输出: <br/>\r\n[ <br/>\r\n  [1,2,3], <br/>\r\n  [1,3,2], <br/>\r\n  [2,1,3], <br/>\r\n  [2,3,1], <br/>\r\n  [3,1,2], <br/>\r\n  [3,2,1] <br/>\r\n]<br/>','全排列',2,'permutations','2020-04-08 21:16:40'),(5,1,'给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有满足条件且不重复的三元组。<br/>\r\n注意：答案中不可以包含重复的三元组。<br/>\r\n示例：<br/>\r\n给定数组 nums = [-1, 0, 1, 2, -1, -4]，<br/>\r\n满足要求的三元组集合为：<br/>\r\n[<br/>\r\n  [-1, 0, 1],<br/>\r\n  [-1, -1, 2]<br/>\r\n]<br/>','三数之和',2,'3sum','2020-04-08 21:16:42'),(6,1,'判断一个整数是否是回文数。回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。<br/>\r\n示例 1: <br/>\r\n输入: 121 <br/>\r\n输出: true <br/>\r\n示例 2: <br/>\r\n输入: -121 <br/>\r\n输出: false <br/>\r\n解释: 从左向右读, 为 -121 。 从右向左读, 为 121- 。因此它不是一个回文数。 <br/>\r\n示例 3: <br/>\r\n输入: 10 <br/>\r\n输出: false <br/>\r\n解释: 从右向左读, 为 01 。因此它不是一个回文数。 <br/>','回文数',1,'palindrome-number','2020-04-08 21:16:44'),(7,1,'给定两个以字符串形式表示的非负整数 num1 和 num2，返回 num1 和 num2 的乘积，它们的乘积也表示为字符串形式。<br/>\r\n示例 1:<br/>\r\n输入: num1 = \"2\", num2 = \"3\"<br/>\r\n输出: \"6\"<br/>\r\n示例 2:<br/>\r\n输入: num1 = \"123\", num2 = \"456\"<br/>\r\n输出: \"56088\"<br/>\r\n说明：<br/>\r\nnum1 和 num2 的长度小于110。<br/>\r\nnum1 和 num2 只包含数字 0-9。<br/>\r\nnum1 和 num2 均不以零开头，除非是数字 0 本身。<br/>','字符串相乘',2,'multiply-strings','2020-04-08 21:16:46'),(8,1,'实现获取下一个排列的函数，算法需要将给定数字序列重新排列成字典序中下一个更大的排列。<br/>\r\n如果不存在下一个更大的排列，则将数字重新排列成最小的排列（即升序排列）。<br/>\r\n必须原地修改，只允许使用额外常数空间。<br/>\r\n以下是一些例子，输入位于左侧列，其相应输出位于右侧列。<br/>\r\n1,2,3 → 1,3,2<br/>\r\n3,2,1 → 1,2,3<br/>\r\n1,1,5 → 1,5,1<br/>\r\n','下一个排列',2,'next-permutation','2020-04-08 21:17:20'),(9,1,'给你一个数组 nums 和一个值 val，你需要 原地 移除所有数值等于 val 的元素，并返回移除后数组的新长度。<br/>\r\n不要使用额外的数组空间，你必须仅使用 O(1) 额外空间并 原地 修改输入数组。<br/>\r\n元素的顺序可以改变。你不需要考虑数组中超出新长度后面的元素。<br/>\r\n示例 1:<br/>\r\n给定 nums = [3,2,2,3], val = 3,<br/>\r\n函数应该返回新的长度 2, 并且 nums 中的前两个元素均为 2。<br/>\r\n你不需要考虑数组中超出新长度后面的元素。<br/>\r\n示例 2:<br/>\r\n给定 nums = [0,1,2,2,3,0,4,2], val = 2,<br/>\r\n函数应该返回新的长度 5, 并且 nums 中的前五个元素为 0, 1, 3, 0, 4。<br/>\r\n注意这五个元素可为任意顺序。<br/>\r\n你不需要考虑数组中超出新长度后面的元素。<br/>','移除元素',1,'remove-element','2020-04-08 21:17:18'),(10,1,'给定一个仅包含 0 和 1 的二维二进制矩阵，找出只包含 1 的最大矩形，并返回其面积。<br/>\r\n示例:<br/>\r\n输入:<br/>\r\n[<br/>\r\n  [\"1\",\"0\",\"1\",\"0\",\"0\"],<br/>\r\n  [\"1\",\"0\",\"1\",\"1\",\"1\"],<br/>\r\n  [\"1\",\"1\",\"1\",\"1\",\"1\"],<br/>\r\n  [\"1\",\"0\",\"0\",\"1\",\"0\"]<br/>\r\n]<br/>\r\n输出: 6<br/>','最大矩形',3,'maximal-rectangle','2020-04-08 21:17:16'),(11,1,'给定两个整数 n 和 k，返回 1 ... n 中所有可能的 k 个数的组合。<br/>\r\n示例:<br/>\r\n输入: n = 4, k = 2<br/>\r\n输出:<br/>\r\n[<br/>\r\n  [2,4],<br/>\r\n  [3,4],<br/>\r\n  [2,3],<br/>\r\n  [1,2],<br/>\r\n  [1,3],<br/>\r\n  [1,4],<br/>\r\n]<br/>','组合',2,'combinations','2020-04-08 21:17:15'),(12,1,'给定一个只包含数字的字符串，复原它并返回所有可能的 IP 地址格式。<br/>\r\n示例:<br/>\r\n输入: \"25525511135\"<br/>\r\n输出: [\"255.255.11.135\", \"255.255.111.35\"]<br/>','复原IP地址',2,'restore-ip-addresses','2020-04-08 21:17:13'),(13,1,'格雷编码是一个二进制数字系统，在该系统中，两个连续的数值仅有一个位数的差异。给定一个代表编码总位数的非负整数 n，打印其格雷编码序列。格雷编码序列必须以 0 开头。<br/>\r\n示例 1:<br/>\r\n输入: 2<br/>\r\n输出: [0,1,3,2]<br/>\r\n解释:<br/>\r\n00 - 0<br/>\r\n01 - 1<br/>\r\n11 - 3<br/>\r\n10 - 2<br/>\r\n对于给定的 n，其格雷编码序列并不唯一。<br/>\r\n例如，[0,2,3,1] 也是一个有效的格雷编码序列。<br/>\r\n00 - 0<br/>\r\n10 - 2<br/>\r\n11 - 3<br/>\r\n01 - 1<br/>\r\n示例 2:<br/>\r\n输入: 0<br/>\r\n输出: [0]<br/>\r\n解释: 我们定义格雷编码序列必须以 0 开头。<br/>\r\n给定编码总位数为 n 的格雷编码序列，其长度为 2n。当 n = 0 时，长度为 20 = 1。<br/>\r\n因此，当 n = 0 时，其格雷编码序列为 [0]。<br/>\r\n','格雷编码',2,'gray-code','2020-04-08 21:17:11'),(14,1,'给你一个整数数组 nums ，请你找出数组中乘积最大的连续子数组（该子数组中至少包含一个数字）。<br/>\r\n示例 1:<br/>\r\n<br/>\r\n输入: [2,3,-2,4]<br/>\r\n输出: 6<br/>\r\n解释: 子数组 [2,3] 有最大乘积 6。<br/>\r\n示例 2:<br/>\r\n<br/>\r\n输入: [-2,0,-1]<br/>\r\n输出: 0<br/>\r\n解释: 结果不能为 2, 因为 [-2,-1] 不是子数组。<br/>','乘积最大子数组',2,'maximum-product-subarray','2020-04-08 21:16:56'),(15,1,'设计一个支持 push ，pop ，top 操作，并能在常数时间内检索到最小元素的栈。<br/>\r\n<br/>\r\npush(x) —— 将元素 x 推入栈中。<br/>\r\npop() —— 删除栈顶的元素。<br/>\r\ntop() —— 获取栈顶元素。<br/>\r\ngetMin() —— 检索栈中的最小元素。<br/>\r\n示例:<br/>\r\n<br/>\r\nMinStack minStack = new MinStack();<br/>\r\nminStack.push(-2);<br/>\r\nminStack.push(0);<br/>\r\nminStack.push(-3);<br/>\r\nminStack.getMin();   --> 返回 -3.<br/>\r\nminStack.pop();<br/>\r\nminStack.top();      --> 返回 0.<br/>\r\nminStack.getMin();   --> 返回 -2.<br/>','最小栈',1,'min-stack','2020-04-08 21:16:53'),(16,1,'反转一个单链表。<br/>\r\n<br/>\r\n示例:<br/>\r\n<br/>\r\n输入: 1->2->3->4->5->NULL<br/>\r\n输出: 5->4->3->2->1->NULL<br/>','反转链表',1,'reverse-linked-list','2020-04-08 21:16:55'),(17,1,'给定两个字符串 s 和 t，判断它们是否是同构的。<br/>\r\n<br/>\r\n如果 s 中的字符可以被替换得到 t ，那么这两个字符串是同构的。<br/>\r\n<br/>\r\n所有出现的字符都必须用另一个字符替换，同时保留字符的顺序。两个字符不能映射到同一个字符上，但字符可以映射自己本身。<br/>\r\n<br/>\r\n示例 1:<br/>\r\n<br/>\r\n输入: s = \"egg\", t = \"add\"<br/>\r\n输出: true<br/>\r\n示例 2:<br/>\r\n<br/>\r\n输入: s = \"foo\", t = \"bar\"<br/>\r\n输出: false<br/>\r\n示例 3:<br/>\r\n<br/>\r\n输入: s = \"paper\", t = \"title\"<br/>\r\n输出: true<br/>\r\n说明:<br/> \r\n你可以假设 s 和 t 具有相同的长度。<br/>','同构字符串',1,'isomorphic-strings','2020-04-08 21:16:51'),(18,1,'实现 pow(x, n) ，即计算 x 的 n 次幂函数。<br/>\r\n示例 1:<br/>\r\n输入: 2.00000, 10<br/>\r\n输出: 1024.00000<br/>\r\n示例 2:<br/>\r\n输入: 2.10000, 3<br/>\r\n输出: 9.26100<br/>\r\n示例 3:<br/>\r\n输入: 2.00000, -2<br/>\r\n输出: 0.25000<br/>\r\n解释: 2-2 = 1/22 = 1/4 = 0.25<br/>\r\n说明:<br/>\r\n    -100.0 < x < 100.0<br/>\r\n    n 是 32 位有符号整数，其数值范围是 [−231, 231 − 1] 。<br/>','Pow(x, n)',2,'powx-n','2020-04-08 23:22:56'),(19,6,'罗马数字包含以下七种字符： I， V， X， L，C，D 和 M。<br/>\r\n\r\n字符          数值<br/>\r\nI             1<br/>\r\nV             5<br/>\r\nX             10<br/>\r\nL             50<br/>\r\nC             100<br/>\r\nD             500<br/>\r\nM             1000<br/>\r\n\r\n例如， 罗马数字 2 写做 II ，即为两个并列的 1。12 写做 XII ，即为 X + II 。 27 写做  XXVII, 即为 XX + V + II 。<br/>\r\n\r\n通常情况下，罗马数字中小的数字在大的数字的右边。但也存在特例，例如 4 不写做 IIII，而是 IV。数字 1 在数字 5 的左边，所表示的数等于大数 5 减小数 1 得到的数值 4 。同样地，数字 9 表示为 IX。这个特殊的规则只适用于以下六种情况：<br/>\r\n\r\n    I 可以放在 V (5) 和 X (10) 的左边，来表示 4 和 9。<br/>\r\n    X 可以放在 L (50) 和 C (100) 的左边，来表示 40 和 90。 <br/>\r\n    C 可以放在 D (500) 和 M (1000) 的左边，来表示 400 和 900。<br/>\r\n\r\n给定一个整数，将其转为罗马数字。输入确保在 1 到 3999 的范围内。<br/>\r\n\r\n示例 1:<br/>\r\n\r\n输入: 3<br/>\r\n输出: \"III\"<br/>\r\n\r\n示例 2:<br/>\r\n\r\n输入: 4<br/>\r\n输出: \"IV\"<br/>\r\n\r\n示例 3:<br/>\r\n\r\n输入: 9<br/>\r\n输出: \"IX\"<br/>\r\n\r\n示例 4:<br/>\r\n\r\n输入: 58<br/>\r\n输出: \"LVIII\"<br/>\r\n解释: L = 50, V = 5, III = 3.<br/>\r\n\r\n示例 5:<br/>\r\n\r\n输入: 1994<br/>\r\n输出: \"MCMXCIV\"<br/>\r\n解释: M = 1000, CM = 900, XC = 90, IV = 4.<br/>',' 整数转罗马数字',2,'integer-to-roman','2020-04-09 14:51:35'),(20,1,'数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。\r\n示例：\r\n输入：n = 3\r\n输出：[\r\n       \"((()))\",\r\n       \"(()())\",\r\n       \"(())()\",\r\n       \"()(())\",\r\n       \"()()()\"\r\n     ]','括号生成',2,'generate-parentheses','2020-04-10 15:18:39');

/*Table structure for table `question_difficulty` */

DROP TABLE IF EXISTS `question_difficulty`;

CREATE TABLE `question_difficulty` (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*Data for the table `question_difficulty` */

insert  into `question_difficulty`(`id`,`name`) values (1,'简单'),(2,'中等'),(3,'困难');

/*Table structure for table `role` */

DROP TABLE IF EXISTS `role`;

CREATE TABLE `role` (
  `id` int(2) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL COMMENT '备注\n',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

/*Data for the table `role` */

insert  into `role`(`id`,`name`) values (1,'admin'),(2,'teacher'),(3,'student'),(4,'visitor');

/* Procedure structure for procedure `addFullAppraisal` */

/*!50003 DROP PROCEDURE IF EXISTS  `addFullAppraisal` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `addFullAppraisal`(
	IN appraisal_answer_id INT,IN appraisal_content LONGTEXT,IN appraisal_account_id INT
    )
BEGIN
	INSERT INTO appraisal(answer_id,content,account_id)
        VALUES (appraisal_answer_id ,appraisal_content,appraisal_account_id);
        UPDATE answer SET state= 2
        WHERE id = appraisal_answer_id;
    END */$$
DELIMITER ;

/*Table structure for table `account_view` */

DROP TABLE IF EXISTS `account_view`;

/*!50001 DROP VIEW IF EXISTS `account_view` */;
/*!50001 DROP TABLE IF EXISTS `account_view` */;

/*!50001 CREATE TABLE  `account_view`(
 `id` int(11) ,
 `name` varchar(45) ,
 `password` varchar(45) ,
 `role_id` int(2) ,
 `email` varchar(255) ,
 `location` varchar(255) ,
 `user_number` varchar(255) ,
 `state_id` int(4) ,
 `avatar` varchar(255) ,
 `role_name` varchar(45) ,
 `account_state_name` varchar(255) 
)*/;

/*Table structure for table `bookfile` */

DROP TABLE IF EXISTS `bookfile`;

/*!50001 DROP VIEW IF EXISTS `bookfile` */;
/*!50001 DROP TABLE IF EXISTS `bookfile` */;

/*!50001 CREATE TABLE  `bookfile`(
 `id` int(11) ,
 `name` varchar(255) ,
 `type` int(4) ,
 `path` varchar(255) ,
 `author_id` int(11) ,
 `state` int(11) ,
 `create_time` datetime ,
 `update_time` datetime ,
 `literature_id` int(10) ,
 `base_path` varchar(255) ,
 `file_type_name` varchar(255) ,
 `literature_name` varchar(255) ,
 `literature_type_name` varchar(255) ,
 `literature_type` int(10) 
)*/;

/*Table structure for table `detail_answer` */

DROP TABLE IF EXISTS `detail_answer`;

/*!50001 DROP VIEW IF EXISTS `detail_answer` */;
/*!50001 DROP TABLE IF EXISTS `detail_answer` */;

/*!50001 CREATE TABLE  `detail_answer`(
 `id` int(10) ,
 `content` longtext ,
 `question_id` int(11) ,
 `account_id` int(11) ,
 `date` datetime ,
 `answer_state_name` varchar(255) ,
 `state` int(11) ,
 `question_content` longtext ,
 `question_title` varchar(255) ,
 `question_level` varchar(20) ,
 `question_account_id` int(11) ,
 `student_email` varchar(255) ,
 `student_name` varchar(45) 
)*/;

/*Table structure for table `simple_answer` */

DROP TABLE IF EXISTS `simple_answer`;

/*!50001 DROP VIEW IF EXISTS `simple_answer` */;
/*!50001 DROP TABLE IF EXISTS `simple_answer` */;

/*!50001 CREATE TABLE  `simple_answer`(
 `id` int(10) ,
 `content` longtext ,
 `question_id` int(11) ,
 `account_id` int(11) ,
 `date` datetime ,
 `question_content` longtext ,
 `question_title` varchar(255) ,
 `question_level` varchar(20) ,
 `question_account_id` int(11) ,
 `state` int(11) ,
 `answer_state_name` varchar(255) 
)*/;

/*Table structure for table `simple_appraisal` */

DROP TABLE IF EXISTS `simple_appraisal`;

/*!50001 DROP VIEW IF EXISTS `simple_appraisal` */;
/*!50001 DROP TABLE IF EXISTS `simple_appraisal` */;

/*!50001 CREATE TABLE  `simple_appraisal`(
 `id` int(11) ,
 `teacher_id` int(11) ,
 `appraisal_content` longtext ,
 `appraisal_answer_id` int(11) ,
 `appraisal_date` datetime ,
 `student_id` int(11) ,
 `student_name` varchar(45) ,
 `student_email` varchar(255) ,
 `answer_state_name` varchar(255) ,
 `answer_content` longtext ,
 `question_content` longtext ,
 `question_level` varchar(20) ,
 `question_title` varchar(255) ,
 `question_id` int(11) 
)*/;

/*Table structure for table `simple_question` */

DROP TABLE IF EXISTS `simple_question`;

/*!50001 DROP VIEW IF EXISTS `simple_question` */;
/*!50001 DROP TABLE IF EXISTS `simple_question` */;

/*!50001 CREATE TABLE  `simple_question`(
 `id` int(10) ,
 `account_id` int(11) ,
 `content` longtext ,
 `title` varchar(255) ,
 `difficulty` int(11) ,
 `question_level` varchar(20) ,
 `en_name` varchar(255) ,
 `date` datetime 
)*/;

/*View structure for view account_view */

/*!50001 DROP TABLE IF EXISTS `account_view` */;
/*!50001 DROP VIEW IF EXISTS `account_view` */;

/*!50001 CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `account_view` AS (select `account`.`id` AS `id`,`account`.`name` AS `name`,`account`.`password` AS `password`,`account`.`role_id` AS `role_id`,`account`.`email` AS `email`,`account`.`location` AS `location`,`account`.`user_number` AS `user_number`,`account`.`state_id` AS `state_id`,`account`.`avatar` AS `avatar`,`role`.`name` AS `role_name`,`account_state`.`name` AS `account_state_name` from ((`account` join `account_state`) join `role`) where ((`account`.`role_id` = `role`.`id`) and (`account`.`state_id` = `account_state`.`id`))) */;

/*View structure for view bookfile */

/*!50001 DROP TABLE IF EXISTS `bookfile` */;
/*!50001 DROP VIEW IF EXISTS `bookfile` */;

/*!50001 CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `bookfile` AS (select `file`.`id` AS `id`,`file`.`name` AS `name`,`file`.`type` AS `type`,`file`.`path` AS `path`,`file`.`author_id` AS `author_id`,`file`.`state` AS `state`,`file`.`create_time` AS `create_time`,`file`.`update_time` AS `update_time`,`file`.`literature_id` AS `literature_id`,`file_type`.`base_path` AS `base_path`,`file_type`.`name` AS `file_type_name`,`literature`.`name` AS `literature_name`,`literature_type`.`name` AS `literature_type_name`,`literature`.`type` AS `literature_type` from (((`file` join `file_type`) join `literature`) join `literature_type`) where ((`file`.`type` = `file_type`.`type`) and (`literature`.`type` = `literature_type`.`type`) and (`file`.`literature_id` = `literature`.`id`))) */;

/*View structure for view detail_answer */

/*!50001 DROP TABLE IF EXISTS `detail_answer` */;
/*!50001 DROP VIEW IF EXISTS `detail_answer` */;

/*!50001 CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `detail_answer` AS (select `simple_answer`.`id` AS `id`,`simple_answer`.`content` AS `content`,`simple_answer`.`question_id` AS `question_id`,`simple_answer`.`account_id` AS `account_id`,`simple_answer`.`date` AS `date`,`simple_answer`.`answer_state_name` AS `answer_state_name`,`simple_answer`.`state` AS `state`,`simple_answer`.`question_content` AS `question_content`,`simple_answer`.`question_title` AS `question_title`,`simple_answer`.`question_level` AS `question_level`,`simple_answer`.`question_account_id` AS `question_account_id`,`account`.`email` AS `student_email`,`account`.`name` AS `student_name` from (`simple_answer` join `account`) where (`simple_answer`.`question_account_id` = `account`.`id`)) */;

/*View structure for view simple_answer */

/*!50001 DROP TABLE IF EXISTS `simple_answer` */;
/*!50001 DROP VIEW IF EXISTS `simple_answer` */;

/*!50001 CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `simple_answer` AS (select `answer`.`id` AS `id`,`answer`.`content` AS `content`,`answer`.`question_id` AS `question_id`,`answer`.`account_id` AS `account_id`,`answer`.`date` AS `date`,`simple_question`.`content` AS `question_content`,`simple_question`.`title` AS `question_title`,`simple_question`.`question_level` AS `question_level`,`simple_question`.`account_id` AS `question_account_id`,`answer`.`state` AS `state`,`answer_state`.`name` AS `answer_state_name` from ((`answer` join `simple_question`) join `answer_state`) where ((`simple_question`.`id` = `answer`.`question_id`) and (`answer`.`state` = `answer_state`.`state`))) */;

/*View structure for view simple_appraisal */

/*!50001 DROP TABLE IF EXISTS `simple_appraisal` */;
/*!50001 DROP VIEW IF EXISTS `simple_appraisal` */;

/*!50001 CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `simple_appraisal` AS (select `appraisal`.`id` AS `id`,`appraisal`.`account_id` AS `teacher_id`,`appraisal`.`content` AS `appraisal_content`,`appraisal`.`answer_id` AS `appraisal_answer_id`,`appraisal`.`date` AS `appraisal_date`,`detail_answer`.`account_id` AS `student_id`,`detail_answer`.`student_name` AS `student_name`,`detail_answer`.`student_email` AS `student_email`,`detail_answer`.`answer_state_name` AS `answer_state_name`,`detail_answer`.`content` AS `answer_content`,`detail_answer`.`question_content` AS `question_content`,`detail_answer`.`question_level` AS `question_level`,`detail_answer`.`question_title` AS `question_title`,`detail_answer`.`question_id` AS `question_id` from (`appraisal` join `detail_answer`) where (`appraisal`.`answer_id` = `detail_answer`.`id`)) */;

/*View structure for view simple_question */

/*!50001 DROP TABLE IF EXISTS `simple_question` */;
/*!50001 DROP VIEW IF EXISTS `simple_question` */;

/*!50001 CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `simple_question` AS (select `question`.`id` AS `id`,`question`.`account_id` AS `account_id`,`question`.`content` AS `content`,`question`.`title` AS `title`,`question`.`difficulty` AS `difficulty`,`question_difficulty`.`name` AS `question_level`,`question`.`en_name` AS `en_name`,`question`.`date` AS `date` from (`question` join `question_difficulty`) where (`question`.`difficulty` = `question_difficulty`.`id`)) */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
