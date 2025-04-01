
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const AboutSection = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-medical-700 mb-4">Welcome to MediPredict</h2>
        <p className="text-gray-600 leading-relaxed">
          MediPredict is an innovative web application that uses advanced machine learning algorithms
          to analyze your symptoms and provide potential health condition predictions. Our system is
          designed to help users gain insights into their health concerns and provide a starting
          point for further medical consultation.
        </p>
      </div>

      <Card className="border-l-4 border-l-medical-500">
        <CardContent className="pt-6">
          <h3 className="text-xl font-semibold text-medical-700 mb-3">How It Works</h3>
          <p className="text-gray-600 mb-4">
            Our disease prediction system works in three simple steps:
          </p>
          
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div className="bg-medical-50 p-4 rounded-lg border border-medical-100">
              <div className="bg-medical-500 text-white w-10 h-10 rounded-full flex items-center justify-center mb-3">
                1
              </div>
              <h4 className="font-medium text-medical-700 mb-2">Select Symptoms</h4>
              <p className="text-sm text-gray-600">
                Choose from our comprehensive list of symptoms that you're currently experiencing.
              </p>
            </div>
            
            <div className="bg-medical-50 p-4 rounded-lg border border-medical-100">
              <div className="bg-medical-500 text-white w-10 h-10 rounded-full flex items-center justify-center mb-3">
                2
              </div>
              <h4 className="font-medium text-medical-700 mb-2">AI Analysis</h4>
              <p className="text-sm text-gray-600">
                Our machine learning algorithm analyzes your symptoms against a vast database of medical conditions.
              </p>
            </div>
            
            <div className="bg-medical-50 p-4 rounded-lg border border-medical-100">
              <div className="bg-medical-500 text-white w-10 h-10 rounded-full flex items-center justify-center mb-3">
                3
              </div>
              <h4 className="font-medium text-medical-700 mb-2">Receive Predictions</h4>
              <p className="text-sm text-gray-600">
                Get instant insights about potential health conditions that match your symptoms.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div>
        <h3 className="text-xl font-semibold text-medical-700 mb-3">Important Disclaimer</h3>
        <div className="bg-warning-100 p-4 rounded-md border border-warning-500 text-warning-700">
          <p className="font-medium mb-2">Medical Advice Disclaimer:</p>
          <p className="text-sm">
            MediPredict is designed for informational purposes only and is not a substitute for professional
            medical advice, diagnosis, or treatment. Always seek the advice of your physician or other
            qualified health provider with any questions you may have regarding a medical condition.
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-medical-700 mb-3">Data Privacy</h3>
        <p className="text-gray-600 mb-4">
          We take your privacy seriously. All your health information and predictions are stored securely
          and are only accessible to you. We use industry-standard encryption and security practices to
          protect your sensitive data.
        </p>
      </div>
    </div>
  );
};

export default AboutSection;
