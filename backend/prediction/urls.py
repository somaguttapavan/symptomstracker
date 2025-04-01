
from django.urls import path
from .views import (
    PredictDiseaseView, 
    PredictionHistoryView,
    DeleteHistoryView,
    ClearHistoryView
)

urlpatterns = [
    path('', PredictDiseaseView.as_view(), name='predict'),
    path('history/', PredictionHistoryView.as_view(), name='history'),
    path('history/<int:history_id>/', DeleteHistoryView.as_view(), name='delete-history'),
    path('history/clear/', ClearHistoryView.as_view(), name='clear-history'),
]
