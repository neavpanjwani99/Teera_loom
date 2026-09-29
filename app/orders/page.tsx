'use client';

import React, { useState } from 'react';
import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';
import ModalSheet from '../../components/ModalSheet';
import { useArtisan, OrderItem } from '../../context/ArtisanContext';

export default function OrdersPage() {
  const { orders, updateOrderStatus, sendChatMessage, speakText } = useArtisan();
  const [activeFilter, setActiveFilter] = useState<'all' | 'new' | 'processing' | 'ready_to_dispatch' | 'delivered'>('all');
  const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null);
  const [chatMessageText, setChatMessageText] = useState('');

  const filteredOrders = orders.filter((ord) => {
    if (activeFilter === 'all') return true;
    return ord.status === activeFilter;
  });

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder || !chatMessageText.trim()) return;

    sendChatMessage(selectedOrder.id, chatMessageText);
    setChatMessageText('');

    // Refresh selectedOrder from updated orders array
    const updated = orders.find((o) => o.id === selectedOrder.id);
    if (updated) {
      setSelectedOrder(updated);
    }
  };

  const currentOrder = orders.find((o) => o.id === selectedOrder?.id) || selectedOrder;

  return (
    <main className="flex flex-col relative w-full bg-surface min-h-screen pt-16 pb-24">
      <Header
        title="ऑर्डर व ग्राहक चैट"
        subtitle="Orders Management &amp; Direct Buyer Chat"
        speechTextHi="यहाँ आपके सभी ग्राहक ऑर्डर और चैट संदेश हैं। आप सीधे ग्राहक से बात कर सकते हैं।"
      />

      <div className="flex flex-col w-full p-4 gap-4">
        {/* Status Filter Chips */}
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'bg-surface-container-high text-on-surface-variant'
            }`}
          >
            सभी (All {orders.length})
          </button>
          <button
            onClick={() => setActiveFilter('new')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
              activeFilter === 'new'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'bg-surface-container-high text-on-surface-variant'
            }`}
          >
            नए ऑर्डर (New {orders.filter((o) => o.status === 'new').length})
          </button>
          <button
            onClick={() => setActiveFilter('ready_to_dispatch')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
              activeFilter === 'ready_to_dispatch'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'bg-surface-container-high text-on-surface-variant'
            }`}
          >
            डिस्पेच तैयार (Ready)
          </button>
          <button
            onClick={() => setActiveFilter('delivered')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
              activeFilter === 'delivered'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'bg-surface-container-high text-on-surface-variant'
            }`}
          >
            डिलिवर्ड (Delivered)
          </button>
        </div>

        {/* Orders List */}
        <div className="flex flex-col gap-3">
          {filteredOrders.length === 0 ? (
            <div className="bg-surface-container-lowest rounded-2xl p-8 text-center text-on-surface-variant border border-outline-variant/30 flex flex-col items-center gap-2">
              <span className="material-symbols-outlined text-[48px] opacity-40">local_shipping</span>
              <p className="text-sm font-bold text-on-surface">कोई ऑर्डर नहीं मिला</p>
              <p className="text-xs">No orders found for selected filter.</p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-surface-container-lowest rounded-2xl p-4 border border-outline-variant/30 shadow-sm flex flex-col gap-3"
              >
                {/* Header Row */}
                <div className="flex items-center justify-between border-b border-outline-variant/20 pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-on-surface">{order.id}</span>
                    <span className="text-[11px] text-on-surface-variant font-medium">• {order.orderDate}</span>
                  </div>

                  <span
                    className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase ${
                      order.status === 'new'
                        ? 'bg-error-container text-on-error-container'
                        : order.status === 'ready_to_dispatch'
                        ? 'bg-tertiary-fixed text-on-tertiary-fixed'
                        : 'bg-forest-green/15 text-forest-green'
                    }`}
                  >
                    {order.status === 'new'
                      ? 'नया ऑर्डर (New)'
                      : order.status === 'ready_to_dispatch'
                      ? 'डिस्पेच तैयार'
                      : 'डिलिवर्ड'}
                  </span>
                </div>

                {/* Product & Buyer Info */}
                <div className="flex gap-3 items-center">
                  <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-surface-container-low border border-outline-variant/20">
                    <img
                      src={order.productImage}
                      alt={order.productNameEn}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex flex-col flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-on-surface leading-tight truncate">
                      {order.productNameHi}
                    </h4>
                    <p className="text-xs text-on-surface-variant font-medium truncate">
                      ग्राहक: <span className="font-bold text-on-surface">{order.buyerName}</span> ({order.buyerCity})
                    </p>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-base font-bold text-primary">
                        ₹{order.amount.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-on-surface-variant">
                        ({order.quantity} पीस)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons Row */}
                <div className="flex gap-2 pt-1">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="flex-1 h-11 bg-surface-container-high text-on-surface rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">chat</span>
                    <span>ग्राहक चैट ({order.chatMessages.length})</span>
                  </button>

                  {order.status === 'new' && (
                    <button
                      onClick={() => {
                        updateOrderStatus(order.id, 'ready_to_dispatch');
                        speakText("ऑर्डर की स्थिति बदलकर डिस्पेच तैयार कर दी गई है।");
                      }}
                      className="flex-1 h-11 bg-primary text-on-primary rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-transform"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">inventory</span>
                      <span>डिस्पेच के लिए तैयार</span>
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Direct Buyer Chat Modal Sheet */}
      <ModalSheet
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        title={`चैट: ${currentOrder?.buyerName || ''}`}
        subtitle={`Order: ${currentOrder?.id} • ${currentOrder?.productNameHi || ''}`}
      >
        <div className="flex flex-col gap-3 min-h-[300px]">
          {/* Messages Timeline */}
          <div className="flex-1 flex flex-col gap-2.5 max-h-[350px] overflow-y-auto p-2 bg-surface-container-low rounded-xl border border-outline-variant/30">
            {currentOrder?.chatMessages.map((msg) => {
              const isArtisan = msg.sender === 'artisan';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col max-w-[82%] p-3 rounded-2xl text-xs ${
                    isArtisan
                      ? 'self-end bg-primary text-on-primary rounded-tr-none'
                      : 'self-start bg-surface-container-lowest text-on-surface border border-outline-variant/30 rounded-tl-none shadow-xs'
                  }`}
                >
                  <div className="flex justify-between items-center gap-2 mb-0.5">
                    <span className="font-bold opacity-90 text-[10px]">
                      {isArtisan ? 'आप (Artisan)' : currentOrder.buyerName}
                    </span>
                    <span className="opacity-75 text-[9px]">{msg.time}</span>
                  </div>
                  <p className="font-medium leading-relaxed">{msg.text}</p>

                  {!isArtisan && (
                    <button
                      type="button"
                      onClick={() => speakText(msg.text)}
                      className="mt-1 self-start text-[10px] underline opacity-90 font-bold flex items-center gap-0.5"
                    >
                      <span className="material-symbols-outlined text-[12px]">volume_up</span>
                      <span>आवाज़ में सुनें</span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Send Message Input */}
          <form onSubmit={handleSendMessage} className="flex items-center gap-2 pt-2">
            <input
              type="text"
              value={chatMessageText}
              onChange={(e) => setChatMessageText(e.target.value)}
              className="flex-1 h-12 px-3.5 rounded-xl border border-outline-variant/40 focus:border-primary text-xs font-bold text-on-surface bg-surface-container-lowest outline-none shadow-xs"
              placeholder="उत्तर लिखें / Type response..."
            />
            <button
              type="submit"
              className="w-12 h-12 rounded-xl bg-primary text-on-primary flex items-center justify-center shadow-md active:scale-90 transition-all shrink-0 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">send</span>
            </button>
          </form>
        </div>
      </ModalSheet>

      <BottomNav />
    </main>
  );
}
