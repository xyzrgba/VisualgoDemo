package tech.airacoon.visualgo.controller;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authz.annotation.Logical;
import org.apache.shiro.authz.annotation.RequiresRoles;
// import org.apache.shiro.subject.Subject;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
// import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
// import tech.airacoon.visualgo.pojo.Account;
import tech.airacoon.visualgo.pojo.AccountView;

/**
 * @author airacoon(li.guiyang@hotmail.com)
 * 后台中心
 */
@RequestMapping(value = {"/center"})
@RequiresRoles(value = {"student", "teacher", "admin"}, logical = Logical.OR)
@Controller
public class CenterController {
    @RequestMapping(value = {"/index", "", "/"})
    public String index(Model model) {
        AccountView accountView = (AccountView) SecurityUtils.getSubject().getPrincipal();
        String newPath = "forward:/" + accountView.getRole().getName()+"/index";
        model.addAttribute("roleName",accountView.getRole().getName());
        return newPath;
    }
}
