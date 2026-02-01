import React, { useState, useEffect } from 'react';
import { Layers, Plus, Trash2, ChevronUp, ChevronDown, Layout, X, Save, Copy, Download, Upload, Palette, Settings2 } from 'lucide-react';
import { Block, BlockStyle } from './types';
import * as Blocks from './blocks';
import { PREDEFINED_TEMPLATES } from './templates';
import { StyleSettings } from './StyleSettings';

interface BlockEditorProps {
  value: any;
  onChange: (value: any) => void;
  theme: string;
}

const BLOCK_DEFINITIONS = Object.values(Blocks).filter(b => b.id && b.name);

export const BlockEditor: React.FC<BlockEditorProps> = ({ value, onChange, theme }) => {
  const blocks: Block[] = Array.isArray(value) ? value : [];
  const [activeBlock, setActiveBlock] = useState<string | null>(null);
  const [activeSettingsTab, setActiveSettingsTab] = useState<'content' | 'style'>('content');
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [templates, setTemplates] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'blocks' | 'templates'>('blocks');

  useEffect(() => {
    // Load local templates
    const saved = localStorage.getItem('fromcode_cms_templates');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Merge with predefined if not already in list
        setTemplates(parsed);
      } catch (e) {}
    }
  }, []);

  const saveToTemplates = (block: Block) => {
    const templateName = prompt('Enter a name for this section template:');
    if (!templateName) return;

    const newTemplate = {
      id: Math.random().toString(36).substr(2, 9),
      name: templateName,
      block: { ...block, id: undefined } // Remove ID so it's fresh when inserted
    };

    const updated = [...templates, newTemplate];
    setTemplates(updated);
    localStorage.setItem('fromcode_cms_templates', JSON.stringify(updated));
    alert('Section saved to your local library!');
  };

  const exportTemplate = (template: any) => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(template));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `${template.name.replace(/\s+/g, '_').toLowerCase()}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const importTemplate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const template = JSON.parse(event.target?.result as string);
        if (template.name && template.block) {
          const updated = [...templates, { ...template, id: Math.random().toString(36).substr(2, 9) }];
          setTemplates(updated);
          localStorage.setItem('fromcode_cms_templates', JSON.stringify(updated));
          alert('Template imported successfully!');
        }
      } catch (err) {
        alert('Invalid template file');
      }
    };
    reader.readAsText(file);
  };

  const addBlock = (typeId: string) => {
    const def = BLOCK_DEFINITIONS.find(b => b.id === typeId);
    if (!def) return;

    const newBlock: Block = {
      id: Math.random().toString(36).substr(2, 9),
      type: typeId,
      layout: def.layouts[0] || 'standard',
      data: {},
      style: {
        padding: { top: '2rem', bottom: '2rem' },
        visibility: 'all'
      }
    };
    onChange([...blocks, newBlock]);
    setActiveBlock(newBlock.id);
    setShowAddMenu(false);
  };

  const removeBlock = (id: string) => {
    onChange(blocks.filter(b => b.id !== id));
    if (activeBlock === id) setActiveBlock(null);
  };

  const moveBlock = (id: string, direction: 'up' | 'down') => {
    const index = blocks.findIndex(b => b.id === id);
    if (index < 0) return;
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === blocks.length - 1) return;

    const newBlocks = [...blocks];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newBlocks[index], newBlocks[targetIndex]] = [newBlocks[targetIndex], newBlocks[index]];
    onChange(newBlocks);
  };

  const updateBlockData = (id: string, key: string, val: any) => {
    onChange(blocks.map(b => b.id === id ? { ...b, data: { ...b.data, [key]: val } } : b));
  };

  const updateBlockLayout = (id: string, layout: string) => {
    onChange(blocks.map(b => b.id === id ? { ...b, layout } : b));
  };

  const updateBlockStyle = (id: string, style: BlockStyle) => {
    onChange(blocks.map(b => b.id === id ? { ...b, style } : b));
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {blocks.length === 0 ? (
          <div className={`flex flex-col items-center justify-center p-12 rounded-[32px] border-2 border-dashed transition-all ${
            theme === 'dark' ? 'bg-slate-900/40 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-500'
          }`}>
            <Layers size={32} className="mb-4 opacity-20" />
            <h3 className="font-bold uppercase tracking-widest text-[11px] mb-6">No blocks added yet</h3>
            <button 
              onClick={() => setShowAddMenu(true)}
              className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-indigo-700 transition-colors"
            >
              Add Your First Block
            </button>
          </div>
        ) : (
          blocks.map((block, idx) => {
            const def = BLOCK_DEFINITIONS.find(b => b.id === block.type);
            const isActive = activeBlock === block.id;

            return (
              <div 
                key={block.id}
                className={`group relative rounded-[28px] border transition-all duration-300 ${
                  isActive 
                    ? 'ring-4 ring-indigo-500/10 border-indigo-500 bg-white dark:bg-slate-900 z-10 shadow-2xl shadow-indigo-500/10' 
                    : theme === 'dark'
                      ? 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                      : 'bg-white border-slate-100 hover:border-indigo-200 shadow-sm'
                }`}
              >
                {/* Block Header */}
                <div 
                  onClick={() => setActiveBlock(isActive ? null : block.id)}
                  className="p-4 flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-xl transition-colors ${isActive ? 'bg-indigo-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                      {def?.icon || <Layers size={18} />}
                    </div>
                    <div>
                      <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-900 dark:text-white flex items-center gap-2">
                        {def?.name || block.type}
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-tighter ${theme === 'dark' ? 'bg-slate-800 text-slate-500' : 'bg-slate-100 text-slate-400'}`}>
                          {block.layout}
                        </span>
                      </h4>
                      <p className="text-[10px] text-slate-400 font-bold opacity-70 mt-0.5 truncate max-w-[200px]">
                        {Object.values(block.data).find(v => typeof v === 'string' && v.length > 0) || 'No content defined'}
                      </p>
                    </div>
                  </div>

                  <div className={`flex items-center gap-1 transition-opacity ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                    <button 
                      onClick={(e) => { e.stopPropagation(); moveBlock(block.id, 'up'); }}
                      className="p-2 hover:text-indigo-500 text-slate-400 disabled:opacity-30"
                      disabled={idx === 0}
                    >
                      <ChevronUp size={14} />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); moveBlock(block.id, 'down'); }}
                      className="p-2 hover:text-indigo-500 text-slate-400 disabled:opacity-30"
                      disabled={idx === blocks.length - 1}
                    >
                      <ChevronDown size={14} />
                    </button>
                    <div className="w-px h-4 bg-slate-200 dark:bg-slate-800 mx-1" />
                    <button 
                      onClick={(e) => { e.stopPropagation(); saveToTemplates(block); }}
                      className="p-2 hover:text-emerald-500 text-slate-400 transition-colors"
                      title="Save as Section Template"
                    >
                      <Save size={14} />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); removeBlock(block.id); }}
                      className="p-2 hover:text-rose-500 text-slate-400 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                {/* Block Editor Body */}
                {isActive && (
                  <div className="p-6 border-t border-slate-100 dark:border-slate-800 animate-in slide-in-from-top-2 duration-300">
                    <div className="flex gap-4 mb-8">
                       {[
                         { id: 'content', label: 'Content', icon: <Settings2 size={12} /> },
                         { id: 'style', label: 'Style', icon: <Palette size={12} /> }
                       ].map(tab => (
                         <button
                           key={tab.id}
                           onClick={() => setActiveSettingsTab(tab.id as any)}
                           className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${
                             activeSettingsTab === tab.id 
                               ? 'bg-indigo-500 text-white shadow-lg' 
                               : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 shadow-sm'
                           }`}
                         >
                           {tab.icon}
                           {tab.label}
                         </button>
                       ))}
                    </div>

                    <div className="grid grid-cols-1 gap-8">
                       {activeSettingsTab === 'content' ? (
                         <div className="space-y-6">
                            <div>
                              <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Layout Variant</label>
                              <div className="flex flex-wrap gap-2">
                                {def?.layouts.map(l => (
                                  <button
                                    key={l}
                                    onClick={() => updateBlockLayout(block.id, l)}
                                    className={`px-3 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest border transition-all ${
                                      block.layout === l 
                                        ? 'bg-indigo-500 border-indigo-500 text-white shadow-lg' 
                                        : 'bg-slate-50 dark:bg-slate-800 border-transparent text-slate-500 hover:border-slate-200'
                                    }`}
                                  >
                                    {l}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {def?.renderSettings({
                              data: block.data,
                              updateData: (key, val) => updateBlockData(block.id, key, val),
                              layout: block.layout,
                              updateLayout: (l) => updateBlockLayout(block.id, l),
                              theme,
                              style: block.style,
                              updateStyle: (s) => updateBlockStyle(block.id, s)
                            })}
                         </div>
                       ) : (
                         <StyleSettings 
                           style={block.style} 
                           onChange={(s) => updateBlockStyle(block.id, s)} 
                           theme={theme} 
                         />
                       )}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Add Menu */}
      <div className="relative">
         {showAddMenu ? (
           <div className={`rounded-[32px] border shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden ${
             theme === 'dark' ? 'bg-slate-900 border-slate-800 shadow-black' : 'bg-white border-slate-200'
           }`}>
             <div className="flex border-b border-slate-100 dark:border-slate-800">
               <button
                 onClick={() => setActiveTab('blocks')}
                 className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest transition-colors ${
                   activeTab === 'blocks' ? 'text-indigo-500 bg-indigo-50/5 dark:bg-indigo-500/5 border-b-2 border-indigo-500' : 'text-slate-400 hover:text-slate-200'
                 }`}
               >
                 Standard Blocks
               </button>
               <button
                 onClick={() => setActiveTab('templates')}
                 className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest transition-colors ${
                   activeTab === 'templates' ? 'text-indigo-500 bg-indigo-50/5 dark:bg-indigo-500/5 border-b-2 border-indigo-500' : 'text-slate-400 hover:text-slate-200'
                 }`}
               >
                 Section Library ({templates.length + PREDEFINED_TEMPLATES.length})
               </button>
               <button 
                  onClick={() => setShowAddMenu(false)} 
                  className="px-6 flex items-center justify-center text-slate-400 hover:text-rose-500 transition-colors border-l border-slate-100 dark:border-slate-800"
                >
                  <X size={18} />
                </button>
             </div>

             <div className="p-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
                {activeTab === 'blocks' ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {BLOCK_DEFINITIONS.map(type => (
                      <button
                        key={type.id}
                        onClick={() => addBlock(type.id)}
                        className={`flex flex-col items-center gap-3 p-5 rounded-2xl border transition-all hover:scale-105 ${
                          theme === 'dark' ? 'bg-slate-950 border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900' : 'bg-slate-50 border-slate-100 hover:border-indigo-500 hover:bg-white'
                        }`}
                      >
                        <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-500">
                          {type.icon}
                        </div>
                        <span className="text-[9px] font-black uppercase tracking-widest text-center">{type.name}</span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Toolbar */}
                    <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                       <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Manage Library</h4>
                       <div className="flex gap-2">
                          <label className={`cursor-pointer flex items-center gap-2 px-3 py-1.5 rounded-lg border text-[9px] font-black uppercase tracking-widest transition-all ${
                            theme === 'dark' ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' : 'bg-slate-50 border-slate-200 hover:bg-white'
                          }`}>
                            <Upload size={12} />
                            Import JSON
                            <input type="file" accept=".json" onChange={importTemplate} className="hidden" />
                          </label>
                       </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Predefined Templates */}
                      {PREDEFINED_TEMPLATES.map(template => (
                          <div 
                            key={template.id}
                            className={`group flex items-center justify-between p-4 rounded-2xl border transition-all border-indigo-500/20 bg-indigo-500/5`}
                          >
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-lg bg-indigo-500 text-white">
                                <Layout size={14} />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white">{template.name}</h5>
                                  <span className="text-[7px] font-black bg-indigo-500 text-white px-1.5 py-0.5 rounded uppercase">Core</span>
                                </div>
                                <span className="text-[8px] font-bold text-slate-400 uppercase">{template.block.type}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => {
                                  const newBlock: Block = {
                                    ...template.block,
                                    id: Math.random().toString(36).substr(2, 9),
                                  };
                                  onChange([...blocks, newBlock]);
                                  setActiveBlock(newBlock.id);
                                  setShowAddMenu(false);
                                }}
                                className="px-4 py-2 rounded-lg bg-indigo-500 text-white text-[9px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-colors"
                              >
                                Insert
                              </button>
                            </div>
                          </div>
                        ))}

                      {/* User Templates */}
                      {templates.map(template => (
                          <div 
                            key={template.id}
                            className={`group flex items-center justify-between p-4 rounded-2xl border transition-all ${
                              theme === 'dark' ? 'bg-slate-950 border-slate-800 hover:border-indigo-500/50' : 'bg-slate-50 border-slate-100 hover:border-indigo-500 shadow-sm'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-500 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                                <Layout size={14} />
                              </div>
                              <div>
                                <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white">{template.name}</h5>
                                <span className="text-[8px] font-bold text-slate-400 uppercase">{template.block.type}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => {
                                  const newBlock: Block = {
                                    ...template.block,
                                    id: Math.random().toString(36).substr(2, 9),
                                  };
                                  onChange([...blocks, newBlock]);
                                  setActiveBlock(newBlock.id);
                                  setShowAddMenu(false);
                                }}
                                className="p-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 transition-colors"
                                title="Use this section"
                              >
                                <Plus size={14} />
                              </button>
                              <button
                                onClick={() => exportTemplate(template)}
                                className="p-2 text-slate-400 hover:text-indigo-500 transition-colors"
                                title="Export as JSON"
                              >
                                <Download size={14} />
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm('Delete this template?')) {
                                    const updated = templates.filter(t => t.id !== template.id);
                                    setTemplates(updated);
                                    localStorage.setItem('fromcode_cms_templates', JSON.stringify(updated));
                                  }
                                }}
                                className="p-2 text-slate-400 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>

                    {templates.length === 0 && PREDEFINED_TEMPLATES.length === 0 && (
                      <div className="py-12 text-center">
                        <Save size={32} className="mx-auto mb-4 opacity-10 text-slate-400" />
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Library Empty</h4>
                        <p className="text-[9px] text-slate-400 mt-1 uppercase font-bold">Save active blocks to build your design library</p>
                      </div>
                    )}
                  </div>
                )}
             </div>
           </div>
         ) : (
           <div className="flex justify-center -mt-3">
             <button 
                onClick={() => setShowAddMenu(true)}
                className="group flex items-center gap-3 px-6 py-3 rounded-full bg-slate-900 border border-slate-800 text-white hover:bg-indigo-600 hover:border-indigo-500 transition-all shadow-xl hover:shadow-indigo-500/40"
             >
                <div className="h-6 w-6 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center transition-colors">
                  <Plus size={14} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest">Add Element</span>
             </button>
           </div>
         )}
      </div>
    </div>
  );
};
