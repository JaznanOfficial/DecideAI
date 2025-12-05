'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

export default function TestPage() {
  return (
    <div className="flex items-center justify-center min-h-screen p-8">
      <Card className="p-8 max-w-md w-full space-y-4">
        <h1 className="text-2xl font-bold mb-4">Toast Notification Test</h1>
        
        <div className="space-y-3">
          <Button
            onClick={() => toast.success('Success!', { description: 'This is a success message' })}
            className="w-full"
            variant="default"
          >
            Test Success Toast
          </Button>

          <Button
            onClick={() => toast.error('Error!', { description: 'This is an error message' })}
            className="w-full"
            variant="destructive"
          >
            Test Error Toast
          </Button>

          <Button
            onClick={() => toast.info('Info!', { description: 'This is an info message' })}
            className="w-full"
            variant="secondary"
          >
            Test Info Toast
          </Button>

          <Button
            onClick={() => toast.warning('Warning!', { description: 'This is a warning message' })}
            className="w-full"
            variant="outline"
          >
            Test Warning Toast
          </Button>

          <Button
            onClick={() => {
              toast.loading('Loading...', { description: 'This is a loading message' });
              setTimeout(() => {
                toast.dismiss();
                toast.success('Done!', { description: 'Loading completed' });
              }, 2000);
            }}
            className="w-full"
          >
            Test Loading Toast
          </Button>
        </div>
      </Card>
    </div>
  );
}
