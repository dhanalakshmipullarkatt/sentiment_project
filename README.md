# AI Sentiment Analyzer Web App

A clean, minimalist Django web application that analyzes the sentiment of a sentence in real-time. It instantly classifies input text as **Positive**, **Negative**, or **Neutral** using AJAX without reloading the page.

## 🛠️ Tech Stack
* **Backend**: Django (Python), TextBlob (NLP Engine)
* **Frontend**: HTML5, CSS3, JavaScript (Vanilla ES6)
* **Database**: SQLite

## 🔧 Installation & Setup

1. **Navigate to the project folder:**
   ```bash
   cd sentiment_project
   ```

2. **Install dependencies:**
   ```bash
   pip install django textblob
   ```

3. **Download TextBlob language data:**
   ```bash
   python -m textblob.download_corpora
   ```

4. **Run the development server:**
   ```bash
   python manage.py runserver
   ```

5. **Open in browser:**
   Go to `http://127.0.0`

