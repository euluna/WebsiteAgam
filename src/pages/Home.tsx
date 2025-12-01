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
      <Header />

      <main className="flex-1 p-4">
        <div className="max-w-6xl mx-auto flex gap-4">
          {/* Desktop Sidebar: sticky/anchored left */}
          <div className="hidden md:block w-64 sticky top-20 self-start h-[calc(100vh-5rem)] overflow-auto">
            <CategoryChips categories={categories} selected={selectedCategory} onSelect={setSelectedCategory} />
          </div>

          {/* Mobile floating toggle button (anchored left) */}
          <div className="md:hidden">
            <button
              aria-label="Toggle categories"
              onClick={() => setSidebarOpen(v => !v)}
              className="fixed left-3 top-1/3 z-50 w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Slide-in left panel when open */}
            <div aria-hidden={!sidebarOpen} className={`fixed inset-y-0 left-0 z-50 w-64 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-200 bg-white border-r p-2 overflow-auto`}> 
              <CategoryChips categories={categories} selected={selectedCategory} onSelect={(id) => { setSelectedCategory(id); setSidebarOpen(false) }} />
            </div>

            {/* Overlay to close panel */}
            {sidebarOpen && <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 z-40 bg-black/30" />}
          </div>

          {/* Content area */}
          <div className="flex-1">
            <h1 className="text-lg font-bold mb-2">klik item untuk menambahkan ke keranjang.</h1>
            <div className="mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
