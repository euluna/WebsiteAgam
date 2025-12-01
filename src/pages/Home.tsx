import React, { useState } from 'react'
import menuData from '../data/menu.json'
import { ItemCard } from '../components/ItemCard'
import { CategoryChips } from '../components/CategoryChips'
import Header from '../components/Header'
import { ItemModal } from '../components/ItemModal'

export const Home: React.FC = () => {
  const categories = (menuData as any).categories
  const defaultCategory = categories[0]?.id || ''
  const [selectedCategory, setSelectedCategory] = useState<string>(defaultCategory)
  const [modalItem, setModalItem] = useState<any | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)

  const currentCategory = categories.find((c: any) => c.id === selectedCategory)
  const items = currentCategory ? currentCategory.items : []

  return (
    <div className="min-h-screen flex flex-col">
      <Header onToggleCategories={() => setSidebarOpen(v => !v)} onBack={modalItem ? (() => setModalItem(null)) : undefined} />

      <main className="flex-1 p-4">
        <div className="max-w-6xl mx-auto flex gap-4">
          {/* Desktop Sidebar: sticky/anchored left */}
          <div className="hidden md:block w-64 sticky top-20 self-start h-[calc(100vh-5rem)] overflow-auto">
            <CategoryChips categories={categories} selected={selectedCategory} onSelect={setSelectedCategory} />
          </div>

          {/* Mobile floating toggle button (anchored left) */}
          <div className="md:hidden">
            {/* Slide-in left panel when open */}
            <div aria-hidden={!sidebarOpen} className={`fixed inset-y-0 left-0 z-50 w-72 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-200 bg-white border-r p-2 overflow-auto`}> 
              <div className="relative">
                <div className="pt-4 pr-12">
                  <CategoryChips categories={categories} selected={selectedCategory} onSelect={(id) => { setSelectedCategory(id); setSidebarOpen(false) }} compact />
                </div>

                {/* Semicircle collapse button inside panel to avoid horizontal scroll */}
                <button
                  aria-label="Sembunyikan kategori"
                  onClick={() => setSidebarOpen(false)}
                  className="absolute top-1/2 right-0 transform -translate-y-1/2 w-10 h-12 rounded-l-full bg-white text-primary flex items-center justify-center shadow-md hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-accent">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 111.414 1.414L10.414 10l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Overlay to close panel */}
            {sidebarOpen && <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 z-40 bg-black/30" />}
          </div>

          {/* Content area */}
          <div className="flex-1">
            <h1 className="text-lg font-bold mb-2">klik item untuk menambahkan ke keranjang.</h1>
            <div className="mt-4">
              <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-3">
                {items.map((item: any) => (
                  <ItemCard key={item.id} item={item} onSelect={() => setModalItem(item)} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <ItemModal item={modalItem} onClose={() => setModalItem(null)} />
    </div>
  )
}

export default Home
