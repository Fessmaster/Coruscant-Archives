'use client'

import { useEffect } from "react";

export default function Error ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}){
  useEffect(() => {
    console.error('Captured error', error);    
  }, [error]);

  return(
    <div style={{padding: '20px', textAlign: 'center'}}>
      <h2>Ups! We have some problem</h2>
      <p style={{color: 'red'}}>{error.message}</p>
      <button onClick={() => reset()}> Try again</button>
    </div>
  )
}