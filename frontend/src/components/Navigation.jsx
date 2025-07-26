import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Menu, X, Play, Users, Trophy, MessageSquare, Mail } from 'lucide-react';
import { streamerData } from '../data/mockData';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  const navItems = [
    { id: 'about', label: 'Sobre Mí', icon: Users },
    { id: 'partnerships', label: 'Partners', icon: Trophy },
    { id: 'social', label: 'Social', icon: MessageSquare },
    { id: 'contact', label: 'Contacto', icon: Mail }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-black/90 backdrop-blur-md border-b border-purple-500/30' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center">
              <Play className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-black bg-gradient-to-r from-purple-400 to-cyan-300 bg-clip-text text-transparent">
              {streamerData.name}
            </span>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  className="text-gray-300 hover:text-purple-300 hover:bg-purple-500/10 transition-all duration-300"
                  onClick={() => scrollToSection(item.id)}
                >
                  <IconComponent className="w-4 h-4 mr-2" />
                  {item.label}
                </Button>
              );
            })}
            
            {/* Live status */}
            <Badge 
              variant="outline" 
              className="bg-purple-500/20 border-purple-400 text-purple-200 backdrop-blur-sm animate-pulse cursor-pointer"
              onClick={() => window.open(streamerData.streaming.url, '_blank')}
            >
              <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></div>
              {streamerData.streaming.status === 'online' ? 'LIVE' : 'TWITCH'}
            </Badge>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-white hover:bg-purple-500/10"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-black/95 backdrop-blur-md rounded-lg mt-2 border border-purple-500/30">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant="ghost"
                    className="w-full justify-start text-gray-300 hover:text-purple-300 hover:bg-purple-500/10"
                    onClick={() => scrollToSection(item.id)}
                  >
                    <IconComponent className="w-4 h-4 mr-2" />
                    {item.label}
                  </Button>
                );
              })}
              
              <div className="pt-2 border-t border-purple-500/30">
                <Badge 
                  variant="outline" 
                  className="w-full justify-center bg-purple-500/20 border-purple-400 text-purple-200 backdrop-blur-sm animate-pulse cursor-pointer"
                  onClick={() => window.open(streamerData.streaming.url, '_blank')}
                >
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></div>
                  {streamerData.streaming.status === 'online' ? 'VER STREAM LIVE' : 'VER EN TWITCH'}
                </Badge>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;