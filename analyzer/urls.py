# analyzer/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.render_home_page, name='home'),
    path('analyze-endpoint/', views.analyze_text, name='process_sentiment'),
]