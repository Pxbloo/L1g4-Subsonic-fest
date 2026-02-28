import React from 'react';
import { Link } from 'react-router-dom';   // Cuando tengamos backend podemos detectar la pagina en la que estamos
import SubsonicLogo from "@/assets/logo/Subsonic.webp";

const Footer = () => {

  
  return (
    <footer className="bg-subsonic-navfooter border-t border-subsonic-border mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-15">
          
          <div className="col-span-1 md:col-span-1">
            <img 
              src={SubsonicLogo} 
              alt="Subsonic Logo" 
              className="w-40 h-auto mb-6 hover:opacity-50 transition-opacity cursor-pointer" 
            />
            
          </div>

          <div>
            <h4 className="font-montserrat font-bold text-subsonic-muted text-xl  mb-6">
              Inicio
            </h4>
            <ul className="space-y-4 text-sm font-extralight text-subsonic-text">
              <li><a href="#" className="hover:text-subsonic-accent transition-colors">Experiencias</a></li>
              <li><a href="#" className="hover:text-subsonic-accent transition-colors">Paquetes</a></li>
              <li><a href="#" className="hover:text-subsonic-accent transition-colors">Entradas</a></li>
            </ul>
          </div>

        <div>
            <h4 className="font-montserrat font-bold text-subsonic-muted text-xl  mb-6">
              Tienda
            </h4>
            <ul className="space-y-4 text-sm font-extralight text-subsonic-text">
              <li><a href="#" className="hover:text-subsonic-accent transition-colors">Ropa</a></li>
              <li><a href="#" className="hover:text-subsonic-accent transition-colors">Accesorios</a></li>
              <li><a href="#" className="hover:text-subsonic-accent transition-colors">Otros</a></li>
            </ul>
          </div>

        <div>
            <h4 className="font-montserrat font-bold text-subsonic-muted text-xl  mb-6">
              Blog
            </h4>
            <ul className="space-y-4 text-sm font-extralight text-subsonic-text">
              <li><a href="#" className="hover:text-subsonic-accent transition-colors">Noticias y <br />novedades</a></li>
              <li><a href="#" className="hover:text-subsonic-accent transition-colors">Articulos de <br/>artistas</a></li>
            </ul>
          </div>

        <div>
            <h4 className="font-montserrat font-bold text-subsonic-muted text-xl  mb-6">
              Contacto
            </h4>
            <ul className="space-y-4 text-sm font-extralight text-subsonic-text">
              <li><a href="#" className="hover:text-subsonic-accent transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-subsonic-accent transition-colors">Soporte</a></li>
              <li><a href="#" className="hover:text-subsonic-accent transition-colors">Trabaja con <br/>nosotros</a></li>
            </ul>
          </div>
        <div>
            <ul className="space-y-4 text-sm font-thin text-subsonic-text">
              <li><a href="#" className="hover:text-subsonic-accent transition-colors">X (Twitter)</a></li>
              <li><a href="#" className="hover:text-subsonic-accent transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-subsonic-accent transition-colors">YouTube</a></li>
              <li><a href="#" className="hover:text-subsonic-accent transition-colors">LinkedIn</a></li>
              <li><a href="#" className="hover:text-subsonic-accent transition-colors">SoundCloud</a></li>
            </ul>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;