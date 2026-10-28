const Gen=(()=>{
const R=s=>()=>{s|=0;s=s+0x6D2B79F5|0;let t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};
const ri=(r,a,b)=>a+Math.floor(r()*(b-a+1)),pick=(r,a)=>a[Math.floor(r()*a.length)],rn=(r,a,b,s)=>Math.round((a+r()*(b-a))/s)*s;
const f=n=>typeof n=='number'?n.toLocaleString('en-US',{maximumFractionDigits:2}):n;
const sg=n=>n<0?`- ${-n}`:`+ ${n}`;
const sh=(r,a)=>a.map(x=>[r(),x]).sort((p,q)=>p[0]-q[0]).map(x=>x[1]);
const NM=['Tinashe Traders','Rudo Enterprises','Chipo Stores','Farai Hardware','Nyasha Wholesalers','Tendai Motors','Kuda Clothing','Tafara Bakery'];
const PP=['Tinashe','Rudo','Farai','Chipo','Tendai','Nyasha','Kudzai','Tatenda'];
const td=(x,i)=>`<td${i?' class="r"':''}>${f(x)}</td>`;
const tbl=(h,rows,tot)=>`<table class="t"><tr>${h.map((x,i)=>`<th${i?' class="r"':''}>${x}</th>`).join('')}</tr>${rows.map(w=>`<tr>${w.map(td).join('')}</tr>`).join('')}${tot?`<tr class="tot">${tot.map(td).join('')}</tr>`:''}</table>`;
const pm=M=>`\\begin{pmatrix}${M[0][0]}&${M[0][1]}\\\\${M[1][0]}&${M[1][1]}\\end{pmatrix}`;

/* ---------- MATHS (random solvable numbers, answers computed) ---------- */
const T={
lin(r){const x=ri(r,-6,12),a=ri(r,2,9),b=ri(r,1,15),c=a*x+b;return[`Solve $${a}x + ${b} = ${c}$.`,`$${a}x = ${c-b}$, so $x = ${x}$.`]},
quad(r){const p=ri(r,1,8),q=-ri(r,1,8),b=-(p+q),c=p*q;return[`Solve by factorisation: $x^2 ${b?sg(b)+'x ':''}${sg(c)} = 0$.`,`$(x ${sg(-p)})(x ${sg(-q)}) = 0$, so $x = ${p}$ or $x = ${q}$.`]},
sim(r){const x=ri(r,1,9),y=ri(r,1,9);let a=ri(r,1,5),b=ri(r,1,5),c=ri(r,1,5),d=-ri(r,1,4);while(a*d-b*c==0)a++;return[`Solve simultaneously: $${a}x + ${b}y = ${a*x+b*y}$ and $${c}x ${sg(d)}y = ${c*x+d*y}$.`,`Using elimination: $x = ${x}$ and $y = ${y}$.`]},
pct(r){const P=ri(r,5,50)*100,k=ri(r,5,15),n=ri(r,2,4),A=+(P*Math.pow(1+k/100,n)).toFixed(2);return[`RTGS $${P}$ is invested at $${k}\\%$ per annum compound interest for $${n}$ years. Calculate the final amount and the interest earned.`,`$A = ${P}(1+\\frac{${k}}{100})^{${n}} = ${f(A)}$; interest $= ${f(+(A-P).toFixed(2))}$.`]},
seq(r){const d=ri(r,2,9),a=d+ri(r,1,12),k=ri(r,15,40);return[`A sequence begins $${a}, ${a+d}, ${a+2*d}, ${a+3*d}, \\ldots$ Find (i) the $n$th term, (ii) the ${k}$th term.`,`$T_n = ${d}n + ${a-d}$; $T_{${k}} = ${a+(k-1)*d}$.`]},
circ(r){const k=ri(r,1,3);return[`A circle has radius $${7*k}$ cm. Using $\\pi = \\frac{22}{7}$, calculate (i) the circumference, (ii) the area.`,`$C = 2\\pi r = ${44*k}$ cm; $A = \\pi r^2 = ${154*k*k}$ cm$^2$.`]},
pyth(r){const t=pick(r,[[3,4,5],[5,12,13],[8,15,17],[7,24,25],[20,21,29]]),k=ri(r,1,3),a=t[0]*k,b=t[1]*k;return[`In triangle $ABC$, $\\angle B = 90^\\circ$, $AB = ${a}$ cm and $BC = ${b}$ cm. Calculate (i) $AC$, (ii) angle $ACB$ to 1 d.p.`,`$AC = \\sqrt{${a}^2 + ${b}^2} = ${t[2]*k}$ cm; $\\tan C = \\frac{${a}}{${b}}$, so $C = ${(Math.atan(a/b)*180/Math.PI).toFixed(1)}^\\circ$.`]},
mean(r){const a=Array.from({length:7},()=>ri(r,2,20)),s=[...a].sort((x,y)=>x-y),S=a.reduce((x,y)=>x+y);return[`The marks of 7 learners are $${a.join(', ')}$. Find (i) the mean (1 d.p.), (ii) the median, (iii) the range.`,`Mean $= \\frac{${S}}{7} = ${(S/7).toFixed(1)}$; median $= ${s[3]}$; range $= ${s[6]-s[0]}$.`]},
var(r){const k=ri(r,2,6),x=ri(r,2,4),X=ri(r,5,9);return[`$y$ varies directly as the square of $x$. When $x = ${x}$, $y = ${k*x*x}$. Find $y$ when $x = ${X}$.`,`$y = kx^2$, $k = ${k}$; $y = ${k*X*X}$.`]},
mat(r){const g=()=>[[ri(r,1,6),ri(r,1,6)],[ri(r,1,6),ri(r,1,6)]],A=g(),B=g(),P=[[A[0][0]*B[0][0]+A[0][1]*B[1][0],A[0][0]*B[0][1]+A[0][1]*B[1][1]],[A[1][0]*B[0][0]+A[1][1]*B[1][0],A[1][0]*B[0][1]+A[1][1]*B[1][1]]];return[`Given $A = ${pm(A)}$ and $B = ${pm(B)}$, find (i) $AB$, (ii) $\\det A$.`,`$AB = ${pm(P)}$; $\\det A = ${A[0][0]*A[1][1]-A[0][1]*A[1][0]}$.`]},
sets(r){const a=ri(r,8,25),b=ri(r,8,25),c=ri(r,2,Math.min(a,b)-1),n=ri(r,1,8),N=a+b-c+n;return[`In a class of $${N}$ learners, $${a}$ study Maths, $${b}$ study Accounts and $${c}$ study both. How many study neither?`,`$n(M \\cup A) = ${a} + ${b} - ${c} = ${a+b-c}$; neither $= ${N} - ${a+b-c} = ${n}$.`]}};
const MT=[[/Percent|Consumer|Number/,'pct'],[/Quadratic|Factoris/,'quad'],[/Simultaneous/,'sim'],[/Linear|Inequal|Algebra/,'lin'],[/Sequence/,'seq'],[/Mensuration|Circle/,'circ'],[/Trig|Geometry|Bearing|Transformation/,'pyth'],[/Statistic/,'mean'],[/Variation/,'var'],[/Matri|Vector/,'mat'],[/Sets/,'sets']];
function maths(r,topic,m){const k=(MT.find(x=>x[0].test(topic))||[0,pick(r,Object.keys(T))])[1],p=Math.min(4,Math.max(1,Math.ceil(m/4))),b=Math.floor(m/p);let q='',a='';
for(let i=0;i<p;i++){const mk=i<p-1?b:m-(p-1)*b,L='('+String.fromCharCode(97+i)+') ',[x,y]=T[k](r);q+=`<p>${L}${x} <b>[${mk}]</b></p>`;a+=`<p>${L}${y} <b>[${mk}]</b></p>`}return[q,a]}

/* ---------- ACCOUNTS (Dr always = Cr) ---------- */
function generateBalancedTB(r){const os=rn(r,3000,12000,500),pur=rn(r,15000,40000,500),ci=rn(r,300,1500,100),wg=rn(r,2000,9000,100),rt=rn(r,1000,4000,100),fa=rn(r,25000,60000,1000),db=rn(r,2000,9000,100),bk=rn(r,1000,9000,100),dw=rn(r,2000,6000,100),cr=rn(r,2000,8000,100),cs=rn(r,3000,12000,500);
const sales=os+pur+ci-cs+wg+rt+rn(r,8000,20000,500);
const dr=[['Opening inventory',os],['Purchases',pur],['Carriage inwards',ci],['Wages',wg],['Rent',rt],['Equipment',fa],['Trade receivables',db],['Bank',bk],['Drawings',dw]],tot=dr.reduce((s,x)=>s+x[1],0),cap=tot-sales-cr;
return{dr,cr:[['Sales',sales],['Trade payables',cr],['Capital',cap]],tot,v:{os,pur,ci,wg,rt,fa,db,bk,dw,cr,cs,sales,cap}}}
const tbRows=t=>[...t.dr.map(x=>[x[0],x[1],'']),...t.cr.map(x=>[x[0],'',x[1]])];
function fa(r,nm,m){const t=generateBalancedTB(r),v=t.v,gp=v.sales-(v.os+v.pur+v.ci-v.cs),np=gp-v.wg-v.rt,a=Math.round(m*.4),b=Math.round(m*.2);
return[`<p><b>${nm}</b> - Trial balance as at 31 December 2025 (RTGS$)</p>${tbl(['Account','Dr','Cr'],tbRows(t),['Total',t.tot,t.tot])}<p>Closing inventory at 31 December 2025 was RTGS$${f(v.cs)}.</p><p>Prepare the trading account, the profit and loss account for the year, and the balance sheet as at 31 December 2025. <b>[${m}]</b></p>`,
`<p><b>Trading account [${a}]</b></p>${tbl(['Particulars','Dr','Cr'],[['Opening inventory',v.os,''],['Purchases',v.pur,''],['Carriage inwards',v.ci,''],['Closing inventory','',v.cs],['Sales','',v.sales],['Gross profit c/d',gp,'']],['Total',v.os+v.pur+v.ci+gp,v.sales+v.cs])}
<p><b>Profit and loss account [${b}]</b></p>${tbl(['Particulars','Dr','Cr'],[['Gross profit b/d','',gp],['Wages',v.wg,''],['Rent',v.rt,''],['Net profit',np,'']],['Total',v.wg+v.rt+np,gp])}
<p><b>Balance sheet [${m-a-b}]</b></p>${tbl(['Particulars','Assets (Dr)','Capital and liabilities (Cr)'],[['Equipment',v.fa,''],['Closing inventory',v.cs,''],['Trade receivables',v.db,''],['Bank',v.bk,''],['Capital','',v.cap],['Add net profit','',np],['Less drawings','',-v.dw],['Trade payables','',v.cr]],['Total',v.fa+v.cs+v.db+v.bk,v.cap+np-v.dw+v.cr])}`]}
function tbq(r,nm,m){const t=generateBalancedTB(r);
return[`<p>The following balances were extracted from the books of <b>${nm}</b> on 31 December 2025 (RTGS$). Prepare the trial balance. <b>[${m}]</b></p>${tbl(['Account','Balance'],sh(r,[...t.dr,...t.cr]))}`,
`${tbl(['Trial balance','Dr','Cr'],tbRows(t),['Total',t.tot,t.tot])}<p>Marking: 1 mark per correct account in the correct column, 1 mark for equal totals.</p>`]}
function partner(r,m){const[n1,n2]=sh(r,PP),rt=pick(r,[[3,2],[2,1],[1,1],[3,1]]),ca=rn(r,20000,60000,5000),cb=rn(r,20000,60000,5000),pc=pick(r,[5,10]),sal=rn(r,3000,9000,1000),ia=ca*pc/100,ib=cb*pc/100,res=ri(r,4,14)*500*(rt[0]+rt[1]),np=ia+ib+sal+res,s1=res*rt[0]/(rt[0]+rt[1]),s2=res-s1;
return[`<p><b>${n1}</b> and <b>${n2}</b> are in partnership and share residual profits ${rt[0]}:${rt[1]}. Net profit for the year ended 31 December 2025 was RTGS$${f(np)}. Capital balances: ${n1} RTGS$${f(ca)}, ${n2} RTGS$${f(cb)}. Interest on capital is ${pc}% per annum. ${n2} is entitled to a salary of RTGS$${f(sal)}.</p><p>Prepare the appropriation account for the year. <b>[${m}]</b></p>`,
tbl(['Appropriation account','Dr','Cr'],[['Net profit','',np],['Interest on capital - '+n1,ia,''],['Interest on capital - '+n2,ib,''],['Salary - '+n2,sal,''],['Share of profit - '+n1,s1,''],['Share of profit - '+n2,s2,'']],['Total',np,np])]}
function manuf(r,nm,m){const ro=rn(r,2000,8000,500),rp=rn(r,20000,50000,500),rc=rn(r,2000,8000,500),dw=rn(r,8000,20000,500),pw=rn(r,1000,4000,100),fr=rn(r,1000,5000,100),dp=rn(r,1000,4000,100),wo=rn(r,1000,5000,500),wc=rn(r,1000,5000,500),un=rn(r,2000,5000,100),rm=ro+rp-rc,pr=rm+dw,tc=pr+pw+fr+dp,cp=tc+wo-wc;
return[`<p><b>${nm}</b> manufactures school uniforms. For the year ended 31 December 2025 (RTGS$): raw materials 1 Jan ${f(ro)}, 31 Dec ${f(rc)}; purchases of raw materials ${f(rp)}; direct wages ${f(dw)}; factory power ${f(pw)}; factory rent ${f(fr)}; depreciation of machinery ${f(dp)}; work in progress 1 Jan ${f(wo)}, 31 Dec ${f(wc)}; units completed ${f(un)}.</p><p>Prepare the manufacturing account showing prime cost and cost of production, and calculate the cost per unit. <b>[${m}]</b></p>`,
tbl(['Manufacturing account','RTGS$'],[['Opening raw materials',ro],['Add purchases',rp],['Less closing raw materials',-rc],['Raw materials consumed',rm],['Direct wages',dw],['PRIME COST',pr],['Factory power',pw],['Factory rent',fr],['Depreciation of machinery',dp],['Total factory cost',tc],['Add opening WIP',wo],['Less closing WIP',-wc],['COST OF PRODUCTION',cp]])+`<p>Cost per unit = ${f(cp)} / ${f(un)} = RTGS$${f(+(cp/un).toFixed(2))}</p>`]}
function acc(r,topic,m){const nm=pick(r,NM);
if(/Manufactur/.test(topic))return manuf(r,nm,m);if(/Partnership/.test(topic))return partner(r,m);
if(/Trial|Ledger|Double|Journal|Cash|Original|Source|Concept|Nature|Error|Bank|Control/.test(topic))return tbq(r,nm,m);return fa(r,nm,m)}

/* ---------- BUSINESS ---------- */
function business(r,topic,m){const nm=pick(r,NM),ow=pick(r,PP),tn=pick(r,['Mutare','Gweru','Bulawayo','Harare','Masvingo','Chinhoyi','Bindura']),s1=rn(r,8000,20000,500),s2=Math.round(s1*ri(r,50,75)/10000)*100,
pb=pick(r,['competitors opened nearby','input prices rose sharply','customers are slow to pay','several skilled workers left','power cuts disrupt operations']),
b=Math.max(m-2,0)>4?4:Math.max(m-2,0),c=m-2-b,l1=Math.ceil(c/3),l2=Math.ceil(2*c/3);
return[`<p><b>Case study:</b> ${nm} is a small business in ${tn}, started by ${ow} in ${ri(r,2008,2020)}, employing ${ri(r,4,30)} workers. Monthly sales fell from RTGS$${f(s1)} to RTGS$${f(s2)} because ${pb}.</p><p>(a) Define the term "${topic}". <b>[2]</b></p>${b?`<p>(b) Explain two ways in which ${topic} can help ${nm}. <b>[${b}]</b></p>`:''}${c>0?`<p>(c) Discuss what ${ow} should do to recover sales, with reference to ${topic}. <b>[${c}]</b></p>`:''}`,
`<p>(a) 1 mark partial definition; 2 marks full, accurate definition of ${topic}.</p>${b?`<p>(b) Two points, ${b/2} marks each: 1 for identifying a way, the rest for explaining it with reference to ${nm}.</p>`:''}${c>0?`<p>(c) Level of response marking:</p>${tbl(['Level','Marks','Descriptor'],[['1',`1-${l1}`,'Identifies relevant points; little or no reference to the case'],['2',`${l1+1}-${l2}`,'Explains points with some use of case evidence'],['3',`${l2+1}-${c}`,'Balanced discussion; justified judgement using the case figures']])}`:''}`]}

function make(o){const r=R(o.seed||1),m=Math.max(2,+o.marks||10),x=o.subject=='Maths'?maths(r,o.topic,m):o.subject=='Accounts'?acc(r,o.topic,m):business(r,o.topic,m);return{...o,marks:m,q:x[0],memo:x[1]}}
function variants(o,n){const b=Date.now()%100000;return Array.from({length:n},(_,i)=>make({...o,seed:b+i*7919+1}))}
return{make,variants,generateBalancedTB}})();
