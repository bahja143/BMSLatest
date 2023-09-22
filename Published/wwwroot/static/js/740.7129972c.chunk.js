"use strict";(self.webpackChunktest=self.webpackChunktest||[]).push([[740],{15284:function(e,t,n){n.d(t,{Z:function(){return x}});var r=n(37762),a=n(15671),i=n(43144),l=n(60136),s=n(27277),c=n(72791),o=n(64074),d=n(62591),u=n(73849),h=n(80184),m=function(e){(0,l.Z)(n,e);var t=(0,s.Z)(n);function n(){var e;(0,a.Z)(this,n);for(var i=arguments.length,l=new Array(i),s=0;s<i;s++)l[s]=arguments[s];return(e=t.call.apply(t,[this].concat(l))).state={count:1},e.handleTableBody=function(t){var n,a=1,i=(0,r.Z)(t);try{for(i.s();!(n=i.n()).done;){n.value.id=a,a++}}catch(l){i.e(l)}finally{i.f()}return null===t||void 0===t?void 0:t.map((function(t){return(0,h.jsx)("tr",{children:e.handleRowData(t).map((function(e){return(0,h.jsx)("td",{style:{height:"12",padding:"6 24",border:"1px solid #eaeaea"},children:e},e)}))},t.id)}))},e.handleRowData=function(e){var t=[];for(var n in e)t.push(e[n]);return t},e}return(0,i.Z)(n,[{key:"render",value:function(){var e=new Date,t=this.props,n=t.title,r=t.data,a=t.theaders;return(0,h.jsxs)(o.Z,{children:[(0,h.jsx)(o.Z.Header,{children:(0,h.jsx)(o.Z.Title,{children:(0,h.jsx)("div",{className:"row",children:(0,h.jsxs)("div",{className:"col-12",children:[(0,h.jsx)("img",{src:u,height:"120",alt:"Logo"}),(0,h.jsx)("h3",{className:"mt-2",children:(0,h.jsx)("p",{className:"float-right",children:e.toDateString()})}),(0,h.jsx)("h5",{children:(0,h.jsx)("h3",{children:n})})]})})})}),(0,h.jsx)(o.Z.Body,{children:(0,h.jsxs)(d.Z,{striped:!0,hover:!0,ref:"tbl",className:"table table-condensed",children:[(0,h.jsx)("thead",{children:(0,h.jsxs)("tr",{children:[(0,h.jsx)("th",{children:"#"}),null===a||void 0===a?void 0:a.map((function(e){return(0,h.jsx)("th",{children:e},e)}))]})}),(0,h.jsx)("tbody",{children:this.handleTableBody(r)})]})})]})}}]),n}(c.Component),x=m},3075:function(e,t){t.Z=function(e,t){if(""===t.startDate&&""===t.endDate){var n="All"===t.name?e:e.filter((function(e){return e.name===t.name}));return"All"===t.paymentMethod?n:n.filter((function(e){return e.paymentMethod===t.paymentMethod}))}if(""!==t.startDate&&""!==t.endDate){var r="All"===t.name?e:e.filter((function(e){return e.name===t.name}));return("All"===t.paymentMethod?r:r.filter((function(e){return e.paymentMethod===t.paymentMethod}))).filter((function(e){var n=new Date(e.date);return n>=t.startDate&&n<=t.endDate}))}if(""!==t.startDate){var a="All"===t.name?e:e.filter((function(e){return e.name===t.name}));return("All"===t.paymentMethod?a:a.filter((function(e){return e.paymentMethod===t.paymentMethod}))).filter((function(e){return new Date(e.date)>=t.startDate}))}if(""!==t.endDate){var i="All"===t.name?e:e.filter((function(e){return e.name===t.name}));return("All"===t.paymentMethod?i:i.filter((function(e){return e.paymentMethod===t.paymentMethod}))).filter((function(e){return new Date(e.date)<=t.endDate}))}return[]}},6713:function(e,t,n){var r=n(74165),a=n(15861),i=n(6924),l=n(81420),s=(0,i.Ue)({baseURL:l.Z.apiUrl});s.addAsyncRequestTransform(function(){var e=(0,a.Z)((0,r.Z)().mark((function e(t){var n;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,localStorage.token;case 2:if(n=e.sent){e.next=5;break}return e.abrupt("return");case 5:t.headers.Authorization="bearer ".concat(n);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),t.Z=s},46827:function(e,t,n){var r=n(6713),a="/receipts";t.Z={add:function(e){return r.Z.post(a,e)},update:function(e,t){return r.Z.put(a+"/"+e,t)},getAll:function(){return r.Z.get(a)},getById:function(e){return r.Z.get(a+"/"+e)}}},97076:function(e,t,n){var r=n(6713),a="/tenants";t.Z={add:function(e){return r.Z.post(a,e)},update:function(e,t){return r.Z.put(a+"/"+e,t)},getAll:function(){return r.Z.get(a)},getById:function(e){return r.Z.get(a+"/"+e)}}},5504:function(e,t,n){var r=n(1251),a=n(80184);t.Z=function(e){var t=e.children,n=e.isLoading;return(0,a.jsx)(a.Fragment,{children:n?(0,a.jsx)("div",{className:"text-center",children:(0,a.jsx)(r.JL,{color:"primary",size:"lg"})}):t})}},59352:function(e,t){t.Z={lighter:"#E9FCD4",light:"#AAF27F",main:"#54D62C",dark:"#229A16",darker:"#08660D"}},81420:function(e,t){var n={dev:{apiUrl:"https://localhost:7146/api"},pro:{apiUrl:"http://".concat(window.location.host,"/api")}};t.Z=n.pro},55206:function(e,t,n){var r=n(72791),a=n(61146),i=n(91523),l=n(97425),s=n(73849),c=n(80184);t.Z=function(e){var t,n,o,d,u,h,m,x,f,j,p=e.show,v=e.setShow,b=e.receipt,Z=(0,r.useRef)(null),N=(0,a.useReactToPrint)({content:function(){return Z.current}}),g=function(e){var t=Number(e).toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,"),n=t.split(".");return n.length>1&&(t=n[0]),t};return(0,c.jsx)(l.Z,{show:p,size:"xl",children:(0,c.jsxs)("div",{className:"container",id:"printTable",children:[(0,c.jsx)("div",{ref:Z,children:(0,c.jsxs)("div",{className:"card",children:[(0,c.jsxs)("div",{className:"row invoice-contact",children:[(0,c.jsx)("div",{className:"col-9",children:(0,c.jsx)("div",{className:"invoice-box row",children:(0,c.jsx)("div",{className:"col-sm-12",children:(0,c.jsx)("table",{className:"table table-responsive invoice-table table-borderless p-l-20",children:(0,c.jsxs)("tbody",{children:[(0,c.jsx)("tr",{children:(0,c.jsx)("td",{children:(0,c.jsx)("h4",{style:{fontWeight:"bold"},children:"SHABELLE BANK BUILDING"})})}),(0,c.jsx)("tr",{children:(0,c.jsx)("td",{children:"Ethopia - Jijiga, Dudahide, Qabelle 06, Zone 01 Main Road"})}),(0,c.jsx)("tr",{children:(0,c.jsx)("td",{children:(0,c.jsx)("a",{className:"text-secondary",href:"mailto:shabellerealestate@gmail.com",target:"_top",children:"shabellerealestate@gmail.com"})})}),(0,c.jsx)("tr",{children:(0,c.jsx)("td",{children:"+251929256446"})}),(0,c.jsx)("tr",{children:(0,c.jsx)("td",{children:"+251915059099"})})]})})})})}),(0,c.jsx)("div",{className:"col-3",children:(0,c.jsx)(i.rU,{to:"#",className:"b-brand",children:(0,c.jsx)("img",{src:s,width:275,height:275,className:"img-fluid",alt:"Gradient Able Logo"})})})]}),(0,c.jsxs)("div",{className:"card-body",children:[(0,c.jsxs)("div",{className:"row invoive-info",children:[(0,c.jsxs)("div",{className:"col-4 invoice-client-info",children:[(0,c.jsx)("h6",{children:"Tenant Information :"}),(0,c.jsx)("h6",{className:"m-0",children:null===b||void 0===b||null===(t=b.tenant)||void 0===t?void 0:t.name}),(0,c.jsx)("p",{className:"m-2 m-t-10",children:null===b||void 0===b||null===(n=b.tenant)||void 0===n?void 0:n.address}),(0,c.jsx)("p",{className:"mb-3",children:null===b||void 0===b||null===(o=b.tenant)||void 0===o?void 0:o.telephone})]}),(0,c.jsxs)("div",{className:"col-4",children:[" ",(0,c.jsx)("h6",{children:"Receipt Information :"}),(0,c.jsx)("table",{style:{marginTop:-5},className:"table table-responsive invoice-table invoice-order table-borderless",children:(0,c.jsxs)("tbody",{children:[(0,c.jsxs)("tr",{children:[(0,c.jsx)("th",{children:"Date :"}),(0,c.jsx)("td",{children:null===b||void 0===b||null===(d=b.receipt)||void 0===d?void 0:d.date})]}),(0,c.jsxs)("tr",{children:[(0,c.jsx)("th",{children:"Paid by :"}),(0,c.jsx)("td",{children:null===b||void 0===b||null===(u=b.receipt)||void 0===u?void 0:u.payerName})]})]})})]}),(0,c.jsxs)("div",{className:"col-4",children:[(0,c.jsxs)("h6",{className:"m-b-20",children:["Receipt Number ",(0,c.jsxs)("span",{children:["#12",null===b||void 0===b||null===(h=b.tenant)||void 0===h?void 0:h.id]})]}),(0,c.jsxs)("h6",{className:"text-uppercase text-primary",children:["Total Due :"," ",(0,c.jsxs)("span",{children:[g(null===b||void 0===b||null===(m=b.bills)||void 0===m?void 0:m.map((function(e){return e.amount})).reduce((function(e,t){return e+t}))),".00 Birr"]})]})]})]}),(0,c.jsx)("div",{className:"row",children:(0,c.jsxs)("div",{className:"col-sm-12",children:[(0,c.jsx)("h5",{style:{position:"relative",top:-7.5},children:"Paid Bills"}),(0,c.jsx)("div",{className:"table-responsive",children:(0,c.jsxs)("table",{className:"table invoice-detail-table",children:[(0,c.jsx)("thead",{children:(0,c.jsxs)("tr",{className:"thead-default",children:[(0,c.jsx)("th",{className:"text-center",children:"Description"}),(0,c.jsx)("th",{className:"text-center",children:"Due Date"}),(0,c.jsx)("th",{className:"text-center",children:"Due Amount"}),(0,c.jsx)("th",{className:"text-center",children:"Paid Amount"}),(0,c.jsx)("th",{className:"text-center",children:"Remaining Balance"})]})}),(0,c.jsx)("tbody",{children:null===b||void 0===b||null===(x=b.bills)||void 0===x?void 0:x.map((function(e){return(0,c.jsxs)("tr",{children:[(0,c.jsxs)("td",{className:"text-center",children:[(0,c.jsx)("h6",{children:e.room}),(0,c.jsx)("p",{className:"m-0",children:e.description})]}),(0,c.jsx)("td",{className:"text-center",children:new Date(e.dueDate).toLocaleDateString()}),(0,c.jsxs)("td",{className:"text-center",children:[g(e.amount),".00 BIRR"]}),(0,c.jsxs)("td",{className:"text-center",children:[" ",g(e.paidAmount),".00 BIRR"]}),(0,c.jsxs)("td",{className:"text-center",children:[" ",g(e.amount-e.paidAmount),".00 BIRR"]})]},e.id)}))})]})})]})}),(0,c.jsx)("div",{className:"row",children:(0,c.jsx)("div",{className:"col-sm-12",children:(0,c.jsx)("table",{className:"table table-responsive invoice-table invoice-total",children:(0,c.jsxs)("tbody",{children:[(0,c.jsxs)("tr",{className:"text-info",children:[(0,c.jsxs)("td",{children:[(0,c.jsx)("hr",{}),(0,c.jsx)("h5",{className:"text-primary m-r-10",children:"Total Paid :"})]}),(0,c.jsxs)("td",{children:[(0,c.jsx)("hr",{}),(0,c.jsxs)("h5",{className:"text-primary",children:[g(null===b||void 0===b||null===(f=b.bills)||void 0===f?void 0:f.map((function(e){return e.paidAmount})).reduce((function(e,t){return e+t}))),".00 Birr"]})]})]}),(0,c.jsxs)("tr",{className:"text-info",children:[(0,c.jsxs)("td",{children:[(0,c.jsx)("hr",{}),(0,c.jsx)("h5",{className:"text-primary m-r-10",children:"Remaining Balance :"})]}),(0,c.jsxs)("td",{children:[(0,c.jsx)("hr",{}),(0,c.jsxs)("h5",{className:"text-primary",children:[g(null===b||void 0===b||null===(j=b.bills)||void 0===j?void 0:j.map((function(e){return e.amount-e.paidAmount})).reduce((function(e,t){return e+t}))),".00 Birr"]})]})]})]})})})})]})]})}),(0,c.jsx)("div",{className:"row text-center btn-page",children:(0,c.jsxs)("div",{className:"col-sm-12 invoice-btn-group text-center",children:[(0,c.jsx)("button",{type:"button",className:"btn btn-primary btn-print-invoice m-b-10",onClick:N,children:"Print"}),(0,c.jsx)("button",{type:"button",className:"btn btn-secondary btn-print-invoice m-b-10",onClick:function(){return v(!1)},children:"Close"})]})})]})})}},80740:function(e,t,n){n.r(t),n.d(t,{default:function(){return H}});var r=n(1413),a=n(74165),i=n(42982),l=n(15861),s=n(70885),c=n(72791),o=n(64074),d=n(89743),u=n(2677),h=n(53392),m=n(43360),x=n(39918),f=n(87784),j=n.n(f),p=n(67352),v=n(30456),b=n(65666),Z=n(11799),N=n.n(Z),g=n(61146),y=n.n(g),D=n(79745),w=n.n(D),A=n(15284),B=n(5504),S=n(55206),R=n(97425),C=n(53717),T=n(96521),k=n(74960),M=n(18357),P=n(71971),I=n(8118),L=n(59352),z=n(80184),F=(0,C.Z)({profileIcon:{marginRight:5,color:L.Z.dark,transition:"color .15s","&:hover":{color:L.Z.main}},actionsContainer:{width:"100%",height:"100%"},formGroup:{marginBottom:25},profileContainer:{marginBottom:25},balanceContainer:{width:"100%",height:"50%",boxShadow:"0 0 5px rgba(0, 0, 0, 0.2)",borderRadius:10},price:{fontSize:21,fontWeight:"500",position:"relative",top:15},currency:{fontSize:16,fontWeight:"400",color:"rgb(99, 115, 129)",textAlign:"center"},btn:{width:"100%"}});function E(e){var t,n,r,a,i,l=e.show,s=e.setShow,c=e.receipt,o=F(),d=function(e){var t=Number(e).toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,"),n=t.split(".");return n.length>1&&(t=n[0]),t};return(0,z.jsxs)(R.Z,{show:l,centered:!0,size:"lg",children:[(0,z.jsxs)(R.Z.Header,{children:[(0,z.jsx)(R.Z.Title,{children:"Receipt detail"}),(0,z.jsx)(T.Z,{className:"float-right",onClick:function(){return s(!1)},style:{fontSize:22,color:"black"},children:(0,z.jsx)(w(),{name:"close"})})]}),(0,z.jsxs)(R.Z.Body,{children:[(0,z.jsxs)(M.Z,{className:o.formGroup,children:[(0,z.jsx)(P.Z,{children:"Tenant"}),(0,z.jsx)(I.Z,{value:null===c||void 0===c||null===(t=c.tenant)||void 0===t?void 0:t.name,disabled:!0}),(0,z.jsx)(P.Z,{children:"Telephone"}),(0,z.jsx)(I.Z,{value:null===c||void 0===c||null===(n=c.tenant)||void 0===n?void 0:n.telephone,disabled:!0})]}),(0,z.jsxs)(M.Z,{className:o.formGroup,children:[(0,z.jsx)(P.Z,{children:"Paid By"}),(0,z.jsx)(I.Z,{value:null===c||void 0===c?void 0:c.payerName,disabled:!0})]}),(0,z.jsxs)(M.Z,{className:o.formGroup,children:[(0,z.jsx)(P.Z,{children:"Payment Method"}),(0,z.jsx)(I.Z,{value:null===c||void 0===c?void 0:c.paymentMethod,disabled:!0})]}),(0,z.jsxs)(M.Z,{className:o.formGroup,children:[(0,z.jsx)(P.Z,{children:"Description"}),(0,z.jsx)("textarea",{className:"form-control",disabled:!0,rows:"5",children:null===c||void 0===c?void 0:c.description})]}),(0,z.jsx)("div",{className:"row",children:(0,z.jsxs)("div",{className:"col-sm-12",children:[(0,z.jsx)("h5",{style:{position:"relative",top:-7.5},children:"Paid Bills"}),(0,z.jsx)("div",{className:"table-responsive",children:(0,z.jsxs)("table",{className:"table invoice-detail-table",children:[(0,z.jsx)("thead",{children:(0,z.jsxs)("tr",{className:"thead-default",children:[(0,z.jsx)("th",{className:"text-center",children:"Description"}),(0,z.jsx)("th",{className:"text-center",children:"Due Date"}),(0,z.jsx)("th",{className:"text-center",children:"Due Amount"}),(0,z.jsx)("th",{className:"text-center",children:"Paid Amount"}),(0,z.jsx)("th",{className:"text-center",children:"Remaining Balance"})]})}),(0,z.jsx)("tbody",{children:null===c||void 0===c||null===(r=c.bills)||void 0===r?void 0:r.map((function(e){return(0,z.jsxs)("tr",{children:[(0,z.jsxs)("td",{className:"text-center",children:[(0,z.jsx)("h6",{children:e.room}),(0,z.jsx)("p",{className:"m-0",children:e.description})]}),(0,z.jsx)("td",{className:"text-center",children:new Date(e.dueDate).toLocaleDateString()}),(0,z.jsxs)("td",{className:"text-center",children:[d(e.amount),".00 BIRR"]}),(0,z.jsxs)("td",{className:"text-center",children:[" ",d(e.paidAmount),".00 BIRR"]}),(0,z.jsxs)("td",{className:"text-center",children:[" ",d(e.amount-e.paidAmount),".00 BIRR"]})]},e.id)}))})]})})]})}),(0,z.jsx)("div",{className:"row",children:(0,z.jsx)("div",{className:"col-sm-12",children:(0,z.jsx)("table",{className:"table table-responsive invoice-table invoice-total",children:(0,z.jsxs)("tbody",{children:[(0,z.jsxs)("tr",{className:"text-info",children:[(0,z.jsxs)("td",{children:[(0,z.jsx)("hr",{}),(0,z.jsx)("h5",{className:"text-primary m-r-10",children:"Total Paid :"})]}),(0,z.jsxs)("td",{children:[(0,z.jsx)("hr",{}),(0,z.jsxs)("h5",{className:"text-primary",children:[d(null===c||void 0===c||null===(a=c.bills)||void 0===a?void 0:a.map((function(e){return e.paidAmount})).reduce((function(e,t){return e+t}))),".00 Birr"]})]})]}),(0,z.jsxs)("tr",{className:"text-info",children:[(0,z.jsxs)("td",{children:[(0,z.jsx)("hr",{}),(0,z.jsx)("h5",{className:"text-primary m-r-10",children:"Remaining Balance :"})]}),(0,z.jsxs)("td",{children:[(0,z.jsx)("hr",{}),(0,z.jsxs)("h5",{className:"text-primary",children:[d(null===c||void 0===c||null===(i=c.bills)||void 0===i?void 0:i.map((function(e){return e.amount-e.paidAmount})).reduce((function(e,t){return e+t}))),".00 Birr"]})]})]})]})})})}),(0,z.jsx)(k.ZP,{item:!0,xl:6,lg:6,sm:6,xs:12,children:(0,z.jsx)(k.ZP,{container:!0,flexDirection:"column",className:o.actionsContainer,justifyContent:"center"})})]})]})}var G=n(3075),O=n(46827),U=n(97076),H=function(){var e,t,n=(0,c.useState)([{label:"Tenant",field:"name"},{label:"Paid By",field:"payerName"},{label:"Total Amount",field:"amount"},{label:"Method Of Payment",field:"paymentMethod"},{label:"Date",field:"date"},{label:"",field:"actions"},{label:"",field:"status"}]),f=(0,s.Z)(n,1)[0],Z=(0,c.useState)([{label:"Tenant",field:"name"},{label:"Telephone",field:"telephone"},{label:"Paid By",field:"payerName"},{label:"Total Amount",field:"amount"},{label:"Method Of Payment",field:"paymentMethod"},{label:"Date",field:"date"},{label:"",field:"actions"},{label:"",field:"status"}]),g=(0,s.Z)(Z,1)[0],D=(0,c.useState)([]),R=(0,s.Z)(D,2),C=R[0],T=R[1],k=(0,c.useState)([]),M=(0,s.Z)(k,2),P=M[0],I=M[1],L=(0,c.useState)([]),F=(0,s.Z)(L,2),H=F[0],W=F[1],$=(0,c.useState)(!0),_=(0,s.Z)($,2),J=_[0],q=_[1],K=(0,c.useState)({name:"All",endDate:"",startDate:"",paymentMethod:"All"}),Q=(0,s.Z)(K,2),V=Q[0],X=Q[1],Y=(0,c.useState)([{label:"All",value:"All"},{label:"Bank Account",value:"Bank Account"},{label:"Hello Cash",value:"Hello Cash"},{label:"Cash",value:"Cash"}]),ee=(0,s.Z)(Y,1)[0],te=(0,c.useState)(!1),ne=(0,s.Z)(te,2),re=ne[0],ae=ne[1],ie=(0,c.useState)({}),le=(0,s.Z)(ie,2),se=le[0],ce=le[1],oe=(0,c.useState)(!1),de=(0,s.Z)(oe,2),ue=de[0],he=de[1],me=(0,c.useState)(!1),xe=(0,s.Z)(me,2),fe=xe[0],je=xe[1],pe=(0,c.useState)({}),ve=(0,s.Z)(pe,2),be=ve[0],Ze=ve[1],Ne=(0,v.Z)(localStorage.token),ge=(0,c.useRef)(),ye=function(){var e=(0,l.Z)((0,a.Z)().mark((function e(){var t,n,r,l,s;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return q(!0),e.next=3,O.Z.getAll();case 3:return t=e.sent,n=t.status,r=t.data,e.next=8,U.Z.getAll();case 8:if(l=e.sent,s=l.data,q(!1),200===n){e.next=13;break}return e.abrupt("return",p.Am.error("Network Error"));case 13:T((0,i.Z)(r)),I((0,i.Z)(r)),W([{id:"All",name:"All"}].concat((0,i.Z)(s)));case 16:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),De=function(e){var t=Number(e).toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$&,"),n=t.split(".");return n.length>1&&(t=n[0]),t},we=function(e){var t=e.currentTarget;V[t.name]=t.value,X((0,r.Z)({},V)),Ae(V)},Ae=function(e){I((0,i.Z)((0,G.Z)((0,i.Z)(C),e)))},Be=function(){var e=(0,l.Z)((0,a.Z)().mark((function e(t){return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:Ze(t),je(!0);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),Se=function(){var e=(0,l.Z)((0,a.Z)().mark((function e(){return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return je(!1),I((function(e){return(0,i.Z)(e.filter((function(e){return e.id!==be.id})))})),e.next=4,O.Z.update(be.id,{});case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return(0,c.useEffect)((function(){ye()}),[]),(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(j(),{danger:!0,show:fe,closeOnClickOutside:!0,confirmBtnText:"Delete",confirmButtonColor:"green",title:"".concat(null===be||void 0===be?void 0:be.name," - ").concat(be.amount," ").concat(new Date(be.date).toLocaleDateString()),confirmBtnCssClass:"btn-danger",onCancel:function(){return je(!1)},onConfirm:function(){return Se()}}),(0,z.jsx)(E,{show:ue,receipt:be,setShow:he}),(0,z.jsx)(S.Z,{show:re,setShow:ae,receipt:se}),(0,z.jsxs)(o.Z,{children:[(0,z.jsxs)(o.Z.Header,{children:[(0,z.jsx)(o.Z.Title,{children:(0,z.jsxs)(d.Z,{children:[(0,z.jsx)(u.Z,{children:" All Payments "}),(0,z.jsxs)(u.Z,{children:[(0,z.jsx)(y(),{trigger:function(){return(0,z.jsx)("button",{type:"button",className:"btn d-print-none float-right",children:(0,z.jsx)(w(),{className:"fas fa-print",name:"print",style:{fontSize:25}})})},content:function(){return ge}}),(0,z.jsx)("div",{className:"d-none",children:(0,z.jsx)(A.Z,{data:(t=P,0===t.length?[]:t.map((function(e){return{id:e.id,name:e.tenant.name,telephone:e.tenant.telephone,payerName:e.payerName,totalAmount:"".concat(De(e.totalAmount)," Birr"),paymentMethod:e.paymentMethod,date:new Date(e.date).toLocaleDateString()}}))),theaders:g.filter((function(e){return""!==e.label})).map((function(e){return e.label})),title:"Payments Report",ref:function(e){return ge=e}})})]})]})}),(0,z.jsxs)(d.Z,{children:[(0,z.jsxs)(u.Z,{children:[(0,z.jsx)(h.Z,{children:"Tenants"}),(0,z.jsx)(b.ZP,{value:H.filter((function(e){return e.name===V.name})).map((function(e){return{label:e.name,value:e.id}})),onChange:function(e){return we({currentTarget:{name:"name",value:e.label}})},options:H.map((function(e){return{label:e.name,value:e.id}})),isLoading:J})]}),(0,z.jsxs)(u.Z,{children:[(0,z.jsx)(h.Z,{children:"Payment Method"}),(0,z.jsx)(b.ZP,{value:ee.filter((function(e){return e.value===V.paymentMethod})),onChange:function(e){return we({currentTarget:{name:"paymentMethod",value:e.label}})},options:ee,isLoading:J})]}),(0,z.jsxs)(u.Z,{children:[(0,z.jsx)(h.Z,{children:"Start Date"}),(0,z.jsx)(N(),{onChange:function(e){return we({currentTarget:{name:"startDate",value:e._d}})},value:V.startDate,timeFormat:!1,closeOnSelect:!0})]}),(0,z.jsxs)(u.Z,{children:[(0,z.jsx)(h.Z,{children:"End Date"}),(0,z.jsx)(N(),{onChange:function(e){return we({currentTarget:{name:"endDate",value:e._d}})},value:V.endDate,timeFormat:!1,closeOnSelect:!0})]})]}),(0,z.jsx)(d.Z,{children:(0,z.jsx)(u.Z,{children:(0,z.jsxs)("p",{style:{fontSize:18,position:"relative",top:10},children:["Total Income:"," ",P.length>0?De(null===P||void 0===P||null===(e=P.map((function(e){return e.totalAmount})))||void 0===e?void 0:e.reduce((function(e,t){return e+t}))):0," ","BIRR"]})})})]}),(0,z.jsx)(o.Z.Body,{children:(0,z.jsx)(B.Z,{isLoading:J,children:(0,z.jsx)(x.Vm4,{data:{columns:f,rows:(0,i.Z)(P.map((function(e){return e.actions=(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(m.Z,{className:"btn-light btn-sm mr-4",onClick:function(){return function(e){he(!0),Ze(e)}(e)},children:(0,z.jsx)(w(),{name:"eye text-secondary",style:{fontSize:17}})}),"admin"===Ne.role?(0,z.jsx)(m.Z,{className:"btn-light btn-sm mr-4",onClick:function(){return Be(e)},children:(0,z.jsx)(w(),{name:"trash text-danger",style:{fontSize:17}})}):null,(0,z.jsx)(m.Z,{className:"btn-light btn-sm mr-4",onClick:function(){return function(e){ce((0,r.Z)((0,r.Z)({},e),{},{receipt:{date:e.date,payerName:e.payerName}})),ae(!0)}(e)},children:(0,z.jsx)(w(),{name:"print text-primary",style:{fontSize:17}})})]}),e.amount="".concat(De(e.totalAmount)," Birr"),e.date=new Date(e.date).toDateString(),e})))},searchTop:!0,pagingTop:!1,searchBottom:!1,entriesOptions:[5,10,25,50,100,250,500,1e3]})})})]})]})}},62591:function(e,t,n){var r=n(87462),a=n(63366),i=n(60654),l=n.n(i),s=n(72791),c=n(10162),o=["bsPrefix","className","striped","bordered","borderless","hover","size","variant","responsive"],d=s.forwardRef((function(e,t){var n=e.bsPrefix,i=e.className,d=e.striped,u=e.bordered,h=e.borderless,m=e.hover,x=e.size,f=e.variant,j=e.responsive,p=(0,a.Z)(e,o),v=(0,c.vE)(n,"table"),b=l()(i,v,f&&v+"-"+f,x&&v+"-"+x,d&&v+"-striped",u&&v+"-bordered",h&&v+"-borderless",m&&v+"-hover"),Z=s.createElement("table",(0,r.Z)({},p,{className:b,ref:t}));if(j){var N=v+"-responsive";return"string"===typeof j&&(N=N+"-"+j),s.createElement("div",{className:N},Z)}return Z}));t.Z=d},73849:function(e,t,n){e.exports=n.p+"static/media/Shebelle.f71562d6af0072864cc4.jpg"}}]);
//# sourceMappingURL=740.7129972c.chunk.js.map