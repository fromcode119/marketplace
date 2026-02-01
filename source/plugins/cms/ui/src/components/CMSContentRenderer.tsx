import React from 'react';
import { 
  HeroRenderer, 
  TextRenderer, 
  ImageRenderer, 
  CTARenderer, 
  SpacerRenderer, 
  VideoRenderer, 
  GridRenderer,
  FAQRenderer,
  PricingRenderer,
  TeamRenderer,
  TestimonialsRenderer,
  LogoCloudRenderer,
  ContactFormRenderer,
  StatsRenderer,
  AccordionRenderer,
  TabsRenderer,
  ColumnsRenderer
} from './BlockEditor/renderers';

const RENDERER_MAP: Record<string, React.FC<any>> = {
  'hero': HeroRenderer,
  'text-block': TextRenderer,
  'image-block': ImageRenderer,
  'cta': CTARenderer,
  'spacer': SpacerRenderer,
  'video': VideoRenderer,
  'grid-block': GridRenderer,
  'faq': FAQRenderer,
  'pricing': PricingRenderer,
  'team': TeamRenderer,
  'testimonials': TestimonialsRenderer,
  'logo-cloud': LogoCloudRenderer,
  'contact-form': ContactFormRenderer,
  'stats': StatsRenderer,
  'accordion-block': AccordionRenderer,
  'tabs-block': TabsRenderer,
  'columns-block': ColumnsRenderer
};

export const CMSContentRenderer = ({ content }: { content: any }) => {
  // Enhanced detail logging for troubleshooting
  console.log('[CMS] Renderer (v1.4.6) received content:', { 
    type: typeof content, 
    isArray: Array.isArray(content),
    content: content,
    mapKeys: Object.keys(RENDERER_MAP)
  });

  let blocks = content;
  
  // Auto-parse JSON if it comes as a string from the API
  if (typeof content === 'string' && content.trim().startsWith('[')) {
    try {
      blocks = JSON.parse(content);
      console.log('[CMS] Successfully parsed content string into array');
    } catch (e) {
      console.error('[CMS] Failed to parse content string:', e);
    }
  }

  // Handle Block Editor array structure
  if (Array.isArray(blocks)) {
    if (blocks.length === 0) {
      return (
        <div className="p-12 text-center text-slate-300 border-2 border-dashed border-slate-100 rounded-[32px] mx-6 my-12">
          <p className="text-[10px] font-black uppercase tracking-widest">Collection contains 0 blocks</p>
        </div>
      );
    }

    return (
      <div className="cms-content-blocks" data-fromcode-cms-v="1.4.6">
        {blocks.map((block: any, idx) => {
          // If block is just a string, it's definitely corrupt data
          if (typeof block === 'string') {
             return (
               <div key={idx} className="p-4 bg-rose-50 border border-rose-100 text-rose-500 rounded-xl m-4 text-[10px] font-mono">
                  [CORRUPT BLOCK DATA: STRING DETECTED] &rarr; {block}
               </div>
             );
          }

          const type = block.type || 'unknown';
          const Renderer = RENDERER_MAP[type];
          
          console.log(`[CMS] Processing block ${idx}:`, { type, hasRenderer: !!Renderer, id: block.id });

          if (!Renderer) {
            console.warn(`[CMS] No renderer found for block type: ${type}`);
            return (
              <div key={block.id || idx} className="p-12 bg-slate-50 border border-dashed border-slate-200 rounded-[32px] text-center my-8 mx-6">
                 <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Renderer Missing: {type}</p>
                 <p className="text-[8px] font-mono text-slate-300 mt-1">{block.id || 'NO_ID'}</p>
                 <div className="mt-4 text-[8px] text-slate-200 bg-slate-800 p-2 rounded overflow-auto max-h-24 text-left">
                    {JSON.stringify(block, null, 2)}
                 </div>
              </div>
            );
          }
          
          return (
            <Renderer 
              key={block.id || idx}
              data={block.data || {}} 
              layout={block.layout || 'standard'} 
              style={block.style}
              id={block.id}
            />
          );
        })}
      </div>
    );
  }

  // Debug for objects
  if (typeof content === 'object' && content !== null) {
     return (
       <div className="p-12 bg-amber-50 border border-amber-100 rounded-[32px] m-6">
          <p className="text-amber-600 text-[10px] font-black uppercase tracking-widest mb-4">Object received instead of Array</p>
          <pre className="text-[9px] font-mono bg-white p-4 rounded-xl border border-amber-100 overflow-auto">
            {JSON.stringify(content, null, 2)}
          </pre>
       </div>
     );
  }

  // Fallback for legacy string content or single-string values
  if (typeof content === 'string' && content.length > 0) {
    return (
      <div 
        className="prose prose-slate lg:prose-xl dark:prose-invert max-w-4xl mx-auto py-12 px-6"
        data-fromcode-cms-type="string-fallback"
      >
        <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-4 opacity-50 underline decoration-indigo-200 underline-offset-4">Classic Content Fallback</p>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    );
  }

  return (
    <div className="p-4 text-center text-slate-400 text-[10px] font-bold uppercase tracking-widest">
      No Content Available (Empty)
    </div>
  );
};

