package tech.airacoon.visualgo.dao;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;
import tech.airacoon.visualgo.pojo.Appraisal;
import tech.airacoon.visualgo.pojo.SimpleAppraisal;

import java.util.List;

/**
 * @author airacoon(li.guiyang @ hotmail.com)
 * 有关答复的DAO
 */
@Repository
public interface AppraisalDao {
    /**
     * @param appraisal
     * @return
     */
    Integer addFullAppraisaByTeacher(@Param("appraisal") Appraisal appraisal);

    /**
     * @param teacherId
     * @return
     */
    List<SimpleAppraisal> getAllAppraisalByTeacherId(@Param("teacherId") Integer teacherId);

    /**
     * @param studentId
     * @return
     */
    List<SimpleAppraisal> getAllAppraisalByStudentId(@Param("studentId") Integer studentId);

    /**
     * @param appraisalId
     * @return
     */
    SimpleAppraisal getAppraisalById(@Param("appraisalId") Integer appraisalId);
}
