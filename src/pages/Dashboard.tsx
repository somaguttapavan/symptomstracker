
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/layout/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AboutSection from '@/components/sections/AboutSection';
import PredictionSection from '@/components/sections/PredictionSection';
import HistorySection from '@/components/sections/HistorySection';
import { Activity, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

const API_URL = import.meta.env.VITE_API_URL || '';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("about");
  const [apiStatus, setApiStatus] = useState<'connected' | 'disconnected' | 'checking'>('checking');
  
  // Check API connection
  useEffect(() => {
    const checkApiConnection = async () => {
      try {
        const response = await fetch(`${API_URL}/api/health/`);
        if (response.ok) {
          setApiStatus('connected');
        } else {
          setApiStatus('disconnected');
          toast.warning("Backend API is not available. Using mock data instead.");
        }
      } catch (error) {
        console.error("API connection error:", error);
        setApiStatus('disconnected');
        toast.warning("Backend API is not available. Using mock data instead.");
      }
    };
    
    checkApiConnection();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="flex-grow container mx-auto px-4 py-8">
        <Card className="border-none shadow-md">
          <CardHeader className="bg-medical-600 text-white rounded-t-lg">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-2xl font-bold">Health Prediction Dashboard</CardTitle>
                <CardDescription className="text-medical-100">
                  Analyze symptoms and predict potential health conditions
                </CardDescription>
              </div>
              <div className="flex items-center">
                <span className="text-xs mr-2">API Status:</span>
                {apiStatus === 'checking' && (
                  <span className="flex items-center text-xs">
                    <Activity className="h-3 w-3 mr-1 animate-pulse" />
                    Checking...
                  </span>
                )}
                {apiStatus === 'connected' && (
                  <span className="flex items-center text-xs">
                    <span className="h-2 w-2 rounded-full bg-green-400 mr-1"></span>
                    Connected
                  </span>
                )}
                {apiStatus === 'disconnected' && (
                  <span className="flex items-center text-xs">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    Using mock data
                  </span>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs defaultValue="about" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-3 w-full rounded-none border-b">
                <TabsTrigger value="about" className="data-[state=active]:bg-white data-[state=active]:text-medical-700 data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-medical-700">
                  About
                </TabsTrigger>
                <TabsTrigger value="prediction" className="data-[state=active]:bg-white data-[state=active]:text-medical-700 data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-medical-700">
                  Prediction
                </TabsTrigger>
                <TabsTrigger value="history" className="data-[state=active]:bg-white data-[state=active]:text-medical-700 data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-medical-700">
                  History
                </TabsTrigger>
              </TabsList>
              <div className="p-6">
                <TabsContent value="about" className="mt-0">
                  <AboutSection />
                </TabsContent>
                <TabsContent value="prediction" className="mt-0">
                  <PredictionSection />
                </TabsContent>
                <TabsContent value="history" className="mt-0">
                  <HistorySection />
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      
      <footer className="bg-gray-100 py-6 border-t">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© 2023 MediPredict. This application is for educational purposes only.</p>
          <p className="text-sm mt-2">Always consult with healthcare professionals for medical advice.</p>
          <p className="text-xs mt-1 text-gray-500">
            {apiStatus === 'connected' 
              ? 'Using machine learning powered by Kaggle dataset' 
              : 'Currently using mock data for demonstrations'}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
