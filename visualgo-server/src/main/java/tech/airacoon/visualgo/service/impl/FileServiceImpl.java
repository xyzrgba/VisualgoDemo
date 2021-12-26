package tech.airacoon.visualgo.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import tech.airacoon.visualgo.dao.FileDao;
// import tech.airacoon.visualgo.pojo.Account;
import tech.airacoon.visualgo.pojo.BookFile;
import tech.airacoon.visualgo.pojo.File;
import tech.airacoon.visualgo.pojo.FileWithType;
import tech.airacoon.visualgo.service.FileService;

import java.util.List;

/**
 * @author airacoon(li.guiyang@hotmail.com)
 * 静态资源的service的实现
 */
@Service
public class FileServiceImpl implements FileService {
    @Autowired
    private FileDao fileDao;

    @Override
    public List<File> getFilesByType(String typeName, Integer authorId) {
        return fileDao.queryFilesByType(typeName, authorId);
    }

    @Override
    public String getBasePathByTypeName(String typeName) {
        return fileDao.getBasePathByTypeName(typeName);
    }

    @Override
    public FileWithType getFileById(Integer id) {
        return fileDao.queryFileById(id);
    }

    @Override
    public FileWithType getFristFile() {
        return fileDao.getFristFile();
    }

    @Override
    public List<BookFile> getDefaultBookFile(Integer literatureType, Integer authorId) {
        return fileDao.getDefaultBookFile(literatureType, authorId);
    }

}
