import { useState, useCallback } from 'react';
import apiClient from '@/lib/apiClient';

interface ApiResponse<T> {
  status: 'success' | 'error';
  data: T | null;
  error: string | null;
  loading: boolean;
}

export const useApi = () => {
  const [response, setResponse] = useState<ApiResponse<any>>({
    status: 'success',
    data: null,
    error: null,
    loading: false,
  });

  const request = useCallback(async <T,>(
    method: 'get' | 'post' | 'put' | 'delete',
    url: string,
    data?: any
  ): Promise<T | null> => {
    setResponse({ status: 'success', data: null, error: null, loading: true });

    try {
      const config: any = { method, url };
      if (data) config.data = data;

      const result = await apiClient(config);
      setResponse({
        status: 'success',
        data: result.data,
        error: null,
        loading: false,
      });
      return result.data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || err.message || 'Unknown error';
      setResponse({
        status: 'error',
        data: null,
        error: errorMessage,
        loading: false,
      });
      return null;
    }
  }, []);

  return { ...response, request };
};

// Specific hooks for API endpoints

export const useHealthCheck = () => {
  const [health, setHealth] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const check = useCallback(async () => {
    setLoading(true);
    try {
      const response = await apiClient.get('/health');
      setHealth(response.data);
      return response.data;
    } catch (error) {
      console.error('Health check failed:', error);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { health, loading, check };
};

export const useModelsInfo = () => {
  const [models, setModels] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const response = await apiClient.get('/api/models');
      setModels(response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch models info:', error);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { models, loading, fetch };
};

export const usePrediction = () => {
  const [prediction, setPrediction] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const predict = useCallback(async (inputData: any) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.post('/api/predict', inputData);
      setPrediction(response.data);
      return response.data;
    } catch (err: any) {
      const errorMsg = err.response?.data?.error || err.message || 'Prediction failed';
      setError(errorMsg);
      console.error('Prediction error:', errorMsg);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { prediction, loading, error, predict };
};
