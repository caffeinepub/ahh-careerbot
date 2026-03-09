# AHH CareerBot

## Current State
New project. No existing code.

## Requested Changes (Diff)

### Add
- AI Resume Coach: users can paste or input their resume text and get AI-powered feedback, suggestions, and improvements
- Interview Coach: users can practice interview questions (behavioral, technical, situational) and receive feedback on their answers
- Resume scoring and improvement tips (structure, keywords, impact statements)
- Interview question bank with categories (general, behavioral, technical)
- Answer evaluation with tips and model answers
- User session to track practice history (questions answered, resume submissions)
- "AHH CareerBot" branding with custom logo

### Modify
N/A

### Remove
N/A

## Implementation Plan
1. Backend (Motoko):
   - Store resume submissions with feedback entries
   - Store interview Q&A sessions per user
   - CRUD for resume feedback records
   - CRUD for interview practice sessions
   - Predefined interview question bank (general, behavioral, technical)
   - Resume analysis feedback storage (tips, score, suggestions)

2. Frontend (React):
   - Landing page with AHH CareerBot branding and logo
   - Navigation: Home, Resume Coach, Interview Coach
   - Resume Coach page: text input for resume, submit for analysis, display feedback/score/tips
   - Interview Coach page: category selector, question display, answer input, feedback display
   - Practice history view per session
   - Clean, professional UI with career/tech aesthetic
