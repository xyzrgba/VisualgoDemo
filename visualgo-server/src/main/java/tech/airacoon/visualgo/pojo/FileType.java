package tech.airacoon.visualgo.pojo;

import lombok.Data;
//import org.springframework.stereotype.Component;

/**
 * @author airacoon(li.guiyang @ hotmail.com)
 * 文件类型，不同文件类型对应的文件基址不一样
 */
@Data
//@Component
public class FileType {
    private Integer type;
    private String name;
    private String basePath;
}
