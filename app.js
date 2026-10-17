let language='de';
for(const lang of ['de','en'])document.getElementById(lang).addEventListener('click',()=>{
 language=lang;document.documentElement.lang=lang;
 document.querySelectorAll('[data-de]').forEach(el=>{el.replaceChildren(...el.dataset[lang].split('<br>').flatMap((line,i)=>i?[document.createElement('br'),document.createTextNode(line)]:[document.createTextNode(line)]));});
 for(const choice of ['de','en'])document.getElementById(choice).setAttribute('aria-pressed',String(choice===lang));
 document.getElementById('share-message').textContent='';
});
document.getElementById('share').addEventListener('click',async()=>{
 const status=document.getElementById('share-message');
 if(!/^https:$/.test(location.protocol)||location.hostname==='localhost'){status.textContent=language==='de'?'Der öffentliche Projektlink steht nach der Veröffentlichung bereit.':'The public project link will be ready after publication.';return;}
 try{if(navigator.share){await navigator.share({title:'FMNT Sonic Perception Lab',url:location.href});}else{await navigator.clipboard.writeText(location.href);status.textContent=language==='de'?'Projektlink kopiert.':'Project link copied.';}}catch(error){if(error.name!=='AbortError')status.textContent=language==='de'?'Bitte kopiere den Link aus der Adresszeile.':'Please copy the link from your address bar.';}
});
