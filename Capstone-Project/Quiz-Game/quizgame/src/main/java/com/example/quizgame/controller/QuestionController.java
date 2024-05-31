
package com.example.quizgame.controller;

import com.example.quizgame.model.Question;
import com.example.quizgame.service.QuestionService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/questions")
@CrossOrigin("http://127.0.0.1:5501")
@Validated

public class QuestionController {

    @Autowired
    private QuestionService questionService;

   
    // Get questions by CategoryId and Difficulty
    
    @GetMapping("{categoryId}/{difficultyLevel}")
    public List<Question> getQuestionsByCategoryIdAndDifficultyLevel(@PathVariable Long categoryId, @PathVariable String difficultyLevel) {
        return questionService.getQuestionByCategoryIdAndDifficultyLevel(categoryId, difficultyLevel);
    }


    // Post a new question
    @PostMapping("add")
    public String createQuestion(@RequestBody @Valid List<Question> question) {
        questionService.addQuestion(question);
        return "added successfully ";
    }

    // Delete a question
    @DeleteMapping("{questionId}")
    public String deleteQuestion(@PathVariable Long questionId) {
        questionService.deleteQuestion(questionId);
        return "deleted succesfully";
    }
}
