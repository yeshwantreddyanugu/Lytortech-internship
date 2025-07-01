import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Minimize2,
  Maximize2,
  Play,
  Pause,
  Volume2,
  RotateCcw,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface VideoPlayerProps {
  video: {
    id: number;
    title: string;
    duration: string;
    thumbnail: string;
    description: string;
    isPlayable: boolean;
  };
  onClose: () => void;
  isMinimized: boolean;
  onToggleMinimize: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  video,
  onClose,
  isMinimized,
  onToggleMinimize,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [user, setUser] = useState<any>(null);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();

  // Load user data
  useEffect(() => {
    const storedUser = localStorage.getItem('internshipUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (e) {
        console.error('Error parsing user data:', e);
      }
    }
  }, []);

  // 🟡 Handle browser back button (←)
  useEffect(() => {
    const handlePopState = () => {
      onClose(); // just close the video player
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [onClose]);

  // Video load/play setup
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handleLoadedMetadata = () => {
      setDuration(videoElement.duration);
      if (video.isPlayable) {
        videoElement.play()
          .then(() => setIsPlaying(true))
          .catch(err => {
            console.error('Auto-play failed:', err);
            setIsPlaying(false);
          });
      }
    };

    const handleTimeUpdate = () => {
      setCurrentTime(videoElement.currentTime);
    };

    const handleError = () => {
      console.error('Video error:', videoElement.error);
      setHasError(true);
    };

    videoElement.addEventListener('loadedmetadata', handleLoadedMetadata);
    videoElement.addEventListener('timeupdate', handleTimeUpdate);
    videoElement.addEventListener('error', handleError);

    return () => {
      videoElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
      videoElement.removeEventListener('timeupdate', handleTimeUpdate);
      videoElement.removeEventListener('error', handleError);
    };
  }, [video.isPlayable]);

  const togglePlay = async () => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    try {
      if (isPlaying) {
        videoElement.pause();
        setIsPlaying(false);
      } else {
        await videoElement.play();
        setIsPlaying(true);
      }
    } catch (err) {
      console.error('Play/pause error:', err);
      setIsPlaying(false);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const videoElement = videoRef.current;
    if (!videoElement || !duration) return;

    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const seekTime = pos * duration;

    videoElement.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const handleReset = () => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.currentTime = 0;
      setCurrentTime(0);
      if (!isPlaying) {
        videoElement.play()
          .then(() => setIsPlaying(true))
          .catch(err => console.error('Play failed:', err));
      }
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 bg-black/95 backdrop-blur-sm transition-all duration-300 ${
        isMinimized ? 'bottom-0 right-4 w-80 h-48 rounded-t-xl' : ''
      }`}
    >
      <div
        className={`${
          isMinimized ? 'h-full' : 'container mx-auto h-full flex flex-col'
        } p-4`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1">
            <h2
              className={`text-white font-semibold ${
                isMinimized ? 'text-sm' : 'text-xl'
              }`}
            >
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
              {isMinimized ? (
                <Maximize2 className="w-4 h-4" />
              ) : (
                <Minimize2 className="w-4 h-4" />
              )}
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
        <div
          className={`relative bg-black overflow-hidden ${
            isMinimized ? 'flex-1 rounded-t-xl' : 'flex-1 w-full h-full'
          }`}
        >
          {hasError ? (
            <div className="absolute inset-0 flex items-center justify-center text-white bg-red-900/50">
              <p>Error loading video. Please check the URL.</p>
            </div>
          ) : (
            <video
              ref={videoRef}
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              muted
              playsInline
              controls={false}
              onEnded={() => setIsPlaying(false)}
              preload="auto"
            >
              <source
                src={user?.url || 'https://www.w3schools.com/html/mov_bbb.mp4'}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          )}

          {/* Play Overlay */}
          {!isPlaying && !hasError && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <Button
                onClick={togglePlay}
                className="w-16 h-16 rounded-full bg-blue-500/80 hover:bg-blue-500 text-white"
              >
                <Play className="w-8 h-8 ml-1" />
              </Button>
            </div>
          )}

          {/* Video Controls */}
          {!isMinimized && video.isPlayable && !hasError && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="flex items-center space-x-4">
                <Button
                  onClick={togglePlay}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-gray-700"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5" />
                  ) : (
                    <Play className="w-5 h-5" />
                  )}
                </Button>

                <div className="flex-1 flex items-center space-x-2">
                  <span className="text-white text-sm">
                    {formatTime(currentTime)}
                  </span>
                  <div
                    className="flex-1 bg-gray-700 h-1 rounded-full cursor-pointer"
                    onClick={handleSeek}
                  >
                    <div
                      className="bg-blue-500 h-1 rounded-full"
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                  <span className="text-white text-sm">
                    {formatTime(duration)}
                  </span>
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
                  onClick={handleReset}
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
