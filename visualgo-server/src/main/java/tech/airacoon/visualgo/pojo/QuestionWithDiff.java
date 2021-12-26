package tech.airacoon.visualgo.pojo;

import lombok.Data;
import lombok.EqualsAndHashCode;
import tech.airacoon.visualgo.pojo.Question;

/**
 * @author airacoon(li.guiyang @ hotmail.com)
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class QuestionWithDiff extends Question {
    private QuestionDifficulty questionDifficulty;
}
