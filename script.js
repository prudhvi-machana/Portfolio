const nav=document.querySelector(".nav");
const menu=document.querySelector(".menu");
menu?.addEventListener("click",()=>{const open=nav.classList.toggle("menu-open");menu.setAttribute("aria-expanded",open)});
document.querySelectorAll(".nav-links a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("menu-open");menu?.setAttribute("aria-expanded","false")}));

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("show");observer.unobserve(e.target)}}),{threshold:.1});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

const filters=document.querySelectorAll(".filter");
const cards=document.querySelectorAll(".project");
filters.forEach(button=>button.addEventListener("click",()=>{
  filters.forEach(b=>b.classList.remove("active"));button.classList.add("active");
  const filter=button.dataset.filter;
  cards.forEach(card=>{
    const show=filter==="all"||card.dataset.category.split(" ").includes(filter);
    card.classList.toggle("hidden",!show);
  });
}));

const glow=document.querySelector(".cursor-glow");
window.addEventListener("pointermove",e=>{if(glow){glow.style.left=e.clientX+"px";glow.style.top=e.clientY+"px"}},{passive:true});

document.querySelectorAll(".magnetic").forEach(el=>{
  el.addEventListener("pointermove",e=>{const r=el.getBoundingClientRect();el.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.08}px,${(e.clientY-r.top-r.height/2)*.08}px)`});
  el.addEventListener("pointerleave",()=>el.style.transform="");
});

document.querySelectorAll(".project").forEach(card=>{
  card.addEventListener("pointermove",e=>{
    if(window.innerWidth<850)return;
    const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
    card.style.transform=`translateY(-7px) rotateX(${-y*2}deg) rotateY(${x*2}deg)`;
  });
  card.addEventListener("pointerleave",()=>card.style.transform="");
});