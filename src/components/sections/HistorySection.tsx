import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { History, Trash2, ChevronDown, ChevronUp, Calendar } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { format } from 'date-fns';
import { toast } from "sonner";

interface Prediction {
  condition: string;
  probability: number;
  description: string;
  recommendation: string;
}

interface HistoryEntry {
  id: string;
  date: string;
  symptoms: string[];
  predictions: Prediction[];
}

const HistorySection = () => {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('predictionHistory') || '[]');
    setHistory(savedHistory);
  }, []);

  const toggleOpenItem = (id: string) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const deleteHistoryItem = (id: string) => {
    const updatedHistory = history.filter(item => item.id !== id);
    setHistory(updatedHistory);
    localStorage.setItem('predictionHistory', JSON.stringify(updatedHistory));
    toast.success("History entry deleted");
  };

  const clearAllHistory = () => {
    setHistory([]);
    localStorage.setItem('predictionHistory', JSON.stringify([]));
    toast.success("History cleared");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-medical-700 mb-2">Your Prediction History</h2>
          <p className="text-gray-600">
            Review your past symptom evaluations and predictions
          </p>
        </div>
        {history.length > 0 && (
          <Button 
            variant="outline" 
            className="text-destructive hover:bg-destructive/10"
            onClick={clearAllHistory}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear History
          </Button>
        )}
      </div>

      {history.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="pt-6 pb-6 flex flex-col items-center justify-center text-center">
            <History className="h-12 w-12 text-gray-300 mb-3" />
            <h3 className="text-lg font-medium text-gray-700 mb-1">No history yet</h3>
            <p className="text-gray-500 mb-4">
              Your prediction history will appear here once you make your first prediction.
            </p>
            <Button className="bg-medical-600 hover:bg-medical-700" onClick={() => {
              const event = new CustomEvent("tabChange", { detail: { tab: "prediction" } });
              window.dispatchEvent(event);
            }}>
              Make a Prediction
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {history.map((entry) => (
            <Collapsible
              key={entry.id}
              open={openItems[entry.id]}
              onOpenChange={() => toggleOpenItem(entry.id)}
              className="border rounded-lg overflow-hidden"
            >
              <CollapsibleTrigger asChild>
                <div className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-medical-600 mr-3" />
                    <div>
                      <div className="font-medium">
                        {format(new Date(entry.date), 'MMM d, yyyy')}
                      </div>
                      <div className="text-sm text-gray-500">
                        {format(new Date(entry.date), 'h:mm a')}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="hidden sm:block">
                      <div className="flex flex-wrap gap-1 max-w-[200px] overflow-hidden">
                        {entry.symptoms.slice(0, 3).map((symptom, i) => (
                          <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                            {symptom}
                          </span>
                        ))}
                        {entry.symptoms.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                            +{entry.symptoms.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="ml-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteHistoryItem(entry.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-gray-500 hover:text-destructive" />
                    </Button>
                    {openItems[entry.id] ? (
                      <ChevronUp className="h-5 w-5 text-gray-500 ml-2" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500 ml-2" />
                    )}
                  </div>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="px-4 pb-4 pt-2 border-t">
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Reported Symptoms:</h4>
                    <div className="flex flex-wrap gap-1">
                      {entry.symptoms.map((symptom, i) => (
                        <span key={i} className="px-2 py-1 bg-medical-100 text-medical-700 text-xs rounded-full">
                          {symptom}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Predictions:</h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Condition</TableHead>
                        <TableHead className="w-[100px] text-right">Probability</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {entry.predictions.map((prediction, i) => (
                        <TableRow key={i}>
                          <TableCell className="font-medium">{prediction.condition}</TableCell>
                          <TableCell className="text-right">{prediction.probability}%</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistorySection;
