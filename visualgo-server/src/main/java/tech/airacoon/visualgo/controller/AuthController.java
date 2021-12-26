package tech.airacoon.visualgo.controller;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.*;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.web.util.SavedRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
// import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import tech.airacoon.visualgo.pojo.Account;
import tech.airacoon.visualgo.service.AccountService;

import java.text.SimpleDateFormat;
// import java.util.Calendar;
import java.util.Date;

/**
 * @author airacoon(li.guiyang@hotmail.com)
 * 登录和注册功能
 */
@Controller
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    @Qualifier("accountServiceImpl")
    private AccountService accountService;
    private Logger logger = LoggerFactory.getLogger(AuthController.class);

    @RequestMapping("/index")
    public String index() {
        return "front/authorization";
    }

    @PostMapping("/login")
    @ResponseBody
    public ModelAndView login(Account account) {
        ModelAndView mv = new ModelAndView();
        Subject subject = SecurityUtils.getSubject();
        UsernamePasswordToken token = new UsernamePasswordToken(account.getEmail(), account.getPassword());
        token.setRememberMe(true);
        try {
            subject.login(token);
            subject.hasRole("");//显示调用授权
            SavedRequest savedRequest = (SavedRequest) subject.getSession().getAttribute("shiroSavedRequest");
            String returnUrl = "redirect:" + savedRequest.getRequestUrl();
            logger.info("返回的URL: " + returnUrl);
            mv.setViewName(returnUrl);
        } catch (UnknownAccountException e) {
            mv.addObject("msg", "用户不存在");
            mv.setViewName("forward:/auth/index");
            logger.info(this.getClass().getName() + " 用户不存在");
        } catch (IncorrectCredentialsException e) {
            mv.addObject("msg", "账号或密码错误");
            mv.setViewName("forward:/auth/index");
            logger.info(this.getClass().getName() + " 账号或密码错误");
        } catch (LockedAccountException e) {
            mv.addObject("msg", "账号被锁定");
            mv.setViewName("forward:/auth/index");
            logger.info(this.getClass().getName() + " 账号被锁定");
        } catch (AuthenticationException e) {
            mv.addObject("msg", "账号验证失败");
            mv.setViewName("forward:/auth/index");
            logger.info(this.getClass().getName() + " 账号验证失败");
        }
        return mv;
    }

    @PostMapping("/reg")
    @ResponseBody
    public ModelAndView reg(Account account) {
        if (account.getEmail() != null && account.getPassword() != null) {
            try {
                Date date = new Date();
                SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
                String dateStr = sdf.format(date);
                account.setUserNumber(dateStr);
                Integer rows = accountService.regAccount(account);
                if (rows.equals(1)) {
                    return this.login(account);
                }
            } catch (Exception e) {
                logger.error(e.getMessage());
            }
        }
        return null;
    }
}
