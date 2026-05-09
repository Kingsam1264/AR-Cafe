import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState, useEffect, useRef } from "react";
import { Eye, ShoppingCart } from "lucide-react";

interface MenuItem {
  id: number;
  name: string;
  category: string;
  price: string;
  description: string;
  glb: string;
  image: string;
}

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: "Classic Burger",
    category: "Main Course",
    price: "$12.99",
    description: "Juicy beef patty with fresh lettuce, tomato, and special sauce. Experience the perfect burger in AR.",
    glb: "https://cdn.jsdelivr.net/gh/KhronosGroup/glTF-Sample-Assets@main/Models/Avocado/glTF-Binary/Avocado.glb",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=400&fit=crop",
  },
  {
    id: 2,
    name: "Pepperoni Pizza",
    category: "Italian",
    price: "$14.99",
    description: "Crispy crust with mozzarella and fresh pepperoni. View it in 3D before you order.",
    glb: "https://cdn.jsdelivr.net/gh/KhronosGroup/glTF-Sample-Assets@main/Models/BarramundiFish/glTF-Binary/BarramundiFish.glb",
    image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&h=400&fit=crop",
  },
  {
    id: 3,
    name: "Chocolate Cake",
    category: "Dessert",
    price: "$6.99",
    description: "Rich, decadent chocolate cake with creamy frosting. Check the layers in AR.",
    glb: "https://cdn.jsdelivr.net/gh/KhronosGroup/glTF-Sample-Assets@main/Models/WaterBottle/glTF-Binary/WaterBottle.glb",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop",
  },
  {
    id: 4,
    name: "Cappuccino",
    category: "Beverages",
    price: "$4.50",
    description: "Smooth espresso with velvety steamed milk. Preview your perfect cup.",
    glb: "https://cdn.jsdelivr.net/gh/KhronosGroup/glTF-Sample-Assets@main/Models/AntiqueCamera/glTF-Binary/AntiqueCamera.glb",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=400&fit=crop",
  },
  {
    id: 5,
    name: "Caesar Salad",
    category: "Healthy",
    price: "$9.99",
    description: "Crisp romaine with parmesan and homemade dressing. View the freshness in 3D.",
    glb: "https://cdn.jsdelivr.net/gh/KhronosGroup/glTF-Sample-Assets@main/Models/BoomBox/glTF-Binary/BoomBox.glb",
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=400&fit=crop",
  },
  {
    id: 6,
    name: "Grilled Salmon",
    category: "Seafood",
    price: "$18.99",
    description: "Fresh Atlantic salmon with lemon butter. Experience the premium quality in AR.",
    glb: "https://cdn.jsdelivr.net/gh/KhronosGroup/glTF-Sample-Assets@main/Models/CesiumMan/glTF-Binary/CesiumMan.glb",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop",
  },
  {
    id: 7,
    name: "Strawberry Cheesecake",
    category: "Dessert",
    price: "$7.99",
    description: "Creamy cheesecake with fresh strawberry topping. Check the layers in AR.",
    glb: "https://cdn.jsdelivr.net/gh/KhronosGroup/glTF-Sample-Assets@main/Models/FlightHelmet/glTF-Binary/FlightHelmet.glb",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop",
  },
  {
    id: 8,
    name: "Spicy Ramen",
    category: "Asian",
    price: "$11.99",
    description: "Authentic Japanese ramen with spicy broth and fresh toppings. Preview in 3D.",
    glb: "https://cdn.jsdelivr.net/gh/KhronosGroup/glTF-Sample-Assets@main/Models/DamagedHelmet/glTF-Binary/DamagedHelmet.glb",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=400&fit=crop",
  },
];

// Declare model-viewer as a custom element
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & any, HTMLElement>;
    }
  }
}

import React from 'react';

export default function Home() {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [arSupported, setArSupported] = useState(false);
  const modelViewerRef = useRef<any>(null);

  useEffect(() => {
    // Load model-viewer script
    const script = document.createElement("script");
    script.type = "module";
    script.src = "https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js";
    document.head.appendChild(script);

    // Check AR support
    const checkARSupport = () => {
      const isWebXRSupported = (navigator as any).xr !== undefined;
      const isIOSQuickLookSupported = /iPhone|iPad|iPod/.test(navigator.userAgent);
      const isSceneViewerSupported = /Android/.test(navigator.userAgent);
      setArSupported(isWebXRSupported || isIOSQuickLookSupported || isSceneViewerSupported);
    };

    checkARSupport();

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handleARClick = () => {
    if (modelViewerRef.current) {
      // Trigger AR view
      if (modelViewerRef.current.activateAR) {
        modelViewerRef.current.activateAR();
      } else if (modelViewerRef.current.querySelector('[slot="ar-button"]')) {
        // Fallback: click the AR button slot
        modelViewerRef.current.querySelector('[slot="ar-button"]').click();
      }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black">
                <Eye className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight">AR Cafe</h1>
            </div>
            <nav className="hidden gap-8 md:flex">
              <a href="#" className="text-sm font-medium hover:text-gray-600">
                Menu
              </a>
              <a href="#" className="text-sm font-medium hover:text-gray-600">
                About
              </a>
              <a href="#" className="text-sm font-medium hover:text-gray-600">
                Contact
              </a>
            </nav>
            <Button className="bg-black text-white hover:bg-gray-900">
              Book Table
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="border-b border-gray-200 bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-5xl font-bold tracking-tight md:text-6xl">
            The Future of Dining
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Preview your meal in Augmented Reality before you order. Experience food in your space.
          </p>
        </div>
      </section>

      {/* Menu Grid */}
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-xl border border-gray-200 bg-white transition-all hover:border-black hover:shadow-lg"
            >
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute right-3 top-3">
                  <span className="inline-block rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-bold uppercase">
                    {item.category}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <div className="mb-2 flex items-start justify-between">
                  <h3 className="font-bold text-lg">{item.name}</h3>
                  <span className="font-bold text-lg">{item.price}</span>
                </div>
                <p className="mb-4 line-clamp-2 text-sm text-gray-600">
                  {item.description}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedItem(item)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-black py-2 font-semibold text-white transition-colors hover:bg-gray-900"
                  >
                    <Eye className="h-4 w-4" />
                    View in AR
                  </button>
                  <button className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white py-2 font-semibold transition-colors hover:bg-gray-50">
                    <ShoppingCart className="h-4 w-4" />
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* AR Modal */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-2xl border-0 bg-white p-0">
          {selectedItem && (
            <div className="overflow-hidden rounded-2xl">
              {/* Model Viewer */}
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 relative">
                {/* @ts-ignore */}
                <model-viewer
                  ref={modelViewerRef}
                  src={selectedItem.glb}
                  ios-src={selectedItem.glb}
                  ar
                  ar-modes="webxr scene-viewer quick-look"
                  camera-controls
                  shadow-intensity="1"
                  auto-rotate
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <button
                    slot="ar-button"
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-lg bg-black px-6 py-3 font-semibold text-white shadow-lg hover:bg-gray-900 transition-colors"
                  >
                    <Eye className="h-5 w-5" />
                    View in Your Room
                  </button>
                </model-viewer>
              </div>

              {/* Item Details */}
              <div className="border-t border-gray-200 p-8">
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <h2 className="text-3xl font-bold">{selectedItem.name}</h2>
                    <p className="mt-1 text-xs font-bold uppercase text-gray-500">
                      {selectedItem.category}
                    </p>
                  </div>
                  <span className="text-3xl font-bold">{selectedItem.price}</span>
                </div>
                <p className="mb-8 leading-relaxed text-gray-600">
                  {selectedItem.description}
                </p>

                <div className="space-y-3">
                  <button
                    onClick={handleARClick}
                    disabled={!arSupported}
                    className="w-full rounded-lg bg-black py-3 font-semibold text-white transition-colors hover:bg-gray-900 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <Eye className="h-5 w-5" />
                    {arSupported ? "View in Your Room" : "AR Not Supported"}
                  </button>
                  <button className="w-full rounded-lg border border-gray-200 bg-white py-3 font-semibold transition-colors hover:bg-gray-50 flex items-center justify-center gap-2">
                    <ShoppingCart className="h-5 w-5" />
                    Add to Order
                  </button>
                </div>

                {!arSupported && (
                  <div className="mt-4 rounded-lg bg-gray-100 p-3 text-sm text-gray-600">
                    <p>
                      <strong>Note:</strong> AR is not supported on your device. You can still view the 3D model.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50 py-12">
        <div className="mx-auto max-w-7xl px-4 text-center text-sm text-gray-600 sm:px-6 lg:px-8">
          <p>&copy; 2026 Digital AR Cafe. Powered by Google &lt;model-viewer&gt;</p>
        </div>
      </footer>
    </div>
  );
}
