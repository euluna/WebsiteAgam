import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { MenuItem, Variant } from '../types'
import { formatCurrency } from '../lib/currency'
import { useCart } from '../contexts/CartContext'

interface Props { item: MenuItem | null; onClose: () => void }

export const ItemModal: React.FC<Props> = ({ item, onClose }) => {
  const { addItem } = useCart()
  const { register, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm<{ quantity: number; variantId?: string; notes?: string }>({ defaultValues: { quantity: 1 } })
  const quantity = watch('quantity') || 1
  const watchedVariantId = watch('variantId')

  useEffect(() => {
    // Explicitly set form values whenever a new item is opened so previous quantity/notes don't carry over
    if (!item) {
      setValue('quantity', 1)
      setValue('variantId', undefined)
      setValue('notes', '')
      return
    }
    const defaultVariant = item.variants.length === 1 ? item.variants[0].id : undefined
    setValue('quantity', 1)
    setValue('variantId', defaultVariant)
    setValue('notes', '')
  }, [item, setValue])

  if (!item) return null

  const onSubmit = (data: any) => {
    const variant = item.variants.find(v => v.id === data.variantId) as Variant
    if (!variant) return
    addItem(item.id, variant, Number(data.quantity || 1), data.notes)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-auto p-4">
      <div className="max-w-2xl mx-auto pb-28">
        <div className="flex items-center gap-3 mb-2">
          <button aria-label="Kembali" onClick={onClose} className="w-10 h-10 rounded-sm bg-primary text-white flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 16.293a1 1 0 010-1.414L8.414 11H17a1 1 0 110 2H8.414l3.879 3.879a1 1 0 01-1.414 1.414l-5.586-5.586a1 1 0 010-1.414l5.586-5.586a1 1 0 111.414 1.414L8.414 11H17a1 1 0 110 2H8.414l3.879 3.879a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
          </button>
          <div>
            <h2 className="text-2xl font-bold">{item.name}</h2>
            <p className="text-gray-600">{item.description}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
          <fieldset>
            <legend className="font-semibold mb-2">Varian</legend>
            {item.variants.map(v => (
              <label key={v.id} className="flex items-center justify-between p-2 border rounded mb-2">
                <div>
                  <input type="radio" value={v.id} {...register('variantId', { required: true })} defaultChecked={item.variants.length === 1} /> <span className="ml-2">{v.label}</span>
                </div>
                <div className="font-medium">{formatCurrency(v.price)}</div>
              </label>
            ))}
            {errors.variantId && <div className="text-red-500 text-sm">Silakan pilih varian</div>}
          </fieldset>

          <label className="block mt-3">Jumlah
            <div className="flex items-center gap-3 mt-1">
              <button type="button" onClick={() => setValue('quantity', Math.max(1, (Number(quantity) || 1) - 1))} className="w-10 h-10 bg-gray-100 rounded text-lg">-</button>
              <div className="w-12 text-center text-base">{quantity}</div>
              <button type="button" onClick={() => setValue('quantity', (Number(quantity) || 1) + 1)} className="w-10 h-10 bg-gray-100 rounded text-lg">+</button>
            </div>
            <input type="hidden" {...register('quantity', { valueAsNumber: true })} />
          </label>

          <label className="block mt-3">Catatan
            <textarea {...register('notes')} className="w-full p-2 border rounded mt-1" rows={2} />
          </label>

          <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
            <button type="submit" className="w-full bg-primary text-white p-3 rounded font-bold">
              Tambah ({formatCurrency(((item.variants.find(v => v.id === watchedVariantId) || item.variants[0])?.price || 0) * quantity)})
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ItemModal
