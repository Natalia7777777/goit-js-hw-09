const t=document.querySelector("body"),e=document.querySelector("button[data-start]"),n=document.querySelector("button[data-stop]");e.addEventListener("click",(function(){o=setInterval((()=>{const e=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`;t.style.backgroundColor=e}),1e3),e.disabled=!0})),n.addEventListener("click",(function(){clearInterval(o),e.disabled=!1}));let o=null;e.disabled=!1;
//# sourceMappingURL=01-color-switcher.c38e5932.js.map
