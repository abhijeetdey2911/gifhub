import React from 'react';
import { useShop } from '../../context/ShopContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export const Toast = () => {
  const { toast } = useShop();

  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isError = toast.type === 'error';

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-subtle pointer-events-none">
      <div className="glass-panel px-5 py-3.5 rounded-full shadow-xl flex items-center gap-3 border border-neutral-900/10 text-sm font-medium text-obsidian bg-white/90 backdrop-blur-md">
        {isSuccess && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
        {isError && <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />}
        {!isSuccess && !isError && <Info className="w-4 h-4 text-neutral-700 shrink-0" />}
        <span>{toast.message}</span>
      </div>
    </div>
  );
};
