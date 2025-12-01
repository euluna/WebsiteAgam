import React, { useState } from 'react'
import menuData from '../data/menu.json'
import { ItemCard } from '../components/ItemCard'
import { CategoryChips } from '../components/CategoryChips'
import Header from '../components/Header'
import { ItemModal } from '../components/ItemModal'

export const Home: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('noodles')
  const [modalItem, setModalItem] = useState<any | null>(null)

  const categories = (menuData as any).categories
  const currentCategory = categories.find((c: any) => c.id === selectedCategory)
  const items = currentCategory ? currentCategory.items : []

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="p-4 flex-1 max-w-2xl mx-auto w-full">
        <h1 className="text-lg font-bold mb-2">Browse our menu — tap items to add.</h1>
        <CategoryChips categories={categories} selected={selectedCategory} onSelect={setSelectedCategory} />
        <div className="mt-4 space-y-3">
          {items.map((item: any) => (
            <ItemCard key={item.id} item={item} onSelect={() => setModalItem(item)} />
          ))}
        </div>
      </main>
      <ItemModal item={modalItem} onClose={() => setModalItem(null)} />
    </div>
  )
}

export default Home
