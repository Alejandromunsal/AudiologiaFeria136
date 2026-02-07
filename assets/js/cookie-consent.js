// Inicializa Google Consent Mode
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied'
});

document.addEventListener('DOMContentLoaded', () => {
  const prefs = JSON.parse(localStorage.getItem('cookiePreferences'));
  if (!prefs) {
    showBanner();
  } else {
    if (prefs.analytics) loadAnalytics();
    if (prefs.marketing) loadMarketing();
    if (prefs.security) loadSecurity();
  }
});

// ================= Banner =================
function showBanner() {
  const banner = document.getElementById('cookieBanner');
  banner.classList.remove('d-none');
  banner.classList.add('animate__animated', 'animate__slideInUp');
  showOverlay();
}

function hideBanner(el) {
  el.classList.add('animate__animated', 'animate__slideOutDown');
  setTimeout(() => {
    el.classList.add('d-none');
    el.classList.remove('animate__animated', 'animate__slideInUp', 'animate__slideOutDown');
    hideOverlayIfNoBanners();
  }, 500);
}


function showOverlay() {
  const overlay = document.getElementById('cookieOverlay');
  if (!overlay) return; // nada que hacer si no existe
  overlay.classList.remove('d-none');
  document.body.style.overflow = 'hidden';
}


function hideOverlayIfNoBanners() {
  const overlay = document.getElementById('cookieOverlay');
  if (!overlay) return; // ← nada que hacer si no existe

  const bannerVisible = document.getElementById('cookieBanner') && !document.getElementById('cookieBanner').classList.contains('d-none');
  const configVisible = document.getElementById('cookieConfig') && !document.getElementById('cookieConfig').classList.contains('d-none');

  if (!bannerVisible && !configVisible) {
    overlay.classList.add('d-none');
    document.body.style.overflow = '';
  }
}



// ================= Acciones =================
function acceptAll() {
  const prefs = { necessary: true, analytics: true, marketing: true, security: true };
  localStorage.setItem('cookiePreferences', JSON.stringify(prefs));

  gtag('consent', 'update', {
    analytics_storage: 'granted',
    ad_storage: 'granted',
    ad_user_data: 'granted',
    ad_personalization: 'granted'
  });

  loadAnalytics();
  loadMarketing();
  loadSecurity();
  hideBanner(document.getElementById('cookieBanner'));
}

function rejectAll() {
  const prefs = { necessary: true, analytics: false, marketing: false, security: false };
  localStorage.setItem('cookiePreferences', JSON.stringify(prefs));

  gtag('consent', 'update', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied'
  });

  hideBanner(document.getElementById('cookieBanner'));
}

function openConfig() {
  hideBanner(document.getElementById('cookieBanner'));
  const config = document.getElementById('cookieConfig');
  config.classList.remove('d-none');
  config.classList.add('animate__animated', 'animate__slideInUp');
  showOverlay();
}


function cancelConfig() {
  const config = document.getElementById('cookieConfig');
  hideBanner(config);       // Oculta panel de configuración
  showBanner();             // Muestra el banner inicial
}

function saveConfig() {
  const analytics = document.getElementById('analyticsCookies').checked;
  const marketing = document.getElementById('marketingCookies').checked;
  const security  = document.getElementById('securityCookies').checked;

  const prefs = { necessary: true, analytics, marketing, security };
  localStorage.setItem('cookiePreferences', JSON.stringify(prefs));

  gtag('consent', 'update', {
    analytics_storage: analytics ? 'granted' : 'denied',
    ad_storage: marketing ? 'granted' : 'denied',
    ad_user_data: marketing ? 'granted' : 'denied',
    ad_personalization: marketing ? 'granted' : 'denied'
  });

  if (analytics) loadAnalytics();
  if (marketing) loadMarketing();
  if (security) loadSecurity();

  hideBanner(document.getElementById('cookieConfig'));
}

// ================= Carga de servicios =================
function loadAnalytics() {
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX'); // reemplaza con tu GA4
}

function loadMarketing() {
  if (window.marketingLoaded) return;
  window.marketingLoaded = true;

  !function(f,b,e,v,n,t,s){
    if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)}; 
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];
      t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)
  }(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');

  fbq('init', 'PIXEL_ID_AQUI'); // reemplaza con tu Meta Pixel
  fbq('track', 'PageView');
}

function loadSecurity() {
    console.log('Cookies de seguridad aceptadas');
  }
  
