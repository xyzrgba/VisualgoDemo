package tech.airacoon.visualgo.pojo;

import lombok.Data;
import lombok.EqualsAndHashCode;
//import org.springframework.stereotype.Component;

/**
 * @author airacoon(li.guiyang @ hotmail.com)
 * 硬盘中的pdf文件
 */
@Data
//@Component
@EqualsAndHashCode(callSuper = false)
public class BookFile extends File {
    private Literature literature;
    private LiteratureType literatureType;
    private FileType fileType;
}
