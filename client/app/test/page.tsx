import { InteractiveCounter } from "./counter";

export default async function TestPage() {
  console.log('🌌 We work in server');
  
  return(
    <div>
      <h1>This text rendered in server</h1>
      {/* We added client component */}
      <InteractiveCounter/>
    </div>
  )
}