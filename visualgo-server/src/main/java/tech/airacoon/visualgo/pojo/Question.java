package tech.airacoon.visualgo.pojo;

import lombok.Data;

import java.util.Date;

/**
 * @author airacoon(li.guiyang @ hotmail.com)
 * 问题的Bean
 */
@Data
public class Question {
    private Integer id;//问题编号
    private Integer accountId;//作者id
    private String content;//问题的内容
    private String title;//标题
    private Integer difficulty;//难度等级
    private String enName;
    private Date date;
}
