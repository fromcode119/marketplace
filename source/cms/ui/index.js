// src/components/CMSDashboard.tsx
import { Layout, FileText, BarChart3, PlusCircle } from "lucide-react";
import { jsx, jsxs } from "react/jsx-runtime";
var CMSDashboard = () => {
  const stats = [
    { label: "Published Posts", value: "124", icon: FileText, color: "text-blue-600" },
    { label: "Active Pages", value: "42", icon: Layout, iconColor: "text-emerald-600" },
    { label: "Total Views", value: "12.5k", icon: BarChart3, iconColor: "text-purple-600" }
  ];
  return /* @__PURE__ */ jsxs("div", { className: "p-8 space-y-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-slate-900", children: "CMS Overview" }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-500", children: "Manage your content and track performance" })
      ] }),
      /* @__PURE__ */ jsxs("button", { className: "flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors", children: [
        /* @__PURE__ */ jsx(PlusCircle, { size: 20 }),
        /* @__PURE__ */ jsx("span", { children: "New Post" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: stats.map((stat, i) => /* @__PURE__ */ jsxs("div", { className: "bg-white p-6 rounded-xl border border-slate-200 shadow-sm", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsx("div", { className: `p-2 rounded-lg bg-slate-50 ${stat.iconColor}`, children: /* @__PURE__ */ jsx(stat.icon, { size: 24 }) }),
        /* @__PURE__ */ jsx("span", { className: "text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full", children: "+12%" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold text-slate-900", children: stat.value }),
      /* @__PURE__ */ jsx("div", { className: "text-sm text-slate-500", children: stat.label })
    ] }, i)) }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden", children: [
      /* @__PURE__ */ jsxs("div", { className: "p-6 border-b border-slate-200 flex justify-between items-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-semibold text-slate-900", children: "Recent Posts" }),
        /* @__PURE__ */ jsx("button", { className: "text-sm text-indigo-600 hover:text-indigo-700 font-medium", children: "View All" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "divide-y divide-slate-100", children: [1, 2, 3].map((_, i) => /* @__PURE__ */ jsxs("div", { className: "p-4 hover:bg-slate-50 transition-colors flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400", children: /* @__PURE__ */ jsx(FileText, { size: 20 }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "font-medium text-slate-900", children: "Advanced TypeScript Patterns in 2026" }),
            /* @__PURE__ */ jsx("div", { className: "text-xs text-slate-500", children: "Published Jan 28, 2026 \u2022 5 min read" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100", children: "Published" })
      ] }, i)) })
    ] })
  ] });
};
var CMSDashboard_default = CMSDashboard;

// src/components/Pages.tsx
import { Columns, Copy, ExternalLink, MoreVertical, Search, Filter } from "lucide-react";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var Pages = () => {
  return /* @__PURE__ */ jsxs2("div", { className: "p-8 space-y-6", children: [
    /* @__PURE__ */ jsxs2("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ jsxs2("div", { children: [
        /* @__PURE__ */ jsx2("h1", { className: "text-2xl font-bold text-slate-900", children: "Pages" }),
        /* @__PURE__ */ jsx2("p", { className: "text-slate-500", children: "Create and manage your site pages" })
      ] }),
      /* @__PURE__ */ jsxs2("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxs2("div", { className: "relative", children: [
          /* @__PURE__ */ jsx2(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-slate-400", size: 18 }),
          /* @__PURE__ */ jsx2(
            "input",
            {
              type: "text",
              placeholder: "Search pages...",
              className: "pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 w-64"
            }
          )
        ] }),
        /* @__PURE__ */ jsx2("button", { className: "p-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors", children: /* @__PURE__ */ jsx2(Filter, { size: 18, className: "text-slate-600" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx2("div", { className: "bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden", children: /* @__PURE__ */ jsxs2("table", { className: "w-full text-left", children: [
      /* @__PURE__ */ jsx2("thead", { className: "bg-slate-50 border-b border-slate-200", children: /* @__PURE__ */ jsxs2("tr", { children: [
        /* @__PURE__ */ jsx2("th", { className: "px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider", children: "Page Name" }),
        /* @__PURE__ */ jsx2("th", { className: "px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider", children: "Slug" }),
        /* @__PURE__ */ jsx2("th", { className: "px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider", children: "Template" }),
        /* @__PURE__ */ jsx2("th", { className: "px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider", children: "Status" }),
        /* @__PURE__ */ jsx2("th", { className: "px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsx2("tbody", { className: "divide-y divide-slate-100", children: [
        { title: "Home Page", slug: "/", template: "homepage", status: "live" },
        { title: "About Us", slug: "/about", template: "generic", status: "live" },
        { title: "Contact", slug: "/contact", template: "contact", status: "draft" }
      ].map((page, i) => /* @__PURE__ */ jsxs2("tr", { className: "hover:bg-slate-50 transition-colors", children: [
        /* @__PURE__ */ jsx2("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsx2("div", { className: "font-medium text-slate-900", children: page.title }) }),
        /* @__PURE__ */ jsx2("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsx2("div", { className: "text-sm text-slate-400 font-mono", children: page.slug }) }),
        /* @__PURE__ */ jsx2("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxs2("div", { className: "inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded", children: [
          /* @__PURE__ */ jsx2(Columns, { size: 12 }),
          page.template
        ] }) }),
        /* @__PURE__ */ jsx2("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsx2("span", { className: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${page.status === "live" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"}`, children: page.status }) }),
        /* @__PURE__ */ jsx2("td", { className: "px-6 py-4 text-right", children: /* @__PURE__ */ jsxs2("div", { className: "flex items-center justify-end gap-2 text-slate-400", children: [
          /* @__PURE__ */ jsx2("button", { className: "p-1 hover:text-indigo-600 transition-colors", children: /* @__PURE__ */ jsx2(ExternalLink, { size: 18 }) }),
          /* @__PURE__ */ jsx2("button", { className: "p-1 hover:text-indigo-600 transition-colors", children: /* @__PURE__ */ jsx2(Copy, { size: 18 }) }),
          /* @__PURE__ */ jsx2("button", { className: "p-1 hover:text-slate-600 transition-colors", children: /* @__PURE__ */ jsx2(MoreVertical, { size: 18 }) })
        ] }) })
      ] }, i)) })
    ] }) })
  ] });
};
var Pages_default = Pages;

// src/index.tsx
if (window.Fromcode) {
  window.Fromcode.registerSlotComponent("admin.plugin.cms.content", CMSDashboard_default);
  window.Fromcode.registerSlotComponent("admin.plugin.cms.page.posts", CMSDashboard_default);
  window.Fromcode.registerSlotComponent("admin.plugin.cms.page.pages", Pages_default);
}
