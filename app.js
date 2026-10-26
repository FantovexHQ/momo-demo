/* ===== CONFIG: yahin se sab details badlo (owner confirm ke baad) ===== */
const CFG={
 brand:"MOM MOM",sub:"MOMOS & MORE",
 wa:"91XXXXXXXXXX",            // WhatsApp number: country code ke saath, bina + ke
 phone:"+91XXXXXXXXXX",
 address:"Address yahan likhein — owner se confirm karein",
 hours:"10:45 AM – 10:00 PM (confirm karein)",
 insta:"https://www.instagram.com/mommomosofficial/",
 mapEmbed:"https://www.google.com/maps?q=Kankarbagh,Patna&output=embed", // Google Maps > Share > Embed map ka src yahan
 mapLink:"https://www.google.com/maps?q=Kankarbagh,Patna",
 pricesVerified:false           // owner confirm kare to true kar do
};
const MENU=[{cat:"Veg Momos",items:[
 ["Veg Steamed",80,145],["Veg Fried",90,160],["Veg Peri Peri Fried",120,215],["Veg Schezwan",130,235],
 ["Veg Kurkure",140,250],["Veg Tandoori",150,270],["Veg Afghani",160,290]]}];
const PAGES=[["index.html","Home","🏠","Home"],["menu.html","Menu & Prices","🍜","Menu"],["orders.html","Orders","🛒","Orders"],["contact.html","Contact","📍","Contact"]];
const WA_SVG='<svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.2 14.1c-.2.6-1.300 1.200-1.800 1.200-.5.1-1 .2-3.300-.7-2.800-1.200-4.600-4-4.700-4.200-.1-.2-1.100-1.500-1.100-2.800s.7-2 1-2.300c.2-.3.500-.3.700-.3h.5c.2 0 .4 0 .6.500l.9 2.100c.1.200.1.400 0 .5l-.4.600-.5.500c-.2.200-.3.300-.1.600.2.300.8 1.300 1.700 2.100 1.200 1 2.100 1.300 2.400 1.500.3.100.5.100.6-.1l.9-1.100c.2-.3.400-.2.700-.1l2 1c.3.1.5.2.5.400.1.100.1.600-.1 1.200z"/></svg>';
const wa=t=>`https://wa.me/${CFG.wa}?text=${encodeURIComponent(t)}`;
const cur=location.pathname.split("/").pop()||"index.html";
const link=(p,short)=>`<a href="${p[0]}" class="${p[0]===cur?"on":""}"><span>${p[2]}</span>${short?p[3]:p[1]}</a>`;
document.body.insertAdjacentHTML("afterbegin",
`<header class="top"><a class="brand" href="index.html">${CFG.brand}<small>${CFG.sub}</small></a><button id="mb" aria-label="Open menu">☰</button></header>
<div id="ov"></div><aside id="dr"><button id="cl" aria-label="Close menu">✕</button><nav>${PAGES.map(p=>link(p)).join("")}<a href="${CFG.insta}" target="_blank" rel="noopener"><span>📸</span>Instagram</a></nav></aside>`);
document.body.insertAdjacentHTML("beforeend",
`<footer><b>${CFG.brand}</b><br>${CFG.sub}<br>${CFG.address}<br>© ${new Date().getFullYear()} ${CFG.brand}</footer>
<nav class="bot">${PAGES.map(p=>link(p,1)).join("")}<a href="${CFG.insta}" target="_blank" rel="noopener"><span>📸</span>Insta</a></nav>
<a class="wa" href="${wa("Hi! I want to order momos.")}" target="_blank" rel="noopener" aria-label="WhatsApp">${WA_SVG}</a>`);
const tg=o=>document.body.classList.toggle("open",o);
mb.onclick=()=>tg(1);cl.onclick=ov.onclick=()=>tg(0);
document.querySelectorAll("[data-wa]").forEach(a=>a.href=wa(a.dataset.wa));
document.querySelectorAll("[data-cfg]").forEach(e=>e.textContent=CFG[e.dataset.cfg]);
document.querySelectorAll(".sl").forEach(s=>{const t=s.querySelector(".tr");
 s.querySelector(".l").onclick=()=>t.scrollBy({left:-t.clientWidth*.8,behavior:"smooth"});
 s.querySelector(".r").onclick=()=>t.scrollBy({left:t.clientWidth*.8,behavior:"smooth"});});
const note=()=>CFG.pricesVerified?"":'<div class="note">⚠️ Prices abhi owner se confirm hone baaki hain.</div>';
const m=document.getElementById("menu");
if(m){m.innerHTML=note()+MENU.map(c=>`<h3 class="mh">${c.cat}</h3>`+c.items.map(i=>
 `<div class="row"><b>${i[0]}</b><span class="pr">6 pcs ₹${i[1]}<br>12 pcs ₹${i[2]}</span></div>`).join("")).join("")+
 '<a class="btn" href="orders.html">Order karo</a>';}
const od=document.getElementById("orders");
if(od){const L=[];MENU.forEach(c=>c.items.forEach(i=>{L.push([i[0]+" (6 pcs)",i[1]]);L.push([i[0]+" (12 pcs)",i[2]]);}));
 const q=L.map(()=>0);
 od.innerHTML=note()+'<input class="in" id="nm" placeholder="Aapka naam (optional)">'+L.map((x,k)=>
 `<div class="row"><b>${x[0]}<br><span class="pr">₹${x[1]}</span></b><div class="q"><button data-k="${k}" data-d="-1">−</button><span id="q${k}">0</span><button data-k="${k}" data-d="1">+</button></div></div>`).join("")+
 '<div class="tot"><span id="tt">Total ₹0</span><a class="btn" id="go" href="#">WhatsApp pe bhejo</a></div><p class="sub" style="margin-top:10px">Order tab confirm hoga jab outlet WhatsApp par reply karega.</p>';
 const up=()=>{let t=0,s=[];L.forEach((x,k)=>{if(q[k]){t+=q[k]*x[1];s.push(`${q[k]} x ${x[0]} = ₹${q[k]*x[1]}`)}});
  tt.textContent="Total ₹"+t;const n=document.getElementById("nm").value;
  go.href=wa(`Hi! ${n?"Name: "+n+"\n":""}Mera order:\n${s.join("\n")||"(kuch select nahi kiya)"}\nTotal: ₹${t}`);};
 od.onclick=e=>{const b=e.target.closest("button[data-k]");if(!b)return;const k=+b.dataset.k;q[k]=Math.max(0,q[k]+ +b.dataset.d);document.getElementById("q"+k).textContent=q[k];up();};
 nm.oninput=up;up();}
document.querySelectorAll("[data-map]").forEach(f=>f.src=CFG.mapEmbed);
