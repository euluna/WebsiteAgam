import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import { CheckoutData } from '../types'
import { formatCurrency } from '../lib/currency'

export const Checkout: React.FC = () => {
  const navigate = useNavigate()
  const { cart, summary, saveUserDetails, savedDetails } = useCart()
  const { register, handleSubmit, watch, formState: { errors } } = useForm<CheckoutData>({ defaultValues: { ...savedDetails, paymentMethod: 'Cash' } })

  const paymentMethod = watch('paymentMethod')
  const needChange = watch('needChange')

  const validateChange = (value: any) => {
    if (!needChange) return true
    if (!value || isNaN(Number(value))) return 'Please enter a valid amount.'
    if (Number(value) < summary.total) return `Must be at least ${formatCurrency(summary.total)}`
    return true
  }

  const onSubmit = (data: CheckoutData) => {
    if ((data as any).saveDetails) saveUserDetails(data)
    sessionStorage.setItem('finalCheckoutData', JSON.stringify(data))
    navigate('/message')
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <div className="mb-4 p-3 bg-gray-100 rounded-lg">
        <h3 className="font-semibold">Order Total: {formatCurrency(summary.total)}</h3>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register('name', { required: 'Name is required' })} placeholder="Name" className="w-full p-3 border rounded" />
        {errors.name && <div className="text-red-500 text-sm">{errors.name.message}</div>}

        <input {...register('phone', { required: 'Phone is required', pattern: { value: /^\+?\d{8,}$/, message: 'Invalid phone' } })} placeholder="Phone" className="w-full p-3 border rounded" />
        {errors.phone && <div className="text-red-500 text-sm">{errors.phone.message}</div>}

        <input {...register('address', { required: 'Address is required' })} placeholder="Address" className="w-full p-3 border rounded" />
        {errors.address && <div className="text-red-500 text-sm">{errors.address.message}</div>}

        <fieldset>
          <legend className="font-semibold mb-2">Payment Method</legend>
          <label className="mr-4"><input type="radio" value="Cash" {...register('paymentMethod')} defaultChecked /> Cash</label>
          <label><input type="radio" value="Transfer" {...register('paymentMethod')} /> Transfer</label>
        </fieldset>

        {paymentMethod === 'Cash' && (
          <div>
            <label className="flex items-center"><input type="checkbox" {...register('needChange' as any)} className="mr-2" /> Need change?</label>
            {needChange && (
              <input {...register('changeAmount' as any, { validate: validateChange })} placeholder={`Change for at least ${formatCurrency(summary.total)}`} className="w-full p-3 border rounded mt-2" />
            )}
          </div>
        )}

        <textarea {...register('notes')} placeholder="Notes (private)" rows={2} className="w-full p-3 border rounded" />

        <label className="flex items-center"><input type="checkbox" {...register('saveDetails' as any)} className="mr-2" /> Save my details</label>

        <button type="submit" className="w-full bg-orange-500 text-white p-3 rounded font-bold">Generate Message</button>
      </form>
    </div>
  )
}

export default Checkout
