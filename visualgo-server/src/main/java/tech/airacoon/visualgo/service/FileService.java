package tech.airacoon.visualgo.service;

// import tech.airacoon.visualgo.pojo.Account;

import tech.airacoon.visualgo.pojo.BookFile;
import tech.airacoon.visualgo.pojo.File;
import tech.airacoon.visualgo.pojo.FileWithType;

import java.util.List;

/**
 * @author airacoon(li.guiyang @ hotmail.com)
 * 静态资源的service
 */
public interface FileService {
    /**
     * @param typeName
     * @param authorId
     * @return
     */
    List<File> getFilesByType(String typeName, Integer authorId);

    /**
     * @param typeName
     * @return
     */
    String getBasePathByTypeName(String typeName);

    /**
     * 通过文件的id获取信息
     *
     * @param id
     * @return
     */
    FileWithType getFileById(Integer id);

    /**
     * 获取文件的第一条记录
     *
     * @return
     */
    FileWithType getFristFile();

    /**
     * @param literatureType
     * @param authorId
     * @return
     */
    List<BookFile> getDefaultBookFile(Integer literatureType, Integer authorId);
}
