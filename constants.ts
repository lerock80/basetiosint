
import { Tool, Category } from './types';

export const INITIAL_CATEGORIES: Category[] = [
  { id: 'cat-tel', name: 'Telefone' },
  { id: 'cat-mail', name: 'E-mail' },
  { id: 'cat-social', name: 'Redes Sociais' },
  { id: 'cat-dom', name: 'Domínios' },
  { id: 'cat-meta', name: 'Metadados' },
  { id: 'cat-search', name: 'Busca Geral' },
  { id: 'cat-img', name: 'Imagens' },
  { id: 'cat-fin', name: 'Financeiro' },
  { id: 'cat-com', name: 'Comercial' },
  { id: 'cat-geo', name: 'Geolocalização' },
  { id: 'cat-track', name: 'Rastreamento' },
  { id: 'cat-sec', name: 'Segurança' },
  { id: 'cat-fb', name: 'Facebook' },
  { id: 'cat-ig', name: 'Instagram' },
  { id: 'cat-tw', name: 'Twitter' },
  { id: 'cat-tk', name: 'TikTok' },
  { id: 'cat-transp', name: 'Transparência' },
  { id: 'cat-gen', name: 'Geradores' },
  { id: 'cat-plat', name: 'Plataformas Integradas' },
  { id: 'cat-adv', name: 'Busca Avançada' }
];

export const INITIAL_TOOLS: Tool[] = [
  // Telefone
  { id: 't1', categoryId: 'cat-tel', name: 'TrueCaller', description: 'Identificação de chamadas e bloqueio de spam.', url: 'https://www.truecaller.com' },
  { id: 't2', categoryId: 'cat-tel', name: 'EPIEOS', description: 'Investigação de contas vinculadas a números de telefone.', url: 'https://epieos.com' },
  { id: 't3', categoryId: 'cat-tel', name: 'Phoneinfoga', description: 'Scanner avançado para números de telefone internacionais.', url: 'https://github.com/sundowndev/phoneinfoga' },
  { id: 't4', categoryId: 'cat-tel', name: 'Sync.me', description: 'Identificador de chamadas e busca reversa de fotos.', url: 'https://sync.me/' },
  { id: 't5', categoryId: 'cat-tel', name: "That's Them", description: 'Busca reversa de telefone e dados residenciais.', url: 'https://thatsthem.com/reverse-phone-lookup' },
  { id: 't6', categoryId: 'cat-tel', name: 'WhoCalledMe', description: 'Base de dados comunitária de números suspeitos.', url: 'https://www.whocallme.com/choose-your-country' },
  { id: 't7', categoryId: 'cat-tel', name: 'FreeCarrierLookup', description: 'Verifica a operadora de origem de um número.', url: 'https://freecarrierlookup.com/' },
  { id: 't8', categoryId: 'cat-tel', name: 'Ignorant', description: 'Verifica se um número está registrado no Snapchat.', url: 'https://github.com/megadose/ignorant' },
  { id: 't9', categoryId: 'cat-tel', name: 'Phunter', description: 'Ferramenta de busca de informações telefônicas.', url: 'https://github.com/N0rz3/Caçador' },

  // E-mail
  { id: 'm1', categoryId: 'cat-mail', name: 'Have I Been Zuckered', description: 'Verifica exposição de dados em vazamentos do Facebook.', url: 'https://haveibeenzuckered.com/' },
  { id: 'm2', categoryId: 'cat-mail', name: 'EPIEOS Email', description: 'Descubra perfis vinculados a um endereço de e-mail.', url: 'https://epieos.com/' },
  { id: 'm3', categoryId: 'cat-mail', name: 'VerifyEmailAddress', description: 'Validação de existência de caixas de e-mail.', url: 'https://www.verifyemailaddress.org/' },
  { id: 'm4', categoryId: 'cat-mail', name: 'Have I Been Pwned', description: 'Verifique se seu e-mail foi exposto em brechas de dados.', url: 'https://haveibeenpwned.com/' },
  { id: 'm5', categoryId: 'cat-mail', name: 'EmailRep', description: 'Analisa a reputação e histórico de um e-mail.', url: 'https://emailrep.io/' },
  { id: 'm6', categoryId: 'cat-mail', name: 'Holehe', description: 'Checa contas criadas com um e-mail em centenas de sites.', url: 'https://github.com/megadose/holehe' },
  { id: 'm7', categoryId: 'cat-mail', name: 'Infoga', description: 'Coleta de informações de e-mails de fontes públicas.', url: 'https://github.com/GiJ03/Infoga' },
  { id: 'm8', categoryId: 'cat-mail', name: 'Hunter.io', description: 'Encontre endereços de e-mail corporativos rapidamente.', url: 'https://hunter.io/' },
  { id: 'm9', categoryId: 'cat-mail', name: 'Metric Sparrow', description: 'Gerador de combinações para descoberta de e-mails.', url: 'http://metricsparrow.com/toolkit/email-permutator' },
  { id: 'm10', categoryId: 'cat-mail', name: 'RocketReach', description: 'Conecte-se com profissionais através de busca de e-mails.', url: 'https://rocketreach.co/' },
  { id: 'm11', categoryId: 'cat-mail', name: 'GHunt', description: 'Investigação avançada de contas Google (Gmail/Docs).', url: 'https://github.com/mxrch/GHunt' },

  // Redes Sociais
  { id: 's1', categoryId: 'cat-social', name: 'Sherlock', description: 'Encontre perfis de usuários em mais de 300 redes sociais.', url: 'https://github.com/sherlock-project/sherlock' },
  { id: 's2', categoryId: 'cat-social', name: 'Namechk', description: 'Verifique disponibilidade de nomes de usuário e domínios.', url: 'https://namechk.com' },
  { id: 's3', categoryId: 'cat-social', name: 'WhatsMyName Web', description: 'Busca rápida de usernames em múltiplos diretórios.', url: 'https://whatsmyname.app' },
  { id: 's4', categoryId: 'cat-social', name: 'NameCheckUp', description: 'Ferramenta simples para checar presença em redes.', url: 'https://namecheckup.com' },
  { id: 's5', categoryId: 'cat-social', name: 'Pesquisa Instantânea', description: 'Checagem instantânea de disponibilidade de username.', url: 'https://instantusername.com/' },
  { id: 's6', categoryId: 'cat-social', name: 'Profil3r', description: 'Ferramenta de OSINT para encontrar perfis correlacionados.', url: 'https://github.com/Greyjedix/Profil3r' },
  { id: 's7', categoryId: 'cat-social', name: 'Nexfil', description: 'Ferramenta de busca de usernames ultra-rápida.', url: 'https://github.com/thewhiteh4t/nexfil' },

  // Domínios
  { id: 'd1', categoryId: 'cat-dom', name: 'Dominio.es', description: 'Busca de informações sobre domínios .es.', url: 'https://nic.es/sgnd/dominio/publicBuscarDominios.action' },
  { id: 'd2', categoryId: 'cat-dom', name: 'Dossiê de Domínio', description: 'Ferramenta completa para análise WHOIS e DNS.', url: 'https://centralops.net/co/DomainDossier.aspx' },
  { id: 'd3', categoryId: 'cat-dom', name: 'Nmmapper', description: 'Scanner de subdomínios e infraestrutura web.', url: 'https://www.nmmapper.com/sys/tools/subdomainfinder' },
  { id: 'd4', categoryId: 'cat-dom', name: 'BuiltWith', description: 'Descubra quais tecnologias um site utiliza.', url: 'https://builtwith.com/es' },
  { id: 'd5', categoryId: 'cat-dom', name: 'DNS Dumpster', description: 'Mapeamento visual e técnico de registros DNS.', url: 'https://dnsdumpster.com' },
  { id: 'd6', categoryId: 'cat-dom', name: 'Assetfinder', description: 'Encontre ativos e subdomínios relacionados.', url: 'https://github.com/tomnomnom/assetfinder' },
  { id: 'd7', categoryId: 'cat-dom', name: 'Sublist3r', description: 'Enumeração de subdomínios via motores de busca.', url: 'https://github.com/aboul3la/Sublist3r' },
  { id: 'd8', categoryId: 'cat-dom', name: 'DNSTwist', description: 'Detecte ataques de typosquatting e phishing.', url: 'https://github.com/elceef/dnstwist' },

  // Metadados
  { id: 'me1', categoryId: 'cat-meta', name: 'Exiftool', description: 'O padrão da indústria para leitura de metadados.', url: 'https://github.com/exiftool/exiftool' },
  { id: 'me2', categoryId: 'cat-meta', name: 'Pymeta', description: 'Extração de metadados de arquivos do Office e PDF.', url: 'https://github.com/m8sec/pymeta' },
  { id: 'me3', categoryId: 'cat-meta', name: 'FOCA', description: 'Extração de metadados e infraestrutura de servidores.', url: 'https://github.com/ElevenPaths/FOCA' },
  { id: 'me4', categoryId: 'cat-meta', name: 'Metadata2go', description: 'Visualizador de metadados online gratuito.', url: 'https://www.metadata2go.com/' },
  { id: 'me5', categoryId: 'cat-meta', name: 'Verexif', description: 'Veja e remova dados EXIF de fotos online.', url: 'https://www.verexif.com' },

  // Busca Geral
  { id: 'bg1', categoryId: 'cat-search', name: 'Shodan', description: 'Motor de busca para dispositivos conectados à Internet.', url: 'https://www.shodan.io' },
  { id: 'bg2', categoryId: 'cat-search', name: 'Wolfram Alpha', description: 'Motor de conhecimento computacional e estatístico.', url: 'https://www.wolframalpha.com' },
  { id: 'bg3', categoryId: 'cat-search', name: 'Boardreader', description: 'Busca especializada em fóruns e comunidades.', url: 'https://boardreader.com' },
  { id: 'bg4', categoryId: 'cat-search', name: 'Science.gov', description: 'Portal de informações científicas governamentais.', url: 'https://www.science.gov/' },
  { id: 'bg5', categoryId: 'cat-search', name: 'Google Trends', description: 'Análise de tendências de termos de pesquisa.', url: 'https://trends.google.es/trends/' },
  { id: 'bg6', categoryId: 'cat-search', name: 'Archive.org', description: 'O arquivo definitivo da Web (Wayback Machine).', url: 'https://archive.org' },
  { id: 'bg7', categoryId: 'cat-search', name: 'Ressuscitar Páginas', description: 'Extensão para visualizar versões em cache de sites.', url: 'https://addons.mozilla.org/es/firefox/addon/resurrect-pages' },

  // Imagens
  { id: 'i1', categoryId: 'cat-img', name: 'Tineye', description: 'Motor de busca reversa de imagens focado em correspondência exata.', url: 'https://tineye.com' },
  { id: 'i2', categoryId: 'cat-img', name: 'Google Images / Lens', description: 'A maior base de dados visual para busca reversa.', url: 'https://www.google.com/imghp' },
  { id: 'i3', categoryId: 'cat-img', name: 'Bing Visual Search', description: 'Poderosa ferramenta de reconhecimento de objetos em imagens.', url: 'https://www.bing.com/images' },
  { id: 'i4', categoryId: 'cat-img', name: 'Yandex Images', description: 'Excelente para reconhecimento facial e paisagens.', url: 'https://yandex.com/images' },
  { id: 'i5', categoryId: 'cat-img', name: 'Baidu Images', description: 'Principal motor de busca visual do mercado chinês.', url: 'https://image.baidu.com' },
  { id: 'i6', categoryId: 'cat-img', name: 'Reverse Search Ext.', description: 'Extensão universal para busca reversa simultânea.', url: 'https://chromewebstore.google.com/detail/search-byimage/cnojnbdhbhnkbcieeekonklommdnndci' },

  // Financeiro e Comercial
  { id: 'f1', categoryId: 'cat-fin', name: 'Verificador de IBAN', description: 'Validação e extração de dados de códigos bancários.', url: 'https://www.iban.com/' },
  { id: 'f2', categoryId: 'cat-fin', name: 'Verificador de Cartão', description: 'Validador de algoritmos de números de cartão.', url: 'https://www.validcreditcardnumber.com' },
  { id: 'c1', categoryId: 'cat-com', name: 'LibreBOR', description: 'Consulta livre ao Boletim Oficial do Registro Mercantil.', url: 'https://librebor.me/' },
  { id: 'c2', categoryId: 'cat-com', name: 'DatosCif', description: 'Informação empresarial e estatísticas de empresas.', url: 'https://www.datoscif.es/' },
  { id: 'c3', categoryId: 'cat-com', name: 'Iberinform', description: 'Relatórios de risco e informações comerciais.', url: 'https://www.iberinform.es/' },
  { id: 'c4', categoryId: 'cat-com', name: 'OpenCorporates', description: 'A maior base de dados aberta de empresas do mundo.', url: 'https://opencorporates.com' },
  { id: 'c5', categoryId: 'cat-com', name: 'Brownbook', description: 'Diretório global de negócios editável.', url: 'https://www.brownbook.net/' },

  // Geolocalização e Rastreamento
  { id: 'g1', categoryId: 'cat-geo', name: 'Qual é o meu IP', description: 'Detecção de geolocalização por endereço IP.', url: 'https://www.cual-es-mi-ip.net/' },
  { id: 'g2', categoryId: 'cat-geo', name: 'Google Maps', description: 'Visualização de satélite e Street View global.', url: 'https://www.google.es/maps/' },
  { id: 'rt1', categoryId: 'cat-track', name: 'Quem me leu', description: 'Rastreamento de leitura de e-mails.', url: 'https://whoreadme.com' },
  { id: 'rt2', categoryId: 'cat-track', name: 'Flightradar24', description: 'Monitoramento de tráfego aéreo em tempo real.', url: 'https://www.flightradar24.com' },
  { id: 'rt3', categoryId: 'cat-track', name: 'IP Logger', description: 'Geração de links para rastreamento de IPs.', url: 'https://iplogger.org/es/' },

  // Segurança
  { id: 'sc1', categoryId: 'cat-sec', name: 'VirusTotal', description: 'Análise de arquivos e URLs por múltiplos antivírus.', url: 'https://www.virustotal.com/gui/home/upload' },
  { id: 'sc2', categoryId: 'cat-sec', name: 'Sukuri SiteCheck', description: 'Scanner de malware e segurança para websites.', url: 'https://sitecheck.sucuri.net/' },
  { id: 'sc3', categoryId: 'cat-sec', name: 'Hybrid Analysis', description: 'Sandbox gratuita para análise profunda de malware.', url: 'https://www.hybrid-análise.com/' },

  // Facebook
  { id: 'fb1', categoryId: 'cat-fb', name: 'Stalkface', description: 'Exploração de fotos e posts públicos do Facebook.', url: 'https://stalkface.com/es/' },
  { id: 'fb2', categoryId: 'cat-fb', name: 'Lookup ID', description: 'Encontre o ID numérico de perfis do Facebook.', url: 'https://lookup-id.com/' },
  { id: 'fb3', categoryId: 'cat-fb', name: 'Inteltechniques FB', description: 'Ferramentas de busca customizada para Facebook.', url: 'https://inteltechniques.com/osint/facebook.html' },
  { id: 'fb4', categoryId: 'cat-fb', name: 'FB Sleep Stats', description: 'Análise de hábitos de sono via atividade online.', url: 'https://github.com/sqren/fb-sleep-stats' },
  { id: 'fb5', categoryId: 'cat-fb', name: 'FB Video Downloader', description: 'Download de vídeos públicos da plataforma.', url: 'https://fdown.net/' },

  // Instagram
  { id: 'ig1', categoryId: 'cat-ig', name: 'Instaloader', description: 'Ferramenta de CLI para baixar mídias do Instagram.', url: 'https://github.com/instaloader/instaloader' },
  { id: 'ig2', categoryId: 'cat-ig', name: 'Seletor de Comentários', description: 'Extração de dados e IDs de usuários no Instagram.', url: 'https://commentpicker.com/instagram-user-id.php' },
  { id: 'ig3', categoryId: 'cat-ig', name: 'Sterraxcyl', description: 'Extração de informações de perfis do Instagram.', url: 'https://github.com/novitae/sterraxcyl' },
  { id: 'ig4', categoryId: 'cat-ig', name: 'SSS Instagram', description: 'Download rápido de Reels e Stories.', url: 'https://sssinstagram.com/es' },
  { id: 'ig5', categoryId: 'cat-ig', name: 'Geluchat', description: 'Extensão OSINT para Facebook e Instagram.', url: 'https://addons.mozilla.org/es/firefox/addon/facebook-instagram-osint/' },

  // Twitter
  { id: 'tw1', categoryId: 'cat-tw', name: 'Twitter ID Finder', description: 'Obtenha o ID permanente de qualquer conta X.', url: 'https://twiteridfinder.com/' },
  { id: 'tw2', categoryId: 'cat-tw', name: 'Twint', description: 'Extração de Tweets sem usar a API oficial.', url: 'https://github.com/twintproject/twint' },
  { id: 'tw3', categoryId: 'cat-tw', name: 'X2Twitter', description: 'Downloader de mídias e fotos do Twitter.', url: 'https://x2twitter.com/es/download-twitter-photo' },
  { id: 'tw4', categoryId: 'cat-tw', name: 'Getfvid Twitter', description: 'Download de vídeos e GIFs do Twitter.', url: 'https://www.getfvid.com/es/twitter' },
  { id: 'tw5', categoryId: 'cat-tw', name: 'Tweetdeck', description: 'Monitoramento profissional de múltiplas timelines.', url: 'https://create.twitter.com/es/products/tweetdeck' },

  // TikTok
  { id: 'tk1', categoryId: 'cat-tk', name: 'Comment Picker TK', description: 'Encontre o ID de usuário do TikTok via perfil.', url: 'https://commentpicker.com/tiktok-id.php' },
  { id: 'tk2', categoryId: 'cat-tk', name: 'SSSTIK', description: 'Baixe vídeos do TikTok sem marca d\'água.', url: 'https://ssstik.io/es' },
  { id: 'tk3', categoryId: 'cat-tk', name: 'TikTok Scraper', description: 'Web scraper para vídeos e tendências do TikTok.', url: 'https://github.com/drawrowfly/tiktok-scraper' },

  // Transparência
  { id: 'tr1', categoryId: 'cat-transp', name: 'Transparentia', description: 'Buscador de gastos públicos e políticos.', url: 'https://transparentia.newtral.es/buscador' },
  { id: 'tr2', categoryId: 'cat-transp', name: 'Infoelectoral', description: 'Dados históricos sobre processos eleitorais.', url: 'https://infoelectoral.interior.gob.es/es/inicio/' },

  // Geradores
  { id: 'ge1', categoryId: 'cat-gen', name: 'Random Face Gen', description: 'Gera rostos realistas de pessoas que não existem.', url: 'https://this-person-does-not-exist.com/en' },
  { id: 'ge2', categoryId: 'cat-gen', name: 'Fake Name Gen', description: 'Gera identidades completas para personas/fakes.', url: 'https://es.fakenamegenerator.com/' },

  // Plataformas Integradas
  { id: 'pl1', categoryId: 'cat-plat', name: 'Maltego', description: 'Software padrão para mineração de dados e inteligência visual.', url: 'https://www.maltego.com/' },
  { id: 'pl2', categoryId: 'cat-plat', name: 'Lampyre', description: 'Plataforma para análise de big data para investigação.', url: 'https://lampyre.io/' },
  { id: 'pl3', categoryId: 'cat-plat', name: 'SocialLinks', description: 'Soluções avançadas para investigação em mídias sociais.', url: 'https://sociallinks.io/es' },
  { id: 'pl4', categoryId: 'cat-plat', name: 'Recon-ng', description: 'Framework de reconhecimento web baseado em módulos.', url: 'https://github.com/lanmaster53/recon-ng' },
  { id: 'pl5', categoryId: 'cat-plat', name: 'Spiderfoot', description: 'Automação total de OSINT para descoberta de ativos.', url: 'https://github.com/smicallef/spiderfoot' },
  { id: 'pl6', categoryId: 'cat-plat', name: 'TheHarvester', description: 'Coleta de e-mails, subdomínios, IPs e nomes.', url: 'https://github.com/laramies/theHarvester' },
  { id: 'pl7', categoryId: 'cat-plat', name: 'Skopenow', description: 'Software analítico para descoberta de pessoas e fraude.', url: 'https://www.skopenow.com/' },
  { id: 'pl8', categoryId: 'cat-plat', name: 'Maryam', description: 'Framework modular para OSINT baseado em Python.', url: 'https://github.com/saeeddhqan/Maryam' },
  { id: 'pl9', categoryId: 'cat-plat', name: 'iKy', description: 'Ferramenta visual para coletar informações de um alvo.', url: 'https://github.com/kennbroorg/iKy' },

  // Busca Avançada
  { id: 'ad1', categoryId: 'cat-adv', name: 'Google Dorks', description: 'Base de dados de consultas avançadas para hacking.', url: 'https://www.exploit-db.com/google-hacking-database' }
];
