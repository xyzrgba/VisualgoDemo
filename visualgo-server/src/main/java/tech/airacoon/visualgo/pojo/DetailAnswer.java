package tech.airacoon.visualgo.pojo;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * @author airacoon(li.guiyang @ hotmail.com)
 * 问题的详细部分
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class DetailAnswer extends SimpleAnswer {
    private Account account;
}
