import React, { createContext, useContext, useState } from 'react';

const TabsContext = createContext({});

const Tabs = ({ defaultValue, children, className = "" }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);
  
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
};

const TabsList = ({ className = "", children }) => (
  <div className={`flex space-x-1 rounded-lg bg-gray-900 p-1 ${className}`}>
    {children}
  </div>
);

const TabsTrigger = ({ value, children, className = "" }) => {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  
  return (
    <button
      className={`px-3 py-2 text-sm font-medium rounded-md transition-all
        ${activeTab === value 
          ? 'bg-white text-gray-900' 
          : 'text-gray-400 hover:text-gray-100'} 
        ${className}`}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </button>
  );
};

const TabsContent = ({ value, children, className = "" }) => {
  const { activeTab } = useContext(TabsContext);
  
  if (activeTab !== value) return null;
  
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export { Tabs, TabsList, TabsTrigger, TabsContent };