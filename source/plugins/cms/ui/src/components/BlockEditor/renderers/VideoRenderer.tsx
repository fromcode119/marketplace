import React from 'react';

export const VideoRenderer = ({ data, layout }: any) => {
  const isYoutube = layout === 'youtube';
  const isVimeo = layout === 'vimeo';
  
  const getEmbedUrl = () => {
    if (isYoutube) {
      const id = data.url?.includes('v=') ? data.url.split('v=')[1].split('&')[0] : data.url;
      return `https://www.youtube.com/embed/${id}`;
    }
    if (isVimeo) {
      const id = data.url?.includes('vimeo.com/') ? data.url.split('vimeo.com/')[1] : data.url;
      return `https://player.vimeo.com/video/${id}`;
    }
    return null;
  };

  const embedUrl = getEmbedUrl();

  return (
    <div className="py-12 px-6 max-w-5xl mx-auto">
      <div className="aspect-video rounded-[32px] overflow-hidden bg-slate-100 dark:bg-slate-900 shadow-2xl">
        {embedUrl ? (
          <iframe 
            src={embedUrl}
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <video 
            src={data.url} 
            controls 
            className="w-full h-full object-cover"
          />
        )}
      </div>
      {data.caption && (
        <p className="mt-6 text-center text-sm font-bold text-slate-400 italic">
          {data.caption}
        </p>
      )}
    </div>
  );
};
