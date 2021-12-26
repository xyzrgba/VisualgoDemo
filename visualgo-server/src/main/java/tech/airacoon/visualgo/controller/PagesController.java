package tech.airacoon.visualgo.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author airacoon(li.guiyang@hotmail.com)
 * 后台界面控制器
 * 后台界面由于是非静态资源，所以需要通过springMVC处理
 */
@Controller
public class PagesController {
    /**
     *
     */
    private Logger logger = LoggerFactory.getLogger(PagesController.class);

    /**
     * 后台页面的引用
     *
     * @param pages
     * @return
     */
    @RequestMapping("/back/{pages}")
    public String back(@PathVariable("pages") String pages) {
        int lastIndex = pages.lastIndexOf(".");
        String targetPage = "back/index";
        logger.info(targetPage);
        if (lastIndex > 0 && lastIndex < pages.length()) {
            targetPage = "back/"+pages.substring(0,lastIndex);
        }
        logger.info(targetPage);
        return targetPage;
    }
}
