package tech.airacoon.visualgo.pojo;

import lombok.Data;
import lombok.EqualsAndHashCode;
//import org.springframework.stereotype.Component;

/**
 * @author airacoon@qq.com
 * 数据库中accout_view的实体Bean
 */
@Data
//@Component
@EqualsAndHashCode(callSuper = false)
public class AccountView extends Account{
    /**
     *
     */
    private static final long serialVersionUID = 5272937228487130031L;
    private Role role;
    private AccountState accountState;
}
