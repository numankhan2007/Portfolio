"use client";
import {useState} from "react";
import {motion} from "framer-motion";
import {Lightbox} from "@/components/ui/Lightbox";
import {GalleryHeading} from "@/components/effects/gallery-heading/GalleryHeading";
import {certificates,CertificateItem} from "@/data/certificates";
import "@/components/effects/gallery-heading/styles.css";

export function Certificates(){
 const [lightboxData,setLightboxData]=useState<{isOpen:boolean;cert:CertificateItem|null}>({isOpen:false,cert:null});
 const handleOpenLightbox=(cert:CertificateItem)=>setLightboxData({isOpen:true,cert});
 const handleCloseLightbox=()=>setLightboxData({isOpen:false,cert:null});
 return <section id="certificates" className="py-24 relative z-10 overflow-hidden bg-black/5">
  <div className="container mx-auto px-4 md:px-8 mb-12">
   <p className="font-mono text-xs tracking-[0.35em] text-red-accent uppercase mb-4">07. Archive</p>
   <GalleryHeading/>
   <p className="mt-4 max-w-xl text-sm md:text-base text-muted font-mono">A record of learning, experiments, and milestones.</p>
  </div>
  {certificates.length===0?<div className="container mx-auto px-4 md:px-8"><div className="mt-8 py-16 border border-glass border-dashed rounded-xl bg-bg-panel/30 text-center"><p className="font-mono text-muted">Certificates will appear here soon.</p></div></div>:
  <div className="relative w-full h-[350px] overflow-hidden flex items-center">
   <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-bg-dark to-transparent z-10 pointer-events-none"/>
   <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-bg-dark to-transparent z-10 pointer-events-none"/>
   <motion.div className="flex whitespace-nowrap gap-8 items-center px-8" animate={{x:["0%","-50%"]}} transition={{ease:"linear",duration:60,repeat:Infinity}}>
    {[...certificates,...certificates,...certificates].map((cert,index)=><button type="button" key={`${cert.filename}-${index}`} className="relative flex-shrink-0 w-[420px] h-[300px] border-2 border-black/10 bg-bg-panel overflow-hidden group cursor-pointer comic-border comic-border-hover hover:border-red-accent text-left" onClick={()=>handleOpenLightbox(cert)} aria-label={`View certificate: ${cert.title}`}>
     <div className="absolute inset-0 bg-bg-dark flex items-center justify-center"><div className="w-full h-full text-center group-hover:scale-95 transition-transform duration-500 relative"><img src={cert.thumbnailPath} alt={cert.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-30 transition-opacity"/></div></div>
     <div className="absolute inset-0 bg-gradient-to-t from-red-accent/90 via-red-accent/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 z-20"><motion.div initial={{y:20,opacity:0}} whileInView={{y:0,opacity:1}} transition={{duration:.3}}><h4 className="font-display font-bold text-xl text-white mb-2 whitespace-normal line-clamp-3 leading-tight">{cert.title}</h4>{cert.issuer&&<p className="text-white/80 text-sm font-medium">{cert.issuer}</p>}<p className="text-white/60 text-xs mt-2 font-mono uppercase tracking-widest">Click to view full screen</p></motion.div></div>
    </button>)}
   </motion.div>
  </div>}
  <Lightbox isOpen={lightboxData.isOpen} onClose={handleCloseLightbox} imageUrl={lightboxData.cert?.thumbnailPath||""} altText={lightboxData.cert?.title||"Certificate preview"}/>
 </section>;
}