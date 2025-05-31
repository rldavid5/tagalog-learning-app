import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { useSubscription } from '../hooks/useSubscription';
import { BookOpen, Award, Clock, BarChart2, AlertCircle } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const { tier, isLoading: subscriptionLoading } = useSubscription();
  
  // Placeholder data
  const progressData = {
    lessonsCompleted: 12,
    totalLessons: 48,
    streak: 5,
    totalPoints: 1250,
    level: 3,
    lastActivity: new Date(Date.now() - 86400000), // yesterday
  };
  
  const units = [
    { id: 1, title: 'Basics', lessonsCompleted: 5, totalLessons: 5, isUnlocked: true, progress: 100 },
    { id: 2, title: 'Greetings & Introductions', lessonsCompleted: 4, totalLessons: 5, isUnlocked: true, progress: 80 },
    { id: 3, title: 'Family & Relationships', lessonsCompleted: 3, totalLessons: 8, isUnlocked: true, progress: 37.5 },
    { id: 4, title: 'Daily Activities', lessonsCompleted: 0, totalLessons: 6, isUnlocked: true, progress: 0 },
    { id: 5, title: 'Food & Dining', lessonsCompleted: 0, totalLessons: 7, isUnlocked: false, progress: 0 },
    { id: 6, title: 'Travel & Directions', lessonsCompleted: 0, totalLessons: 8, isUnlocked: false, progress: 0 },
  ];
  
  const nextUnit = units.find(unit => unit.progress < 100) || units[0];
  const nextLesson = nextUnit?.lessonsCompleted + 1 || 1;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Magandang araw, {user?.user_metadata?.full_name || 'Learner'}!</h1>
        <p className="text-gray-600 mt-2">
          Continue your Tagalog learning journey. You're making great progress!
        </p>
      </div>

      {/* Subscription Prompt */}
      {tier === 'free' && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-8 bg-accent-peach rounded-lg p-6 shadow-sm"
        >
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-white/20 p-3 flex-shrink-0">
              <AlertCircle className="h-6 w-6 text-gray-800" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Unlock Full Access</h2>
              <p className="text-gray-700 mb-4">
                You're using the free plan. Upgrade to unlock all lessons, remove ads, and access premium features.
              </p>
              <Link to="/subscribe" className="btn-primary inline-block">
                Upgrade Now
              </Link>
            </div>
          </div>
        </motion.div>
      )}

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="card p-6"
        >
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-primary-100 p-3">
              <BookOpen className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Lessons Completed</p>
              <h3 className="text-2xl font-bold">{progressData.lessonsCompleted}/{progressData.totalLessons}</h3>
            </div>
          </div>
          <div className="mt-4 bg-gray-200 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-primary-500 h-full rounded-full" 
              style={{ width: `${(progressData.lessonsCompleted / progressData.totalLessons) * 100}%` }}
            ></div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="card p-6"
        >
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-accent-peach-light p-3">
              <Clock className="h-6 w-6 text-amber-700" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Current Streak</p>
              <h3 className="text-2xl font-bold">{progressData.streak} days</h3>
            </div>
          </div>
          <p className="mt-4 text-sm text-gray-600">
            Last activity: {progressData.lastActivity.toLocaleDateString()}
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="card p-6"
        >
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-accent-blue-light p-3">
              <BarChart2 className="h-6 w-6 text-blue-700" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total XP</p>
              <h3 className="text-2xl font-bold">{progressData.totalPoints}</h3>
            </div>
          </div>
          <p className="mt-4 text-sm text-gray-600">
            Keep earning points to unlock rewards!
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="card p-6"
        >
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-green-100 p-3">
              <Award className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Current Level</p>
              <h3 className="text-2xl font-bold">{progressData.level}</h3>
            </div>
          </div>
          <p className="mt-4 text-sm text-gray-600">
            {1000 - (progressData.totalPoints % 1000)} XP to next level
          </p>
        </motion.div>
      </div>

      {/* Continue Learning Section */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Continue Learning</h2>
          <Link to={`/unit/${nextUnit.id}`} className="text-primary-600 hover:text-primary-700">
            View All Units
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="card p-6"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-primary-100 text-primary-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  Unit {nextUnit.id}
                </div>
                <h3 className="text-xl font-bold text-gray-800">{nextUnit.title}</h3>
              </div>
              <p className="text-gray-600 mb-4">
                {nextUnit.lessonsCompleted} of {nextUnit.totalLessons} lessons completed
              </p>
              <div className="bg-gray-200 h-2 rounded-full overflow-hidden mb-4">
                <div 
                  className="bg-primary-500 h-full rounded-full" 
                  style={{ width: `${nextUnit.progress}%` }}
                ></div>
              </div>
            </div>
            
            <Link 
              to={`/lesson/${nextLesson}`} 
              className="btn-primary"
            >
              Continue to Lesson {nextLesson}
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Unit Progress Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Learning Path</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {units.map((unit) => (
            <motion.div 
              key={unit.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * unit.id, duration: 0.5 }}
              className={`card overflow-hidden ${!unit.isUnlocked ? 'opacity-70' : ''}`}
            >
              <div className="h-3 bg-primary-500" style={{ width: `${unit.progress}%` }}></div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-primary-100 text-primary-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    Unit {unit.id}
                  </div>
                  {unit.progress === 100 && (
                    <div className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      Completed
                    </div>
                  )}
                </div>
                
                <h3 className="text-lg font-bold text-gray-800 mb-2">{unit.title}</h3>
                
                <p className="text-gray-600 mb-4">
                  {unit.lessonsCompleted} of {unit.totalLessons} lessons completed
                </p>
                
                {unit.isUnlocked ? (
                  <Link 
                    to={`/unit/${unit.id}`} 
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    {unit.progress === 100 ? 'Review Unit' : 'Continue Unit'} →
                  </Link>
                ) : (
                  <div className="text-gray-500 flex items-center gap-2">
                    <span>Complete previous units to unlock</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;