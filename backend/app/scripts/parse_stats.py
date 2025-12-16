
import re
import json
import os

def parse_stats_content(input_file, output_file):
    with open(input_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Split by "1 point" which seems to be the delimiter for questions
    raw_questions = content.split('1 point')
    
    questions = []
    
    # The first chunk might be introduction text if not empty
    intro_text = raw_questions[0].strip()
    
    # Process each question block
    for block in raw_questions[1:]:
        block = block.strip()
        if not block:
            continue
            
        # Extract Question Text and Options
        # Structure often ends with "Yes, the answer is correct." or "No,..." and "Score:" and "Accepted Answers:"
        
        # Regex to find the end of the question content (before feedback)
        # Looking for patterns like "Yes, the answer..." or "Score:"
        end_pattern = re.search(r'(Yes, the answer is|No, the answer is|Score:)', block)
        
        if end_pattern:
            main_content = block[:end_pattern.start()].strip()
            feedback_section = block[end_pattern.start():].strip()
        else:
            main_content = block
            feedback_section = ""

        # Extract Correct Answer
        answer_match = re.search(r'Accepted Answers:\s*(.*)', feedback_section, re.DOTALL)
        correct_answer = answer_match.group(1).strip() if answer_match else "See explanation"
        
        # Attempt to split options if possible (this is tricky with raw text, so we might just keep the whole block as "question_text" for now for RAG, 
        # but for specific MCQs we'd need better parsing. Given the format is messy copy-paste, treating main_content as the full question context is safer).
        
        q_data = {
            "id": len(questions) + 1,
            "question_text": main_content,
            "correct_answer": correct_answer,
            "explanation": "Derived from Accepted Answers.", # Placeholder
            "topic": "Statistics 1",
            "week": 1,
            "difficulty": "Medium"
        }
        questions.append(q_data)

    # Ensure output directory exists
    os.makedirs(os.path.dirname(output_file), exist_ok=True)
    
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(questions, f, indent=4)
        
    print(f"Parsed {len(questions)} questions to {output_file}")
    if intro_text:
        print(f"Intro text context found (first 50 chars): {intro_text[:50]}...")

if __name__ == "__main__":
    input_path = os.path.join(os.path.dirname(__file__), "../data/stats1_week1.txt")
    output_path = os.path.join(os.path.dirname(__file__), "../data/questions/stats1_week1.json")
    parse_stats_content(input_path, output_path)
