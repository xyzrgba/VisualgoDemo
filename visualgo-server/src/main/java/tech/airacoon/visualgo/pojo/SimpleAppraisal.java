package tech.airacoon.visualgo.pojo;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * @author airacoon(li.guiyang@hotmail.com)
 * 答复简介
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class SimpleAppraisal extends Appraisal {
    private DetailAnswer detailAnswer;
}
