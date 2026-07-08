-- Clear existing data to replace with new schema data
DELETE FROM assessment_responses;
DELETE FROM assessments;
DELETE FROM answers;
DELETE FROM questions;

-- Update assessments table with new fields
ALTER TABLE assessments
ADD COLUMN organization_name VARCHAR(255),
ADD COLUMN industry VARCHAR(255),
ADD COLUMN country VARCHAR(255),
ADD COLUMN system_name VARCHAR(255),
ADD COLUMN assessment_owner VARCHAR(255),
ADD COLUMN scope VARCHAR(255);

-- Update overall_score to be nullable since it is calculated later
ALTER TABLE assessments ALTER COLUMN overall_score DROP NOT NULL;
ALTER TABLE assessments ALTER COLUMN company_name DROP NOT NULL;

-- Insert New Questions (Transparency, Fairness, Privacy, Security, Accountability)
INSERT INTO questions (id, text, category, weight) VALUES
(1, 'Are end-users explicitly informed that they are interacting with an AI system?', 'Transparency', 1),
(2, 'Is there clear documentation on the system''s capabilities and limitations available to stakeholders?', 'Transparency', 1),
(3, 'Can the model''s decisions be explained in a human-understandable format?', 'Transparency', 1),

(4, 'Has the training data been audited for demographic or historical bias?', 'Fairness', 1),
(5, 'Are there automated checks in production to detect bias drift?', 'Fairness', 1),
(6, 'Is there a formal mechanism for users to report suspected biased outcomes?', 'Fairness', 1),

(7, 'Is all Personally Identifiable Information (PII) anonymized before model training?', 'Privacy', 1),
(8, 'Do you have explicit, documented user consent for the data used by this AI system?', 'Privacy', 1),
(9, 'Is there an automated mechanism to fulfill "Right to be Forgotten" data deletion requests?', 'Privacy', 1),

(10, 'Does your AI system maintain immutable audit logs of all interactions and decisions?', 'Security', 1),
(11, 'Has the model undergone adversarial testing or red-teaming prior to deployment?', 'Security', 1),
(12, 'Are there fallback mechanisms in place if the AI system degrades or fails in production?', 'Security', 1),

(13, 'Is there a designated, named owner responsible for the ongoing compliance of this system?', 'Accountability', 1),
(14, 'Are high-risk AI decisions subject to mandatory "human-in-the-loop" review?', 'Accountability', 1),
(15, 'Do you maintain a centralized, up-to-date inventory of all deployed AI models?', 'Accountability', 1);

-- Insert Standard Answers for each question (Yes = 5, Partial = 3, No = 0)
DO $$
DECLARE
    q_id INTEGER;
BEGIN
    FOR q_id IN 1..15 LOOP
        INSERT INTO answers (question_id, text, score_value) VALUES (q_id, 'Yes', 5);
        INSERT INTO answers (question_id, text, score_value) VALUES (q_id, 'Partial', 3);
        INSERT INTO answers (question_id, text, score_value) VALUES (q_id, 'No', 0);
    END LOOP;
END $$;

SELECT setval('questions_id_seq', (SELECT MAX(id) FROM questions));
SELECT setval('answers_id_seq', (SELECT MAX(id) FROM answers));
