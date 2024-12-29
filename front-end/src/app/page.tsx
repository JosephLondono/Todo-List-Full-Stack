"use client";
import { PlusCircle, CheckCircle2, ListTodo } from "lucide-react";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col bg-sofka-light min-h-[83vh] relative">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-4 py-16 text-center space-y-8">
        <div className="flex items-center space-x-2">
          <ListTodo className="w-12 h-12 text-sofka-orange" />
          <h1 className="text-4xl font-bold text-gray-900">TaskMaster</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-2xl">
          Organiza tu día, alcanza tus metas y aumenta tu productividad con
          nuestra intuitiva aplicación de gestión de tareas.
        </p>
        <button
          className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg flex items-center gap-2 font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
          onClick={() => (window.location.href = "/auth")}
        >
          <PlusCircle className="w-5 h-5" />
          <span>Comenzar Ahora</span>
        </button>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8 px-8 py-16 bg-white/50">
        <div className="flex flex-col items-center text-center space-y-4 p-6">
          <div className="bg-sofka-orange/20 p-3 rounded-full">
            <CheckCircle2 className="w-8 h-8 text-sofka-orange" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">Fácil de Usar</h3>
          <p className="text-gray-600">
            Interfaz intuitiva que te permite agregar y gestionar tareas sin
            complicaciones.
          </p>
        </div>
        <div className="flex flex-col items-center text-center space-y-4 p-6">
          <div className="bg-sofka-orange/20 p-3 rounded-full">
            <ListTodo className="w-8 h-8 text-sofka-orange" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">Organización</h3>
          <p className="text-gray-600">
            Categoriza y prioriza tus tareas para mantener todo en orden.
          </p>
        </div>
        <div className="flex flex-col items-center text-center space-y-4 p-6">
          <div className="bg-sofka-orange/20 p-3 rounded-full">
            <PlusCircle className="w-8 h-8 text-sofka-orange" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">
            Personalización
          </h3>
          <p className="text-gray-600">
            Adapta la aplicación a tus necesidades con opciones de
            personalización.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 text-white py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold">
            ¿Listo para ser más productivo?
          </h2>
          <p className="text-lg text-gray-300">
            Únete a miles de usuarios que ya han mejorado su organización
            diaria.
          </p>
          <button
            className="bg-sofka-orange hover:bg-sofka-orange/90 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
            onClick={() => (window.location.href = "/auth")}
          >
            Comenzar Gratis
          </button>
        </div>
      </section>
    </main>
  );
}
