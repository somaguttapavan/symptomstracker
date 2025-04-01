
"""
URL configuration for disease_prediction project.
"""
from django.contrib import admin
from django.urls import path, include
from prediction.views import HealthCheckView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/predict/', include('prediction.urls')),
    path('api/auth/', include('users.urls')),
    path('api/health/', HealthCheckView.as_view(), name='api-health-check'),
]
