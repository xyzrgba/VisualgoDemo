package tech.airacoon.visualgo.service;

import tech.airacoon.visualgo.pojo.Appraisal;
import tech.airacoon.visualgo.pojo.SimpleAppraisal;

import java.util.List;

/**
 * @author airacoon(li.guiyang @ hotmail.com)
 * 答复的Service
 */
public interface AppraisalService {
    /**
     * @param appraisal
     * @return
     */
    Integer addFullAppraisaByTeacher(Appraisal appraisal);

    /**
     * @param teacherId
     * @return
     */
    List<SimpleAppraisal> getAllAppraisalByTeacherId(Integer teacherId);

    /**
     * @param studentId
     * @return
     */
    List<SimpleAppraisal> getAllAppraisalByStudentId(Integer studentId);

    /**
     * @param appraisalId
     * @return
     */
    SimpleAppraisal getAppraisalById(Integer appraisalId);
}
