package tech.airacoon.visualgo.pojo;

import lombok.Data;
//import org.springframework.stereotype.Component;

import java.io.Serializable;

/**
 * @author airacoon(li.guiyang @ hotmail.com)
 * 系统中角色的Bean
 */
@Data
//@Component
public class Role implements Serializable {
    /**
     *
     */
    private static final long serialVersionUID = -3997576596403363994L;
    private Integer id;
    private String name;
}
