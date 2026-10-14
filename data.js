// SiteHunter — dados mock (substituível por Google Places API + IA real)
const RAMOS = ["Padaria","Barbearia","Pizzaria","Salão de Beleza","Lanchonete","Clínica Odontológica","Academia","Pet Shop","Restaurante","Cafeteria","Oficina Mecânica","Floricultura"];

const NOMES = {
  "Padaria":["Padaria Pão Dourado","Padaria do Zé","Pão Quente da Vila","Padaria Trigo Real","Padaria Estrela do Bairro"],
  "Barbearia":["Barbearia Corte Fino","Barbearia Vintage","Navalha de Ouro","Barbearia Irmãos Santos","Corte & Barba"],
  "Pizzaria":["Pizzaria Forno a Lenha","Pizzaria Bella Massa","Pizzaria Sabor da Vila","Forneria Tradição","Pizzaria Noite Feliz"],
  "default":["Comércio Central","Ponto Comercial do Bairro","Loja da Esquina","Espaço Família","Cantinho do Bairro"]
};

const RUAS = ["Rua das Flores, 123","Av. Central, 456","Rua do Comércio, 78","Travessa da Praça, 210","Rua XV de Novembro, 340","Av. Brasil, 1020"];
const FOTOS = [
  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
  "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80",
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
  "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80",
  "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=800&q=80",
  "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&q=80",
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
  "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=800&q=80"
];

function seededRand(seed){ let x = seed; return ()=>{ x = (x*9301+49297)%233280; return x/233280; }; }

function gerarLeads(cidade="São Paulo-SP", ramo="Padaria"){
  const lista = NOMES[ramo] || NOMES["default"];
  const rand = seededRand((cidade+ramo).split('').reduce((a,c)=>a+c.charCodeAt(0),0));
  return lista.map((nome,i)=>{
    const nota = (3.8 + rand()*1.1).toFixed(1);
    const aval = Math.floor(20 + rand()*480);
    const tel = `(11) 9 ${String(Math.floor(6000+rand()*3999))}-${String(Math.floor(1000+rand()*8999))}`;
    return {
      id: `${cidade}-${ramo}-${i}`.toLowerCase().replace(/[^a-z0-9]+/g,'-'),
      nome, ramo, cidade,
      endereco: RUAS[Math.floor(rand()*RUAS.length)] + " — " + cidade,
      telefone: tel,
      whatsapp: "5511" + tel.replace(/\D/g,'').slice(-9),
      nota, avaliacoes: aval,
      semSite: true,
      foto: FOTOS[Math.floor(rand()*FOTOS.length)],
      horario: "Seg–Sáb · 8h às 19h",
      slug: nome.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-') + "-" + Math.random().toString(36).slice(2,6)
    };
  });
}

function mensagemAbordagem(lead, tipo){
  const msgs = {
    whatsapp: `Olá! Sou da SiteHunter 👋 Vi a ${lead.nome} no Google (${lead.nota}★, ${lead.avaliacoes} avaliações — parabéns!). Percebi que vocês ainda não têm site e montei uma página pronta com fotos, endereço e botão de WhatsApp. Posso te mandar o link? São 30 segundos pra ver.`,
    ligacao: `“Oi, aqui é da SiteHunter. Achei a ${lead.nome} no Google e vi que não tem site. Montei a página de vocês pronta — com telefone e fotos reais. Posso mandar o link no WhatsApp agora? Se gostar, deixo no ar hoje por R$ 497.”`,
    instagram: `Oi! 👋 Achei a ${lead.nome} e montei o site de vocês de demonstração — ficou pronto com endereço, telefone e avaliações. Quer que eu mande o link? Sem compromisso.`
  };
  return msgs[tipo] || msgs.whatsapp;
}

// Store helpers
const Store = {
  get(k, fb){ try{ const v = localStorage.getItem('sitehunter_'+k); return v?JSON.parse(v):fb; }catch{ return fb; } },
  set(k,v){ localStorage.setItem('sitehunter_'+k, JSON.stringify(v)); }
};
function getCreditos(){ let c = Store.get('creditos', null); if(c===null){ c=100; Store.set('creditos',c);} return c; }
function gastarCreditos(n, label){
  let c = getCreditos();
  if(c < n){ toast(`Créditos insuficientes para ${label}. Recarregue no plano.`); return false; }
  c -= n; Store.set('creditos', c); atualizarCreditosUI(); toast(`${n} créditos usados · ${label} · Saldo: ${c}`); return true;
}
function atualizarCreditosUI(){
  document.querySelectorAll('[data-credits]').forEach(el=> el.textContent = getCreditos());
}
function toast(msg){
  let t = document.querySelector('.toast');
  if(!t){ t=document.createElement('div'); t.className='toast'; document.body.appendChild(t); }
  t.textContent = msg; t.classList.add('show');
  clearTimeout(t._h); t._h=setTimeout(()=>t.classList.remove('show'), 3200);
}
function copiar(texto){ navigator.clipboard.writeText(texto).then(()=>toast('Copiado!')); }
