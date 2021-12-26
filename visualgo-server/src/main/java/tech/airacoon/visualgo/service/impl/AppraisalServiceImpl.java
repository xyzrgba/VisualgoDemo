package tech.airacoon.visualgo.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tech.airacoon.visualgo.dao.AppraisalDao;
import tech.airacoon.visualgo.pojo.Appraisal;
import tech.airacoon.visualgo.pojo.SimpleAppraisal;
import tech.airacoon.visualgo.service.AppraisalService;

import java.util.List;

/**
 * @author airacoon(li.guiyang@hotmail.com)
 * 答复的service的实现
 */
@Service
public class AppraisalServiceImpl implements AppraisalService {
    @Autowired
    private AppraisalDao appraisalDao;

    @Override
    @Transactional(timeout = 3600)
    public Integer addFullAppraisaByTeacher(Appraisal appraisal) {
        return appraisalDao.addFullAppraisaByTeacher(appraisal);
    }

    @Override
    public List<SimpleAppraisal> getAllAppraisalByTeacherId(Integer teacherId) {
        return appraisalDao.getAllAppraisalByTeacherId(teacherId);
    }

    @Override
    public List<SimpleAppraisal> getAllAppraisalByStudentId(Integer studentId) {
        return appraisalDao.getAllAppraisalByStudentId(studentId);
    }

    @Override
    public SimpleAppraisal getAppraisalById(Integer appraisalId) {
        return appraisalDao.getAppraisalById(appraisalId);
    }
}
