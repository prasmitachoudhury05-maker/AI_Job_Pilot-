import { redirect } from 'next/navigation';

export default function Home() {
  // JobPilot now acts as a SAAS. 
  // We instantly redirect logged-in users to their Analytics Dashboard.
  redirect('/analytics');
}
