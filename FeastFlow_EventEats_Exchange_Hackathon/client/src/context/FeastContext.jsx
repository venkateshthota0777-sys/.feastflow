import React, { createContext, useContext, useState, useEffect } from 'react';

const FeastContext = createContext();

export function FeastProvider({ children }) {
  // Event & Dietary Selection State
  const [eventData, setEventData] = useState(() => {
    const saved = localStorage.getItem('feastflow_event_data');
    return saved ? JSON.parse(saved) : {
      eventType: 'College Fest',
      eventId: 'college-fest',
      dietaryPreferences: ['Vegetarian', 'Non-Vegetarian'], // 'Vegetarian', 'Non-Vegetarian', 'Jain'
      guestCount: 150,
      eventDate: '2026-12-20',
      mealType: 'Dinner',
      budgetPerPlate: 25,
      specialRequests: ''
    };
  });

  // Selected dishes in the menu builder
  const [selectedDishes, setSelectedDishes] = useState(() => {
    const saved = localStorage.getItem('feastflow_selected_dishes');
    return saved ? JSON.parse(saved) : [];
  });

  // Sync with localStorage so state persists across page refreshes
  useEffect(() => {
    localStorage.setItem('feastflow_event_data', JSON.stringify(eventData));
  }, [eventData]);

  useEffect(() => {
    localStorage.setItem('feastflow_selected_dishes', JSON.stringify(selectedDishes));
  }, [selectedDishes]);

  // Handler to update event details
  const updateEventData = (updates) => {
    setEventData(prev => ({
      ...prev,
      ...updates
    }));
  };

  // Handler to toggle dietary preferences
  const toggleDietaryPreference = (preference) => {
    setEventData(prev => {
      const current = prev.dietaryPreferences || [];
      const exists = current.includes(preference);
      const updated = exists 
        ? current.filter(p => p !== preference)
        : [...current, preference];
      
      // Ensure at least one preference is selected
      if (updated.length === 0) {
        return prev;
      }
      return {
        ...prev,
        dietaryPreferences: updated
      };
    });
  };

  // Add/remove dish to menu
  const toggleDishSelection = (dish) => {
    setSelectedDishes(prev => {
      const exists = prev.some(d => d.id === dish.id);
      if (exists) {
        return prev.filter(d => d.id !== dish.id);
      } else {
        return [...prev, dish];
      }
    });
  };

  return (
    <FeastContext.Provider
      value={{
        eventData,
        updateEventData,
        toggleDietaryPreference,
        selectedDishes,
        toggleDishSelection,
        setSelectedDishes
      }}
    >
      {children}
    </FeastContext.Provider>
  );
}

export function useFeast() {
  const context = useContext(FeastContext);
  if (!context) {
    throw new Error('useFeast must be used within a FeastProvider');
  }
  return context;
}
