
package com.example.quizgame.controller;

import com.example.quizgame.model.Category;

import com.example.quizgame.service.CategoryService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
@CrossOrigin(origins = "http://127.0.0.1:5500")

public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    
    // Get all categories
    @GetMapping
    public List<Category> getAllCategories() {
        return categoryService.getAllCategories();
        
    }
    
    // Add a new category
    @PostMapping("add")
    public String createCategory(@RequestBody @Valid Category category) {
        categoryService.createCategory(category);
        return "added successfully ";
    }

   
}
