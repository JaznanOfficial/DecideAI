'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function DiagnosticPage() {
  const [apiStatus, setApiStatus] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testAPI = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/conversations?userId=demo-user');
      const data = await response.json();
      setApiStatus({
        status: response.status,
        ok: response.ok,
        data: data,
      });
    } catch (error) {
      setApiStatus({
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    testAPI();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen p-8">
      <Card className="p-8 max-w-2xl w-full">
        <h1 className="text-2xl font-bold mb-4">API Diagnostic</h1>
        
        <Button onClick={testAPI} disabled={loading} className="mb-4">
          {loading ? 'Testing...' : 'Test API'}
        </Button>

        {apiStatus && (
          <div className="space-y-2">
            <h2 className="font-semibold">Result:</h2>
            <pre className="bg-muted p-4 rounded-lg overflow-auto text-sm">
              {JSON.stringify(apiStatus, null, 2)}
            </pre>
          </div>
        )}
      </Card>
    </div>
  );
}
