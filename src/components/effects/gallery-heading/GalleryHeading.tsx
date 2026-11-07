"use client";
import { useMemo } from "react";
import source from "./gallery-heading.source.html?raw";

function buildScene() {
  const matteTextures = `
var TEX = (function(){
  var palette=["#e8e3d8","#252b35","#b94e3c","#3c6659","#d2c9b9","#53627d","#d9a65f","#15181d","#9da99a","#f0eee8","#697780","#87483d"];
  function hash(x,y,s){var n=Math.imul(x^s,0x45d9f3b);n=Math.imul(n^(n>>>16)^y,0x45d9f3b);return ((n^(n>>>16))>>>0)/4294967295;}
  function sm(t){return t*t*(3-2*t);}
  function noise(x,y,s){var ix=Math.floor(x),iy=Math.floor(y),fx=sm(x-ix),fy=sm(y-iy),a=hash(ix,iy,s),b=hash(ix+1,iy,s),c=hash(ix,iy+1,s),d=hash(ix+1,iy+1,s);return (a+(b-a)*fx)*(1-fy)+(c+(d-c)*fx)*fy;}
  var front=[],back=[];
  for(var i=0;i<palette.length;i++){
    var base=[parseInt(palette[i].slice(1,3),16),parseInt(palette[i].slice(3,5),16),parseInt(palette[i].slice(5,7),16)];
    var c=mkc(TS,TS),x=c.getContext("2d"),data=x.createImageData(TS,TS);
    for(var py=0;py<TS;py++)for(var px=0;px<TS;px++){
      var u=px/TS,v=py/TS,n=noise(u*8,v*8,0x2c41+i*9176)*.58+noise(u*19+7,v*19+3,0x51f3+i*137)*.27+noise(u*43+13,v*43+5,0x77a3+i*31)*.15;
      var shade=(n-.5)*.28+(0.5-v)*.035+(hash(px,py,0x51f3+i*17)-.5)*.045,o=(py*TS+px)*4;
      for(var ch=0;ch<3;ch++)data.data[o+ch]=Math.max(0,Math.min(255,base[ch]*(1+shade)));
      data.data[o+3]=255;
    }
    x.putImageData(data,0,0);front.push(c);
    var d=mkc(TS,TS),y=d.getContext("2d");y.drawImage(c,0,0);y.globalCompositeOperation="multiply";y.fillStyle="rgba(8,10,18,.42)";y.fillRect(0,0,TS,TS);back.push(d);
  }
  return {front:front,back:back};
})();
`;
  let html=source
    .replace("<title>New Grainient Collection Added — motion</title>","<title>Certificates — Gallery Heading</title>")
.replace("var SANS = '\"Helvetica Neue\",Helvetica,\"Inter\",Arial,system-ui,sans-serif';", "var SANS = 'Georgia,serif';")
    .replace("{ s:'NEW GRAINIENT',    top:930,  w:1370, fill:'#d0d0d0' }","{ s:'CERTIFICATES',    top:930,  w:1450, fill:'#c6c6c6' }")
    .replace("{ s:'COLLECTION ADDED', top:1114, w:1775, fill:'#ffffff' }","{ s:'& ACHIEVEMENTS', top:1114, w:1680, fill:'#ffffff' }")
    .replace("var TEX = buildTextures();",matteTextures)
    .replace("var pA = project([C[0]+AXIS[0]*h, C[1]+AXIS[1]*h, C[2]+AXIS[2]*h]);","var pA = project([C[0]+AXIS[0]*h*0.75, C[1]+AXIS[1]*h*0.75, C[2]+AXIS[2]*h*0.75]);");
  const a=html.indexOf("var t0 = performance.now(), tNow = 0, playing = true;");
  const b=html.indexOf("window.__DUR = DUR;",a);
  if(a<0||b<0) throw new Error("Could not locate canonical renderer clock");
  const clock=`
var tNow=0,rate=0,last=performance.now(),hovering=false;
var reduceMotion=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;
function setHover(v){hovering=!!v&&!reduceMotion;}
cv.addEventListener("pointerenter",function(){setHover(true);});
cv.addEventListener("pointermove",function(){setHover(true);});
cv.addEventListener("pointerleave",function(){setHover(false);});
cv.addEventListener("pointercancel",function(){setHover(false);});
window.addEventListener("blur",function(){setHover(false);});
document.addEventListener("visibilitychange",function(){last=performance.now();});
if(window.matchMedia){var mq=window.matchMedia("(prefers-reduced-motion: reduce)");if(mq.addEventListener)mq.addEventListener("change",function(e){reduceMotion=e.matches;if(reduceMotion){rate=0;setHover(false);render(tNow);}});}
function frame(now){var dt=Math.min(.05,Math.max(0,(now-last)/1000));last=now;if(document.visibilityState!=="hidden"){rate+=( (hovering?1:0)-rate )*(1-Math.exp(-dt/.48));if(rate>.0003){tNow=(tNow+dt*rate)%DUR;render(tNow);}else if(rate!==0){rate=0;render(tNow);}}requestAnimationFrame(frame);}
window.addEventListener("resize",function(){resize();render(tNow);});resize();render(tNow);requestAnimationFrame(frame);
window.__DUR=DUR;
window.__pause=function(){setHover(false);rate=0;render(tNow);};
`;
  return html.slice(0,a)+clock+html.slice(b+"window.__DUR = DUR;".length);
}

export function GalleryHeading(){
 const srcDoc=useMemo(()=>buildScene(),[]);
 return <div className="certificate-gallery-heading" aria-label="Certificates gallery heading">
  <iframe title="Certificates gallery heading animation" srcDoc={srcDoc} sandbox="allow-scripts" loading="eager" tabIndex={-1} aria-hidden="true"/>
 </div>;
}
