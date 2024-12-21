"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const ManageSubscription = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const redirectToCustomerPortal = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/stripe/create-portal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      if (!data.url) {
        throw new Error('No URL returned from the portal creation');
      }

      window.location.href = data.url;
    }
    catch (error) {
      console.error('Failed to redirect to customer portal:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button 
      onClick={redirectToCustomerPortal} 
      className="bg-indigo-700" 
      disabled={loading}
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please Wait
        </>
      ) : (
        "Modify Your Subscription"
      )}
    </Button>
  );
}

export default ManageSubscription;