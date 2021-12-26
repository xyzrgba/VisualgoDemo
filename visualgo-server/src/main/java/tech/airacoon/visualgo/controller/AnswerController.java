package tech.airacoon.visualgo.controller;

import org.apache.shiro.SecurityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
// import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import tech.airacoon.visualgo.pojo.AccountView;
import tech.airacoon.visualgo.pojo.Answer;
import tech.airacoon.visualgo.service.AnswerService;

/**
 * @author airacoon(li.guiyang@hotmail.com)
 * 有关问题的控制器
 */
@Controller
@RequestMapping(value = {"/answer"})
public class AnswerController {
    private Logger logger = LoggerFactory.getLogger(AnswerController.class);
    @Autowired
    @Qualifier("answerServiceImpl")
    private AnswerService answerService;

    public String index() {
        return "";
    }

    @RequestMapping(value = {"/commit"})
    public String commitAnswer(@RequestParam("answerContent") String answerContent, @RequestParam("questionId") Integer questionId, Model model) {
        logger.info(answerContent);
        logger.info(questionId.toString());
        AccountView accountView = (AccountView) SecurityUtils.getSubject().getPrincipal();
        logger.info(accountView.toString());
        Answer answer = new Answer();
        answer.setAccountId(accountView.getId());
        answer.setContent(answerContent);
        answer.setState(1);
        answer.setQuestionId(questionId);
        answerService.addAnswer(answer);
        model.addAttribute("commitAnswerHint", "提交成功");
        return "forward:/question/index";
    }

    public String uploadAnswer() {
        return "";
    }
}
