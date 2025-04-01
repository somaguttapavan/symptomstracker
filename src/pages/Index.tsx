
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Activity, Shield, Clock } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in from localStorage
    const user = localStorage.getItem('user');
    if (user) {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-medical-50 to-white">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="text-2xl font-bold text-medical-700">MediPredict</div>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              className="text-medical-700 border-medical-300 hover:bg-medical-50"
              onClick={() => navigate('/login')}
            >
              Log In
            </Button>
            <Button 
              className="bg-medical-600 hover:bg-medical-700"
              onClick={() => navigate('/signup')}
            >
              Sign Up
            </Button>
          </div>
        </div>
      </header>

      <main>
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-medical-800 mb-6">
              AI-Powered Health Condition Prediction
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Analyze your symptoms and get instant insights about potential health conditions
              using our advanced machine learning algorithms.
            </p>
            <div className="mt-8">
              <Button 
                className="bg-medical-600 hover:bg-medical-700 text-lg py-6 px-8"
                onClick={() => navigate('/signup')}
              >
                Get Started
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 flex flex-col items-center text-center">
              <div className="bg-medical-100 p-3 rounded-full mb-4">
                <Activity className="h-8 w-8 text-medical-600" />
              </div>
              <h3 className="text-xl font-semibold text-medical-700 mb-3">Symptom Analysis</h3>
              <p className="text-gray-600">
                Select from a comprehensive list of symptoms and receive potential condition matches based on your selections.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 flex flex-col items-center text-center">
              <div className="bg-medical-100 p-3 rounded-full mb-4">
                <Shield className="h-8 w-8 text-medical-600" />
              </div>
              <h3 className="text-xl font-semibold text-medical-700 mb-3">AI Diagnosis Assistance</h3>
              <p className="text-gray-600">
                Our advanced machine learning algorithms analyze symptoms to provide insights about potential health conditions.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 flex flex-col items-center text-center">
              <div className="bg-medical-100 p-3 rounded-full mb-4">
                <Clock className="h-8 w-8 text-medical-600" />
              </div>
              <h3 className="text-xl font-semibold text-medical-700 mb-3">Medical History</h3>
              <p className="text-gray-600">
                Keep track of your past predictions and symptoms to monitor your health over time.
              </p>
            </div>
          </div>

          <div className="bg-medical-50 rounded-xl p-8 mb-16">
            <h2 className="text-2xl font-bold text-medical-700 mb-4 text-center">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8 mt-8">
              <div className="flex flex-col items-center text-center">
                <div className="bg-white border-2 border-medical-200 w-12 h-12 rounded-full flex items-center justify-center mb-4 text-medical-700 font-bold">
                  1
                </div>
                <h3 className="font-semibold text-medical-700 mb-2">Create an Account</h3>
                <p className="text-gray-600 text-sm">
                  Sign up for a free account to access all features and save your medical history.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="bg-white border-2 border-medical-200 w-12 h-12 rounded-full flex items-center justify-center mb-4 text-medical-700 font-bold">
                  2
                </div>
                <h3 className="font-semibold text-medical-700 mb-2">Select Your Symptoms</h3>
                <p className="text-gray-600 text-sm">
                  Choose from our comprehensive list of symptoms that you're currently experiencing.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="bg-white border-2 border-medical-200 w-12 h-12 rounded-full flex items-center justify-center mb-4 text-medical-700 font-bold">
                  3
                </div>
                <h3 className="font-semibold text-medical-700 mb-2">Get Instant Predictions</h3>
                <p className="text-gray-600 text-sm">
                  Receive AI-generated insights about potential health conditions that match your symptoms.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold text-medical-700 mb-4">Ready to start?</h2>
            <p className="text-gray-600 mb-8">
              Sign up now to get personalized health insights based on your symptoms.
            </p>
            <Button 
              className="bg-medical-600 hover:bg-medical-700"
              onClick={() => navigate('/signup')}
            >
              Create Free Account
            </Button>
          </div>
        </div>
      </main>

      <footer className="bg-gray-100 mt-16 py-8 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-500 text-sm">
            <p>© 2023 MediPredict. This is a demonstration application.</p>
            <p className="mt-2">
              Always consult with healthcare professionals for medical advice. 
              Our AI predictions are for informational purposes only.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
