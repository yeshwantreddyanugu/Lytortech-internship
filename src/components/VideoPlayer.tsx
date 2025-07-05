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
  const [isFullscreen, setIsFullscreen] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Back button handler
  useEffect(() => {
    window.history.pushState({ isVideoOpen: true }, '');

    const handlePopState = (event: PopStateEvent) => {
      if (event.state?.isVideoOpen) {
        onClose();
        event.preventDefault();
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      if (window.history.state?.isVideoOpen) window.history.back();
    };
  }, [video.id, onClose]);

  // Video load handler
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handleLoadedMetadata = () => {
      setDuration(videoElement.duration);
      if (video.isPlayable) {
        videoElement.play()
          .then(() => setIsPlaying(true))
          .catch(() => {
            videoElement.muted = true;
            videoElement.play().then(() => setIsPlaying(true));
          });
      }
    };

    const handleTimeUpdate = () => {
      setCurrentTime(videoElement.currentTime);
    };

    const handleError = () => {
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
  }, [video.url, video.isPlayable]);

  const togglePlay = async () => {
    const videoElement = videoRef.current;
    if (!videoElement) return;
    if (isPlaying) {
      videoElement.pause();
      setIsPlaying(false);
    } else {
      await videoElement.play();
      setIsPlaying(true);
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

    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const seekTime = pos * duration;
    videoElement.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const handleReset = () => {
    const videoElement = videoRef.current;
    if (!videoElement) return;
    videoElement.currentTime = 0;
    setCurrentTime(0);
    if (!isPlaying) {
      videoElement.play().then(() => setIsPlaying(true));
    }
  };

  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(err => {
        console.error('[Fullscreen] Failed:', err);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-50 bg-black ${isFullscreen ? '' : 'backdrop-blur-sm'} transition-all duration-300`}
    >
      <div className="w-full h-full flex flex-col p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex-1">
            <h2 className="text-white font-semibold text-lg">
              {video.title}
            </h2>
            {!isMinimized && (
              <p className="text-gray-400 text-sm mt-1">{video.description}</p>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Button onClick={toggleFullscreen} variant="ghost" size="sm" className="text-white hover:bg-gray-700">
              <Maximize2 className="w-4 h-4" />
            </Button>
            <Button onClick={onToggleMinimize} variant="ghost" size="sm" className="text-white hover:bg-gray-700">
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </Button>
            <Button onClick={onClose} variant="ghost" size="sm" className="text-white hover:bg-gray-700">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Video Section */}
        <div className="relative flex-1 bg-black rounded-lg overflow-hidden">
          {hasError ? (
            <div className="absolute inset-0 flex items-center justify-center text-white bg-red-900/50">
              <p>Error loading video. Please check the URL.</p>
            </div>
          ) : (
            <>
              <video
                ref={videoRef}
                className="w-full h-full object-contain"
                autoPlay
                playsInline
                controls={false}
                preload="auto"
                onEnded={() => setIsPlaying(false)}
              >
                <source src={video.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>

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

          {/* Controls */}
          {!isMinimized && video.isPlayable && !hasError && video.url && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="flex items-center space-x-4">
                <Button onClick={togglePlay} variant="ghost" size="sm" className="text-white hover:bg-gray-700">
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </Button>

                <div className="flex-1 flex items-center space-x-2">
                  <span className="text-white text-sm">{formatTime(currentTime)}</span>
                  <div className="flex-1 bg-gray-700 h-1 rounded-full cursor-pointer" onClick={handleSeek}>
                    <div className="bg-blue-500 h-1 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
                  </div>
                  <span className="text-white text-sm">{formatTime(duration)}</span>
                </div>

                <Button variant="ghost" size="sm" className="text-white hover:bg-gray-700">
                  <Volume2 className="w-5 h-5" />
                </Button>

                <Button onClick={handleReset} variant="ghost" size="sm" className="text-white hover:bg-gray-700">
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
