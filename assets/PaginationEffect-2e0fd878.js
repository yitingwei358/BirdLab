import{_ as p,o as t,c as n,d as a,n as l,M as g,F as d,j as u,t as o}from"./index-4d0c22ad.js";const m={template:"#pagination",props:["pages"],methods:{emitPages(c){this.$emit("emit-pages",c)}}},h={"aria-label":"Page navigation example"},k={class:"pagination"},f=a("span",{"aria-hidden":"true"},"«",-1),P=[f],v={key:0,class:"page-link"},b=["onClick"],x=a("span",{"aria-hidden":"true"},"»",-1),C=[x];function y(c,i,e,B,E,r){return t(),n("nav",h,[a("ul",k,[a("li",{class:l(["page-item",{disabled:e.pages.current_page===1}])},[a("a",{class:"page-link",href:"#","aria-label":"Previous",onClick:i[0]||(i[0]=g(()=>r.emitPages(e.pages.current_page-1),["prevent"]))},P)],2),(t(!0),n(d,null,u(e.pages.total_pages,(s,_)=>(t(),n("li",{key:_+"page",class:l(["page-item",{active:s===e.pages.current_page}])},[s===e.pages.current_page?(t(),n("span",v,o(s),1)):(t(),n("a",{key:1,class:"page-link",href:"#",onClick:g(()=>r.emitPages(s),["prevent"])},o(s),9,b))],2))),128)),a("li",{class:l(["page-item",{disabled:e.pages.current_page===e.pages.total_pages}])},[a("a",{class:"page-link",href:"#","aria-label":"Next",onClick:i[1]||(i[1]=g(()=>r.emitPages(e.pages.current_page+1),["prevent"]))},C)],2)])])}const M=p(m,[["render",y]]);export{M as P};