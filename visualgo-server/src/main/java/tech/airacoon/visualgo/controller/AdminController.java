package tech.airacoon.visualgo.controller;

import org.apache.shiro.SecurityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
// import sun.rmi.runtime.Log;
import tech.airacoon.visualgo.pojo.Account;
import tech.airacoon.visualgo.pojo.AccountView;
import tech.airacoon.visualgo.service.AccountService;

import java.util.List;

/**
 * @author airacoon(li.guiyang@hotmail.com)
 * 管理员角色的控制器
 */
@Controller
@RequestMapping("/admin")
public class AdminController {
    private Logger logger = LoggerFactory.getLogger(AdminController.class);
    @Autowired
    @Qualifier("accountServiceImpl")
    private AccountService accountService;

    @RequestMapping(value = {"", "/", "/index"})
    public String index(Model model) {
        return "back/admin";
    }

    @RequestMapping("/info")
    public String info(Model model) {
        Account account = (AccountView) SecurityUtils.getSubject().getPrincipal();
        if (account.getRoleId().equals(1)) {
            List<AccountView> accountViewList = accountService.getAllAccounts(account);
            model.addAttribute("accountList", accountViewList);
        }
        return "back/admin_info";
    }

    @RequestMapping("/updateNormalInfo")
    public String updateNormalInfo(Model model, Account account) {
        if (account == null) {

        }
        accountService.updateAccountInfoById(account);
        model.addAttribute("okHint", "更新成功");
        return "forward:/admin/info";
    }

    @RequestMapping("/gotoChangeUserInfo/{userId}")
    public String gotoChangeUserInfo(Model model, @PathVariable("userId") Integer userId) {
        AccountView accountView = accountService.getAccountById(userId);
        model.addAttribute("account", accountView);
        return "back/admin_update_userinfo";
    }

    @RequestMapping("/password")
    public String password(Model model) {
        AccountView accountView = (AccountView) SecurityUtils.getSubject().getPrincipal();
        model.addAttribute("userEmail", accountView.getEmail());
        model.addAttribute("pwdAction", "/admin/changePwd");
        return "back/password";
    }

    @RequestMapping(value = "/changePwd", method = RequestMethod.POST)
    public String changePwd(Model model, @RequestParam("oldPwd") String oldPwd, @RequestParam("newPwd") String newPwd, @RequestParam("email") String email) {
        AccountView accountView = (AccountView) SecurityUtils.getSubject().getPrincipal();
        if (oldPwd.equals(accountView.getPassword()) && email.equals(accountView.getEmail())) {
            Account account = new Account();
            account.setEmail(email);
            account.setPassword(newPwd);
            accountService.updatePassword(account);
            model.addAttribute("okHint", "修改成功");
        } else {
            model.addAttribute("okHint", "账号和密码不匹配");
        }
        return "forward:/admin/password";
    }

    @RequestMapping("/userinfo")
    public String userInfo(Model model) {
        AccountView account = (AccountView) SecurityUtils.getSubject().getPrincipal();
        AccountView accountView = accountService.getAccountById(account.getId());
        model.addAttribute("user", accountView);
        model.addAttribute("infoAction", "/admin/updateUserInfo");
        return "back/userInfo";
    }

    @RequestMapping("/updateUserInfo")
    public String updateUserInfo(Model model, Account account) {
        AccountView accountView = (AccountView) SecurityUtils.getSubject().getPrincipal();
        logger.info(account.toString());
        if (account.getEmail().equals(accountView.getEmail())) {
            accountService.updateAccountInfoByEmail(account);
            model.addAttribute("okHint", "更新完成");
        }
        return "forward:/admin/userinfo";
    }

}
