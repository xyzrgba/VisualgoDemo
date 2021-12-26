package tech.airacoon.visualgo.pojo;

import lombok.Data;
import lombok.EqualsAndHashCode;
//import org.springframework.stereotype.Component;

/**
 * @author airacoon(li.guiyang @ hotmail.com)
 * 包括文件类型的文件类
 */
@Data
//@Component
@EqualsAndHashCode(callSuper = false)
public class FileWithType extends File {
    private FileType fileType;
}
