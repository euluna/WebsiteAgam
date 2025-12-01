import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import { CheckoutData } from '../types'
import menuData from '../data/menu.json'
import Header from '../components/Header'
import { formatCurrency } from '../lib/currency'

export const Checkout: React.FC = () => {
  const navigate = useNavigate()
  const { cart, summary, savedDetails } = useCart()
  const storeDefaultCurrency = 'THB'
  const { register, handleSubmit, watch, formState: { errors } } = useForm<CheckoutData>({ defaultValues: { ...savedDetails, paymentMethod: 'Cash', currency: savedDetails?.currency || storeDefaultCurrency } })

  const currency = watch('currency') || storeDefaultCurrency
  let paymentMethod = watch('paymentMethod')
  const hasExactChange = watch('hasExactChange')

  // If store is THB or user selected THB, force payment method to Cash
  if (currency === 'THB' && paymentMethod === 'Transfer') {
    paymentMethod = 'Cash'
  }

  const validateCashPaid = (value: any) => {
    if (paymentMethod !== 'Cash') return true
    if (hasExactChange) return true
    if (!value || isNaN(Number(value))) return 'Masukkan jumlah uang tunai yang valid.'
    if (Number(value) < summary.subtotal) return `Jumlah harus setidaknya ${formatCurrency(summary.subtotal, currency)}`
    return true
  }

  const onSubmit = (data: CheckoutData) => {
    // Store the chosen currency; staff will confirm IDR conversions if selected
    sessionStorage.setItem('finalCheckoutData', JSON.stringify(data))
    navigate('/message')
  }

  return (
    <div>
      <Header onBack={() => navigate(-1)} />
      <div className="p-4 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Pembayaran</h1>
        <div className="mb-4 p-3 bg-gray-100 rounded-lg">
            <h3 className="font-semibold">Total Pesanan: {formatCurrency(summary.subtotal, currency)}</h3>
          </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register('name', { required: 'Nama dibutuhkan' })} placeholder="Nama" className="w-full p-3 border rounded" />
        {errors.name && <div className="text-red-500 text-sm">{errors.name.message}</div>}

        <input {...register('phone', { required: 'Telepon dibutuhkan', pattern: { value: /^\+?\d{8,}$/, message: 'Telepon tidak valid' } })} placeholder="Telepon" className="w-full p-3 border rounded" />
        {errors.phone && <div className="text-red-500 text-sm">{errors.phone.message}</div>}

        <input {...register('address', { required: 'Alamat dibutuhkan' })} placeholder="Alamat" className="w-full p-3 border rounded" />
        {errors.address && <div className="text-red-500 text-sm">{errors.address.message}</div>}

        <fieldset>
          <legend className="font-semibold mb-2">Mata Uang & Metode</legend>
          <div className="mb-2">
            <label className="mr-4"><input type="radio" value="THB" {...register('currency')} defaultChecked={currency === 'THB'} /> Baht (THB)</label>
            <label><input type="radio" value="IDR" {...register('currency')} defaultChecked={currency === 'IDR'} /> IDR</label>
          </div>

          <div>
            <label className="mr-4"><input type="radio" value="Cash" {...register('paymentMethod')} defaultChecked /> Tunai</label>
            {currency === 'IDR' && <label><input type="radio" value="Transfer" {...register('paymentMethod')} /> Transfer</label>}
          </div>
          {currency === 'IDR' && (
            <p className="text-sm text-gray-600 mt-2">Staff akan mengonfirmasi kurs dan menunjukkan harga akhir dalam IDR sebelum pembayaran.</p>
          )}
        </fieldset>
        {paymentMethod === 'Cash' && currency === 'THB' && (
          <div>
            <label className="flex items-center"><input type="checkbox" {...register('hasExactChange' as any)} className="mr-2" /> Uang pas?</label>
            {!hasExactChange && (
              <input {...register('cashPaid' as any, { validate: validateCashPaid })} placeholder={`Jumlah tunai (untuk kembalian) — minimal ${formatCurrency(summary.subtotal, currency)}`} className="w-full p-3 border rounded mt-2" />
            )}
            {errors.cashPaid && <div className="text-red-500 text-sm">{(errors.cashPaid as any).message}</div>}
          </div>
        )}

        <textarea {...register('notes')} placeholder="Catatan (pribadi)" rows={2} className="w-full p-3 border rounded" />

        <button type="submit" className="w-full bg-orange-500 text-white p-3 rounded font-bold">Buat Pesan</button>
      </form>
      </div>
    </div>
  )
}

export default Checkout
