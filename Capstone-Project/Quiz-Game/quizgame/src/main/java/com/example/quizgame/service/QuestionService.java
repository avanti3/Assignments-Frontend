package com.example.quizgame.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.quizgame.repository.QuestionRepository;
import com.example.quizgame.model.Question;

@Service
public class QuestionService {
    @Autowired
    QuestionRepository questionRepository;


    public List<Question> getQuestionByCategoryIdAndDifficultyLevel(Long categoryId, String difficultyLevel) {
       return questionRepository.findByCategoryCategoryIdAndDifficultyLevel(categoryId, difficultyLevel);
       
    }


    public String addQuestion(List<Question> question) {
        questionRepository.saveAll(question);
        return "success";
     }
    
     public String deleteQuestion(Long questionId) {
      questionRepository.deleteById(questionId);
      return "success";
  }
}
