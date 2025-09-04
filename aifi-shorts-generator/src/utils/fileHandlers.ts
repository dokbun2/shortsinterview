import { saveAs } from 'file-saver';
import type { ScriptData } from '../types/script.types';

export const validateJSON = (json: any): json is ScriptData => {
  try {
    if (!json.script_id || !json.request_parameters || !json.output) {
      return false;
    }
    
    if (!json.output.timeline || !Array.isArray(json.output.timeline)) {
      return false;
    }
    
    // Check if at least one scene exists with required fields
    return json.output.timeline.length > 0 && 
           json.output.timeline.every((scene: any) => 
             scene.timestamp && 
             scene.scene_description && 
             scene.dialogue
           );
  } catch {
    return false;
  }
};

export const handleFileUpload = async (file: File): Promise<ScriptData> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target?.result as string);
        
        if (validateJSON(json)) {
          resolve(json);
        } else {
          reject(new Error('Invalid JSON structure'));
        }
      } catch (error) {
        reject(new Error('Failed to parse JSON file'));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    
    reader.readAsText(file);
  });
};

export const downloadJSON = (data: ScriptData, filename?: string) => {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: 'application/json;charset=utf-8',
  });
  
  const defaultFilename = `${data.script_id || 'script'}_${new Date().getTime()}.json`;
  saveAs(blob, filename || defaultFilename);
};

export const isValidMediaUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};