package tech.airacoon.visualgo.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
// import org.springframework.web.servlet.ModelAndView;

/**
 * @author airacoon(li.guiyang@hotmail.com)
 * 出错处理
 */
@ControllerAdvice
public class SysExceptionHandler {
    private Logger logger = LoggerFactory.getLogger(SysExceptionHandler.class);

    @ExceptionHandler(value = Exception.class)
    public String errorHandler(Model model) {
        logger.info(this.getClass().getName()+" 即将开始跳转");
        return "error/error";
    }
}
