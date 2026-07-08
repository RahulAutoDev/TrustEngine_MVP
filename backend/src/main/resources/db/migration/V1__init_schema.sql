CREATE TABLE questions (
    id SERIAL PRIMARY KEY,
    text TEXT NOT NULL,
    category VARCHAR(255) NOT NULL,
    weight INTEGER NOT NULL DEFAULT 1
);

CREATE TABLE answers (
    id SERIAL PRIMARY KEY,
    question_id INTEGER NOT NULL REFERENCES questions(id),
    text TEXT NOT NULL,
    score_value INTEGER NOT NULL
);

CREATE TABLE assessments (
    id UUID PRIMARY KEY,
    company_name VARCHAR(255) NOT NULL,
    overall_score INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE assessment_responses (
    id SERIAL PRIMARY KEY,
    assessment_id UUID NOT NULL REFERENCES assessments(id),
    question_id INTEGER NOT NULL REFERENCES questions(id),
    answer_id INTEGER NOT NULL REFERENCES answers(id)
);

-- Insert Initial Questionnaire Data
INSERT INTO questions (id, text, category, weight) VALUES
(1, 'Do you have a formalized AI governance committee?', 'Governance', 2),
(2, 'How do you monitor AI models in production for bias and drift?', 'Monitoring', 2),
(3, 'Is user data used for training anonymized?', 'Privacy', 3),
(4, 'Do you maintain an inventory of all AI systems in use?', 'Governance', 1),
(5, 'Are your AI systems audited by a third party?', 'Compliance', 3);

-- Answers for Q1
INSERT INTO answers (question_id, text, score_value) VALUES
(1, 'Yes, meeting regularly', 10),
(1, 'Yes, but informal', 5),
(1, 'No, but planned', 2),
(1, 'No', 0);

-- Answers for Q2
INSERT INTO answers (question_id, text, score_value) VALUES
(2, 'Automated monitoring and alerts', 10),
(2, 'Manual periodic checks', 5),
(2, 'Only when issues are reported', 2),
(2, 'No monitoring', 0);

-- Answers for Q3
INSERT INTO answers (question_id, text, score_value) VALUES
(3, 'Yes, fully anonymized and encrypted', 10),
(3, 'Partially anonymized', 5),
(3, 'No, raw data is used', 0);

-- Answers for Q4
INSERT INTO answers (question_id, text, score_value) VALUES
(4, 'Yes, a comprehensive central inventory', 10),
(4, 'Partial inventory in different departments', 5),
(4, 'No inventory', 0);

-- Answers for Q5
INSERT INTO answers (question_id, text, score_value) VALUES
(5, 'Yes, annually', 10),
(5, 'Yes, once previously', 5),
(5, 'No, but internal audits exist', 2),
(5, 'No audits', 0);

-- Reset sequence to avoid conflicts after manual inserts
SELECT setval('questions_id_seq', (SELECT MAX(id) FROM questions));
