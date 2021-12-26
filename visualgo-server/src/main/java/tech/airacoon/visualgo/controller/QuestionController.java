package tech.airacoon.visualgo.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import tech.airacoon.visualgo.pojo.QuestionWithDiff;
import tech.airacoon.visualgo.service.QuestionService;

import java.util.List;

/**
 * @author airacoon(li.guiyang@hotmail.com)
 * 有关于问题的控制器
 */
@Controller
@RequestMapping("/question")
public class QuestionController {
    private Logger logger = LoggerFactory.getLogger(QuestionController.class);
    @Autowired
    @Qualifier("questionServiceImpl")
    private QuestionService questionService;
    @RequestMapping(value = {"", "/", "/index"})
    public String index(Model model) {
        List<QuestionWithDiff> questionList = questionService.getAllQuestions();
        model.addAttribute("simpleQuestionList", questionList);
        return "front/question";
    }

    @RequestMapping("/detail/{enName}")
    public String getDetailQuestion(@PathVariable("enName") String enName,Model model) {
        QuestionWithDiff question  = questionService.getQuestionByEnName(enName);
        model.addAttribute("questionDetail",question);
        logger.info(question.getContent());
        return "front/questionDetail";
    }
}
