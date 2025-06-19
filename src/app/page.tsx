"use client"

import { useState, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, X, MapPin, Clock, User, Home, Bookmark } from "lucide-react"
import Image from "next/image"
// Sample donation items with Unsplash images
const sampleItems = [
  {
    id: 1,
    title: "Chaqueta de Cuero Vintage",
    category: "Ropa",
    location: "Centro",
    timeAgo: "hace 2 horas",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=600&fit=crop",
    description: "Chaqueta de cuero vintage en perfecto estado",
  },
  {
    id: 2,
    title: "Mesa de Café de Madera",
    category: "Muebles",
    location: "Zona Río",
    timeAgo: "hace 4 horas",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=600&fit=crop",
    description: "Mesa de café de madera maciza, con pequeños rayones",
  },
  {
    id: 3,
    title: "Colección de Libros Infantiles",
    category: "Libros",
    location: "Playas de Tijuana",
    timeAgo: "hace 1 día",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop",
    description: "Colección de libros infantiles, edades 5-10",
  },
  {
    id: 4,
    title: "Electrodomésticos de Cocina",
    category: "Electrónicos",
    location: "Otay",
    timeAgo: "hace 6 horas",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=600&fit=crop",
    description: "Licuadora y tostador, en buen estado",
  },
  {
    id: 5,
    title: "Plantas en Maceta",
    category: "Jardín",
    location: "La Mesa",
    timeAgo: "hace 3 horas",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=600&fit=crop",
    description: "Varias plantas de interior con macetas",
  },
  {
    id: 6,
    title: "Equipo Deportivo",
    category: "Deportes",
    location: "Colonia Cacho",
    timeAgo: "hace 5 horas",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop",
    description: "Raquetas de tenis y balón de básquetbol",
  },
  {
    id: 7,
    title: "Materiales de Arte",
    category: "Artesanías",
    location: "Centro Cultural",
    timeAgo: "hace 8 horas",
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=600&fit=crop",
    description: "Pinturas, pinceles y lienzos",
  },
  {
    id: 8,
    title: "Abrigos de Invierno",
    category: "Ropa",
    location: "Centro",
    timeAgo: "hace 12 horas",
    image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=600&fit=crop",
    description: "Abrigos de invierno, varios tallas",
  },
  {
    id: 9,
    title: "Juegos de Mesa",
    category: "Juguetes",
    location: "Colonia Libertad",
    timeAgo: "hace 1 día",
    image: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400&h=600&fit=crop",
    description: "Colección de juegos de mesa clásicos",
  },
  {
    id: 10,
    title: "Bicicleta",
    category: "Transporte",
    location: "Parque Morelos",
    timeAgo: "hace 2 días",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=600&fit=crop",
    description: "Bicicleta de montaña, necesita reparaciones menores",
  },
  {
    id: 11,
    title: "Utensilios de Cocina",
    category: "Artículos de Cocina",
    location: "Colonia Postal",
    timeAgo: "hace 3 horas",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=600&fit=crop",
    description: "Juego completo de utensilios de cocina",
  },
  {
    id: 12,
    title: "Lámpara de Escritorio",
    category: "Muebles",
    location: "Zona Industrial",
    timeAgo: "hace 4 horas",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
    description: "Lámpara de escritorio moderna, ajustable",
  },
  {
    id: 13,
    title: "Mat de Yoga",
    category: "Fitness",
    location: "Colonia del Prado",
    timeAgo: "hace 6 horas",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=600&fit=crop",
    description: "Mat de yoga casi nuevo con funda",
  },
  {
    id: 14,
    title: "Marcos para Fotos",
    category: "Decoración",
    location: "Zona Centro",
    timeAgo: "hace 7 horas",
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=600&fit=crop",
    description: "Marcos para fotos de varios tamaños",
  },
  {
    id: 15,
    title: "Mochila",
    category: "Accesorios",
    location: "Colonia Independencia",
    timeAgo: "hace 9 horas",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=600&fit=crop",
    description: "Mochila para senderismo, excelente estado",
  },
  {
    id: 16,
    title: "Vajilla de Cerámica",
    category: "Artículos de Cocina",
    location: "Colonia Hipódromo",
    timeAgo: "hace 10 horas",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
    description: "Juego de platos y tazones de cerámica",
  },
  {
    id: 17,
    title: "Guitarra",
    category: "Música",
    location: "Colonia Altamira",
    timeAgo: "hace 1 día",
    image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&h=600&fit=crop",
    description: "Guitarra acústica con estuche",
  },
  {
    id: 18,
    title: "Silla de Oficina",
    category: "Muebles",
    location: "Zona Río",
    timeAgo: "hace 2 días",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=600&fit=crop",
    description: "Silla de oficina ergonómica, altura ajustable",
  },
  {
    id: 19,
    title: "Equipo de Camping",
    category: "Exterior",
    location: "Colonia Lomas del Porvenir",
    timeAgo: "hace 2 días",
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&h=600&fit=crop",
    description: "Tienda de campaña, saco de dormir y estufa de camping",
  },
  {
    id: 20,
    title: "Caja de Joyería",
    category: "Accesorios",
    location: "Colonia Chapultepec",
    timeAgo: "hace 3 días",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=600&fit=crop",
    description: "Caja de joyería vintage con espejo",
  },
]

export default function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [savedItems, setSavedItems] = useState<typeof sampleItems>([])
  const [activeTab, setActiveTab] = useState("home")
  const [swipeDirection, setSwipeDirection] = useState<null | "left" | "right">(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const [userItems] = useState([
    {
      id: 101,
      title: "My Donated Sofa",
      category: "Furniture",
      status: "Available",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
    },
    {
      id: 102,
      title: "My Old Laptop",
      category: "Electronics",
      status: "Claimed",
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop",
    },
  ])

  const currentItem = sampleItems[currentIndex]

  const handleSwipe = (direction: "left" | "right") => {
    setSwipeDirection(direction)
    setTimeout(() => {
      if (direction === "right" && currentItem) {
        setSavedItems((prev) => [...prev, currentItem])
      }
      if (currentIndex < sampleItems.length - 1) {
        setCurrentIndex((prev) => prev + 1)
      } else {
        setCurrentIndex(0)
      }
      setSwipeDirection(null)
    }, 350)
  }

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      Ropa: "bg-blue-100 text-blue-800",
      Muebles: "bg-green-100 text-green-800",
      Libros: "bg-purple-100 text-purple-800",
      Electrónicos: "bg-orange-100 text-orange-800",
      Jardín: "bg-emerald-100 text-emerald-800",
      Deportes: "bg-red-100 text-red-800",
      Artesanías: "bg-pink-100 text-pink-800",
      Juguetes: "bg-yellow-100 text-yellow-800",
      Transporte: "bg-indigo-100 text-indigo-800",
      "Artículos de Cocina": "bg-teal-100 text-teal-800",
      Fitness: "bg-lime-100 text-lime-800",
      Decoración: "bg-rose-100 text-rose-800",
      Accesorios: "bg-violet-100 text-violet-800",
      Música: "bg-cyan-100 text-cyan-800",
      Exterior: "bg-amber-100 text-amber-800",
    }
    return colors[category] || "bg-gray-100 text-gray-800"
  }

  if (activeTab === "saved") {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-md mx-auto bg-white min-h-screen">
          {/* Header */}
          <div className="p-4 border-b bg-white sticky top-0 z-10">
            <h1 className="text-xl font-bold text-center">Saved Items</h1>
          </div>

          {/* Saved Items List */}
          <div className="p-4 pb-20">
            {savedItems.length === 0 ? (
              <div className="text-center py-12">
                <Heart className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">No saved items yet</p>
                <p className="text-sm text-gray-400 mt-2">Swipe right on items you like!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {savedItems.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <div className="flex">
                      <div className="w-24 h-24 relative">
                        <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                      </div>
                      <CardContent className="flex-1 p-4">
                        <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                        <Badge className={`text-xs mb-2 ${getCategoryColor(item.category)}`}>{item.category}</Badge>
                        <div className="flex items-center text-xs text-gray-500 space-x-3">
                          <div className="flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {item.location}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {item.timeAgo}
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Bottom Navigation */}
          <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t">
            <div className="flex justify-around py-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveTab("home")}
                className="flex flex-col items-center p-3"
              >
                <Home className="w-5 h-5 mb-1" />
                <span className="text-xs">Home</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex flex-col items-center p-3 text-blue-600">
                <Bookmark className="w-5 h-5 mb-1" />
                <span className="text-xs">Saved</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveTab("profile")}
                className="flex flex-col items-center p-3"
              >
                <User className="w-5 h-5 mb-1" />
                <span className="text-xs">Profile</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (activeTab === "profile") {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-md mx-auto bg-white min-h-screen">
          {/* Header */}
          <div className="p-4 border-b bg-white sticky top-0 z-10">
            <h1 className="text-xl font-bold text-center">Profile</h1>
          </div>

          {/* Profile Info */}
          <div className="p-4">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">John Doe</h2>
                <p className="text-gray-500 text-sm">Eco-friendly donor</p>
                <p className="text-xs text-gray-400">Member since 2024</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-xl font-bold text-green-600">{userItems.length}</div>
                <div className="text-xs text-gray-500">Items Donated</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-xl font-bold text-blue-600">{savedItems.length}</div>
                <div className="text-xs text-gray-500">Items Saved</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-xl font-bold text-purple-600">15</div>
                <div className="text-xs text-gray-500">Impact Score</div>
              </div>
            </div>

            {/* My Donations */}
            <div className="mb-20">
              <h3 className="text-lg font-semibold mb-4">My Donations</h3>
              <div className="space-y-3">
                {userItems.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <div className="flex">
                      <div className="w-20 h-20 relative">
                        <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                      </div>
                      <CardContent className="flex-1 p-3">
                        <h4 className="font-medium text-sm mb-1">{item.title}</h4>
                        <Badge className={`text-xs mb-2 ${getCategoryColor(item.category)}`}>{item.category}</Badge>
                        <div className="flex justify-between items-center">
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              item.status === "Available" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {item.status}
                          </span>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Navigation */}
          <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t">
            <div className="flex justify-around py-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveTab("home")}
                className="flex flex-col items-center p-3"
              >
                <Home className="w-5 h-5 mb-1" />
                <span className="text-xs">Home</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveTab("saved")}
                className="flex flex-col items-center p-3"
              >
                <Bookmark className="w-5 h-5 mb-1" />
                <span className="text-xs">Saved</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex flex-col items-center p-3 text-blue-600">
                <User className="w-5 h-5 mb-1" />
                <span className="text-xs">Profile</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full max-w-md mx-auto bg-white min-h-screen flex flex-col justify-between">
        {/* Header */}
        <div className="p-4 border-b bg-white sticky top-0 z-10">
          <h1 className="text-xl font-bold text-center">EcoShare</h1>
          <p className="text-sm text-gray-500 text-center">Descubre artículos para reciclar y reutilizar</p>
        </div>

        {/* Card Stack tipo Tinder */}
        <div className="relative flex-1 flex flex-col items-center justify-center px-2 sm:px-0 overflow-x-hidden">
          <div className="relative w-full max-w-xs h-[70vh] flex items-center justify-center ">
            {sampleItems.slice(currentIndex, currentIndex + 3).reverse().map((item, idx) => {
              const isTop = idx === 0
              const z = 30 - idx
              const offset = idx * 8
              const scale = 1 - idx * 0.04
              return (
                <div
                  key={item.id}
                  ref={isTop ? cardRef : undefined}
                  className={`absolute left-0 top-0 w-full h-full transition-all duration-300 ease-in-out rounded-2xl shadow-xl bg-white overflow-hidden
                    ${isTop ? "-translate-x-[120vw] rotate-[-15deg] opacity-0" : ""}
                    ${!isTop ? `translate-y-[${offset}px] scale-[${scale}] z-${z}` : `z-50`}
                  `}
                  style={{
                    zIndex: z,
                    transform: !isTop ? `translateY(${offset}px) scale(${scale})` : undefined,
                  }}
                >
                  <div className="relative h-3/5 w-full">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                    <Badge className={`absolute top-3 left-3 ${getCategoryColor(item.category)}`}>{item.category}</Badge>
                  </div>
                  <CardContent className="p-4 h-1/5 flex flex-col justify-between">
                    <div>
                      <h2 className="text-lg font-bold mb-2">{item.title}</h2>
                      <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="w-4 h-4 mr-2" />
                        {item.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="w-4 h-4 mr-2" />
                        {item.timeAgo}
                      </div>
                    </div>
                  </CardContent>
                  {/* Feedback visual de swipe */}
                  {isTop && swipeDirection === "left" && (
                    <div className="absolute top-10 left-6 text-3xl font-bold text-red-500 rotate-[-15deg] opacity-80 pointer-events-none select-none">NO</div>
                  )}
                  {isTop && swipeDirection === "right" && (
                    <div className="absolute top-10 right-6 text-3xl font-bold text-green-500 rotate-[15deg] opacity-80 pointer-events-none select-none">ME GUSTA</div>
                  )}
                </div>
              )
            })}
          </div>
          {/* Si no hay más tarjetas */}
          {!currentItem && (
            <div className="text-center py-12">
              <p className="text-gray-500">¡No hay más artículos para mostrar!</p>
              <Button onClick={() => setCurrentIndex(0)} className="mt-4" variant="outline">
                Empezar de nuevo
              </Button>
            </div>
          )}
        </div>

        {/* Botones de acción grandes y flotantes */}
        {currentItem && (
          <div className="flex justify-center space-x-16 pb-8 fixed left-1/2 -translate-x-1/2 bottom-24 z-50 w-full max-w-xs">
            <Button
              size="lg"
              variant="outline"
              className="w-16 h-16 rounded-full border-2 border-red-200 hover:bg-red-50 shadow-lg"
              onClick={() => handleSwipe("left")}
              aria-label="No me gusta"
            >
              <X className="w-8 h-8 text-red-500" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-16 h-16 rounded-full border-2 border-green-200 hover:bg-green-50 shadow-lg"
              onClick={() => handleSwipe("right")}
              aria-label="Me gusta"
            >
              <Heart className="w-8 h-8 text-green-500" />
            </Button>
          </div>
        )}

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t z-40">
          <div className="flex justify-around py-2">
            <Button variant="ghost" size="sm" className="flex flex-col items-center p-3 text-blue-600">
              <Home className="w-5 h-5 mb-1" />
              <span className="text-xs">Inicio</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveTab("saved")}
              className="flex flex-col items-center p-3 relative"
            >
              <Bookmark className="w-5 h-5 mb-1" />
              <span className="text-xs">Guardados</span>
              {savedItems.length > 0 && (
                <Badge className="absolute -top-1 -right-1 w-5 h-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-500">
                  {savedItems.length}
                </Badge>
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveTab("profile")}
              className="flex flex-col items-center p-3"
            >
              <User className="w-5 h-5 mb-1" />
              <span className="text-xs">Perfil</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
