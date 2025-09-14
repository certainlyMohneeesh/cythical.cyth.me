"use client";

import { useState } from "react";

interface SpotifyPlayerProps {
  playlistId: string;
  height?: number;
}

export default function SpotifyPlayer({ playlistId, height = 352 }: SpotifyPlayerProps) {
  const [isLoading, setIsLoading] = useState(true);

  const handleIframeLoad = () => {
    // Small delay to ensure visual smoothness
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="relative">
      {/* Loading State with Simple Loader */}
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-xl">
          <div className="text-center space-y-4">
            <div className="relative w-8 h-8 mx-auto">
              <div className="w-8 h-8 border-4 border-muted border-t-foreground rounded-full animate-spin"></div>
            </div>
          </div>
        </div>
      )}

      {/* Spotify Iframe */}
      <iframe 
        data-testid="embed-iframe" 
        style={{ borderRadius: '12px' }} 
        src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator`}
        width="100%" 
        height={height}
        frameBorder="0" 
        allowFullScreen 
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
        loading="lazy"
        onLoad={handleIframeLoad}
        className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
      />
    </div>
  );
}