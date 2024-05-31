
package com.example.quizgame.repository;
import com.example.quizgame.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {

  
    List<Question> findByCategoryCategoryIdAndDifficultyLevel(Long categoryId, String difficultyLevel);

   

}
