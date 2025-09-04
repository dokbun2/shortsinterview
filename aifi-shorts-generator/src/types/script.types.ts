export interface RequestParameters {
  dialect: string;
  subject: string;
  core_conflict: string;
}

export interface ImagePrompts {
  midjourney: string;
  narobanana: string;
}

export interface VideoPrompts {
  kling: string;
  veo3: string;
}

export interface Scene {
  timestamp: string;
  scene_description: string;
  dialogue: string;
  image_prompts: ImagePrompts;
  video_prompts: VideoPrompts;
}

export interface ScriptOutput {
  title: string;
  character_setting: string;
  logline: string;
  production_note: string;
  timeline: Scene[];
}

export interface ScriptData {
  script_id: string;
  request_parameters: RequestParameters;
  output: ScriptOutput;
}

export type TabType = 'image' | 'video' | 'audio';
export type MediaType = 'image' | 'video' | 'audio';

export interface MediaUrls {
  [sceneIndex: number]: {
    imageUrl?: string;
    videoUrl?: string;
    audioUrl?: string;
  };
}

export interface MediaItem {
  type: MediaType;
  url: string;
  sceneIndex: number;
  sceneName: string;
  timestamp?: string;
}