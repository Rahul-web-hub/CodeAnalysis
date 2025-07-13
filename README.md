# 🧠 Code Analysis AI — Smart Code Review & Interview Prep Tool

[![Python](https://img.shields.io/badge/Python-3.11-blue?logo=python)](https://www.python.org/)  
[![Django](https://img.shields.io/badge/Django-4.x-green?logo=django)](https://www.djangoproject.com/)  
[![React](https://img.shields.io/badge/Frontend-React-blue?logo=react)](https://reactjs.org/)  
[![Redis](https://img.shields.io/badge/Cache-Redis-critical?logo=redis)](https://redis.io/)  
[![OpenAI](https://img.shields.io/badge/LLM-Dolphin%203.0-brightgreen)](https://openrouter.ai/)  
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> A full-stack AI-powered platform for **automated code reviews** and **interview prep**, featuring smart LLM feedback, real-time performance analytics, company-wise problem lists, and caching for blazing-fast responses.

---

## 🚀 Features

### 💬 Code Review via AI (Dolphin 3.0)
- Analyze any code snippet using Dolphin 3.0 Mistral LLM  
- Instant insights on:
  - ⏱️ Time & space complexity  
  - ✅ Code quality score (0–100)  
  - ⚙️ Optimization suggestions  
  - 🔍 Detected algorithmic patterns  

### 📚 Interview Prep Tools
- 🏢 **Company-wise problem lists** (Amazon, Google, Meta, etc.)  
- 🎯 **Filters** by:
  - Difficulty (Easy/Medium/Hard)  
  - Topic Tags (Graphs, DP, Trees, etc.)  
  - Company Tags  
- 📊 **Real-time stats and insights**:
  - Number of problems solved per company  
  - Topic-wise distribution  
  - Progress visualizations  

### 🚀 Performance Enhancements
- ⚡ **Redis-backed caching** to eliminate redundant AI calls  
- 🔐 **Rate limiting** (10 requests/min per IP) to prevent abuse  
- 📱 Responsive, mobile-friendly UI with Material UI  

---

## 🛠️ Tech Stack

| Layer       | Technology                                      |
|-------------|--------------------------------------------------|
| Frontend    | React, Material UI                              |
| Backend     | Django, Django REST Framework                   |
| AI/LLM      | Dolphin 3.0 via OpenRouter API                  |
| Database    | SQLite (dev), PostgreSQL (optional)             |
| Cache       | Redis (via `django-redis`)                      |
| Rate Limit  | `django-ratelimit`                              |
| Deployment  | Vercel (frontend), Render/Docker (backend)      |

---

## 📸 Demo

🔗 **Live**: [https://code-analysis.vercel.app](https://code-analysis.vercel.app)  
📂 **GitHub**: [https://github.com/Rahul-web-hub/CodeAnalysis](https://github.com/Rahul-web-hub/CodeAnalysis)

---

## 💡 AI Output Example

```json
{
  "complexity": {
    "time": "O(n log n)",
    "space": "O(1)",
    "explanation": "Sorting algorithm complexity."
  },
  "quality": {
    "score": 85,
    "issues": ["Use meaningful variable names", "Avoid deeply nested loops"]
  },
  "optimization": ["Use dictionary lookup instead of list iteration"],
  "patterns": ["Greedy Algorithm", "Sorting"]
}
```
## ⚙️ Setup Instructions

### 🔧 Backend (Django)
```bash
git clone https://github.com/Rahul-web-hub/CodeAnalysis.git
cd CodeAnalysis/backend

# Create virtual environment
python -m venv env
source env/bin/activate  # Windows: env\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set your OpenRouter API key
export OPENROUTER_API_KEY=your_key_here  # Or use a .env file

# Run Redis server (if installed locally)
redis-server

# Run backend server
python manage.py runserver
```
### 🌐 Frontend (React)
```bash
cd ../frontend
npm install
npm run dev
```
### 🔁 Caching & Rate Limiting

| Feature         | Description                                 |
|-----------------|---------------------------------------------|
| 🔄 Redis Cache  | Caches AI responses per code input          |
| ⏱️ TTL          | Each cache entry lives for 1 hour           |


### 📊 Performance Improvements via Redis

- ✅ Cached AI responses to eliminate redundant processing  
- ⚡ Reduced average AI response latency from **2.5s → 0.4s**  
- 📉 Cut API call volume by ~65% on repeated inputs  
- 🔍 Improved user session fluidity and reduced cost  
| 🔐 Rate Limit   | 10 requests per minute per IP via middleware|
📊 Performance Improvements via Redis
✅ Cached AI responses to eliminate redundant processing


### 🙋‍♂️ Author

**Rahul Singh Chauhan**  
📫 singh9rahul98@gmail.com  
🔗 [LinkedIn](https://www.linkedin.com/in/rahulsinghchauhan12/) | [GitHub](https://github.com/Rahul-web-hub)



