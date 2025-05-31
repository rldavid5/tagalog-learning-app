import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useSubscription } from '../hooks/useSubscription';

const SubscribePage = () => {
  const { tier } = useSubscription();
  
  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: '$4.99',
      period: 'month',
      features: [
        'Access to all basic lessons',
        'Ad-free experience',
        'Practice exercises',
        'Progress tracking',
        'Limited access to premium content',
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '$9.99',
      period: 'month',
      popular: true,
      features: [
        'All Basic plan features',
        'Full access to all premium content',
        'Pronunciation feedback',
        'Offline learning mode',
        'Personalized learning path',
        'Priority support',
      ]
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Choose Your Plan</h1>
        <p className="text-gray-600 mt-2">
          Unlock the full potential of your Tagalog learning journey
        </p>
      </div>
      
      {tier && tier !== 'free' ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-accent-blue-light rounded-lg p-6 text-center mb-8"
        >
          <h2 className="text-xl font-semibold mb-2">You're currently on the {tier.charAt(0).toUpperCase() + tier.slice(1)} plan</h2>
          <p>Enjoy your premium benefits and happy learning!</p>
        </motion.div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 mb-8">
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: plan.id === 'premium' ? 0.2 : 0, duration: 0.5 }}
              className={`card relative overflow-hidden transition-all duration-300 ${
                plan.popular ? 'md:translate-y-[-8px]' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-accent-peach text-gray-800 py-1 px-4 text-sm font-medium">
                  Most Popular
                </div>
              )}
              
              <div className="p-6">
                <h3 className={`text-xl font-bold mb-2 ${plan.popular ? 'text-primary-600' : 'text-gray-800'}`}>{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-gray-600">/{plan.period}</span>
                </div>
                
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check size={18} className="text-primary-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="pt-4 mt-auto">
                  <a
                    href="mailto:support@tagaloglearn.com?subject=Subscribe%20to%20Premium"
                    className={`w-full inline-block text-center ${
                      plan.popular ? 'btn-primary' : 'btn-secondary'
                    }`}
                  >
                    Contact Support to Subscribe
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-gray-800 mb-2">Can I change my plan later?</h3>
            <p className="text-gray-600">Yes, you can upgrade or downgrade your plan at any time. Contact our support team to make changes to your subscription.</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-800 mb-2">How do I cancel my subscription?</h3>
            <p className="text-gray-600">To cancel your subscription, please contact our support team. Your access will remain active until the end of the current billing period.</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-800 mb-2">Is there a free trial?</h3>
            <p className="text-gray-600">We offer a limited free plan so you can explore the basics of the platform before committing to a paid subscription.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SubscribePage;