package com.example.quizgame.model;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;


@Entity
public class Question {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long questionId;
    
    @NotBlank(message = "Question text is mandatory")
    private String questionText;

    @NotBlank(message = "Option 1 is mandatory")
    private String option1;

    @NotBlank(message = "Option 2 is mandatory")
    private String option2;

    @NotBlank(message = "Option 3 is mandatory")
    private String option3;

    @NotBlank(message = "Option 4 is mandatory")
    private String option4;

    @NotBlank(message = "Correct option is mandatory")
    private String correctOption;

    @NotBlank(message = "Difficulty level is mandatory")
    private String difficultyLevel;

    @ManyToOne
    @JoinColumn(name="category_id")
    private Category category;


    public Question() {
    }

    public Question(String questionText, String option1, String option2, String option3, String option4, String correctOption, String difficultyLevel, Category category) {
        this.questionText = questionText;
        this.option1 = option1;
        this.option2 = option2;
        this.option3 = option3;
        this.option4 = option4;
        this.correctOption = correctOption;
        this.difficultyLevel = difficultyLevel;
        this.category = category;
    }


    public Long getQuestionId() {
        return questionId;
    }


    public void setquestionId(Long questionId) {
        this.questionId = questionId;
    }


    public String getQuestionText() {
        return questionText;
    }


    public void setQuestionText(String questionText) {
        this.questionText = questionText;
    }


    public String getOption1() {
        return option1;
    }


    public void setOption1(String option1) {
        this.option1 = option1;
    }


    public String getOption2() {
        return option2;
    }


    public void setOption2(String option2) {
        this.option2 = option2;
    }


    public String getOption3() {
        return option3;
    }


    public void setOption3(String option3) {
        this.option3 = option3;
    }


    public String getOption4() {
        return option4;
    }


    public void setOption4(String option4) {
        this.option4 = option4;
    }


    public String getCorrectOption() {
        return correctOption;
    }


    public void setCorrectOption(String correctOption) {
        this.correctOption = correctOption;
    }


    public String getDifficultyLevel() {
        return difficultyLevel;
    }


    public void setDifficultyLevel(String difficultyLevel) {
        this.difficultyLevel = difficultyLevel;
    }


    public Category getCategory() {
        return category;
    }


    public void setCategory(Category category) {
        this.category = category;
    }

    
   
}
