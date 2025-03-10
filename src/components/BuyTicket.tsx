'use client'

import { useState } from 'react'

const BuyTicket = () => {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <button
        className="bg-none text-4xl border-4 p-4 cursor-pointer hover:bg-green-300/30 transition-all duration-200 pointer-events-auto"
        onClick={() => setVisible(true)}
      >
        Купить билет
      </button>
      {visible && (
        <>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-2xl z-40 pointer-events-auto"
            onClick={() => setVisible(false)}
          />
          <QTicketIframe />
        </>
      )}
    </>
  )
}

const QTicketIframe = () => (
  <iframe
    className="w-[85%] h-[85%] rounded-2xl fixed inset-0 m-auto z-50"
    src="https://qtickets.ru/event/156681?site_url=https%3A%2F%2Fmoscow.qtickets.events%2F156681-eta-komnata"
  />
)

export default BuyTicket
