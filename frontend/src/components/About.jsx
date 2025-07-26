import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { MapPin, Heart, Gamepad2, Sparkles, Wand2 } from 'lucide-react';
import { streamerData, images } from '../data/mockData';

const About = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-violet-900/30 to-purple-900/30 relative overflow-hidden">
      {/* Mystical background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${images.mystical})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-violet-900/80 to-purple-900/80"></div>
        </div>
      </div>
      
      {/* Floating magical elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <Sparkles
            key={i}
            className="absolute text-violet-300 animate-pulse opacity-40"
            size={16}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              filter: 'drop-shadow(0 0 3px #8b5cf6)'
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="outline" className="bg-violet-500/20 border-violet-400 text-violet-200 backdrop-blur-sm mb-4">
              <Wand2 className="w-4 h-4 mr-2 animate-pulse" />
              Conoce a la Bruja Gamer
            </Badge>
            <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-violet-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
              ✨ Sobre Mi Mundo Mágico ✨
            </h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Mystical image side */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300 animate-pulse"></div>
              <div className="relative">
                <img 
                  src={images.about}
                  alt="Mystical witch gaming"
                  className="w-full h-80 object-cover rounded-xl shadow-2xl transform group-hover:scale-105 transition duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-violet-900/70 via-purple-900/30 to-transparent rounded-xl"></div>
                
                {/* Magical overlay effects */}
                <div className="absolute top-4 right-4">
                  <Sparkles className="text-yellow-300 w-8 h-8 animate-spin opacity-80 drop-shadow-lg" />
                </div>
                <div className="absolute bottom-4 left-4">
                  <Wand2 className="text-violet-300 w-6 h-6 animate-pulse opacity-70" />
                </div>
              </div>
            </div>
            
            {/* Magical content side */}
            <div className="space-y-8">
              <Card className="bg-black/60 border-violet-500/40 backdrop-blur-sm hover:bg-black/70 transition-all duration-300 group shadow-lg shadow-violet-500/20">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <MapPin className="h-6 w-6 text-pink-400 mr-3 animate-pulse" />
                    <h3 className="text-2xl font-bold text-white">Mi Reino Terrenal</h3>
                    <Sparkles className="h-4 w-4 text-yellow-300 ml-2 animate-spin" />
                  </div>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    🏝️ {streamerData.bio} 
                    <br />
                    <span className="text-violet-300 font-medium">Donde la magia de las islas se encuentra con la energía de la ciudad ✨</span>
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-black/60 border-purple-500/40 backdrop-blur-sm hover:bg-black/70 transition-all duration-300 group shadow-lg shadow-purple-500/20">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <Gamepad2 className="h-6 w-6 text-violet-400 mr-3 animate-pulse" />
                    <h3 className="text-2xl font-bold text-white">Mi Magia Gaming</h3>
                    <Wand2 className="h-4 w-4 text-pink-300 ml-2 animate-bounce" />
                  </div>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    🎮 Combino hechizos ancestrales con las mejores jugadas de Rocket League. 
                    Cada partida es un ritual, cada gol una invocación perfecta. 
                    <br />
                    <span className="text-purple-300 font-medium">¡La magia está en los detalles y en cada boost! ⚡</span>
                  </p>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-6 bg-gradient-to-br from-violet-500/20 via-purple-500/10 to-transparent rounded-xl border border-violet-500/40 backdrop-blur-sm hover:border-violet-400/60 transition-all duration-300 group">
                  <div className="text-3xl font-black text-violet-400 mb-2 group-hover:animate-bounce">🔮</div>
                  <div className="text-white font-semibold">Bruja Gamer</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-purple-500/20 via-pink-500/10 to-transparent rounded-xl border border-purple-500/40 backdrop-blur-sm hover:border-pink-400/60 transition-all duration-300 group">
                  <div className="text-3xl font-black text-pink-400 mb-2 group-hover:animate-bounce">🚗⚽</div>
                  <div className="text-white font-semibold">Rocket League</div>
                </div>
              </div>
              
              {/* Magical stats */}
              <Card className="bg-gradient-to-r from-violet-500/10 via-purple-500/10 to-pink-500/10 border-violet-500/30 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="text-center">
                    <Sparkles className="w-8 h-8 text-yellow-300 mx-auto mb-2 animate-spin" />
                    <p className="text-violet-200 font-medium">
                      "Donde la magia de las Canarias se encuentra con la precisión de Rocket League"
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;