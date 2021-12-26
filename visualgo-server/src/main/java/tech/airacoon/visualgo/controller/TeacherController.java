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
 * 系统关于教师功能的实现
 */
@Controller
@RequestMapping("/teacher")
public class TeacherController {
    private Logger logger = LoggerFactory.getLogger(TeacherController.class);
    @Autowired
    @Qualifier("accountServiceImpl")
    private AccountService accountService;
    @Autowired
    @Qualifier("questionServiceImpl")
    private QuestionService questionService;
    @Autowired
    @Qualifier("appraisalServiceImpl")
    private AppraisalService appraisalService;
    @Autowired
    @Qualifier("answerServiceImpl")
    private AnswerService answerService;

    @RequestMapping(value = {"", "/", "/index"})
    public String index(Model model) {
        return "back/teacher";
    }

    @RequestMapping(value = {"/userinfo"})
    public String userInfo(Model model) {
        AccountView account = (AccountView) SecurityUtils.getSubject().getPrincipal();
        AccountView accountView = accountService.getAccountById(account.getId());
        model.addAttribute("infoAction", "/teacher/updateUserInfo");
        model.addAttribute("user", accountView);
        return "back/userinfo";
    }

    @RequestMapping("/updateUserInfo")
    public String updateUserInfo(Model model, Account account) {
        AccountView accountView = (AccountView) SecurityUtils.getSubject().getPrincipal();
        logger.info(account.toString());
        if (account.getEmail().equals(accountView.getEmail())) {
            accountService.updateAccountInfoByEmail(account);
            model.addAttribute("okHint", "更新完成");
        }
        return "forward:/teacher/userinfo";
    }

    @RequestMapping("/password")
    public String passwordPage(Model model) {
        AccountView accountView = (AccountView) SecurityUtils.getSubject().getPrincipal();
        model.addAttribute("userEmail", accountView.getEmail());
        model.addAttribute("pwdAction", "/teacher/changePwd");
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
        return "forward:/teacher/password";
    }

    @RequestMapping("/questionInfo")
    public String questionInfo(Model model) {
        Account account = (AccountView) SecurityUtils.getSubject().getPrincipal();
        List<QuestionWithDiff> questionList = questionService.getQuestionByAccountId(account.getId());
        if (questionList != null) {
            model.addAttribute("questionList", questionList);
        }
        return "back/teacher_question_info";
    }

    @RequestMapping("/questionDetail/{questionId}")
    public String questionDetail(Model model, @PathVariable(value = "questionId") Integer questionId) {
        QuestionWithDiff question = questionService.getQuestionById(questionId);
        model.addAttribute("questionDetail", question);
        return "back/teacher_update_question";
    }

    @RequestMapping("/updateQuestion")
    public String updateQuestion(Model model, @RequestParam("questionId") Integer questionId, @RequestParam("newContent") String newContent) {
        Question question = new Question();
        question.setId(questionId);
        question.setContent(newContent);
        Integer rows = questionService.updateQuestionById(question);
        logger.info(rows.toString());
        model.addAttribute("okHint", "修改成功");
        return "forward:/teacher/questionInfo";
    }

    @RequestMapping("/addQuestion")
    public String addQuestion(Model model, Question question) {
        Account account = (AccountView) SecurityUtils.getSubject().getPrincipal();
        question.setAccountId(account.getId());
        try {
            questionService.addFullQuestion(question);
            model.addAttribute("okHint", "成功添加到题库");
        } catch (Exception e) {
            logger.info(e.getMessage());
        }
        return "forward:/teacher/newquestion";
    }

    @RequestMapping("/newquestion")
    public String newQuestion(Model model) {
        model.addAttribute("formAction", "/teacher/addQuestion");
        return "back/teacher_add_question";
    }

    @RequestMapping("/newappraisal")
    public String newAppraisal(Model model) {
        return "";
    }


    @RequestMapping("/test_info")
    public String testInfo(Model model) {
        Account account = (AccountView) SecurityUtils.getSubject().getPrincipal();
        if (account == null) {
        }
        List<DetailAnswer> answerList = answerService.getDetailAnswersByTeacherId(account.getId());
        model.addAttribute("detailAnswerList", answerList);
        return "back/teacher_test_info";
    }

    @RequestMapping("/gotoChangeAppraisal/{answerId}")
    public String gotoChangeAppraisal(Model model, @PathVariable("answerId") Integer answerId) {
        DetailAnswer answer = answerService.getDetailAnswerById(answerId);
        model.addAttribute("formAction", "/teacher/addFullAppraisal");
        model.addAttribute("detailAnswer", answer);
        return "back/add_appraisal";
    }

    @RequestMapping("/addFullAppraisal")
    public String addFullAppraisal(Model model, @RequestParam("answerId") Integer answerId,
                                   @RequestParam("content") String content) {
        try {
            Account account = (AccountView) SecurityUtils.getSubject().getPrincipal();
            Appraisal appraisal = new Appraisal();
            appraisal.setAccountId(account.getId());
            appraisal.setContent(content);
            appraisal.setAnswerId(answerId);
            appraisalService.addFullAppraisaByTeacher(appraisal);
            model.addAttribute("okHint", "成功答复");
        } catch (Exception e) {
            model.addAttribute("okHint", "答复失败");
        }
        return "forward:/teacher/test_info";
    }

    @RequestMapping("/gotoLookAppraisal/{appraisalId}")
    public String gotoLookAppraisal(Model model, @PathVariable("appraisalId") Integer appraisalId) {
        SimpleAppraisal simpleAppraisal = appraisalService.getAppraisalById(appraisalId);
        model.addAttribute("simpleAppraisal", simpleAppraisal);
//        model.addAttribute("okHint", "回复成功");
        return "back/teacher_appraisal_info";
    }

    @RequestMapping("/my_all_appraisal")
    public String myAllAppraisal(Model model) {
        Account account = (AccountView) SecurityUtils.getSubject().getPrincipal();
        List<SimpleAppraisal> appraisals = appraisalService.getAllAppraisalByTeacherId(account.getId());
        model.addAttribute("appraisalList", appraisals);
        return "back/teacaher_all_appraisal";
    }
}
