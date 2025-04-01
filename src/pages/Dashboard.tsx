
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/layout/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AboutSection from '@/components/sections/AboutSection';
import PredictionSection from '@/components/sections/PredictionSection';
import HistorySection from '@/components/sections/HistorySection';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("about");

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="flex-grow container mx-auto px-4 py-8">
        <Card className="border-none shadow-md">
          <CardHeader className="bg-medical-600 text-white rounded-t-lg">
            <CardTitle className="text-2xl font-bold">Health Prediction Dashboard</CardTitle>
            <CardDescription className="text-medical-100">
              Analyze symptoms and predict potential health conditions
            </CardDescription>
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
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
