
"""
Machine learning model for disease prediction.
"""
import os
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
import kagglehub
import pickle
from pathlib import Path

class DiseasePredictionModel:
    def __init__(self):
        self.model = None
        self.symptoms_list = []
        self.diseases = []
        self.model_file = Path("prediction/model/disease_prediction_model.pkl")
        
    def load_data(self):
        """
        Load the Kaggle dataset for disease prediction.
        """
        # Download dataset if not already present
        try:
            # This will download the dataset to a local directory
            path = kagglehub.dataset_download("kaushil268/disease-prediction-using-machine-learning")
            print(f"Dataset downloaded to: {path}")
            
            # Assuming the dataset has a CSV file with disease and symptom data
            dataset_path = os.path.join(path, "dataset.csv")
            if os.path.exists(dataset_path):
                data = pd.read_csv(dataset_path)
                return data
            else:
                print("Dataset file not found. Looking for alternative file names...")
                # List all files in the directory and try to find a CSV file
                for file in os.listdir(path):
                    if file.endswith(".csv"):
                        print(f"Found CSV file: {file}")
                        data = pd.read_csv(os.path.join(path, file))
                        return data
        except Exception as e:
            print(f"Error loading dataset: {e}")
            # Use a fallback dataset for development/testing
            print("Using mock dataset for development")
            return self._create_mock_dataset()
    
    def _create_mock_dataset(self):
        """Create a mock dataset for development/testing."""
        symptoms = [
            'fever', 'cough', 'fatigue', 'difficulty_breathing', 
            'headache', 'sore_throat', 'body_aches', 'loss_of_taste_or_smell',
            'nausea', 'diarrhea', 'congestion', 'chest_pain',
            'dizziness', 'abdominal_pain', 'rash'
        ]
        diseases = ['COVID-19', 'Common Cold', 'Flu', 'Migraine', 'Food Poisoning']
        
        # Create a mock dataset with 100 samples
        data = []
        for _ in range(100):
            row = {}
            # Randomly select symptoms
            for symptom in symptoms:
                row[symptom] = np.random.randint(0, 2)
            # Randomly select a disease
            row['disease'] = np.random.choice(diseases)
            data.append(row)
        
        return pd.DataFrame(data)
    
    def preprocess_data(self, data):
        """
        Preprocess the dataset for training.
        """
        # Extract features and target
        X = data.drop('disease', axis=1)
        y = data['disease']
        
        # Save symptoms list for prediction
        self.symptoms_list = list(X.columns)
        self.diseases = list(y.unique())
        
        return X, y
    
    def train_model(self):
        """
        Train the Random Forest model for disease prediction.
        """
        # Check if model file exists
        if self.model_file.exists():
            print("Loading existing model...")
            with open(self.model_file, 'rb') as f:
                self.model = pickle.load(f)
            return True
        
        print("Training new model...")
        # Load dataset
        data = self.load_data()
        if data is None:
            print("Failed to load dataset")
            return False
        
        # Preprocess data
        X, y = self.preprocess_data(data)
        
        # Split data
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42
        )
        
        # Train model
        self.model = RandomForestClassifier(n_estimators=100, random_state=42)
        self.model.fit(X_train, y_train)
        
        # Evaluate model
        accuracy = self.model.score(X_test, y_test)
        print(f"Model accuracy: {accuracy:.2f}")
        
        # Save model
        os.makedirs(os.path.dirname(self.model_file), exist_ok=True)
        with open(self.model_file, 'wb') as f:
            pickle.dump(self.model, f)
        
        return True
    
    def predict(self, symptoms):
        """
        Predict disease based on symptoms.
        
        Args:
            symptoms (list): List of symptom codes
            
        Returns:
            list: List of dictionaries with disease predictions and probabilities
        """
        if self.model is None:
            success = self.train_model()
            if not success:
                return []
        
        # Create input vector
        input_vector = [0] * len(self.symptoms_list)
        for symptom in symptoms:
            if symptom in self.symptoms_list:
                index = self.symptoms_list.index(symptom)
                input_vector[index] = 1
        
        # Make prediction
        input_df = pd.DataFrame([input_vector], columns=self.symptoms_list)
        probabilities = self.model.predict_proba(input_df)[0]
        
        # Get top 3 predictions
        indices = np.argsort(probabilities)[::-1][:3]
        
        results = []
        for index in indices:
            if probabilities[index] > 0.05:  # Only include if probability > 5%
                results.append({
                    'condition': self.diseases[index],
                    'probability': round(float(probabilities[index]) * 100),
                    'description': self._get_disease_description(self.diseases[index]),
                    'recommendation': self._get_disease_recommendation(self.diseases[index])
                })
        
        return results
    
    def _get_disease_description(self, disease):
        """Get description for a disease."""
        descriptions = {
            'COVID-19': 'A respiratory illness caused by the SARS-CoV-2 virus.',
            'Common Cold': 'A viral infection of the upper respiratory tract.',
            'Flu': 'A contagious respiratory illness caused by influenza viruses.',
            'Migraine': 'A headache of varying intensity, often accompanied by nausea and sensitivity to light and sound.',
            'Food Poisoning': 'Illness caused by consuming contaminated food or drink.'
        }
        return descriptions.get(disease, 'A medical condition requiring attention.')
    
    def _get_disease_recommendation(self, disease):
        """Get recommendation for a disease."""
        recommendations = {
            'COVID-19': 'Get tested for COVID-19, isolate yourself from others, and consult a healthcare provider.',
            'Common Cold': 'Rest, stay hydrated, and take over-the-counter cold medications if needed.',
            'Flu': 'Rest, drink fluids, take over-the-counter pain relievers, and avoid contact with others.',
            'Migraine': 'Rest in a dark, quiet room. Consider over-the-counter pain relievers or consult a doctor for prescription options.',
            'Food Poisoning': 'Stay hydrated, rest, and avoid solid foods until symptoms improve. Seek medical attention if symptoms are severe.'
        }
        return recommendations.get(disease, 'Consult with a healthcare professional for proper diagnosis and treatment.')
