package tech.airacoon.visualgo.service;

import tech.airacoon.visualgo.pojo.Question;
import tech.airacoon.visualgo.pojo.QuestionWithDiff;

import java.util.List;

/**
 * @author airacoon(li.guiyang @ hotmail.com)
 * 问题的Service
 */
public interface QuestionService {
    /**
     * @return
     */
    public List<QuestionWithDiff> getAllQuestions();

    /**
     * @param enName
     * @return
     */
    QuestionWithDiff getQuestionByEnName(String enName);

    /**
     * @param accountId
     * @return
     */
    List<QuestionWithDiff> getQuestionByAccountId(Integer accountId);

    /**
     * @param question
     * @return
     */
    Integer updateQuestionById(Question question);

    /**
     * @param questionId
     * @return
     */
    QuestionWithDiff getQuestionById(Integer questionId);

    /**
     * @param question
     * @return
     */
    Integer addFullQuestion(Question question);
}
