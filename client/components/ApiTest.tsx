import { useState, useEffect } from 'react';

export default function ApiTest() {
  const [status, setStatus] = useState('Testing...');

  useEffect(() => {
    const testApi = async () => {
      try {
        // Test ping endpoint
        const pingResponse = await fetch('/api/ping');
        if (!pingResponse.ok) {
          setStatus('❌ Ping API failed');
          return;
        }
        
        // Test products endpoint
        const productsResponse = await fetch('/api/products');
        const text = await productsResponse.text();
        
        if (!text.startsWith('{')) {
          setStatus('❌ Products API returned HTML instead of JSON');
          return;
        }
        
        const data = JSON.parse(text);
        if (!data.success || !Array.isArray(data.products)) {
          setStatus('❌ Products API returned invalid data');
          return;
        }
        
        setStatus(`✅ API working! Found ${data.products.length} products`);
        
      } catch (error) {
        setStatus(`❌ API Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    };

    testApi();
  }, []);

  return (
    <div className="fixed bottom-4 right-4 bg-white p-3 rounded-lg shadow-lg border text-sm">
      <strong>API Status:</strong> {status}
    </div>
  );
}
