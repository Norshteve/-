import React, { useState, useEffect } from 'react';
import { StorageService } from '../services/storage';
import { Dress, Region } from '../types';
import { REGION_LABELS } from '../constants';

const Dresses: React.FC = () => {
  const [dresses, setDresses] = useState<Dress[]>([]);
  
  useEffect(() => {
    setDresses(StorageService.getDresses());
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-slate-800">فساتين وأزياء</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {dresses.map((dress) => (
          <div key={dress.id} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow group">
            <div className="relative aspect-[3/4]">
              <img src={dress.mainImageUrl} alt={dress.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-2 right-2 flex flex-col gap-1">
                 {dress.forSale && <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">بيع</span>}
                 {dress.forRent && <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">إيجار</span>}
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold text-slate-800 mb-1">{dress.title}</h3>
              <p className="text-sm text-slate-500 mb-2">{dress.city}، {REGION_LABELS[dress.region]}</p>
              
              <div className="flex justify-between items-center text-sm font-medium mt-2">
                 <span className="text-slate-600">المقاس: {dress.size}</span>
              </div>
              
              <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center">
                 <div className="flex flex-col">
                   {dress.forRent && <span className="text-primary font-bold">{dress.priceRent}₪ / يوم</span>}
                   {dress.forSale && !dress.forRent && <span className="text-primary font-bold">{dress.priceSale}₪</span>}
                 </div>
                 <button className="text-slate-800 hover:text-primary text-sm font-bold">التفاصيل</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dresses;
