package tech.airacoon.visualgo.pojo;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * @author airacoon(li.guiyang @ hotmail.com)
 * 问题简介的Bean
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class SimpleAnswer extends Answer {
    private QuestionWithDiff questionWithDiff;
    private AnswerState answerState;
}
