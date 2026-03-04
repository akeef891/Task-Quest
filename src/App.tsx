import { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './firebase';
import AuthForm from './components/AuthForm';
import TaskDashboard from './components/TaskDashboard';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <h1 className="sr-only">Task Quest</h1>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" role="status" aria-live="polite"></div>
          <p className="text-white text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return user ? <TaskDashboard /> : <AuthForm onSuccess={() => setUser(auth.currentUser)} />;
}

export default App;
