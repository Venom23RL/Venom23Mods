import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Mail, Send, MessageSquare, Briefcase } from 'lucide-react';
import { streamerData } from '../data/mockData';
import { useToast } from '../hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock form submission
    toast({
      title: "Mensaje enviado! 🚀",
      description: "Gracias por contactar. Te responderé pronto!",
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="py-20 bg-gradient-to-br from-black via-purple-900/10 to-cyan-900/10 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.3),transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.2),transparent_70%)]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="outline" className="bg-purple-500/20 border-purple-400 text-purple-200 backdrop-blur-sm mb-4">
              <Mail className="w-4 h-4 mr-2" />
              Contacto
            </Badge>
            <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-purple-400 to-cyan-300 bg-clip-text text-transparent">
              Hablemos
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              ¿Tienes una propuesta, colaboración o simplemente quieres saludar? 
              ¡Me encantaría escucharte!
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <Card className="bg-black/60 border-purple-500/30 backdrop-blur-sm hover:bg-black/80 transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <Mail className="h-6 w-6 text-purple-400 mr-3" />
                    <h3 className="text-2xl font-bold text-white">Email Business</h3>
                  </div>
                  <p className="text-gray-300 text-lg mb-4">
                    Para colaboraciones y oportunidades profesionales
                  </p>
                  <p className="text-cyan-300 font-mono text-lg">
                    {streamerData.contact.email}
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-black/60 border-cyan-500/30 backdrop-blur-sm hover:bg-black/80 transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <MessageSquare className="h-6 w-6 text-cyan-400 mr-3" />
                    <h3 className="text-2xl font-bold text-white">Discord</h3>
                  </div>
                  <p className="text-gray-300 text-lg mb-4">
                    Para charlas casuales y gaming juntos
                  </p>
                  <Button 
                    variant="outline" 
                    className="border-cyan-400 text-cyan-300 hover:bg-cyan-400 hover:text-black transition-all duration-300"
                    onClick={() => window.open(streamerData.socialMedia.find(s => s.platform === 'Discord').url, '_blank')}
                  >
                    Unirse al Discord
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border-purple-500/30 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <Briefcase className="h-6 w-6 text-yellow-400 mr-3" />
                    <h3 className="text-2xl font-bold text-white">Colaboraciones</h3>
                  </div>
                  <ul className="text-gray-300 space-y-2">
                    <li>• Sponsorships y partnerships</li>
                    <li>• Promoción de productos gaming</li>
                    <li>• Eventos y torneos</li>
                    <li>• Creación de contenido</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            {/* Contact Form */}
            <Card className="bg-black/60 border-purple-500/30 backdrop-blur-sm">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-white mb-6">
                  Envía un mensaje
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Input
                      name="name"
                      placeholder="Tu nombre"
                      value={formData.name}
                      onChange={handleChange}
                      className="bg-black/40 border-purple-500/50 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-purple-400"
                      required
                    />
                  </div>
                  
                  <div>
                    <Input
                      name="email"
                      type="email"
                      placeholder="Tu email"
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-black/40 border-purple-500/50 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-purple-400"
                      required
                    />
                  </div>
                  
                  <div>
                    <Input
                      name="subject"
                      placeholder="Asunto"
                      value={formData.subject}
                      onChange={handleChange}
                      className="bg-black/40 border-purple-500/50 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-purple-400"
                      required
                    />
                  </div>
                  
                  <div>
                    <Textarea
                      name="message"
                      placeholder="Tu mensaje..."
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="bg-black/40 border-purple-500/50 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-purple-400 resize-none"
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white py-3 text-lg font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    <Send className="mr-2 h-5 w-5" />
                    Enviar Mensaje
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;