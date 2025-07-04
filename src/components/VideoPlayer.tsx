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
    url: string;
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
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('[VideoPlayer] Initializing with video:', video.id, video.title);
    
    // Push a new state when video player opens
    window.history.pushState({ isVideoOpen: true }, '');

    const handlePopState = (event: PopStateEvent) => {
      // Check if we're coming from video player state
      if (event.state?.isVideoOpen) {
        console.log('[VideoPlayer] Browser back button pressed, closing player');
        onClose();
        // Prevent default back navigation
        event.preventDefault();
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      // Clean up our state when component unmounts
      if (window.history.state?.isVideoOpen) {
        window.history.back();
      }
    };
  }, [video.id, onClose]);

  // Main video effect
  useEffect(() => {
    console.log('[VideoPlayer] Setting up video with URL:', video.url);
    const videoElement = videoRef.current;
    if (!videoElement) {
      console.log('[VideoPlayer] Video element not available');
      return;
    }

    const handleLoadedMetadata = () => {
      console.log('[VideoPlayer] Video metadata loaded, duration:', videoElement.duration);
      setDuration(videoElement.duration);

      if (video.isPlayable) {
        console.log('[VideoPlayer] Attempting to auto-play video');
        videoElement.play()
          .then(() => {
            console.log('[VideoPlayer] Auto-play succeeded');
            setIsPlaying(true);
          })
          .catch(err => {
            console.error('[VideoPlayer] Auto-play failed:', err);
            // Fallback to muted autoplay
            videoElement.muted = true;
            videoElement.play()
              .then(() => setIsPlaying(true))
              .catch(e => console.error('[VideoPlayer] Muted autoplay also failed:', e));
          });
      }
    };

    const handleTimeUpdate = () => {
      setCurrentTime(videoElement.currentTime);
    };

    const handleError = () => {
      console.error('[VideoPlayer] Video error:', videoElement.error);
      setHasError(true);
    };

    const handleCanPlay = () => {
      console.log('[VideoPlayer] Video can play');
    };

    videoElement.addEventListener('loadedmetadata', handleLoadedMetadata);
    videoElement.addEventListener('timeupdate', handleTimeUpdate);
    videoElement.addEventListener('error', handleError);
    videoElement.addEventListener('canplay', handleCanPlay);

    return () => {
      console.log('[VideoPlayer] Cleaning up video event listeners');
      videoElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
      videoElement.removeEventListener('timeupdate', handleTimeUpdate);
      videoElement.removeEventListener('error', handleError);
      videoElement.removeEventListener('canplay', handleCanPlay);
    };
  }, [video.url, video.isPlayable]);

  const togglePlay = async () => {
    const videoElement = videoRef.current;
    if (!videoElement) {
      console.log('[VideoPlayer] Video element not available for play/pause');
      return;
    }

    try {
      if (isPlaying) {
        console.log('[VideoPlayer] Pausing video');
        videoElement.pause();
        setIsPlaying(false);
      } else {
        console.log('[VideoPlayer] Playing video');
        await videoElement.play();
        setIsPlaying(true);
      }
    } catch (err) {
      console.error('[VideoPlayer] Play/pause error:', err);
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
    if (!videoElement || !duration) {
      console.log('[VideoPlayer] Cannot seek - video element or duration not available');
      return;
    }

    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const seekTime = pos * duration;

    console.log('[VideoPlayer] Seeking to:', seekTime);
    videoElement.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const handleReset = () => {
    const videoElement = videoRef.current;
    if (videoElement) {
      console.log('[VideoPlayer] Resetting video to start');
      videoElement.currentTime = 0;
      setCurrentTime(0);
      if (!isPlaying) {
        videoElement.play()
          .then(() => {
            console.log('[VideoPlayer] Play after reset succeeded');
            setIsPlaying(true);
          })
          .catch(err => console.error('[VideoPlayer] Play after reset failed:', err));
      }
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 bg-black/95 backdrop-blur-sm transition-all duration-300 ${isMinimized ? 'bottom-0 right-4 w-80 h-48 rounded-t-xl' : ''
        }`}
    >
      <div
        className={`${isMinimized ? 'h-full' : 'container mx-auto h-full flex flex-col'
          } p-4`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1">
            <h2
              className={`text-white font-semibold ${isMinimized ? 'text-sm' : 'text-xl'
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
          className={`relative bg-black overflow-hidden ${isMinimized ? 'flex-1 rounded-t-xl' : 'flex-1 w-full h-full'
            }`}
        >
          {hasError ? (
            <div className="absolute inset-0 flex items-center justify-center text-white bg-red-900/50">
              <p>Error loading video. Please check the URL.</p>
            </div>
          ) : (
            <>
              <video
                ref={videoRef}
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                autoPlay
                playsInline
                controls={false}
                onEnded={() => {
                  console.log('[VideoPlayer] Video ended');
                  setIsPlaying(false);
                }}
                preload="auto"
                key={video.url}
              >
                <source
                  src={video.url}
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>

              {/* Play Overlay */}
              {!isPlaying && video.url && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <Button
                    onClick={togglePlay}
                    className="w-16 h-16 rounded-full bg-blue-500/80 hover:bg-blue-500 text-white"
                  >
                    <Play className="w-8 h-8 ml-1" />
                  </Button>
                </div>
              )}
            </>
          )}

          {/* Video Controls */}
          {!isMinimized && video.isPlayable && !hasError && video.url && (
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

export default React.memo(VideoPlayer);