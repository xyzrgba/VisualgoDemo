package tech.airacoon.visualgo.pojo;

import lombok.Data;
//import org.springframework.stereotype.Component;

import java.sql.Date;

/**
 * @author airacoon(li.guiyang @ hotmail.com)
 * 文件类
 */
@Data
//@Component
public class File {
    private Integer id;
    private String name;
    private Integer type;
    private String path;
    private String authorId;
    private Integer state;
    private Date createTime;
    private Date updateTime;
    private Integer literatureId;
}
