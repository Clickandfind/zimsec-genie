const C='zg-v1',A=['./','index.html','generate.html','exam.html','schemes.html','css/style.css','js/app.js','js/generator.js','js/supabase.js','manifest.json'],
X=['https://cdn.tailwindcss.com','https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2','https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css','https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js','https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js','https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>Promise.allSettled([...A.map(u=>c.add(u)),...X.map(u=>c.add(new Request(u,{mode:'no-cors'})))])));self.skipWaiting()});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=C).map(x=>caches.delete(x))))));
self.addEventListener('fetch',e=>{const u=e.request.url;if(e.request.method!='GET'||u.includes('supabase.co'))return;
e.respondWith(caches.match(e.request).then(h=>h||fetch(e.request).then(r=>{const c=r.clone();caches.open(C).then(ch=>ch.put(e.request,c));return r}).catch(()=>caches.match('index.html'))))});
