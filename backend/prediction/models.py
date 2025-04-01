
from django.db import models
from django.contrib.auth.models import User
import json

class Symptom(models.Model):
    name = models.CharField(max_length=100, unique=True)
    code = models.CharField(max_length=50, unique=True)
    
    def __str__(self):
        return self.name

class Disease(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField()
    recommendation = models.TextField(blank=True)
    
    def __str__(self):
        return self.name

class PredictionHistory(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date_created = models.DateTimeField(auto_now_add=True)
    symptoms = models.ManyToManyField(Symptom)
    prediction_results = models.TextField()  # Stored as JSON
    
    def __str__(self):
        return f"Prediction for {self.user.username} on {self.date_created}"
    
    def get_results(self):
        return json.loads(self.prediction_results)
    
    def set_results(self, results):
        self.prediction_results = json.dumps(results)
