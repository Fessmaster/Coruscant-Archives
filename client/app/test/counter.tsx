"use client";

import { useState } from "react";

export function InteractiveCounter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Count of clicks is - {count}
    </button>
  );
}
