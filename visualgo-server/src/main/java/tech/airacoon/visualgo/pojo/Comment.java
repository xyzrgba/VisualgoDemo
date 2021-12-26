package tech.airacoon.visualgo.pojo;

import lombok.Data;
//import org.springframework.stereotype.Component;

/**
 * @author airacoon(li.guiyang @ hotmail.com)
 * 博客模块中的答复类
 */
@Data
//@Component
public class Comment {
    private Integer id;
    private Integer blogId;
    private Integer accountId;
    private String content;
}
