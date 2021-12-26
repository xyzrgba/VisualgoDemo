package tech.airacoon.visualgo.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tech.airacoon.visualgo.dao.AnswerDao;
import tech.airacoon.visualgo.pojo.Account;
import tech.airacoon.visualgo.pojo.Answer;
import tech.airacoon.visualgo.pojo.DetailAnswer;
import tech.airacoon.visualgo.pojo.SimpleAnswer;
import tech.airacoon.visualgo.service.AnswerService;

import java.util.List;

/**
 * @author airacoon(li.guiyang@hotmail.com)
 * 问题的service的实现
 */
@Service
public class AnswerServiceImpl implements AnswerService {
    @Autowired
    private AnswerDao answerDao;

    /**
     * 向数据库提交一个问题
     * @param answer
     */
    @Override
    @Transactional(timeout = 3600)
    public Integer addAnswer(Answer answer) {
        return answerDao.addAnswer(answer);
    }

    @Override
    public List<SimpleAnswer> getSimpleAnswers(Account account) {
        return answerDao.getSimpleAnswers(account);
    }

    @Override
    public SimpleAnswer getSimpleAnswerById(Integer answerId) {
        return answerDao.getSimpleAnswerById(answerId);
    }

    @Override
    public List<DetailAnswer> getDetailAnswersByTeacherId(Integer teacherId) {
        return answerDao.getDetailAnswersByTeacherId(teacherId);
    }

    @Override
    public DetailAnswer getDetailAnswerById(Integer answerId) {
        return answerDao.getDetailAnswerById(answerId);
    }
}
