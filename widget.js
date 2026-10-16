// ProofWall widget.js - embeddable, zero-dependency, sellable asset
// Usage: <div id="proofwall"></div> + <script src="widget.js" data-theme="#7c5cff"></script>
// Or: ProofWallRender(el, dataArray)

(function(){
function star(n){let s='';for(let i=0;i<5;i++){s+= i<n?'★':'☆';}return s;}
function esc(s){return String(s||'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));}
function cardStyle(theme){
return 'background:#fff;color:#111;border:1px solid #e8e8ef;border-radius:14px;padding:18px;font-family:Inter,system-ui,sans-serif;box-shadow:0 4px 20px rgba(0,0,0,.06);';
}
window.ProofWallCard=function(t,theme){
theme=theme||'#7c5cff';
const d=document.createElement('div');
d.setAttribute('style',cardStyle(theme));
const initial=esc((t.name||'A')[0].toUpperCase());
d.innerHTML='<div style="color:#ffcf3d;font-size:15px;letter-spacing:2px">'+star(t.stars||5)+'</div>'
+'<p style="margin:10px 0;font-size:15px;line-height:1.5">"'+esc(t.text)+'"</p>'
+'<div style="display:flex;align-items:center;gap:10px;margin-top:8px">'
+'<div style="width:36px;height:36px;border-radius:50%;background:'+theme+';color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700">'+initial+'</div>'
+'<div><div style="font-weight:700;font-size:14px">'+esc(t.name)+'</div>'
+'<div style="font-size:12px;color:#666">'+esc(t.role||'')+'</div></div></div>';
return d;
};
window.ProofWallRender=function(elId,data,opts){
opts=opts||{};
const el=typeof elId==='string'?document.getElementById(elId):elId;
if(!el)return;
el.style.display='grid';
el.style.gap='12px';
el.style.gridTemplateColumns='repeat(auto-fit,minmax(240px,1fr))';
el.innerHTML='';
(data||[]).forEach(t=>el.appendChild(window.ProofWallCard(t,opts.theme)));
if(!(data||[]).length){el.innerHTML='<p style="color:#888;font-family:sans-serif">No testimonials yet. Add first love →</p>';}
};
// auto-render if data-testimonials attr present
document.addEventListener('DOMContentLoaded',()=>{
document.querySelectorAll('#proofwall').forEach(elm=>{
try{
const raw=elm.getAttribute('data-testimonials');
if(raw){const arr=JSON.parse(raw);const theme=elm.getAttribute('data-theme')||document.currentScript?.getAttribute('data-theme')||'#7c5cff';window.ProofWallRender(elm,arr,{theme});}
}catch(e){console.error('ProofWall parse error',e);}
});
});
})();
