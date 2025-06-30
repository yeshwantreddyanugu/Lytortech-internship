
import React, { useState } from 'react';
import { X, Minimize2, Maximize2, Play, Pause, Volume2, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VideoPlayerProps {
  video: {
    id: number;
    title: string;
    duration: string;
    thumbnail: string;
    description: string;
  };
  onClose: () => void;
  isMinimized: boolean;
  onToggleMinimize: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ video, onClose, isMinimized, onToggleMinimize }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`fixed inset-0 z-50 bg-black/95 backdrop-blur-sm transition-all duration-300 ${
      isMinimized ? 'bottom-0 right-4 w-80 h-48 rounded-t-xl' : ''
    }`}>
      <div className={`${isMinimized ? 'h-full' : 'container mx-auto h-full flex flex-col'} p-4`}>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1">
            <h2 className={`text-white font-semibold ${isMinimized ? 'text-sm' : 'text-xl'}`}>
              {video.title}
            </h2>
            {!isMinimized && (
              <p className="text-gray-400 text-sm mt-1">{video.description}</p>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              onClick={onToggleMinimize}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-gray-700"
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </Button>
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-gray-700"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Video Player */}
        <div className={`relative bg-gray-900 rounded-lg overflow-hidden ${
          isMinimized ? 'flex-1' : 'flex-1 max-w-4xl mx-auto w-full'
        }`}>
          <img 
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover"
          />
          
          {/* Play Overlay */}
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <Button
              onClick={togglePlay}
              className="w-16 h-16 rounded-full bg-blue-500/80 hover:bg-blue-500 text-white"
            >
              {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
            </Button>
          </div>

          {/* Video Controls */}
          {!isMinimized && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="flex items-center space-x-4">
                <Button
                  onClick={togglePlay}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-gray-700"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </Button>
                
                <div className="flex-1 flex items-center space-x-2">
                  <span className="text-white text-sm">{formatTime(currentTime)}</span>
                  <div className="flex-1 bg-gray-700 h-1 rounded-full">
                    <div className="bg-blue-500 h-1 rounded-full w-1/3"></div>
                  </div>
                  <span className="text-white text-sm">{video.duration}</span>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-gray-700"
                >
                  <Volume2 className="w-5 h-5" />
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-gray-700"
                >
                  <RotateCcw className="w-5 h-5" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
