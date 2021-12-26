package tech.airacoon.visualgo.pojo;

import lombok.Data;
//import org.springframework.stereotype.Component;

import java.sql.Date;

/**
 * @author airacoon(li.guiyang@hotmail.com)
 * 博客信息类，答辩完成后重构使用
 */
@Data
//@Component
public class Blog {
    private Integer id;
    private String title;
    private Integer accountId;
    private Date createTime;
    private Date updateTime;
    private String content;
}
