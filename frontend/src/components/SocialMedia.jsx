import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  ExternalLink, 
  Users, 
  Youtube, 
  Instagram, 
  Twitter,
  MessageCircle,
  Music,
  Gamepad2,
  Play
} from 'lucide-react';
import { streamerData, images } from '../data/mockData';

const SocialMedia = () => {
  const getIcon = (iconName) => {
    const icons = {
      youtube: Youtube,
      instagram: Instagram,
      twitter: Twitter,
      discord: MessageCircle,
      tiktok: Music,
      'gamepad-2': Gamepad2
    };
    
    const IconComponent = icons[iconName] || ExternalLink;
    return <IconComponent className="w-6 h-6" />;
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-black to-purple-900/20 relative overflow-hidden">
      {/* Background gaming setup */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{ backgroundImage: `url(${images.gaming})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-purple-900/60 to-cyan-900/80"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="outline" className="bg-cyan-500/20 border-cyan-400 text-cyan-200 backdrop-blur-sm mb-4">
              <Users className="w-4 h-4 mr-2" />
              Comunidad
            </Badge>
            <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Redes Sociales
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Sígueme en todas las plataformas para no perderte nada del contenido
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {streamerData.socialMedia.map((social, index) => (
              <Card 
                key={index}
                className="bg-black/60 border-purple-500/30 backdrop-blur-sm hover:bg-black/80 transition-all duration-500 group transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
              >
                <CardContent className="p-6 text-center">
                  <div 
                    className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: social.color }}
                  >
                    {getIcon(social.icon)}
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">
                    {social.platform}
                  </h3>
                  
                  <Button 
                    variant="outline" 
                    className="border-purple-400 text-purple-300 hover:bg-purple-400 hover:text-black backdrop-blur-sm transition-all duration-300 transform hover:scale-105 w-full"
                    onClick={() => window.open(social.url, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Seguir
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Featured social */}
          <div className="mt-16">
            <Card className="bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border-purple-500/50 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mr-4">
                    <MessageCircle className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Discord Community
                    </h3>
                    <p className="text-gray-300">
                      Únete a la comunidad más activa
                    </p>
                  </div>
                </div>
                
                <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto">
                  En Discord es donde más interactúo con la comunidad. 
                  ¡Únete para encontrar compañeros de partida, recibir notificaciones de streams y formar parte de la familia!
                </p>
                
                <Button 
                  size="lg"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-lg shadow-purple-500/25 transition-all duration-300 transform hover:scale-105"
                  onClick={() => window.open(streamerData.socialMedia.find(s => s.platform === 'Discord').url, '_blank')}
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Unirse al Discord
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialMedia;