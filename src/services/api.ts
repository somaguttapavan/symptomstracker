
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL || '';

// Error handling helper
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData.error || `Error: ${response.status}`;
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
  return response.json();
};

// Authentication services
export const authService = {
  login: async (email: string, password: string) => {
    const response = await fetch(`${API_URL}/api/auth/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    
    const data = await handleResponse(response);
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    return data.user;
  },
  
  register: async (email: string, password: string, name: string) => {
    const response = await fetch(`${API_URL}/api/auth/register/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name }),
    });
    
    return handleResponse(response);
  },
  
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};

// Prediction services
export const predictionService = {
  predict: async (symptoms: string[]) => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication required');
    }
    
    const response = await fetch(`${API_URL}/api/predict/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ symptoms }),
    });
    
    return handleResponse(response);
  },
  
  getHistory: async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication required');
    }
    
    const response = await fetch(`${API_URL}/api/predict/history/`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    return handleResponse(response);
  },
  
  deleteHistoryItem: async (id: number) => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication required');
    }
    
    const response = await fetch(`${API_URL}/api/predict/history/${id}/`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    // For DELETE requests, we might not get JSON back
    if (!response.ok) {
      const errorText = await response.text();
      toast.error(errorText || `Error: ${response.status}`);
      throw new Error(errorText || `Error: ${response.status}`);
    }
    
    return true;
  },
  
  clearHistory: async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication required');
    }
    
    const response = await fetch(`${API_URL}/api/predict/history/clear/`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    // For DELETE requests, we might not get JSON back
    if (!response.ok) {
      const errorText = await response.text();
      toast.error(errorText || `Error: ${response.status}`);
      throw new Error(errorText || `Error: ${response.status}`);
    }
    
    return true;
  },
};
