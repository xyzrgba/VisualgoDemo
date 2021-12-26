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
import tech.airacoon.visualgo.pojo.*;
import tech.airacoon.visualgo.service.AccountService;
import tech.airacoon.visualgo.service.AnswerService;
import tech.airacoon.visualgo.service.AppraisalService;
import tech.airacoon.visualgo.service.QuestionService;

import java.util.List;

/**
 * @author airacoon(li.guiyang@hotmail.com)
 * 学生角色的控制器，系统关于学生功能的实现
 */
@Controller
@RequestMapping("/student")
public class StudentController {
    private Logger logger = LoggerFactory.getLogger(StudentController.class);

    @Autowired
    @Qualifier("accountServiceImpl")
    private AccountService accountService;
    @Autowired
    @Qualifier("answerServiceImpl")
    private AnswerService answerService;
    @Autowired
    @Qualifier("questionServiceImpl")
    private QuestionService questionService;
    @Autowired
    @Qualifier("appraisalServiceImpl")
    private AppraisalService appraisalService;
    @Autowired
    private AnswerController answerController;

    @RequestMapping(value = {"", "/", "/index"})
    public String index(Model model) {
        return "back/student";
    }

    /**
     * 获取学生的答题情况
     *
     * @param model
     * @return
     */
    @RequestMapping("/info")
    public String defaultInfo(Model model) {
        Account account = (AccountView) SecurityUtils.getSubject().getPrincipal();
        List<SimpleAnswer> simpleAnswerList = answerService.getSimpleAnswers(account);
        model.addAttribute("answerList", simpleAnswerList);
        return "back/student_answer_info";
    }

    /**
     * 获取用户的信息的页面
     *
     * @param model
     * @return
     */
    @RequestMapping("/userinfo")
    public String userInfo(Model model) {
        AccountView account = (AccountView) SecurityUtils.getSubject().getPrincipal();
        AccountView accountView = accountService.getAccountById(account.getId());
        model.addAttribute("user", accountView);
        model.addAttribute("infoAction", "/student/updateUserInfo");
        return "back/userInfo";
    }

    /**
     * 更新学生的信息
     *
     * @param model
     * @param account
     * @return
     */
    @RequestMapping("/updateUserInfo")
    public String updateUserInfo(Model model, Account account) {
        AccountView accountView = (AccountView) SecurityUtils.getSubject().getPrincipal();
        logger.info(account.toString());
        if (account.getEmail().equals(accountView.getEmail())) {
            accountService.updateAccountInfoByEmail(account);
            model.addAttribute("okHint", "更新完成");
        }
        return "forward:/student/userinfo";
    }

    /**
     * 获取学生的基本信息
     *
     * @param model
     * @return
     */
    @RequestMapping("/password")
    public String passwordPage(Model model) {
        AccountView accountView = (AccountView) SecurityUtils.getSubject().getPrincipal();
        model.addAttribute("userEmail", accountView.getEmail());
        model.addAttribute("pwdAction", "/student/changePwd");
        return "back/password";
    }

    /**
     * 更改密码
     *
     * @param model
     * @param oldPwd
     * @param newPwd
     * @param email
     * @return
     */
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
        return "forward:/student/password";
    }

    @RequestMapping("/answer_info")
    public String answerInfo(Model model) {
        return "forward:/student/info";
    }

    @RequestMapping("/answer_detail/{answer_id}")
    public String answerDetail(Model model, @PathVariable("answer_id") Integer answerId) {
        SimpleAnswer simpleAnswer = answerService.getSimpleAnswerById(answerId);
        if (simpleAnswer != null) {
            model.addAttribute("answerDetail", simpleAnswer);
        }
        return "back/answerDetail";
    }

    @RequestMapping("/my_all_appraisal")
    public String lookAllAppraisal(Model model) {
        Account account = (AccountView) SecurityUtils.getSubject().getPrincipal();
        List<SimpleAppraisal> simpleAppraisals = appraisalService.getAllAppraisalByStudentId(account.getId());
        model.addAttribute("appraisalList", simpleAppraisals);
        return "back/student_all_appraisal";
    }

    @RequestMapping("/gotoLookAppraisal/{appraisalId}")
    public String gotoLookAppraisal(Model model, @PathVariable("appraisalId") Integer appraisalId) {
        SimpleAppraisal simpleAppraisal = appraisalService.getAppraisalById(appraisalId);
        model.addAttribute("simpleAppraisal", simpleAppraisal);
        return "back/student_appraisal_info";
    }

    @RequestMapping(value = {"/commitAnswer"})
    public String commitAnswer(@RequestParam("answerContent") String answerContent, @RequestParam("questionId") Integer questionId, Model model) {
        return answerController.commitAnswer(answerContent, questionId, model);
    }
}
