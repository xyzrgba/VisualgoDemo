package tech.airacoon.visualgo.dao;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;
import tech.airacoon.visualgo.pojo.Question;
import tech.airacoon.visualgo.pojo.QuestionWithDiff;

import java.util.List;

/**
 * @author airacoon(li.guiyang @ hotmail.com)
 * 系统有关于问题的DAO
 */
@Repository
public interface QuestionDao {
    /**
     * @return
     */
    List<QuestionWithDiff> getAllQuestions();

    /**
     * @param enName
     * @return
     */
    QuestionWithDiff getQuestionByEnName(@Param("enName") String enName);

    /**
     * @param questionId
     * @return
     */
    QuestionWithDiff getQuestionById(@Param("questionId") Integer questionId);

    /**
     * @param accountId
     * @return
     */
    List<QuestionWithDiff> getQuestionByAccountId(@Param("accountId") Integer accountId);

    /**
     * @param question
     * @return
     */
    Integer updateQuestionById(@Param("question") Question question);

    /**
     * @param question
     * @return
     */
    Integer addFullQuestion(@Param("question") Question question);
}

