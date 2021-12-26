package tech.airacoon.visualgo.pojo;

import lombok.Data;

import java.util.Date;

/**
 * @author airacoon(li.guiyang @ hotmail.com)
 * 数据库中Answer的实体Bean
 */
@Data
public class Answer {
    private Integer id;//答复的id
    private String content;//答复的内容
    private Integer questionId;//问题的id
    private Integer accountId;//账户的id
    private Date date;
    private Integer state;
}
