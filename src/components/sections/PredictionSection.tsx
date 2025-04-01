import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { AlertCircle, Activity, Loader2 } from 'lucide-react';
import { toast } from "sonner";

// Mock symptoms data
const symptoms = [
  { id: 'fever', label: 'Fever' },
  { id: 'cough', label: 'Cough' },
  { id: 'fatigue', label: 'Fatigue' },
  { id: 'difficulty_breathing', label: 'Difficulty Breathing' },
  { id: 'headache', label: 'Headache' },
  { id: 'sore_throat', label: 'Sore Throat' },
  { id: 'body_aches', label: 'Body Aches' },
  { id: 'loss_of_taste_or_smell', label: 'Loss of Taste or Smell' },
  { id: 'nausea', label: 'Nausea' },
  { id: 'diarrhea', label: 'Diarrhea' },
  { id: 'congestion', label: 'Congestion' },
  { id: 'chest_pain', label: 'Chest Pain' },
  { id: 'dizziness', label: 'Dizziness' },
  { id: 'abdominal_pain', label: 'Abdominal Pain' },
  { id: 'rash', label: 'Rash' },
];

interface Prediction {
  condition: string;
  probability: number;
  description: string;
  recommendation: string;
}

const PredictionSection = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleSymptomChange = (symptomId: string, checked: boolean) => {
    if (checked) {
      setSelectedSymptoms(prev => [...prev, symptomId]);
    } else {
      setSelectedSymptoms(prev => prev.filter(id => id !== symptomId));
    }
  };

  const handlePrediction = async () => {
    if (selectedSymptoms.length === 0) {
      toast.error("Please select at least one symptom");
      return;
    }

    setIsLoading(true);
    
    // Mock API call delay and response
    setTimeout(() => {
      // Mock predictions based on symptoms
      const mockPredictions: Prediction[] = [];
      
      if (selectedSymptoms.includes('fever')) {
        if (selectedSymptoms.includes('cough') && selectedSymptoms.includes('difficulty_breathing')) {
          mockPredictions.push({
            condition: "COVID-19",
            probability: 85,
            description: "A respiratory illness caused by the SARS-CoV-2 virus.",
            recommendation: "Get tested for COVID-19, isolate yourself from others, and consult a healthcare provider."
          });
        } else if (selectedSymptoms.includes('sore_throat')) {
          mockPredictions.push({
            condition: "Common Cold",
            probability: 72,
            description: "A viral infection of the upper respiratory tract.",
            recommendation: "Rest, stay hydrated, and take over-the-counter cold medications if needed."
          });
        }
      }
      
      if (selectedSymptoms.includes('headache')) {
        if (selectedSymptoms.includes('fatigue')) {
          mockPredictions.push({
            condition: "Migraine",
            probability: 65,
            description: "A headache of varying intensity, often accompanied by nausea and sensitivity to light and sound.",
            recommendation: "Rest in a dark, quiet room. Consider over-the-counter pain relievers or consult a doctor for prescription options."
          });
        }
      }
      
      if (selectedSymptoms.includes('abdominal_pain') && selectedSymptoms.includes('nausea')) {
        mockPredictions.push({
          condition: "Food Poisoning",
          probability: 68,
          description: "Illness caused by consuming contaminated food or drink.",
          recommendation: "Stay hydrated, rest, and avoid solid foods until symptoms improve. Seek medical attention if symptoms are severe."
        });
      }

      // Generic condition if no specific matches
      if (mockPredictions.length === 0) {
        mockPredictions.push({
          condition: "General Malaise",
          probability: 50,
          description: "A general feeling of discomfort, illness, or unease.",
          recommendation: "Rest and monitor your symptoms. Consult a healthcare provider if symptoms persist or worsen."
        });
      }
      
      setPredictions(mockPredictions);
      setShowResults(true);
      setIsLoading(false);

      // Save to "database" (would be done via API in a real app)
      const historyEntry = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        symptoms: selectedSymptoms.map(id => symptoms.find(s => s.id === id)?.label).filter(Boolean),
        predictions: mockPredictions
      };

      const history = JSON.parse(localStorage.getItem('predictionHistory') || '[]');
      localStorage.setItem('predictionHistory', JSON.stringify([historyEntry, ...history]));
    }, 1500);
  };

  const handleReset = () => {
    setSelectedSymptoms([]);
    setPredictions([]);
    setShowResults(false);
  };

  return (
    <div className="space-y-6">
      {!showResults ? (
        <>
          <div>
            <h2 className="text-2xl font-bold text-medical-700 mb-4">Symptom Selection</h2>
            <p className="text-gray-600 mb-4">
              Select the symptoms you're experiencing to receive potential condition predictions.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Select Your Symptoms</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {symptoms.map((symptom) => (
                  <div key={symptom.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={symptom.id} 
                      checked={selectedSymptoms.includes(symptom.id)}
                      onCheckedChange={(checked) => handleSymptomChange(symptom.id, checked === true)}
                    />
                    <Label 
                      htmlFor={symptom.id} 
                      className="cursor-pointer text-gray-700"
                    >
                      {symptom.label}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <div className="text-sm text-gray-500">
                {selectedSymptoms.length} symptom(s) selected
              </div>
              <Button 
                onClick={handlePrediction}
                disabled={isLoading || selectedSymptoms.length === 0}
                className="bg-medical-600 hover:bg-medical-700"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  'Get Prediction'
                )}
              </Button>
            </CardFooter>
          </Card>
        </>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-medical-700">Prediction Results</h2>
            <Button variant="outline" onClick={handleReset}>
              Start New Prediction
            </Button>
          </div>
          
          <Card className="mb-6 border-t-4 border-medical-600">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Activity className="mr-2 h-5 w-5 text-medical-600" />
                Based on your symptoms
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4 p-3 bg-gray-50 rounded-md">
                <p className="text-sm font-medium">Selected symptoms:</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {selectedSymptoms.map(id => (
                    <span 
                      key={id} 
                      className="px-2 py-1 bg-medical-100 text-medical-700 text-xs rounded-full"
                    >
                      {symptoms.find(s => s.id === id)?.label}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="space-y-4">
                {predictions.map((prediction, index) => (
                  <div key={index} className="border rounded-md overflow-hidden">
                    <div className="p-4 bg-white">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-lg text-medical-700">{prediction.condition}</h3>
                        <span className="bg-medical-100 text-medical-700 px-2 py-1 rounded text-sm font-medium">
                          {prediction.probability}% match
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4">{prediction.description}</p>
                      
                      <div className="bg-blue-50 border-l-4 border-blue-400 p-3">
                        <div className="flex items-start">
                          <AlertCircle className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                          <div>
                            <p className="font-medium text-blue-700">Recommendation:</p>
                            <p className="text-blue-600 text-sm">{prediction.recommendation}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 text-yellow-700">
            <div className="flex">
              <AlertCircle className="h-5 w-5 mr-2" />
              <div>
                <p className="font-bold">Important Disclaimer</p>
                <p className="text-sm">
                  This prediction is based on the symptoms you selected and is meant for informational 
                  purposes only. It is not a medical diagnosis. Please consult with a healthcare 
                  professional for proper medical advice and treatment.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PredictionSection;
