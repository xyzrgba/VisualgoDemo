package tech.airacoon.visualgo.controller;

import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author airacoon(li.guiyang@hotmail.com)
 * 出错处理器
 */
@RequestMapping("/error")
public class ErrorController {
    @RequestMapping("/error")
    public String error() {
        return "error/error";
    }
}
