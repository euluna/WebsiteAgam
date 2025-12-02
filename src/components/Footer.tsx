import React from 'react'
import menuData from '../data/menu.json'

const Footer: React.FC = () => {
  const s = (menuData as any).store || {}
  const mapUrl = s.mapUrl || ''
  const wa1 = s.whatsapp1 || ''
  const wa2 = s.whatsapp2 || ''
  const tg = s.telegram || ''
  const waHref = wa1 ? `https://wa.me/${wa1.replace(/[^0-9]/g, '')}` : undefined
  const waHref2 = wa2 ? `https://wa.me/${wa2.replace(/[^0-9]/g, '')}` : undefined
  const tgHref = tg ? `https://t.me/${tg.replace(/^@/, '')}` : undefined

  return (
    <footer className="bg-primary text-white p-4 mt-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          {waHref && (
            <a href={waHref} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-3 py-2 rounded bg-[#25D366] hover:opacity-90 text-white">
              <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="h-5 w-5 object-contain" />
              <span className="hidden sm:inline">WhatsApp 1 [ {wa1} ]</span>
            </a>
          )}

          {waHref2 && (
            <a href={waHref2} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-3 py-2 rounded bg-[#128C7E] hover:opacity-90 text-white">
              <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="h-5 w-5 object-contain" />
              <span className="hidden sm:inline">WhatsApp 2 [ {wa2} ]</span>
            </a>
          )}

          {tgHref && (
            <a href={tgHref} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-3 py-2 rounded bg-[#0088cc] hover:opacity-90 text-white">
              <img src="https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg" alt="Telegram" className="h-5 w-5 object-contain" />
              <span className="hidden sm:inline">Telegram [ @{tg.replace(/^@/, '')} ]</span>
            </a>
          )}
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-3 text-center text-xs text-white/70">© {(new Date()).getFullYear()} {(menuData as any).store?.name || ''}</div>
    </footer>
  )
}

export default Footer
