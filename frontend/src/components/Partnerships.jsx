import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Star, ExternalLink, Trophy, Sparkles, Crown, Wand2 } from 'lucide-react';
import { streamerData, images } from '../data/mockData';

const Partnerships = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-black via-violet-900/20 to-purple-900/20 relative overflow-hidden">
      {/* Mystical background with candles/ritual setup */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{ backgroundImage: `url(${images.partnerships})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-violet-900/90 via-purple-900/80 to-pink-900/90"></div>
      </div>
      
      {/* Floating magical elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <Sparkles
            key={i}
            className="absolute text-yellow-300 animate-pulse opacity-50"
            size={20}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              filter: 'drop-shadow(0 0 5px #fbbf24)'
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="outline" className="bg-yellow-500/20 border-yellow-400 text-yellow-200 backdrop-blur-sm mb-4">
              <Crown className="w-4 h-4 mr-2 animate-pulse" />
              Alianzas Mágicas
            </Badge>
            <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 bg-clip-text text-transparent">
              ✨ Partnerships Encantados ✨
            </h2>
            <p className="text-xl text-purple-200 max-w-2xl mx-auto">
              Orgullosa de colaborar con marcas increíbles que comparten mi magia gaming
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {streamerData.partnerships.map((partnership, index) => (
              <Card 
                key={partnership.id}
                className="bg-black/70 border-violet-500/40 backdrop-blur-sm hover:bg-black/85 transition-all duration-500 group transform hover:scale-105 hover:shadow-2xl hover:shadow-violet-500/30"
              >
                <CardContent className="p-8 text-center">
                  <div className="mb-6 relative">
                    <div className="text-6xl mb-4 animate-pulse group-hover:animate-bounce transition-all duration-300">
                      {partnership.logo}
                    </div>
                    
                    {/* Magical aura around emoji */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-r from-violet-500/20 to-purple-500/20 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      {[...Array(6)].map((_, i) => (
                        <Sparkles
                          key={i}
                          className="absolute text-yellow-300 w-3 h-3 opacity-0 group-hover:opacity-80 transition-opacity duration-500"
                          style={{
                            left: `${25 + Math.cos(i * 60 * Math.PI / 180) * 40}px`,
                            top: `${25 + Math.sin(i * 60 * Math.PI / 180) * 40}px`,
                            animationDelay: `${i * 0.1}s`
                          }}
                        />
                      ))}
                    </div>
                    
                    <Badge 
                      variant="outline" 
                      className={`${
                        index === 0 
                          ? 'bg-violet-500/20 border-violet-400 text-violet-200' 
                          : 'bg-purple-500/20 border-purple-400 text-purple-200'
                      } backdrop-blur-sm mb-4 shadow-lg`}
                    >
                      <Wand2 className="w-4 h-4 mr-2 animate-pulse" />
                      {partnership.role}
                      <Sparkles className="w-3 h-3 ml-2 animate-spin" />
                    </Badge>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-violet-300 transition-colors">
                    {partnership.name}
                  </h3>
                  <p className="text-gray-400 mb-6 font-medium">
                    {partnership.handle}
                  </p>
                  
                  {partnership.url && (
                    <Button 
                      variant="outline" 
                      className={`${
                        index === 0 
                          ? 'border-violet-400 text-violet-300 hover:bg-violet-400 hover:text-black hover:shadow-violet-400/50' 
                          : 'border-purple-400 text-purple-300 hover:bg-purple-400 hover:text-black hover:shadow-purple-400/50'
                      } backdrop-blur-sm transition-all duration-300 transform hover:scale-105 shadow-lg group-hover:animate-pulse`}
                      onClick={() => window.open(partnership.url, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      <Sparkles className="w-3 h-3 mr-2" />
                      Explorar Magia
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Magical call to action */}
          <div className="text-center mt-16">
            <Card className="bg-gradient-to-r from-violet-500/20 via-purple-500/20 to-pink-500/20 border-violet-500/40 backdrop-blur-sm hover:border-violet-400/60 transition-all duration-500 group">
              <CardContent className="p-8">
                <div className="flex items-center justify-center mb-4">
                  <Crown className="h-8 w-8 text-yellow-400 mr-3 animate-pulse" />
                  <h3 className="text-2xl font-bold text-white">
                    ¿Quieres unirte a mi círculo mágico?
                  </h3>
                  <Wand2 className="h-8 w-8 text-violet-400 ml-3 animate-bounce" />
                </div>
                <p className="text-purple-200 mb-6 text-lg">
                  Siempre abierta a nuevas alianzas encantadas y colaboraciones místicas en el mundo gaming
                </p>
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 hover:from-violet-700 hover:via-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg font-semibold shadow-lg shadow-violet-500/30 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-violet-500/50 group-hover:animate-pulse"
                >
                  <Sparkles className="mr-2 h-5 w-5 animate-spin" />
                  Conjurar Colaboración
                  <Wand2 className="ml-2 h-5 w-5 animate-bounce" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partnerships;