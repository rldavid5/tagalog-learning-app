import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BookOpen, Check, Lock, PlayCircle, MessageCircle, 
  ClipboardList, Music, Lightbulb
} from 'lucide-react';
import { useSubscription } from '../hooks/useSubscription';

const UnitPage = () => {
  const { id } = useParams<{ id: string }>();
  const { tier } = useSubscription();
  const unitId = parseInt(id || '1', 10);
  
  // This is placeholder data - in a real app, this would come from an API call
  const unit = {
    id: unitId,
    title: ['Basics', 'Greetings & Introductions', 'Family & Relationships', 'Daily Activities'][unitId - 1] || 'Unit Title',
    description: 'Learn essential vocabulary and phrases to start your Tagalog journey.',
    lessons: [
      { id: 1, title: 'Basic Pronouns', type: 'vocabulary', isCompleted: true, isPremium: false },
      { id: 2, title: 'Simple Greetings', type: 'conversation', isCompleted: true, isPremium: false },
      { id: 3, title: 'Question Words', type: 'grammar', isCompleted: true, isPremium: false },
      { id: 4, title: 'Common Phrases', type: 'conversation', isCompleted: false, isPremium: false },
      { id: 5, title: 'Practice Dialogue', type: 'speaking', isCompleted: false, isPremium: true },
      { id: 6, title: 'Cultural Notes', type: 'culture', isCompleted: false, isPremium: true },
      { id: 7, title: 'Unit Review', type: 'quiz', isCompleted: false, isPremium: false },
      { id: 8, title: 'Advanced Practice', type: 'activity', isCompleted: false, isPremium: true },
    ]
  };

  const getLessonIcon = (type: string) => {
    switch(type) {
      case 'vocabulary': return <BookOpen size={18} />;
      case 'conversation': return <MessageCircle size={18} />;
      case 'grammar': return <ClipboardList size={18} />;
      case 'speaking': return <Music size={18} />;
      case 'culture': return <Lightbulb size={18} />;
      case 'quiz': return <PlayCircle size={18} />;
      default: return <BookOpen size={18} />;
    }
  };

  const lessonIsAccessible = (lesson: any) => {
    if (!lesson.isPremium) return true;
    return tier === 'premium' || tier === 'basic';
  };

  const completedLessons = unit.lessons.filter(l => l.isCompleted).length;
  const progressPercent = (completedLessons / unit.lessons.length) * 100;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-8">
        <Link to="/dashboard" className="text-primary-600 hover:text-primary-700 mb-4 inline-block">
          ← Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Unit {unitId}: {unit.title}</h1>
        <p className="text-gray-600 mt-2">{unit.description}</p>
      </div>

      <div className="mb-6 bg-white rounded-lg shadow p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium">Your Progress</h3>
          <span className="text-sm font-medium">{completedLessons}/{unit.lessons.length} completed</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-primary-500 h-2.5 rounded-full" 
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      <div className="space-y-4">
        {unit.lessons.map((lesson, index) => (
          <motion.div 
            key={lesson.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className={`card overflow-hidden ${
              !lessonIsAccessible(lesson) ? 'opacity-70' : ''
            }`}
          >
            <div className="flex items-center justify-between p-5 border-l-4 border-primary-500">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  {lesson.isCompleted ? (
                    <div className="bg-success-50 p-2 rounded-full">
                      <Check size={20} className="text-success-500" />
                    </div>
                  ) : (
                    <div className="bg-primary-50 p-2 rounded-full">
                      {getLessonIcon(lesson.type)}
                    </div>
                  )}
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900">
                    Lesson {lesson.id}: {lesson.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="bg-primary-50 text-primary-700 text-xs px-2 py-0.5 rounded capitalize">
                      {lesson.type}
                    </span>
                    
                    {lesson.isPremium && (
                      <span className="bg-accent-peach text-gray-800 text-xs px-2 py-0.5 rounded">
                        Premium
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <div>
                {lessonIsAccessible(lesson) ? (
                  <Link 
                    to={`/lesson/${lesson.id}`}
                    className={`btn ${lesson.isCompleted ? 'bg-gray-100 text-gray-800 hover:bg-gray-200' : 'btn-primary'}`}
                  >
                    {lesson.isCompleted ? 'Review' : 'Start'}
                  </Link>
                ) : (
                  <div className="flex items-center gap-2">
                    <Lock size={16} className="text-gray-500" />
                    <Link to="/subscribe" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                      Upgrade to Unlock
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default UnitPage;