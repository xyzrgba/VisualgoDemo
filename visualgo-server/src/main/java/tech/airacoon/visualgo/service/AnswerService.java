package tech.airacoon.visualgo.service;

import tech.airacoon.visualgo.pojo.Account;
import tech.airacoon.visualgo.pojo.Answer;
import tech.airacoon.visualgo.pojo.DetailAnswer;
import tech.airacoon.visualgo.pojo.SimpleAnswer;

import java.util.List;

/**
 * @author airacoon(li.guiyang @ hotmail.com)
 * 问题Service的接口
 */
public interface AnswerService {
    /**
     * 添加问题
     * @param answer
     * @return
     */
    Integer addAnswer(Answer answer);

    /**
     * 获取问题简介
     * @param account
     * @return
     */
    List<SimpleAnswer> getSimpleAnswers(Account account);

    /**
     * 通过id获取问题的简介
     * @param answerId
     * @return
     */
    SimpleAnswer getSimpleAnswerById(Integer answerId);

    /**
     * 教师通过自己的ID获取所有自己提交的所有问题
     * @param teacherId
     * @return
     */
    List<DetailAnswer> getDetailAnswersByTeacherId(Integer teacherId);

    /**
     * 通过问题id获取详细问题
     * @param answerId
     * @return
     */
    DetailAnswer getDetailAnswerById(Integer answerId);
}
