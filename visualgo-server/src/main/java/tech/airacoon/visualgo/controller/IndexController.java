package tech.airacoon.visualgo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RequestParam;

/**
 * @author airacoon(li.guiyang@hotmail.com)
 * 首页处理
 */
@Controller
public class IndexController {

    @RequestMapping(value = {"/", "/index"})
    public String index() {
        return "front/index";
    }

    @GetMapping(value = {"/animation"})
    public String animated(Model model) {
        String srcValue = "/animations/pages/list/list.html";
        model.addAttribute("iframeSrc", srcValue);
        return "front/animations";
    }
}
