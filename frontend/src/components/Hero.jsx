import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ExternalLink, Play, Gamepad2 } from 'lucide-react';
import { streamerData, images } from '../data/mockData';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${images.hero})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 via-blue-900/70 to-cyan-900/90"></div>
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      {/* Animated particles effect */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400 rounded-full opacity-50 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          ></div>
        ))}
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Status badge */}
        <div className="mb-6 flex justify-center">
          <Badge 
            variant="outline" 
            className="bg-purple-500/20 border-purple-400 text-purple-200 backdrop-blur-sm text-lg px-4 py-2 animate-bounce"
          >
            <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></div>
            {streamerData.streaming.status === 'online' ? 'LIVE ON TWITCH' : 'TWITCH STREAMER'}
          </Badge>
        </div>
        
        {/* Name with glitch effect */}
        <h1 className="text-6xl md:text-8xl font-black mb-4 bg-gradient-to-r from-purple-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent animate-pulse">
          {streamerData.name}
        </h1>
        
        {/* Title */}
        <p className="text-2xl md:text-3xl text-cyan-200 font-semibold mb-6 tracking-wide">
          {streamerData.title}
        </p>
        
        {/* Tagline */}
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
          {streamerData.tagline}
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-lg shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/40"
          >
            <Play className="mr-2 h-5 w-5" />
            Ver en Twitch
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-cyan-400 text-cyan-300 hover:bg-cyan-400 hover:text-black px-8 py-4 text-lg font-semibold backdrop-blur-sm transition-all duration-300 transform hover:scale-105"
          >
            <Gamepad2 className="mr-2 h-5 w-5" />
            Jugar Juntos
          </Button>
        </div>
        
        {/* Scroll indicator */}
        <div className="mt-16 animate-bounce">
          <div className="w-6 h-10 border-2 border-cyan-400 rounded-full mx-auto">
            <div className="w-1 h-3 bg-cyan-400 rounded-full mx-auto mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/50 to-transparent"></div>
    </section>
  );
};

export default Hero;