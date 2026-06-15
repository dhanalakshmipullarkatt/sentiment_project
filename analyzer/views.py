# analyzer/views.py
from django.shortcuts import render
from django.http import JsonResponse
from textblob import TextBlob

def render_home_page(request):
    """Renders the main dashboard webpage."""
    return render(request, 'analyzer/index.html')

def analyze_text(request):
    """Processes the text input and returns sentiment analysis data."""
    if request.method == 'POST':
        text_payload = request.POST.get('text', '').strip()
        
        if not text_payload:
            return JsonResponse({'error': 'Please enter a valid sentence.'}, status=400)

        # Analyze sentiment using TextBlob
        blob_object = TextBlob(text_payload)
        polarity_score = blob_object.sentiment.polarity

        if polarity_score > 0.05:
            calculated_sentiment = 'Positive'
        elif polarity_score < -0.05:
            calculated_sentiment = 'Negative'
        else:
            calculated_sentiment = 'Neutral'

        return JsonResponse({
            'status': 'success',
            'sentiment': calculated_sentiment,
            'score': round(polarity_score, 2)
        })
    
    return JsonResponse({'error': 'Bad Request Method'}, status=400)