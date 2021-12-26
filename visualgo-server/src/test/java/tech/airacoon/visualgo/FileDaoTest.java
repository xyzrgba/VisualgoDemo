package tech.airacoon.visualgo;

import org.junit.jupiter.api.Test;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import tech.airacoon.visualgo.pojo.File;
import tech.airacoon.visualgo.service.FileService;

import java.util.List;

@SpringBootTest
public class FileDaoTest {
    @Autowired
    private FileService fileService;
    private Logger logger = LoggerFactory.getLogger(FileDaoTest.class);

    @Test
    public void query() {
        List<File> fileList = fileService.getFilesByType("pdf", 1);
        for (File file : fileList) {
            logger.debug(file.toString());
        }
    }
}
