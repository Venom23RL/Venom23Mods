import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Star, ExternalLink, Trophy } from 'lucide-react';
import { streamerData, images } from '../data/mockData';

const Partnerships = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-black via-purple-900/10 to-cyan-900/10 relative overflow-hidden">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url(${images.partnerships})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-cyan-900/80"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="outline" className="bg-yellow-500/20 border-yellow-400 text-yellow-200 backdrop-blur-sm mb-4">
              <Trophy className="w-4 h-4 mr-2" />
              Colaboraciones
            </Badge>
            <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Partnerships
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Orgullosa de colaborar con marcas increíbles en el mundo gaming
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {streamerData.partnerships.map((partnership, index) => (
              <Card 
                key={partnership.id}
                className="bg-black/60 border-purple-500/30 backdrop-blur-sm hover:bg-black/80 transition-all duration-500 group transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
              >
                <CardContent className="p-8 text-center">
                  <div className="mb-6">
                    <div className="text-6xl mb-4 animate-pulse">
                      {partnership.logo}
                    </div>
                    <Badge 
                      variant="outline" 
                      className={`${
                        index === 0 
                          ? 'bg-purple-500/20 border-purple-400 text-purple-200' 
                          : 'bg-cyan-500/20 border-cyan-400 text-cyan-200'
                      } backdrop-blur-sm mb-4`}
                    >
                      <Star className="w-4 h-4 mr-2" />
                      {partnership.role}
                    </Badge>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                    {partnership.name}
                  </h3>
                  <p className="text-gray-400 mb-6">
                    {partnership.handle}
                  </p>
                  
                  {partnership.url && (
                    <Button 
                      variant="outline" 
                      className={`${
                        index === 0 
                          ? 'border-purple-400 text-purple-300 hover:bg-purple-400 hover:text-black' 
                          : 'border-cyan-400 text-cyan-300 hover:bg-cyan-400 hover:text-black'
                      } backdrop-blur-sm transition-all duration-300 transform hover:scale-105`}
                      onClick={() => window.open(partnership.url, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Visitar
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Call to action */}
          <div className="text-center mt-16">
            <Card className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border-purple-500/30 backdrop-blur-sm">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-white mb-4">
                  ¿Interesado en colaborar?
                </h3>
                <p className="text-gray-300 mb-6">
                  Siempre abierta a nuevas oportunidades de partnership y colaboraciones
                </p>
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-8 py-4 text-lg font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  Contactar
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