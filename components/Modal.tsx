'use client';
import { ReactNode, useEffect } from 'react';
export default function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: ReactNode }) {
  useEffect(() => { const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && onClose(); document.addEventListener('keydown', onEsc); return () => document.removeEventListener('keydown', onEsc); }, [onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300" onClick={onClose}></div>
      <div className="relative bg-white rounded-2xl shadow-modal w-full max-w-lg p-7 border border-blue-100 animate-fade-in">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-primary-dark">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-primary text-2xl font-bold transition">×</button>
        </div>
        {children}
      </div>
    </div>
  );
}
