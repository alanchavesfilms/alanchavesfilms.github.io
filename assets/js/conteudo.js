// Conteúdo do site. Para trocar um trabalho, cliente, número ou contato, edite só este arquivo.
// Vídeos e imagens ficam em assets/media/ (gerados por _midia/gerar_trabalhos.sh e _midia/gerar_categorias.sh).
//
// Cada trabalho:
//   id        nome do arquivo em assets/media/trabalhos/ (id.mp4 e id.jpg)
//   arquivo   (opcional) usa o vídeo de outro id, para o mesmo vídeo aparecer em dois lugares
//   titulo    nome que aparece
//   sub       linha de baixo (cliente, tipo, ano)
//   formato   'h' (horizontal) ou 'v' (vertical)
//   youtube   (opcional) link do YouTube: abre o vídeo de lá em vez do arquivo
//   aPartirDe (opcional) 'AAAA-MM-DD': só aparece a partir dessa data (para ver tudo antes: abrir o site com ?previa)
//   projeto   (opcional) true + itens: [...] — o card vira um projeto que abre uma página com vários vídeos
const T = 'assets/media/trabalhos/';

window.CONTEUDO = {
  // Grade "Conheça meus trabalhos": cada quadrado é uma categoria. Ao clicar, abre a tela com os trabalhos dela.
  categorias: [
    {
      id: 'eventos',
      titulo: 'Eventos',
      sub: 'Aftermovies, documentário e institucional',
      capa: 'assets/media/categorias/eventos.mp4',
      poster: 'assets/media/categorias/eventos.jpg',
      texto: 'Congressos, cultos, cursos e viagens. Eu gravo o evento e entrego o aftermovie com a história de quem estava lá. Também faço documentário e vídeo institucional para empresas.',
      grupos: [
        {
          nome: 'Aftermovies e coberturas',
          formato: 'h',
          itens: [
            { id: 'ev_cbj2026', titulo: 'CBJ 2026 · Aftermovie', sub: 'Missão com Jovens', youtube: 'https://youtu.be/0wdpTIqO7Hs' },
            { id: 'ev_cbj2026_teaser', titulo: 'CBJ 2026 · Teaser', sub: 'Florescer & Frutificar', youtube: 'https://youtu.be/NpttLxg64Os' },
            { id: 'ev_diaconal', titulo: 'Diaconal 2026', sub: 'Aftermovie' },
            { id: 'ev_elah', titulo: 'Curso Elah', sub: 'Aftermovie · 2026' },
            { id: 'ev_cbj2023', titulo: 'CBJ 2023 · Entrega', sub: 'Missão com Jovens', youtube: 'https://youtu.be/PCoIIxWMP6o' },
            // títulos abaixo: A CONFIRMAR com o Alan (nomes dados pelo que aparece no vídeo)
            { id: 'ev_congresso', titulo: 'Congresso', sub: 'Aftermovie' },
            { id: 'ev_mulheres', titulo: 'Encontro de mulheres', sub: 'Aftermovie' },
            { id: 'ev_cantores', titulo: 'Louvor', sub: 'Cobertura' },
            { id: 'ev_pb', titulo: 'Culto', sub: 'Cobertura em preto e branco' },
            { id: 'ev_cantata', titulo: 'Cantata infantil', sub: 'Cobertura' },
            { id: 'ev_palco', titulo: 'Culto', sub: 'Cobertura' },
          ],
        },
        {
          nome: 'Documentário',
          formato: 'h',
          itens: [
            { id: 'ev_chosen', titulo: 'Natal com The Chosen', sub: 'Sociedade Bíblica do Brasil · 2024' },
          ],
        },
        {
          nome: 'Institucional',
          formato: 'h',
          itens: [
            { id: 'ev_febracis', titulo: 'Febracis em Teresina', sub: 'Vídeo institucional · FRZ Global' },
          ],
        },
      ],
    },
    {
      id: 'motion-e-ia',
      titulo: 'Motion e IA',
      sub: 'Logo animada, telas de app e vídeo com IA',
      capa: 'assets/media/categorias/motion.mp4',
      poster: 'assets/media/categorias/motion.jpg',
      destaque: {
        titulo: ['Também faço', 'vídeo com IA.'],
        texto: 'Além de gravar e editar, eu crio motion design e vídeos com inteligência artificial: logo animada, telas de app, anúncios e vídeos feitos nas plataformas de IA. Se o seu projeto precisar, eu faço do roteiro à entrega.',
      },
      grupos: [
        {
          nome: 'Identidade e evento',
          formato: 'h',
          itens: [
            { id: 'mo_mjc', titulo: 'Missão com Jovens Central', sub: 'Logo animada e vídeo de identidade' },
            { id: 'mo_telao', titulo: 'IA não é um chat', sub: 'Telão de evento em paralaxe 3D' },
          ],
        },
        {
          nome: 'Reels e anúncios animados',
          formato: 'v',
          itens: [
            { id: 'mo_s18', titulo: 'Dicas de finanças', sub: 'Corte com motion editorial e legenda animada' },
            // projeto: o card abre uma página com vários vídeos (link direto: #motion-e-ia/zsales)
            {
              id: 'zsales',
              projeto: true,
              arquivo: 'mo_zsales',
              titulo: 'ZSales',
              sub: 'Vídeo CRM e Reels do app',
              texto: 'Vídeos para o perfil do ZSales, um CRM de vendas: a animação do app com as telas reais e os Reels da campanha.',
              itens: [
                { id: 'mo_zsales', titulo: 'Vídeo CRM', sub: 'Animação do app' },
                { id: 'mo_registro', titulo: 'O registro das 21h', sub: 'Animação com locução' },
                // motions dos Stories vieram prontos do Padilha; a parte do Alan foi a montagem em Reel e o som
                { id: 'zs_blackz', titulo: 'Oferta Black Z', sub: 'Reel · montagem e som' },
                { id: 'zs_duvidas', titulo: 'Dúvidas', sub: 'Reel · montagem e som' },
              ],
            },
            { id: 'mo_f4', titulo: 'O lead que você pagou', sub: 'Campanha Growth · Filipe Frazão' },
            { id: 'mo_f2', titulo: 'Dinheiro jogado fora', sub: 'Campanha Growth · Filipe Frazão' },
            { id: 'mo_corte11', titulo: 'Claude ou ChatGPT?', sub: 'Corte com motion · Filipe Frazão' },
          ],
        },
      ],
    },
    {
      id: 'redes-sociais',
      titulo: 'Redes sociais',
      sub: 'Reels de pregação, marca pessoal e anúncios',
      capa: 'assets/media/categorias/redes.mp4',
      poster: 'assets/media/categorias/redes.jpg',
      texto: 'Reels de pregação, de marca pessoal e de anúncio, editados no formato de cada rede.',
      grupos: [
        {
          nome: 'Pregações',
          formato: 'v',
          itens: [
            { id: 'rs_coracoes', titulo: 'Corações convertidos', sub: 'Pregação' },
            { id: 'rs_thesend', titulo: 'The Send Brasil 2026', sub: 'Pregação' },
            { id: 'rs_santo', titulo: 'Santo', sub: 'Pregação' },
            { id: 'rs_identidade', titulo: 'Identidade', sub: 'Pregação' },
            { id: 'rs_quatro', titulo: 'Quatro paredes', sub: 'Pregação' },
          ],
        },
        {
          nome: 'Palestras',
          formato: 'v',
          itens: [
            { id: 'rs_corte01', titulo: 'Delegue o processo', sub: 'Palestra · Filipe Frazão' },
            { id: 'rs_corte02', titulo: 'Trabalho preguiçoso', sub: 'Palestra · Filipe Frazão' },
            { id: 'rs_corte06', titulo: 'Gerir agentes', sub: 'Palestra · Filipe Frazão' },
            // mesmo vídeo do Motion e IA (arquivo mo_corte11)
            { id: 'rs_corte11', arquivo: 'mo_corte11', titulo: 'Claude ou ChatGPT?', sub: 'Palestra · Filipe Frazão' },
          ],
        },
        {
          nome: 'Anúncios · MCAR Veículos',
          formato: 'v',
          itens: [
            { id: 'rs_mcar_feirao', titulo: 'Feirão', sub: 'Anúncio · MCAR Veículos' },
            { id: 'rs_mcar_mulher', titulo: 'Mês das mulheres', sub: 'Anúncio · MCAR Veículos' },
            { id: 'rs_mcar_aniv', titulo: 'Aniversário', sub: 'Anúncio · MCAR Veículos' },
            { id: 'rs_mcar_chegou', titulo: 'Chegou na MCAR', sub: 'Anúncio · MCAR Veículos' },
            { id: 'rs_mcar_roleta', titulo: 'Roleta', sub: 'Anúncio · MCAR Veículos' },
            { id: 'rs_mcar_civic', titulo: 'Civic', sub: 'Anúncio · MCAR Veículos' },
          ],
        },
        {
          // títulos deste grupo: A CONFIRMAR com o Alan
          nome: 'Marcas e especialistas',
          formato: 'v',
          itens: [
            // ordem dos 4 primeiros definida pelo Alan em 19/11
            { id: 'rs_aluguel', titulo: 'Aluguel ou financiamento?', sub: 'Conteúdo para especialista' },
            { id: 'rs_logistica', titulo: 'Logística do evento · COP30', sub: 'Vídeo para redes' },
            { id: 'rs_carro', titulo: 'Carro', sub: 'Vídeo para redes' },
            { id: 'rs_clinica', titulo: 'Clínica', sub: 'Conteúdo para especialista' },
            { id: 'rs_tvcultura', titulo: 'Sem Censura', sub: 'TV Cultura do Pará' },
            { id: 'rs_elias', titulo: 'Dr. Elias Quaresma', sub: 'Clínica' },
            { id: 'rs_escola', titulo: 'Escola de música', sub: 'Institucional' },
            { id: 'rs_acervo', titulo: 'Acervo de áudio', sub: 'Institucional' },
            { id: 'rs_essencia', titulo: 'Essência', sub: 'Louvor' },
            { id: 'rs_show', titulo: 'Show', sub: 'Cobertura' },
          ],
        },
      ],
    },
    {
      id: 'youtube',
      titulo: 'YouTube',
      sub: 'Vídeos longos editados para canal',
      capa: 'assets/media/categorias/youtube.mp4',
      poster: 'assets/media/categorias/youtube.jpg',
      texto: 'Vídeos longos editados para o canal do Filipe Frazão: bastidores de evento, aulas e conteúdo sobre gestão e IA.',
      grupos: [
        {
          nome: '',
          formato: 'h',
          itens: [
            { id: 'yt_58T1Hi8Blok', titulo: 'Eu treinei uma equipe de jornalismo para usar IA de verdade', sub: 'Filipe Frazão · 20 min', youtube: 'https://youtu.be/58T1Hi8Blok' },
            { id: 'yt_S8H4yuBF7xI', titulo: 'Como é entregar um evento com o Paulo Vieira', sub: 'Filipe Frazão · 10 min', youtube: 'https://youtu.be/S8H4yuBF7xI' },
            { id: 'yt_AysmdI0TRJY', titulo: 'Inteligência Artificial: o que todo empresário precisa saber', sub: 'Filipe Frazão · 6 min', youtube: 'https://youtu.be/AysmdI0TRJY' },
            { id: 'yt_BoDbBJlrR8Y', titulo: 'Crescer desorganizado é se autodestruir', sub: 'Filipe Frazão · 9 min', youtube: 'https://youtu.be/BoDbBJlrR8Y' },
          ],
        },
      ],
    },
  ],

  // Carrossel "Onde já trabalhei". As logos saem de _midia/gerar_logos.py (cinza-chumbo, sem fundo).
  // O tamanho se ajusta sozinho pela proporção; `escala: 1.1` aumenta ou diminui uma logo.
  // Sem `logo`, o nome aparece em texto.
  clientes: [
    { nome: 'MCAR Veículos', logo: 'assets/img/logos/mcar.png' },
    { nome: 'TV Cultura do Pará', logo: 'assets/img/logos/tv-cultura.png' },
    { nome: 'Serviço Geológico do Brasil', logo: 'assets/img/logos/sgb.png' },
    { nome: 'Sociedade Bíblica do Brasil', logo: 'assets/img/logos/sbb.png' },
    { nome: 'WF Imports', logo: 'assets/img/logos/wf-imports.png' },
    { nome: 'Febracis', logo: 'assets/img/logos/febracis.png' },
    { nome: 'Grupo FRZ', logo: 'assets/img/logos/grupo-frz.png' },
    { nome: 'ZSales', logo: 'assets/img/logos/zsales.png' },
    { nome: 'Natal com The Chosen', logo: 'assets/img/logos/the-chosen.png' },
    { nome: 'Assembleia de Deus em Belém', logo: 'assets/img/logos/ad-belem.png' },
    // { nome: 'Cidades Negócios' },  // fora até chegar a logo
  ],

  // Trajetória (lista ao lado do destaque vermelho)
  trajetoria: [
    { onde: 'Grupo FRZ', oque: 'Vídeo e estratégia de audiovisual', quando: '2025—26' },
    { onde: 'TV Cultura do Pará', oque: 'Comunicação interna', quando: '2024' },
    { onde: 'MCAR Veículos', oque: 'Anúncios e campanhas de feirão', quando: '2022—24' },
    { onde: 'Serviço Geológico do Brasil', oque: 'Exposibram, entregue à distância', quando: '2023' },
  ],

  contato: {
    whatsapp: '5591985164404',
    whatsappTexto: '+55 91 98516-4404',
    email: 'avchaves20@gmail.com',
    instagram: 'https://www.instagram.com/alancfilms/',
    linkedin: 'https://www.linkedin.com/in/alanchavesfilms/',
    behance: 'https://www.behance.net/alanchavesfilms',
  },

  // aPartirDe: 'AAAA-MM-DD' (opcional) esconde a seção e os links "Showreel" até a data.
  showreel: {
    video: 'assets/media/showreel/showreel_1080.mp4',
    loop: 'assets/media/showreel/showreel_loop.mp4',
    poster: 'assets/media/showreel/showreel.jpg',
  },
};

// caminhos dos arquivos de cada trabalho (inclusive os de dentro de um projeto)
const prepararCaminhos = (it, formato) => {
  it.formato = it.formato || formato;
  const arq = it.arquivo || it.id; // "arquivo" reaproveita o vídeo/capa de outro trabalho
  it.poster = it.poster || `${T}${arq}.jpg`;
  if (it.projeto) it.itens.forEach((sub) => prepararCaminhos(sub, it.formato));
  else if (!it.youtube) it.video = it.video || `${T}${arq}.mp4`;
};
window.CONTEUDO.categorias.forEach((c) => c.grupos.forEach((g) => g.itens.forEach((it) => prepararCaminhos(it, g.formato))));
