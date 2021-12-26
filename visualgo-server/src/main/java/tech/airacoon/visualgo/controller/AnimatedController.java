package tech.airacoon.visualgo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * @author airacoon(li.guiyang@hotmail.com)
 * 静态资源的访问器，静态资源可以直接返回页面的html内容
 */
@Controller
public class AnimatedController {
    @ResponseBody
    @RequestMapping(value = "/animated", method = RequestMethod.POST, produces = "text/plain;charset=utf-8")
    public String getFrameSrc(@RequestParam(value = "dir", defaultValue = "list") String dir, @RequestParam(value = "file", defaultValue = "list") String file) {
        String srcValue = "/animations/pages/" + dir + "/" + file + ".html";
        return srcValue;
    }
}
