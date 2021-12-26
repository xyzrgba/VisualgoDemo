package tech.airacoon.visualgo.dao;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;
import tech.airacoon.visualgo.pojo.Account;
import tech.airacoon.visualgo.pojo.Answer;
import tech.airacoon.visualgo.pojo.DetailAnswer;
import tech.airacoon.visualgo.pojo.SimpleAnswer;

import java.util.List;

/**
 * @author airacoon(li.guiyang @ hotmail.com)
 * 问题相关的DAO
 */
@Repository
public interface AnswerDao {
    /**
     * @param answer
     * @return
     */
    Integer addAnswer(@Param("answer") Answer answer);

    /**
     * @param account
     * @return
     */
    List<SimpleAnswer> getSimpleAnswers(@Param("account") Account account);

    /**
     * @param answerId
     * @return
     */
    SimpleAnswer getSimpleAnswerById(@Param("answerId") Integer answerId);

    /**
     * @param teacherId
     * @return
     */
    List<DetailAnswer> getDetailAnswersByTeacherId(@Param("teacherId") Integer teacherId);

    /**
     * @param answerId
     * @return
     */
    DetailAnswer getDetailAnswerById(@Param("answerId") Integer answerId);
}
