import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ScriptData, TabType, MediaUrls, MediaType } from '../types/script.types';

interface AppState {
  // Script Data
  scriptData: ScriptData | null;
  setScriptData: (data: ScriptData | null) => void;
  
  // Scene Navigation
  activeSceneIndex: number;
  setActiveSceneIndex: (index: number) => void;
  
  // Tab Management
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  
  // Media URLs
  mediaUrls: MediaUrls;
  setMediaUrl: (sceneIndex: number, type: MediaType, url: string) => void;
  clearMediaUrls: () => void;
  
  // Utility Functions
  reset: () => void;
}

const initialState = {
  scriptData: null,
  activeSceneIndex: 0,
  activeTab: 'image' as TabType,
  mediaUrls: {} as MediaUrls,
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      ...initialState,
      
      setScriptData: (data) => set({ scriptData: data, activeSceneIndex: 0 }),
      
      setActiveSceneIndex: (index) => set({ activeSceneIndex: index }),
      
      setActiveTab: (tab) => set({ activeTab: tab }),
      
      setMediaUrl: (sceneIndex, type, url) =>
        set((state) => ({
          mediaUrls: {
            ...state.mediaUrls,
            [sceneIndex]: {
              ...state.mediaUrls[sceneIndex],
              [`${type}Url`]: url,
            },
          },
        })),
      
      clearMediaUrls: () => set({ mediaUrls: {} }),
      
      reset: () => set(initialState),
    }),
    {
      name: 'aifi-shorts-storage',
    }
  )
);