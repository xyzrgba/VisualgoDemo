package tech.airacoon.visualgo.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tech.airacoon.visualgo.dao.QuestionDao;
import tech.airacoon.visualgo.pojo.Question;
import tech.airacoon.visualgo.pojo.QuestionWithDiff;
import tech.airacoon.visualgo.service.QuestionService;

import java.util.List;

/**
 * @author airacoon(li.guiyang@hotmail.com)
 * 问题的service的实现
 */
@Service
public class QuestionServiceImpl implements QuestionService {
    @Autowired
    private QuestionDao questionDao;

    @Override
    public List<QuestionWithDiff> getAllQuestions() {
        return questionDao.getAllQuestions();
    }

    @Override
    public QuestionWithDiff getQuestionByEnName(String enName) {
        return questionDao.getQuestionByEnName(enName);
    }

    @Override
    public List<QuestionWithDiff> getQuestionByAccountId(Integer accountId) {
        return questionDao.getQuestionByAccountId(accountId);
    }

    @Override
    @Transactional(timeout = 3600)
    public Integer updateQuestionById(Question question) {
        return questionDao.updateQuestionById(question);
    }

    @Override
    public QuestionWithDiff getQuestionById(Integer questionId) {
        return questionDao.getQuestionById(questionId);
    }

    @Override
    @Transactional(timeout = 3600)
    public Integer addFullQuestion(Question question) {
        return questionDao.addFullQuestion(question);
    }
}
