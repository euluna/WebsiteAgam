import React from 'react'
import { useForm } from 'react-hook-form'
import { MenuItem, Variant } from '../types'
import { formatCurrency } from '../lib/currency'
import { useCart } from '../contexts/CartContext'

interface Props { item: MenuItem | null; onClose: () => void }

export const ItemModal: React.FC<Props> = ({ item, onClose }) => {
  const { addItem } = useCart()
  const { register, handleSubmit, watch, formState: { errors } } = useForm({ defaultValues: { quantity: 1 } })
  const quantity = watch('quantity') || 1

  if (!item) return null

  const onSubmit = (data: any) => {
    const variant = item.variants.find(v => v.id === data.variantId) as Variant
    if (!variant) return
    addItem(item.id, variant, Number(data.quantity || 1), data.notes)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-auto p-4">
      <div className="max-w-2xl mx-auto">
        <button onClick={onClose} className="text-sm text-gray-600 mb-2">Tutup</button>
        <h2 className="text-2xl font-bold">{item.name}</h2>
        <p className="text-gray-600">{item.description}</p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
          <fieldset>
            <legend className="font-semibold mb-2">Varian</legend>
            {item.variants.map(v => (
              <label key={v.id} className="flex items-center justify-between p-2 border rounded mb-2">
                <div>
                  <input type="radio" value={v.id} {...register('variantId', { required: true })} /> <span className="ml-2">{v.label}</span>
                </div>
                <div className="font-medium">{formatCurrency(v.price)}</div>
              </label>
            ))}
            {errors.variantId && <div className="text-red-500 text-sm">Silakan pilih varian</div>}
          </fieldset>

          <label className="block mt-3">Jumlah
            <input type="number" min={1} defaultValue={1} {...register('quantity', { valueAsNumber: true })} className="w-full p-2 border rounded mt-1" />
          </label>

          <label className="block mt-3">Catatan
            <textarea {...register('notes')} className="w-full p-2 border rounded mt-1" rows={2} />
          </label>

          <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
            <button type="submit" className="w-full bg-orange-500 text-white p-3 rounded font-bold">Tambah ({formatCurrency((item.variants[0]?.price || 0) * quantity)})</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ItemModal
