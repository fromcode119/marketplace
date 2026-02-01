import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Image, Search, X, Loader2, ExternalLink, Film, File, Upload, AlertCircle } from 'lucide-react';

interface MediaItem {
  id: number;
  filename: string;
  originalName: string;
  mimeType: string;
  url: string;
  fileSize: number;
}

interface MediaInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  type?: 'image' | 'video' | 'all';
}

export const MediaInput: React.FC<MediaInputProps> = ({ 
  value, 
  onChange, 
  placeholder = "https://...", 
  label,
  type = 'all' 
}) => {
  const [showLibrary, setShowLibrary] = useState(false);
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState('');
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const fetchMedia = async () => {
    setLoading(true);
    setError(null);
    try {
      // Access the framework's API via window.Fromcode
      const fc = (window as any).Fromcode;
      if (fc && fc.api) {
        // Try versioned API first, then fallback to legacy
        let data;
        try {
          data = await fc.api.get('/api/v1/media');
        } catch (e) {
          data = await fc.api.get('/api/media').catch(() => []);
        }

        console.log('[CMS] Media items fetched:', data);
        if (Array.isArray(data)) {
          setItems(data);
        } else if (data && typeof data === 'object' && Array.isArray((data as any).data)) {
          setItems((data as any).data);
        } else {
          setItems([]);
        }
      } else {
        setError('Framework API not available');
      }
    } catch (err: any) {
      console.error('[CMS] Failed to fetch media:', err);
      setError(err.message || 'Failed to fetch media');
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const fc = (window as any).Fromcode;
      if (!fc || !fc.api) throw new Error('Framework API not initialized');

      // Use the API's base URL to construct the upload endpoint
      const baseUrl = fc.api.getURL('/api/media/upload').replace('/upload', '');
      
      const response = await fetch(`${baseUrl}/upload`, {
        method: 'POST',
        body: formData,
        credentials: 'include'
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({ error: 'Upload failed' }));
        throw new Error(errData.error || 'Upload failed');
      }

      const result = await response.json();
      onChange(result.url);
      fetchMedia(); // Refresh the list
    } catch (err: any) {
      console.error('[CMS] Media upload error:', err);
      setError(err.message || 'Upload failed');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  useEffect(() => {
    if (showLibrary) {
      fetchMedia();
    }
  }, [showLibrary]);

  const filteredItems = items.filter(item => {
    const matchesSearch = item.originalName.toLowerCase().includes(search.toLowerCase());
    if (type === 'image') return matchesSearch && item.mimeType.startsWith('image/');
    if (type === 'video') return matchesSearch && (item.mimeType.startsWith('video/') || item.mimeType.includes('mp4') || item.mimeType.includes('quicktime'));
    return matchesSearch;
  });

  return (
    <div className="space-y-2">
      {label && <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 block">{label}</label>}
      <div className="flex gap-2">
        <div className="relative flex-1 group">
          <input 
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full p-3 pr-10 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-bold outline-none focus:border-indigo-500 transition-all"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
            {type === 'video' ? <Film size={14} /> : <Image size={14} />}
          </div>
        </div>
        <button 
          onClick={() => setShowLibrary(true)}
          className="px-4 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 transition-all shadow-lg shadow-indigo-500/20 flex items-center gap-2"
          title="Open Media Library"
        >
          <Search size={14} strokeWidth={2.5} />
          <span className="text-[10px] font-black uppercase tracking-widest hidden sm:inline">Library</span>
        </button>
      </div>

      {showLibrary && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={() => setShowLibrary(false)} />
          
          <div className="relative w-full max-w-4xl h-[75vh] bg-white dark:bg-slate-900 rounded-[32px] shadow-[0_0_80px_rgba(0,0,0,0.4)] overflow-hidden flex flex-col animate-in zoom-in-95 duration-300 border border-white/10">
            {/* Header */}
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-white/50 dark:bg-slate-950/50 backdrop-blur-xl">
               <div>
                  <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-900 dark:text-white">Media Vault</h3>
                  <p className="text-[10px] text-slate-500 font-bold mt-1 opacity-70">Browse and select assets for your project</p>
               </div>
               <button 
                onClick={() => setShowLibrary(false)}
                className="w-10 h-10 flex items-center justify-center bg-slate-100 dark:bg-slate-800 hover:bg-rose-500 hover:text-white rounded-xl transition-all text-slate-500 hover:rotate-90"
               >
                 <X size={20} />
               </button>
            </div>

            {/* Search and Upload */}
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex gap-4">
               <div className="relative flex-1">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                 <input 
                  type="text" 
                  placeholder="Search files..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full py-2.5 pl-10 pr-4 bg-slate-100 dark:bg-slate-800 border-none rounded-xl text-sm outline-none focus:ring-2 ring-indigo-500/20"
                 />
               </div>
               <button 
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="px-4 py-2 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 transition-all shadow-lg shadow-indigo-500/20 flex items-center gap-2 disabled:opacity-50"
               >
                 {uploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
                 <span className="text-[10px] font-black uppercase tracking-widest">Upload</span>
               </button>
               <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                onChange={handleUpload}
               />
            </div>

            {/* Error Message */}
            {error && (
              <div className="mx-6 mt-4 p-3 bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-800/50 rounded-xl flex items-center gap-2 text-rose-600 dark:text-rose-400 text-[10px] font-bold uppercase tracking-widest">
                <AlertCircle size={14} />
                {error}
              </div>
            )}

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
               {loading ? (
                 <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <Loader2 className="animate-spin text-indigo-500" size={32} />
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Accessing Vault...</p>
                 </div>
               ) : filteredItems.length === 0 ? (
                 <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-400 mb-4">
                       <File size={32} />
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">No assets found</h4>
                    <p className="text-xs text-slate-500 mt-1 mb-6">Try searching for something else or upload a new file below.</p>
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="px-8 py-3 bg-indigo-500 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-indigo-600 transition-all shadow-xl shadow-indigo-500/20 flex items-center gap-2"
                    >
                      <Upload size={14} />
                      Upload your first asset
                    </button>
                 </div>
               ) : (
                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {filteredItems.map(item => (
                      <button
                        key={item.id}
                        onClick={() => {
                          onChange(item.url);
                          setShowLibrary(false);
                        }}
                        className="group flex flex-col gap-2 p-2 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-left"
                      >
                         <div className="aspect-square rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-950 flex items-center justify-center relative shadow-sm">
                            {item.mimeType.startsWith('image/') ? (
                              <img src={item.url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
                            ) : item.mimeType.startsWith('video/') ? (
                              <Film size={24} className="text-slate-400" />
                            ) : (
                              <File size={24} className="text-slate-400" />
                            )}
                            <div className="absolute inset-0 bg-indigo-500/0 group-hover:bg-indigo-500/20 transition-colors" />
                         </div>
                         <div className="px-1 overflow-hidden">
                            <p className="text-[10px] font-bold text-slate-700 dark:text-slate-300 truncate" title={item.originalName}>
                              {item.originalName}
                            </p>
                            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter">
                              {item.mimeType.split('/')[1]?.toUpperCase() || 'FILE'}
                            </p>
                         </div>
                      </button>
                    ))}
                 </div>
               )}
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
               <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                 {filteredItems.length} items available
               </span>
               <a 
                href="/media" 
                target="_blank" 
                className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-indigo-500 hover:text-indigo-600"
               >
                 Upload assets <ExternalLink size={10} />
               </a>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};
