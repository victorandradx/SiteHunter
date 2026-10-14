// Header / footer compartilhado SiteHunter (preto & branco)
function headerHTML(active=""){
  const user = Store.get('user', null);
  return `
  <div class="topbar"><div class="container topbar-inner">
    <a href="index.html" class="logo"><span class="logo-mark">S</span> SiteHunter</a>
    <nav class="nav">
      <a href="dashboard.html" style="${active==='dash'?'color:#000;font-weight:700':''}">Dashboard</a>
      <a href="precos.html" style="${active==='precos'?'color:#000;font-weight:700':''}">Preços</a>
      <a href="tutoriais.html" style="${active==='tut'?'color:#000;font-weight:700':''}">Tutoriais</a>
      <a href="ajuda.html" style="${active==='ajuda'?'color:#000;font-weight:700':''}">Ajuda</a>
    </nav>
    <div class="nav-cta">
      <span class="credits-pill" title="Seus créditos"><span class="credits-dot"></span><span data-credits>${getCreditos()}</span>&nbsp;créditos</span>
      ${user ? `<a class="btn btn-dark btn-sm" href="dashboard.html">${user.nome.split(' ')[0]}</a>`
             : `<a class="btn btn-ghost btn-sm" href="login.html">Entrar</a><a class="btn btn-dark btn-sm" href="dashboard.html">Dashboard</a>`}
    </div>
  </div></div>`;
}
function footerHTML(){
  return `
  <footer class="footer"><div class="container">
    <div class="footer-grid">
      <div>
        <a href="index.html" class="logo"><span class="logo-mark">S</span> SiteHunter</a>
        <p style="font-size:14px;color:#525252;margin-top:12px;max-width:300px">Encontra os comércios da sua região que ainda não têm site e escreve a página de cada um com os dados reais do negócio.</p>
        <p style="font-size:13px;margin-top:10px"><a href="mailto:suporte@sitehunter.com.br">suporte@sitehunter.com.br</a></p>
        <p style="font-size:13px;color:#737373">Feito no Brasil, para o comércio brasileiro</p>
      </div>
      <div><h4>Produto</h4><a href="construtor.html">Construtor</a><a href="dashboard.html">Encontrar comércios</a><a href="precos.html">Preços</a></div>
      <div><h4>Aprender</h4><a href="tutoriais.html">Tutoriais</a><a href="ajuda.html">Perguntas frequentes</a><a href="suporte.html">Suporte</a></div>
      <div><h4>Conta</h4><a href="login.html">Entrar</a><a href="signup.html">Criar conta</a></div>
      <div><h4>Institucional</h4><a href="contato.html">Contato</a><a href="privacidade.html">Privacidade</a><a href="termos.html">Termos de Uso</a></div>
    </div>
    <div class="copy"><span>© 2026 SiteHunter · Feito para quem vive de vender sites.</span><span>Dados do Google Places, em tempo real</span></div>
  </div></footer>`;
}
function mountChrome(active){
  const h = document.getElementById('sh-header'); if(h) h.innerHTML = headerHTML(active);
  const f = document.getElementById('sh-footer'); if(f) f.innerHTML = footerHTML();
  atualizarCreditosUI();
  document.querySelectorAll('.faq-q').forEach(btn=>{
    btn.onclick = ()=> btn.parentElement.classList.toggle('open');
  });
}
document.addEventListener('DOMContentLoaded',()=>{ if(window.SH_ACTIVE!==undefined) mountChrome(window.SH_ACTIVE); else mountChrome(""); });
