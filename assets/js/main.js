/* Alan Chaves · portfólio — comportamento da página. O conteúdo fica em conteudo.js. */
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const C = window.CONTEUDO;
  const reduz = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const celular = matchMedia('(max-width: 760px)');
  const toque = matchMedia('(hover: none)');
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const dois = (n) => String(n).padStart(2, '0');

  /* ---------- entrada ---------- */
  // o vídeo do topo já abre aceso e não espera as fontes: só faz o leve recuo (zoom) logo de cara
  requestAnimationFrame(() => requestAnimationFrame(() => document.body.classList.add('is-video')));
  const pronto = () => requestAnimationFrame(() => {
    document.body.classList.remove('is-loading');
    document.body.classList.add('is-ready');
  });
  (document.fonts && document.fonts.ready ? Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 1200))]) : Promise.resolve()).then(pronto);

  /* ---------- REC com timecode ---------- */
  const tcs = $$('[data-timecode]');
  if (tcs.length) {
    const t0 = performance.now();
    const tick = () => {
      const f = Math.floor((performance.now() - t0) / (1000 / 30));
      const txt = `REC ${dois(Math.floor(f / 108000))}:${dois(Math.floor(f / 1800) % 60)}:${dois(Math.floor(f / 30) % 60)}:${dois(f % 30)}`;
      tcs.forEach((el) => { el.textContent = txt; });
      setTimeout(tick, 1000 / 15);
    };
    tick();
  }

  /* ---------- menu do celular ---------- */
  const burger = $('[data-menu]');
  const fecharMenu = () => { document.body.classList.remove('menu-open'); burger.setAttribute('aria-expanded', 'false'); };
  burger.addEventListener('click', () => {
    const aberto = document.body.classList.toggle('menu-open');
    burger.setAttribute('aria-expanded', String(aberto));
  });
  $$('[data-menu-panel] a').forEach((a) => a.addEventListener('click', fecharMenu));

  /* ---------- contato ---------- */
  const k = C.contato;
  const wa = `https://wa.me/${k.whatsapp}?text=${encodeURIComponent('Olá, Alan! Vi seu portfólio e quero conversar sobre um vídeo.')}`;
  $$('[data-whats]').forEach((a) => { a.href = wa; a.target = '_blank'; a.rel = 'noopener'; });
  $$('[data-whats-text]').forEach((a) => { a.textContent = k.whatsappTexto; });
  $$('[data-mail]').forEach((a) => { a.href = `mailto:${k.email}`; a.textContent = k.email; });
  $$('[data-ig]').forEach((a) => { a.href = k.instagram; });
  $$('[data-in]').forEach((a) => { a.href = k.linkedin; });
  $$('[data-be]').forEach((a) => { a.href = k.behance; });
  $$('[data-year]').forEach((s) => { s.textContent = new Date().getFullYear(); });

  /* ---------- entrada ao rolar ---------- */
  const io = new IntersectionObserver((ents) => {
    ents.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -12% 0px' });
  const observar = (el) => io.observe(el);

  /* frase em degraus: entra e depois "acende" ao passar de ~60% da tela */
  const linhas = $$('.stagger__line');
  linhas.forEach((l, i) => { l.style.transitionDelay = `${(i % 4) * 0.08}s`; observar(l); });
  const ioLuz = new IntersectionObserver((ents) => {
    ents.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add('is-lit');
      else if (e.boundingClientRect.top > 0) e.target.classList.remove('is-lit');
    });
  }, { rootMargin: '0px 0px -40% 0px' });
  linhas.forEach((l) => ioLuz.observe(l));

  /* ---------- tocar e parar vídeos de prévia ---------- */
  const tocar = (el) => {
    const v = $('video', el);
    if (reduz || !v) return;
    const pr = v.play();
    if (pr && pr.then) pr.then(() => el.classList.add('is-playing')).catch(() => {});
    else el.classList.add('is-playing');
  };
  const parar = (el) => { const v = $('video', el); if (v) v.pause(); el.classList.remove('is-playing'); };

  /* ---------- trabalhos: categorias numa grade que abre no hover ---------- */
  const agora = new Date();
  const hoje = `${agora.getFullYear()}-${dois(agora.getMonth() + 1)}-${dois(agora.getDate())}`;
  const previa = new URLSearchParams(location.search).has('previa'); // ?previa mostra também o que tem data futura
  const valeHoje = (it) => previa || !it.aPartirDe || it.aPartirDe <= hoje;
  /* projeto com 1 vídeo só (o resto ainda não saiu) vira um vídeo comum */
  const prepararItem = (it) => {
    if (!valeHoje(it)) return null;
    if (!it.projeto) return it;
    const subs = it.itens.filter(valeHoje);
    if (!subs.length) return null;
    if (subs.length === 1) return { ...subs[0], sub: `${subs[0].sub} · ${it.titulo}` };
    return { ...it, itens: subs };
  };
  const cats = C.categorias
    .map((c) => ({ ...c, grupos: c.grupos.map((g) => ({ ...g, itens: g.itens.map(prepararItem).filter(Boolean) })).filter((g) => g.itens.length) }))
    .filter((c) => c.grupos.length);
  const contaItem = (it) => (it.projeto ? it.itens.length : 1);
  const totalItens = (c) => c.grupos.reduce((n, g) => n + g.itens.reduce((m, it) => m + contaItem(it), 0), 0);
  const todosItens = cats.flatMap((c) => c.grupos.flatMap((g) => g.itens.flatMap((it) => (it.projeto ? [it, ...it.itens] : [it]))));

  const grid = $('[data-grid]');
  const nCols = cats.length <= 4 ? 2 : 3;
  const nRows = Math.ceil(cats.length / nCols);
  grid.style.setProperty('--cols', nCols);
  cats.forEach((c) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'card card--cat';
    b.setAttribute('aria-label', `${c.titulo}: ${totalItens(c)} vídeos. Ver trabalhos`);
    b.innerHTML = `<img src="${esc(c.poster)}" alt="" loading="lazy" decoding="async">
      <video muted loop playsinline preload="none" src="${esc(c.capa)}"></video>
      <span class="card__shade"></span>
      <span class="card__count"><i class="rec__dot"></i>${dois(totalItens(c))} vídeos</span>
      <span class="card__cap"><span class="card__title">${esc(c.titulo)}</span><span class="card__client">${esc(c.sub)}</span>
      <span class="card__more">Ver trabalhos <i class="arrow"></i></span></span>`;
    b.addEventListener('click', () => abrirCat(c.id));
    grid.appendChild(b);
  });
  const cards = $$('.card', grid);
  const abrirGrade = (i) => {
    const col = Array(nCols).fill(1);
    const row = Array(nRows).fill(1);
    if (i != null) { col[i % nCols] = nCols === 2 ? 1.7 : 2; row[Math.floor(i / nCols)] = 1.4; }
    grid.style.setProperty('--c', col.map((n) => `${n}fr`).join(' '));
    grid.style.setProperty('--r', row.map((n) => `${n}fr`).join(' '));
  };
  abrirGrade(null);
  cards.forEach((card, i) => {
    card.addEventListener('pointerenter', (e) => {
      if (e.pointerType !== 'mouse' || celular.matches) return;
      cards.forEach((c) => { if (c !== card) { c.classList.remove('is-on'); parar(c); } });
      card.classList.add('is-on');
      abrirGrade(i);
      tocar(card);
    });
    card.addEventListener('focus', () => { if (!celular.matches) { card.classList.add('is-on'); abrirGrade(i); } });
    card.addEventListener('blur', () => card.classList.remove('is-on'));
  });
  grid.addEventListener('pointerleave', (e) => {
    if (e.pointerType !== 'mouse' || celular.matches) return;
    cards.forEach((c) => { c.classList.remove('is-on'); parar(c); });
    abrirGrade(null);
  });
  /* no celular: a capa toca quando o quadrado aparece na tela */
  const ioCard = new IntersectionObserver((ents) => {
    if (!celular.matches && !toque.matches) return;
    ents.forEach((e) => (e.isIntersecting ? tocar(e.target) : parar(e.target)));
  }, { threshold: 0.45 });
  cards.forEach((c) => ioCard.observe(c));

  /* ---------- janela de vídeo ---------- */
  const modal = $('[data-modal]');
  const palco = $('[data-modal-stage]');
  const mTitulo = $('[data-modal-title]');
  const mLink = $('[data-modal-link]');
  const ytId = (u) => { const m = String(u || '').match(/(?:youtu\.be\/|v=|shorts\/|embed\/)([\w-]{11})/); return m ? m[1] : null; };
  const abrirModal = ({ titulo, video, link, vertical }) => {
    palco.innerHTML = '';
    palco.classList.toggle('is-vertical', !!vertical);
    modal.classList.toggle('is-vertical', !!vertical);
    const yt = ytId(link);
    if (yt) {
      palco.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${yt}?autoplay=1&rel=0" title="${esc(titulo)}" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
    } else {
      const v = document.createElement('video');
      v.src = video; v.controls = true; v.autoplay = true; v.playsInline = true;
      palco.appendChild(v);
    }
    mTitulo.textContent = titulo;
    if (link && !yt) { mLink.href = link; mLink.textContent = 'Ver completo ↗'; mLink.hidden = false; } else { mLink.hidden = true; }
    if (typeof modal.showModal === 'function') modal.showModal(); else modal.setAttribute('open', '');
  };
  const fecharModal = () => { palco.innerHTML = ''; if (modal.close) modal.close(); else modal.removeAttribute('open'); };
  modal.addEventListener('close', () => { palco.innerHTML = ''; });
  modal.addEventListener('click', (e) => { if (e.target === modal) fecharModal(); });
  $('[data-modal-close]').addEventListener('click', fecharModal);
  const abrirItem = (it) => abrirModal({ titulo: `${it.titulo} — ${it.sub}`, video: it.video, link: it.youtube, vertical: it.formato === 'v' && !it.youtube });
  $$('[data-open-item]').forEach((b) => b.addEventListener('click', () => {
    const it = todosItens.find((x) => x.id === b.dataset.openItem);
    if (it) abrirItem(it);
  }));
  /* showreel: antes da data (C.showreel.aPartirDe) somem a seção e os links "Showreel" */
  if (!valeHoje(C.showreel)) {
    $('#showreel')?.remove();
    $$('a[href="#showreel"]').forEach((a) => a.remove());
  }
  $$('[data-open-reel]').forEach((b) => b.addEventListener('click', () => abrirModal({ titulo: 'Showreel 2020—2026', video: C.showreel.video })));

  /* showreel: o loop só carrega quando chega perto */
  const reelLoop = $('[data-reel-loop]');
  if (reelLoop) {
    reelLoop.poster = C.showreel.poster;
    new IntersectionObserver((ents) => {
      ents.forEach((e) => {
        if (e.isIntersecting) {
          if (!reelLoop.src) reelLoop.src = C.showreel.loop;
          if (!reduz) reelLoop.play().catch(() => {});
        } else reelLoop.pause();
      });
    }, { rootMargin: '200px 0px' }).observe(reelLoop);
  }

  /* ---------- tela de trabalhos da categoria ---------- */
  const cat = $('[data-cat]');
  const catScroll = $('[data-cat-scroll]');
  const catGrupos = $('[data-cat-groups]');
  const catSt = $('[data-cat-statement]');
  const catVoltar = $('[data-cat-back]');
  // atual = { c: id da categoria, p: id do projeto ou null }; pilha = quantas entradas nossas há no histórico
  let atual = null, pilha = 0, fechando = false, ultimoFoco = null;

  const cardTrabalho = (it, d) => {
    if (it.projeto) {
      return `
            <button type="button" class="wk wk--${it.formato} wk--projeto" data-wk="${esc(it.id)}" style="--d:${d}">
              <span class="wk__media">
                <img src="${esc(it.poster)}" alt="" loading="lazy" decoding="async">
                <span class="wk__tag"><i></i>Projeto · ${dois(it.itens.length)} vídeos</span>
                <span class="wk__open" aria-hidden="true">Ver projeto <i class="arrow"></i></span>
              </span>
              <span class="wk__title">${esc(it.titulo)}</span>
              <span class="wk__sub">${esc(it.sub)}</span>
            </button>`;
    }
    return `
            <button type="button" class="wk wk--${it.formato}" data-wk="${esc(it.id)}" style="--d:${d}">
              <span class="wk__media">
                <img src="${esc(it.poster)}" alt="" loading="lazy" decoding="async">
                ${it.youtube ? '<span class="wk__tag"><i></i>YouTube</span>' : '<video muted loop playsinline preload="none"></video>'}
                <span class="wk__play" aria-hidden="true"></span>
              </span>
              <span class="wk__title">${esc(it.titulo)}</span>
              <span class="wk__sub">${esc(it.sub)}</span>
            </button>`;
  };

  /* monta o conteúdo da tela (categoria ou projeto) */
  function montarTela({ crumb, voltar, count, titulo, texto, destaque, grupos }) {
    $('[data-cat-crumb]').textContent = crumb;
    catVoltar.hidden = !voltar;
    catVoltar.querySelector('[data-cat-back-label]').textContent = voltar || '';
    $('[data-cat-count]').textContent = `${dois(count)} vídeos`;
    $('[data-cat-title]').innerHTML = `<span class="line"><span class="line__in" style="--i:0">${esc(titulo)}</span></span>`;
    const desc = $('[data-cat-desc]');
    desc.textContent = texto || '';
    desc.hidden = !texto;
    if (destaque) {
      catSt.innerHTML = `<p class="cat__statement-h">${destaque.titulo.map((t) => `<span>${esc(t)}</span>`).join('')}</p>
        <p class="cat__statement-p"><i class="rec__dot"></i><span>${esc(destaque.texto)}</span></p>`;
      catSt.hidden = false;
    } else { catSt.hidden = true; catSt.innerHTML = ''; }
    let d = 0;
    catGrupos.innerHTML = grupos.map((g) => `
      <section class="cat__group">
        ${g.nome ? `<h3 class="cat__group-h">${esc(g.nome)}<span>${dois(g.itens.length)}</span></h3>` : ''}
        <div class="cat__grid cat__grid--${g.formato}">
          ${g.itens.map((it) => cardTrabalho(it, Math.min(d++, 14))).join('')}
        </div>
      </section>`).join('');
    $$('.wk', catGrupos).forEach((el) => {
      const it = todosItens.find((x) => x.id === el.dataset.wk);
      if (it.projeto) { el.addEventListener('click', () => abrirProjeto(atual.c, it.id)); return; }
      el.addEventListener('click', () => abrirItem(it));
      if (it.youtube) return;
      el.addEventListener('pointerenter', (e) => {
        if (e.pointerType !== 'mouse' || reduz) return;
        const v = $('video', el);
        if (!v.getAttribute('src')) { v.src = it.video; v.addEventListener('loadedmetadata', () => { v.currentTime = Math.min(3, v.duration / 3); }, { once: true }); }
        tocar(el);
      });
      el.addEventListener('pointerleave', () => parar(el));
    });
    catScroll.scrollTop = 0;
  }
  function mostrarPainel() {
    if (cat.classList.contains('is-open')) return;
    ultimoFoco = document.activeElement;
    cat.setAttribute('aria-hidden', 'false');
    document.documentElement.classList.add('cat-aberta');
    requestAnimationFrame(() => cat.classList.add('is-open'));
    setTimeout(() => $('[data-cat-close]').focus({ preventScroll: true }), 400);
  }
  function esconderPainel() {
    cat.classList.remove('is-open');
    cat.setAttribute('aria-hidden', 'true');
    document.documentElement.classList.remove('cat-aberta');
    $$('video', catGrupos).forEach((v) => v.pause());
    if (ultimoFoco && ultimoFoco.focus) ultimoFoco.focus({ preventScroll: true });
    atual = null;
  }
  function abrirCat(id, { push = true } = {}) {
    const c = cats.find((x) => x.id === id);
    if (!c) return;
    montarTela({ crumb: c.titulo, count: totalItens(c), titulo: c.titulo, texto: c.texto, destaque: c.destaque, grupos: c.grupos });
    atual = { c: id, p: null };
    mostrarPainel();
    if (push) { history.pushState(null, '', `#${id}`); pilha++; }
  }
  function abrirProjeto(cId, pId, { push = true } = {}) {
    const c = cats.find((x) => x.id === cId);
    const p = todosItens.find((x) => x.id === pId && x.projeto);
    if (!c || !p) { if (c) abrirCat(cId, { push }); return; }
    montarTela({
      crumb: `${c.titulo} / ${p.titulo}`, voltar: c.titulo, count: p.itens.length, titulo: p.titulo, texto: p.texto,
      grupos: [{ nome: '', formato: p.formato, itens: p.itens }],
    });
    atual = { c: cId, p: pId };
    mostrarPainel();
    if (push) { history.pushState(null, '', `#${cId}/${pId}`); pilha++; }
  }
  function voltarCat() {
    if (!atual) return;
    if (pilha >= 2) { history.back(); return; } // o popstate remonta a categoria
    history.replaceState(null, '', `#${atual.c}`);
    abrirCat(atual.c, { push: false });
  }
  function fecharCat() {
    if (!atual) return;
    esconderPainel();
    if (pilha > 0) { fechando = true; history.go(-pilha); pilha = 0; }
    else history.replaceState(null, '', '#trabalhos');
  }
  const lerHash = () => { const [c, p] = location.hash.slice(1).split('/'); return { c, p: p || null }; };
  $('[data-cat-close]').addEventListener('click', fecharCat);
  catVoltar.addEventListener('click', voltarCat);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && atual && !modal.open) fecharCat(); });
  addEventListener('popstate', () => {
    const { c, p } = lerHash();
    const existe = cats.some((x) => x.id === c);
    if (fechando) { fechando = false; if (existe) history.replaceState(null, '', '#trabalhos'); return; }
    const prof = !existe ? 0 : p ? 2 : 1;
    pilha = Math.min(pilha, prof);
    if (prof === 0) { if (atual) esconderPainel(); }
    else if (prof === 1) abrirCat(c, { push: false });
    else abrirProjeto(c, p, { push: false });
  });
  /* link direto: endereço/#eventos abre a categoria; #motion-e-ia/zsales abre o projeto */
  {
    const { c, p } = lerHash();
    if (cats.some((x) => x.id === c)) { if (p) abrirProjeto(c, p, { push: false }); else abrirCat(c, { push: false }); }
  }

  /* ---------- carrossel 3D de clientes ---------- */
  const ring = $('[data-ring]');
  const track = $('[data-ring-track]');
  const itens = C.clientes.map((c) => {
    const d = document.createElement('div');
    d.className = 'ring__item';
    d.innerHTML = c.logo ? `<img src="${esc(c.logo)}" alt="${esc(c.nome)}" draggable="false">` : `<i></i>${esc(c.nome)}`;
    const img = d.querySelector('img');
    if (img) {
      // mesma "área" para todas: a quadrada fica alta, a comprida fica baixa
      const medir = () => {
        const r = Math.max(1, img.naturalWidth / img.naturalHeight);
        img.style.height = `${((2 / Math.sqrt(r)) * (c.escala || 1)).toFixed(3)}em`;
      };
      if (img.complete && img.naturalWidth) medir(); else img.addEventListener('load', medir, { once: true });
    }
    track.appendChild(d);
    return d;
  });
  const n = itens.length;
  const passo = 360 / n;
  let rot = 0, alvo = null, arrastando = false, ultimoX = 0, visivel = false, pausado = false;
  const raio = () => Math.min(620, Math.max(260, innerWidth * 0.4));
  const quadro = () => {
    if (!visivel) return;
    if (alvo != null) { rot += (alvo - rot) * 0.09; if (Math.abs(alvo - rot) < 0.05) { rot = alvo; alvo = null; } }
    else if (!arrastando && !pausado && !reduz) rot -= 0.045;
    const R = raio();
    for (let j = 0; j < n; j++) {
      const a = j * passo + rot;
      const cos = Math.cos((a * Math.PI) / 180);
      const vis = Math.max(0, cos);
      const el = itens[j];
      el.style.transform = `translate(-50%, -50%) rotateY(${a}deg) translateZ(${R}px)`;
      el.style.opacity = (Math.pow(vis, 3)).toFixed(3);
      el.style.filter = `blur(${((1 - vis) * 9).toFixed(1)}px)`;
    }
    requestAnimationFrame(quadro);
  };
  new IntersectionObserver((ents) => {
    ents.forEach((e) => { const era = visivel; visivel = e.isIntersecting; if (visivel && !era) requestAnimationFrame(quadro); });
  }).observe(ring);
  const encaixar = (dir) => { const base = alvo ?? rot; alvo = Math.round(base / passo) * passo + dir * passo; };
  $('[data-ring-prev]').addEventListener('click', () => encaixar(1));
  $('[data-ring-next]').addEventListener('click', () => encaixar(-1));
  ring.addEventListener('mouseenter', () => { pausado = true; });
  ring.addEventListener('mouseleave', () => { pausado = false; });
  ring.addEventListener('pointerdown', (e) => { arrastando = true; alvo = null; ultimoX = e.clientX; ring.classList.add('is-drag'); ring.setPointerCapture(e.pointerId); });
  ring.addEventListener('pointermove', (e) => { if (!arrastando) return; rot += (e.clientX - ultimoX) * 0.18; ultimoX = e.clientX; });
  const soltar = () => { if (!arrastando) return; arrastando = false; ring.classList.remove('is-drag'); alvo = Math.round(rot / passo) * passo; };
  ring.addEventListener('pointerup', soltar);
  ring.addEventListener('pointercancel', soltar);

  /* ---------- trajetória ---------- */
  $('[data-trail]').innerHTML = C.trajetoria.map((t) => `<li><strong>${esc(t.onde)}</strong><em>${esc(t.quando)}</em><span>${esc(t.oque)}</span></li>`).join('');

  /* tudo marcado com data-reveal */
  $$('[data-reveal]').forEach(observar);

  /* ---------- leve paralaxe no topo ---------- */
  const heroMedia = $('.hero__media video');
  const headline = $('.hero__headline');
  if (!reduz) {
    let ticking = false;
    addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = Math.min(scrollY, innerHeight);
        heroMedia.style.transform = `translateY(${y * 0.28}px) scale(${1 + y / innerHeight * 0.06})`;
        headline.style.transform = `translateY(${-y * 0.12}px)`;
        ticking = false;
      });
    }, { passive: true });
  }
})();
