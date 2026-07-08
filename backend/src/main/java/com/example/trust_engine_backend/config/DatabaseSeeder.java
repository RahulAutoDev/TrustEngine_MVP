package com.example.trust_engine_backend.config;

import com.example.trust_engine_backend.model.Answer;
import com.example.trust_engine_backend.model.Question;
import com.example.trust_engine_backend.repository.QuestionRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class DatabaseSeeder implements CommandLineRunner {

    private final QuestionRepository questionRepository;

    public DatabaseSeeder(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // Only seed if the database is completely empty
        if (questionRepository.count() == 0) {
            System.out.println("Seeding database with initial AI Governance questions...");
            
            // Transparency
            createQuestion("Are end-users explicitly informed that they are interacting with an AI system?", "Transparency", 1);
            createQuestion("Is there clear documentation on the system's capabilities and limitations available to stakeholders?", "Transparency", 1);
            createQuestion("Can the model's decisions be explained in a human-understandable format?", "Transparency", 1);

            // Fairness
            createQuestion("Has the training data been audited for demographic or historical bias?", "Fairness", 1);
            createQuestion("Are there automated checks in production to detect bias drift?", "Fairness", 1);
            createQuestion("Is there a formal mechanism for users to report suspected biased outcomes?", "Fairness", 1);

            // Privacy
            createQuestion("Is all Personally Identifiable Information (PII) anonymized before model training?", "Privacy", 1);
            createQuestion("Do you have explicit, documented user consent for the data used by this AI system?", "Privacy", 1);
            createQuestion("Is there an automated mechanism to fulfill \"Right to be Forgotten\" data deletion requests?", "Privacy", 1);

            // Security
            createQuestion("Does your AI system maintain immutable audit logs of all interactions and decisions?", "Security", 1);
            createQuestion("Has the model undergone adversarial testing or red-teaming prior to deployment?", "Security", 1);
            createQuestion("Are there fallback mechanisms in place if the AI system degrades or fails in production?", "Security", 1);

            // Accountability
            createQuestion("Is there a designated, named owner responsible for the ongoing compliance of this system?", "Accountability", 1);
            createQuestion("Are high-risk AI decisions subject to mandatory \"human-in-the-loop\" review?", "Accountability", 1);
            createQuestion("Do you maintain a centralized, up-to-date inventory of all deployed AI models?", "Accountability", 1);
            
            System.out.println("Database seeded successfully with 15 questions.");
        }
    }

    private void createQuestion(String text, String category, int weight) {
        Question q = new Question();
        q.setText(text);
        q.setCategory(category);
        q.setWeight(weight);

        List<Answer> answers = new ArrayList<>();
        answers.add(createAnswer(q, "Yes", 5));
        answers.add(createAnswer(q, "Partial", 3));
        answers.add(createAnswer(q, "No", 0));
        q.setAnswers(answers);

        questionRepository.save(q);
    }

    private Answer createAnswer(Question q, String text, int scoreValue) {
        Answer a = new Answer();
        a.setQuestion(q);
        a.setText(text);
        a.setScoreValue(scoreValue);
        return a;
    }
}
