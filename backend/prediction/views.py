
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import PredictionHistory, Symptom, Disease
from .ml_model import DiseasePredictionModel

class PredictDiseaseView(APIView):
    """
    API endpoint for disease prediction.
    """
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        # Get symptoms from request
        symptoms = request.data.get('symptoms', [])
        if not symptoms:
            return Response(
                {"error": "Please provide symptoms for prediction"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Initialize model and predict
        model = DiseasePredictionModel()
        predictions = model.predict(symptoms)
        
        # Save prediction to history
        try:
            # Get or create symptom objects
            symptom_objs = []
            for symptom_code in symptoms:
                symptom, created = Symptom.objects.get_or_create(
                    code=symptom_code,
                    defaults={'name': symptom_code.replace('_', ' ').title()}
                )
                symptom_objs.append(symptom)
            
            # Create prediction history
            history = PredictionHistory(user=request.user)
            history.save()
            
            # Add symptoms to history
            history.symptoms.add(*symptom_objs)
            
            # Save prediction results
            history.set_results(predictions)
            history.save()
        except Exception as e:
            print(f"Error saving prediction history: {e}")
        
        return Response({"predictions": predictions}, status=status.HTTP_200_OK)

class PredictionHistoryView(APIView):
    """
    API endpoint for retrieving user's prediction history.
    """
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        histories = PredictionHistory.objects.filter(user=request.user).order_by('-date_created')
        
        history_data = []
        for history in histories:
            history_data.append({
                'id': history.id,
                'date': history.date_created,
                'symptoms': [
                    {'id': s.code, 'label': s.name} 
                    for s in history.symptoms.all()
                ],
                'predictions': history.get_results()
            })
        
        return Response(history_data, status=status.HTTP_200_OK)

class DeleteHistoryView(APIView):
    """
    API endpoint for deleting prediction history entries.
    """
    permission_classes = [IsAuthenticated]
    
    def delete(self, request, history_id):
        try:
            history = PredictionHistory.objects.get(id=history_id, user=request.user)
            history.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except PredictionHistory.DoesNotExist:
            return Response(
                {"error": "History entry not found"}, 
                status=status.HTTP_404_NOT_FOUND
            )

class ClearHistoryView(APIView):
    """
    API endpoint for clearing all prediction history entries.
    """
    permission_classes = [IsAuthenticated]
    
    def delete(self, request):
        PredictionHistory.objects.filter(user=request.user).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class HealthCheckView(APIView):
    """
    API endpoint for checking API health.
    """
    permission_classes = []  # No auth required
    
    def get(self, request):
        # Check if ML model can be initialized
        try:
            model = DiseasePredictionModel()
            model_status = "available" if model.model is not None else "initializing"
            
            return Response({
                "status": "healthy",
                "message": "API is operational",
                "model_status": model_status,
                "using_kaggle_dataset": True
            }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({
                "status": "degraded",
                "message": f"API is operational but model has issues: {str(e)}",
                "model_status": "error"
            }, status=status.HTTP_200_OK)
