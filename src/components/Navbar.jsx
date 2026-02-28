import React from "react";
import logo from "../assets/logo/Subsonic-long.webp";

const Navbar = () => {
  const isLoggedIn = false;   // Cambiar cuando tengamos back
  const username = "Usuario"; // Cambiar cuando tengamos back

  return (
    <nav className='bg-subsonic-navfooter border-b border-subsonic-border px-6 py-4 flex items-center justify-between font-inter'>
      <img src={logo} alt="Logo" className="w-40 h-auto object-contain hover:opacity-50 transition-opacity cursor-pointer" />
      <div className="flex gap-24 text-subsonic-text font-bold">
        <a href="#" className="hover:text-subsonic-btn transition">Inicio</a>
        <a href="#" className="hover:text-subsonic-btn transition">Tienda</a>
        <a href="#" className="hover:text-subsonic-btn transition">Blog</a>
        <a href="#" className="hover:text-subsonic-btn transition">Contacto</a>
      </div>
      <div className="flex gap-6 items-center">
        {isLoggedIn ? (
          <div className="flex items-center gap-3">
            <span className="text-subsonic-text"> Hola, {username}</span>
            <div className="w-10 h-10 rounded-full bg-subsonic-accent"></div> {/* Avatar */}
          </div>
        ) : (
          <>
            <button className="text-subsonic-text font-bold uppercase text-sm hover:text-subsonic-btn transition">Log In</button>
            <button className="bg-subsonic-accent text-subsonic-bg font-black px-6 py-2 rounded-full uppercase text-sm hover:bg-subsonic-text transition">
              Registro
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;