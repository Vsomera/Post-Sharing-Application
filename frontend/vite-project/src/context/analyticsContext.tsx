import React, { createContext, useState } from 'react';

type AnalyticsContextType = {
  online: number;
  postCount: number;
  yourPosts: number;
  updateOnline: (value: number) => void;
  updatePostCount: (value: number) => void;
  updateYourPosts: (value: number) => void;
};

export const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

type AnalyticsProviderProps = {
  children: React.ReactNode;
};

export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  const [online, setOnline] = useState(0);
  const [postCount, setPostCount] = useState(0);
  const [yourPosts, setYourPosts] = useState(0);

  const updateOnline = (value: number) => {
    setOnline(value);
  };

  const updatePostCount = (value: number) => {
    setPostCount(value);
  };

  const updateYourPosts = (value: number) => {
    setYourPosts(value);
  };

  return (
    <AnalyticsContext.Provider value={{ online, postCount, yourPosts, updateOnline, updatePostCount, updateYourPosts }}>
      {children}
    </AnalyticsContext.Provider>
  );
}
