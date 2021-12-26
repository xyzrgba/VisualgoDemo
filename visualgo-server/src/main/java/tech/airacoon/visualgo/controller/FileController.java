package tech.airacoon.visualgo.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
// import org.apache.shiro.SecurityUtils;
// import org.apache.shiro.authz.annotation.Logical;
// import org.apache.shiro.authz.annotation.RequiresRoles;
// import org.apache.shiro.subject.Subject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
// import tech.airacoon.visualgo.pojo.Account;
import tech.airacoon.visualgo.pojo.BookFile;
import tech.airacoon.visualgo.pojo.File;
import tech.airacoon.visualgo.pojo.FileWithType;
import tech.airacoon.visualgo.service.FileService;

// import javax.annotation.Resource;
import java.util.List;

/**
 * @author airacoon(li.guiyang@hotmail.com)
 * 静态资源控制器
 */
@Controller
@RequestMapping(value = "/file")
//@RequiresRoles(value = {"admin", "student", "teacher"}, logical = Logical.OR)
public class FileController {

    @Autowired
    @Qualifier("fileServiceImpl")
    private FileService fileService;
    private Logger logger = LoggerFactory.getLogger(FileController.class);
    private ObjectMapper objectMapper = new ObjectMapper();

    @RequestMapping(value = {"/index", ""})
    public String index(Model model) {
        List<BookFile> fileList = fileService.getDefaultBookFile(1, 1);
        List<BookFile> cfileList = fileService.getDefaultBookFile(2, 1);
        FileWithType fileWithType = fileService.getFristFile();
        model.addAttribute("fileList", fileList);
        model.addAttribute("cfileList", cfileList);
        model.addAttribute("defaultFile", "/sources/" + fileWithType.getFileType().getBasePath() + fileWithType.getPath());
        return "front/filedata";
    }

    @ResponseBody
    @RequestMapping(value = "/default")
    public String getFileListByType(@RequestParam(value = "typeName") String typeName, @RequestParam(value = "authorId", defaultValue = "1") Integer authorId) {
        List<File> fileList = fileService.getFilesByType(typeName, authorId);
        String result = null;
        try {
            result = objectMapper.writeValueAsString(fileList);
        } catch (JsonProcessingException e) {
            logger.debug(e.getMessage());
        }
        return result;
    }

    @ResponseBody
    @RequestMapping(value = "/getFileInfo", method = RequestMethod.POST, produces = "application/json;charset=utf-8")
    public String getFileInfoById(@RequestParam("index") Integer id) {
        String result = null;
        FileWithType file = fileService.getFileById(id);
        try {
            result = objectMapper.writeValueAsString(file);
            logger.info("----查询的结果是 ---- " + result);
        } catch (JsonProcessingException e) {
            logger.debug(e.getMessage());
        }
        return result;
    }
}
