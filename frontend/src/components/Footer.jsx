import React from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Heart, ExternalLink, Gamepad2 } from 'lucide-react';
import { streamerData } from '../data/mockData';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-purple-500/30 py-12 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(168,85,247,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(6,182,212,0.1),transparent_50%)]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Main footer content */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Brand section */}
            <div className="text-center md:text-left">
              <h3 className="text-3xl font-black mb-4 bg-gradient-to-r from-purple-400 to-cyan-300 bg-clip-text text-transparent">
                {streamerData.name}
              </h3>
              <p className="text-gray-300 mb-6">
                {streamerData.title}
              </p>
              <Badge variant="outline" className="bg-purple-500/20 border-purple-400 text-purple-200 backdrop-blur-sm">
                <Gamepad2 className="w-4 h-4 mr-2" />
                Rocket League Pro
              </Badge>
            </div>
            
            {/* Quick links */}
            <div className="text-center">
              <h4 className="text-xl font-bold text-white mb-6">Enlaces Rápidos</h4>
              <div className="space-y-3">
                <Button 
                  variant="ghost" 
                  className="text-gray-300 hover:text-purple-300 p-0 h-auto font-normal"
                  onClick={() => window.open(streamerData.streaming.url, '_blank')}
                >
                  Ver en Twitch
                </Button>
                <br />
                <Button 
                  variant="ghost" 
                  className="text-gray-300 hover:text-cyan-300 p-0 h-auto font-normal"
                  onClick={() => window.open(streamerData.socialMedia.find(s => s.platform === 'Discord').url, '_blank')}
                >
                  Discord Community
                </Button>
                <br />
                <Button 
                  variant="ghost" 
                  className="text-gray-300 hover:text-purple-300 p-0 h-auto font-normal"
                >
                  Contacto Business
                </Button>
              </div>
            </div>
            
            {/* Social links */}
            <div className="text-center md:text-right">
              <h4 className="text-xl font-bold text-white mb-6">Sígueme</h4>
              <div className="flex flex-wrap justify-center md:justify-end gap-3">
                {streamerData.socialMedia.slice(0, 4).map((social, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="border-purple-500/30 text-purple-300 hover:bg-purple-500/20 backdrop-blur-sm"
                    onClick={() => window.open(social.url, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    {social.platform}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Partnership showcase */}
          <div className="border-t border-purple-500/30 pt-8 mb-8">
            <div className="text-center">
              <p className="text-gray-400 mb-4">Orgullosa partner de:</p>
              <div className="flex flex-wrap justify-center gap-6 items-center">
                {streamerData.partnerships.map((partnership, index) => (
                  <div key={partnership.id} className="flex items-center space-x-2">
                    <span className="text-2xl">{partnership.logo}</span>
                    <span className="text-gray-300 font-semibold">{partnership.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Bottom bar */}
          <div className="border-t border-purple-500/30 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm mb-4 md:mb-0">
                © 2025 {streamerData.name}. Hecho con <Heart className="w-4 h-4 inline text-red-500" /> para la comunidad gaming.
              </p>
              <p className="text-gray-500 text-sm">
                {streamerData.bio}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;