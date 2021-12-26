package tech.airacoon.visualgo.dao;

// import org.apache.ibatis.annotations.Mapper;

import org.apache.ibatis.annotations.Param;
// import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;
import tech.airacoon.visualgo.pojo.BookFile;
import tech.airacoon.visualgo.pojo.File;
import tech.airacoon.visualgo.pojo.FileWithType;

import java.util.List;

/**
 * @author airacoon(li.guiyang @ hotmail.com)
 * 系统关于姿态资源的DAO
 */
@Repository
public interface FileDao {
    /**
     * @param typeName
     * @param authorId
     * @return
     */
    List<File> queryFilesByType(@Param("typeName") String typeName, @Param("authorId") Integer authorId);

    /**
     * @param typeName
     * @return
     */
    String getBasePathByTypeName(@Param("typeName") String typeName);

    /**
     * @param id
     * @return
     */
    FileWithType queryFileById(@Param("fileId") Integer id);

    /**
     * @return
     */
    FileWithType getFristFile();

    /**
     * @param literatureType
     * @param authorId
     * @return
     */
    List<BookFile> getDefaultBookFile(@Param("literatureType") Integer literatureType, @Param("authorId") Integer authorId);

}
