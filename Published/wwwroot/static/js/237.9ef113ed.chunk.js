"use strict";(self.webpackChunktest=self.webpackChunktest||[]).push([[237],{61229:function(e,n,r){r.d(n,{Nn:function(){return U},n:function(){return v},mg:function(){return j},c1:function(){return T},N7:function(){return h},nv:function(){return c},k4:function(){return S}});var t=r(1413),s=r(45987),l=(r(72791),r(92506)),a=r(323),i=r(53392),o=r(80184),u=["name","label","required"],c=function(e){var n=e.name,r=e.label,c=e.required,d=(0,s.Z)(e,u),h=(0,l.u6)(),x=h.handleChange,f=h.setFieldTouched,m=h.touched,p=h.errors,j=h.values;return(0,o.jsxs)(a.Z,{children:[(0,o.jsxs)(i.Z,{children:[r," ",c&&(0,o.jsx)("span",{className:"text-danger",children:"*"})]}),(0,o.jsx)("input",(0,t.Z)((0,t.Z)({className:"form-control"},d),{},{onChange:x(n),onBlur:function(){return f(n)},value:j[n]})),p[n]&&m[n]?(0,o.jsx)("div",{className:"text-danger",children:p[n]}):null]})},d=["name","label","required"],h=function(e){var n=e.name,r=e.label,u=e.required,c=(0,s.Z)(e,d),h=(0,l.u6)(),x=h.handleChange,f=h.setFieldTouched,m=h.touched,p=h.errors,j=h.values;return(0,o.jsxs)(a.Z,{children:[(0,o.jsxs)(i.Z,{children:[r," ",u&&(0,o.jsx)("span",{className:"text-danger",children:"*"})]}),(0,o.jsx)("textarea",(0,t.Z)({className:"form-control",onChange:x(n),onBlur:function(){return f(n)},value:j[n]},c)),p[n]&&m[n]?(0,o.jsx)("div",{className:"text-danger",children:p[n]}):null]})},x=r(65666),f=r(79745),m=r.n(f),p=["show","name","label","onShow","options","required"],j=function(e){var n=e.show,r=e.name,u=e.label,c=e.onShow,d=e.options,h=e.required,f=(0,s.Z)(e,p),j=(0,l.u6)(),g=j.setFieldTouched,v=j.touched,Z=j.errors,b=j.values,w=j.setFieldValue;return(0,o.jsxs)(a.Z,{children:[(0,o.jsxs)(i.Z,{children:[u," ",h&&(0,o.jsx)("span",{className:"text-danger",children:"*"})]}),(0,o.jsx)(x.ZP,(0,t.Z)({options:d,value:d.filter((function(e){return e.value===b[r]})),onChange:function(e){return w(r,e.value)},onBlur:function(){return g(r)}},f)),n&&(0,o.jsxs)("a",{className:"link mb-5",onClick:c,children:[(0,o.jsx)(m(),{name:"fas fa-plus-circle"}),"New customer"]}),Z[r]&&v[r]?(0,o.jsx)("div",{className:"text-danger",children:Z[r]}):null]})},g=["name","options","label","required","show","onShow"],v=function(e){var n=e.name,r=e.options,u=e.label,c=e.required,d=e.show,h=e.onShow,f=(0,s.Z)(e,g),p=(0,l.u6)(),j=p.setFieldTouched,v=p.touched,Z=p.errors,b=p.setFieldValue;return(0,o.jsxs)(a.Z,{children:[(0,o.jsxs)(i.Z,{children:[u," ",c&&(0,o.jsx)("span",{className:"text-danger",children:"*"})]}),(0,o.jsx)(x.ZP,(0,t.Z)((0,t.Z)({options:r,onChange:function(e){return b(n,e)},onBlur:function(){return j(n)}},f),{},{isMulti:!0})),d&&(0,o.jsxs)("a",{className:"link mb-5",onClick:h,children:[(0,o.jsx)(m(),{name:"fas fa-plus-circle"}),"New customer"]}),Z[n]&&v[n]?(0,o.jsx)("div",{className:"text-danger",children:Z[n]}):null]})},Z=r(74165),b=r(15861),w=r(18267),N=["name","file","label","value","setFile","required"],y={display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"},C={display:"flex",flexDirection:"row",flexWrap:"wrap",justifyContent:"center",alignItems:"center"},F={display:"inline-flex",borderRadius:2,border:"1px solid #eaeaea",marginBottom:8,marginRight:8,width:"100%",height:200,padding:4,boxSizing:"border-box"},k={fontSize:18},q={display:"flex",minWidth:0,overflow:"hidden"},S=function(e){var n=e.name,r=e.file,u=e.label,c=e.value,d=e.setFile,h=e.required,x=(0,s.Z)(e,N),f=(0,l.u6)(),m=f.setFieldTouched,p=f.touched,j=f.errors,g=f.setFieldError,v=function(){var e=(0,b.Z)((0,Z.Z)().mark((function e(r){var t,s,l;return(0,Z.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!((t=r.target.files[0]).name&&"png"===t.name.substring(t.name.length-3).toLocaleLowerCase()||t.name&&"jpg"===t.name.substring(t.name.length-3).toLocaleLowerCase())){e.next=9;break}return e.next=4,t.arrayBuffer();case 4:s=e.sent,l=new Uint8Array(s),d(l.toString()),e.next=10;break;case 9:g(n,"File type must be JPG/PNG");case 10:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),S=URL.createObjectURL(new Blob([function(){for(var e=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:"").split(","),n=[],r=0;r<e.length;r++)n[r]=e[r];return new Uint8Array(n)}(c)],{type:"image/png"}));return(0,o.jsxs)(a.Z,{children:[(0,o.jsxs)(i.Z,{children:[u," ",h&&(0,o.jsx)("span",{className:"text-danger",children:"*"})]}),c?(0,o.jsx)(w.ZP,{onDrop:function(e){return v({target:{files:e}})},children:function(e){var s=e.getRootProps,l=e.getInputProps;return(0,o.jsxs)("div",(0,t.Z)((0,t.Z)({},s({className:"dropzone"})),{},{style:y,children:[(0,o.jsx)("input",(0,t.Z)((0,t.Z)((0,t.Z)({},l()),x),{},{onBlur:function(){return m(n)}})),c?(0,o.jsx)("aside",{style:C,children:(0,o.jsx)("div",{style:F,children:(0,o.jsx)("div",{style:q,children:(0,o.jsx)("img",{width:"100%",src:S,onLoad:function(){URL.revokeObjectURL(S)}})})},r.name)}):null,(0,o.jsxs)("p",{style:k,children:["Select ",u]}),j[n]&&p[n]?(0,o.jsx)("div",{className:"text-danger",children:j[n]}):null]}))}}):(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("input",(0,t.Z)((0,t.Z)({className:"form-control"},x),{},{onChange:function(e){return v(e)},onBlur:function(){return m(n)}})),j[n]&&p[n]?(0,o.jsx)("div",{className:"text-danger",children:j[n]}):null]})]})},B=r(11799),L=r.n(B),U=function(e){var n=e.name,r=e.label,t=e.required,s=(0,l.u6)(),u=s.setFieldTouched,c=s.touched,d=s.errors,h=s.values,x=s.setFieldValue;return(0,o.jsxs)(a.Z,{children:[(0,o.jsxs)(i.Z,{children:[r," ",t&&(0,o.jsx)("span",{className:"text-danger",children:"*"})]}),(0,o.jsx)(L(),{onChange:function(e){return x(n,e._d)},onBlur:function(){return u(n)},value:new Date(h[n]),timeFormat:!1,closeOnSelect:!0}),d[n]&&c[n]?(0,o.jsx)("div",{className:"text-danger",children:d[n]}):null]})},P=r(43360),R=["title"],T=function(e){var n=e.title,r=(0,s.Z)(e,R),a=(0,l.u6)().handleSubmit;return(0,o.jsx)(P.Z,(0,t.Z)((0,t.Z)({type:"submit",onClick:function(){return a()}},r),{},{children:n||" Submit"}))}},81420:function(e,n){var r={dev:{apiUrl:"https://localhost:7146/api"},pro:{apiUrl:"http://".concat(window.location.host,"/api")}};n.Z=r.pro}}]);
//# sourceMappingURL=237.9ef113ed.chunk.js.map