package tech.airacoon.visualgo.pojo;

import lombok.Data;

import java.util.Date;

/**
 * @author airacoon(li.guiyang@hotmail.com)
 * 评估类
 */
@Data
public class Appraisal {
    private Integer id;
    private Integer answerId;
    private Integer accountId;
    private String content;
    private Date date;
}
