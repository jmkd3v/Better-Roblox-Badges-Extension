const headElement = (document.head || document.documentElement);

var myScript = document.createElement('script');
myScript.src = chrome.runtime.getURL('script.js');
myScript.classList.add("badges-injected-by-jmk-💖");
headElement.appendChild(myScript);