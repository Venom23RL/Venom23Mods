import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ExternalLink, Play, Gamepad2, Sparkles, Zap } from 'lucide-react';
import { streamerData, images } from '../data/mockData';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 via-indigo-900/80 to-violet-900/90"></div>
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      
      {/* Mystical floating particles effect */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 bg-violet-400 rounded-full opacity-60 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${2 + Math.random() * 4}s`,
              boxShadow: '0 0 15px rgba(139, 92, 246, 0.8)'
            }}
          >
            <div className="absolute inset-0 bg-violet-300 rounded-full animate-ping opacity-75"></div>
          </div>
        ))}
      </div>
      
      {/* Magical sparkles */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <Sparkles
            key={i}
            className="absolute text-yellow-300 animate-pulse opacity-70"
            size={20}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              filter: 'drop-shadow(0 0 5px #fbbf24)'
            }}
          />
        ))}
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Mystical status badge */}
        <div className="mb-6 flex justify-center">
          <Badge 
            variant="outline" 
            className="bg-violet-500/30 border-violet-400 text-violet-200 backdrop-blur-sm text-lg px-6 py-3 animate-bounce shadow-lg shadow-violet-500/30"
          >
            <Sparkles className="w-4 h-4 mr-2 animate-spin" />
            <div className="w-2 h-2 bg-pink-400 rounded-full mr-2 animate-pulse shadow-lg shadow-pink-500/50"></div>
            {streamerData.streaming.status === 'online' ? 'LIVE MAGIC ON TWITCH' : 'MYSTICAL GAMER WITCH'}
          </Badge>
        </div>
        
        {/* Name with magical glitch effect */}
        <h1 className="text-6xl md:text-8xl font-black mb-4 bg-gradient-to-r from-violet-400 via-purple-300 to-pink-400 bg-clip-text text-transparent animate-pulse">
          <span className="drop-shadow-2xl filter" style={{ textShadow: '0 0 30px rgba(139, 92, 246, 0.8)' }}>
            {streamerData.name}
          </span>
        </h1>
        
        {/* Magical title */}
        <p className="text-2xl md:text-3xl text-violet-200 font-semibold mb-6 tracking-wide">
          <Zap className="inline w-8 h-8 mr-2 text-yellow-400" />
          {streamerData.title} & Mystical Witch
          <Zap className="inline w-8 h-8 ml-2 text-yellow-400" />
        </p>
        
        {/* Enchanted tagline */}
        <p className="text-lg md:text-xl text-purple-200 mb-8 max-w-2xl mx-auto leading-relaxed">
          ✨ {streamerData.tagline} ✨
          <br />
          <span className="text-violet-300 font-medium">Conjurando victorias en Rocket League con magia pura</span>
        </p>
        
        {/* Magical CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-violet-600 to-purple-700 hover:from-violet-700 hover:to-purple-800 text-white px-8 py-4 text-lg font-semibold shadow-lg shadow-violet-500/40 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-violet-500/60 border border-violet-400/30"
          >
            <Play className="mr-2 h-5 w-5" />
            <Sparkles className="mr-2 h-4 w-4" />
            Ver Hechizos en Twitch
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-pink-400 text-pink-300 hover:bg-pink-400 hover:text-black px-8 py-4 text-lg font-semibold backdrop-blur-sm transition-all duration-300 transform hover:scale-105 shadow-lg shadow-pink-500/25 hover:shadow-pink-500/50"
          >
            <Gamepad2 className="mr-2 h-5 w-5" />
            <Sparkles className="mr-2 h-4 w-4" />
            Jugar & Conjurar
          </Button>
        </div>
        
        {/* Enchanted scroll indicator */}
        <div className="mt-16 animate-bounce">
          <div className="w-8 h-12 border-2 border-violet-400 rounded-full mx-auto relative overflow-hidden">
            <div className="w-2 h-4 bg-gradient-to-b from-violet-400 to-pink-400 rounded-full mx-auto mt-2 animate-pulse shadow-lg shadow-violet-400/50"></div>
            <Sparkles className="absolute -top-2 -right-2 text-yellow-300 w-4 h-4 animate-spin" />
          </div>
          <p className="text-violet-300 text-sm mt-2 animate-pulse">Descubre la magia ↓</p>
        </div>
      </div>
      
      {/* Magical decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black/70 via-violet-900/20 to-transparent"></div>
      
      {/* Floating magical orbs */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-violet-400 rounded-full animate-float opacity-60 shadow-lg shadow-violet-400/80"></div>
      <div className="absolute top-40 right-20 w-6 h-6 bg-pink-400 rounded-full animate-float opacity-70 shadow-lg shadow-pink-400/80" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-40 left-20 w-3 h-3 bg-yellow-400 rounded-full animate-float opacity-80 shadow-lg shadow-yellow-400/80" style={{ animationDelay: '2s' }}></div>
    </section>
  );
};

export default Hero;