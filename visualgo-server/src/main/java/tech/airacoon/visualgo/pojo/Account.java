package tech.airacoon.visualgo.pojo;

import lombok.Data;
//import org.springframework.stereotype.Component;

import java.io.Serializable;

/**
 * @author airacoon(li.guiyang @ hotmail.com)
 * 账户实体Bean
 */
@Data
//@Component
public class Account implements Serializable {
    /**
     *
     */
    private static final long serialVersionUID = -5095163454415895880L;
    private Integer id;
    private String name;
    private String password;
    private Integer roleId;
    private String email;
    private String location;
    private Integer stateId;
    private String avator;
    private String userNumber;//工号
}
