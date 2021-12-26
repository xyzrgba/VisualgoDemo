package tech.airacoon.visualgo.pojo;

import lombok.Data;

/**
 * @author airacoon(li.guiyang @ hotmail.com)
 * 问题状态的Bean,this bean name is account_state in mysql
 */
@Data
public class AnswerState {
    private Integer state;
    private String name;
}
