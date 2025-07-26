import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { MapPin, Heart, Gamepad2 } from 'lucide-react';
import { streamerData, images } from '../data/mockData';

const About = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="outline" className="bg-purple-500/20 border-purple-400 text-purple-200 backdrop-blur-sm mb-4">
              <Heart className="w-4 h-4 mr-2" />
              Conoce a la Streamer
            </Badge>
            <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-purple-400 to-cyan-300 bg-clip-text text-transparent">
              Sobre Mí
            </h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image side */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative">
                <img 
                  src={images.about}
                  alt="Gaming setup"
                  className="w-full h-80 object-cover rounded-xl shadow-2xl transform group-hover:scale-105 transition duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 to-transparent rounded-xl"></div>
              </div>
            </div>
            
            {/* Content side */}
            <div className="space-y-8">
              <Card className="bg-black/40 border-purple-500/30 backdrop-blur-sm hover:bg-black/60 transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <MapPin className="h-6 w-6 text-cyan-400 mr-3" />
                    <h3 className="text-2xl font-bold text-white">Ubicación</h3>
                  </div>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {streamerData.bio}
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-black/40 border-cyan-500/30 backdrop-blur-sm hover:bg-black/60 transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <Gamepad2 className="h-6 w-6 text-purple-400 mr-3" />
                    <h3 className="text-2xl font-bold text-white">Mi Pasión</h3>
                  </div>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    Apasionada por Rocket League y los esports. Me encanta crear contenido, 
                    interactuar con la comunidad y compartir mi amor por los videojuegos. 
                    Siempre buscando mejorar y disfrutar cada partida.
                  </p>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-6 bg-gradient-to-br from-purple-500/20 to-transparent rounded-xl border border-purple-500/30 backdrop-blur-sm">
                  <div className="text-3xl font-black text-purple-400 mb-2">🎮</div>
                  <div className="text-white font-semibold">Gaming</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-xl border border-cyan-500/30 backdrop-blur-sm">
                  <div className="text-3xl font-black text-cyan-400 mb-2">🚗</div>
                  <div className="text-white font-semibold">Rocket League</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;