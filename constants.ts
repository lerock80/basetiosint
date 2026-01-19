
import { Tool, Category } from './types';

export const INITIAL_CATEGORIES: Category[] = [
  { id: '1', name: 'Telefones' },
  { id: '2', name: 'Emails' },
  { id: '3', name: 'Nomes de Usuário' },
  { id: '4', name: 'Domínios' },
  { id: '5', name: 'Metadados' },
  { id: '6', name: 'Busca & Motores' },
  { id: '7', name: 'Imagens & Vídeos' },
  { id: '8', name: 'Geolocalização' },
  { id: '9', name: 'Malware & Segurança' },
  { id: '10', name: 'Redes Sociais' },
  { id: '11', name: 'Brasil Spec' },
  { id: '12', name: 'Comunicação Temporária' },
  { id: '13', name: 'Identidade & Dados Falsos' },
  { id: '14', name: 'Buscas Especializadas' },
  { id: '15', name: 'Pesquisa de Pessoas' },
  { id: '16', name: 'Motores Alternativos' },
  { id: '17', name: 'Jurídico e Processos' },
  { id: '18', name: 'Documentos e CPF/CNPJ' },
  { id: '19', name: 'Transparência e Governo' },
  { id: '20', name: 'Educação e Acadêmico' }
];

export const INITIAL_TOOLS: Tool[] = [
  // --- TELEFONES (1) ---
  { id: '1', categoryId: '1', name: 'TrueCaller', description: 'Identifica números, chamadas e bloqueia spam.', url: 'https://www.truecaller.com' },
  { id: '2', categoryId: '1', name: 'EPIEOS Phone', description: 'Pesquisa reversa de número de telefone.', url: 'https://epieos.com' },
  { id: '3', categoryId: '1', name: 'Phoneinfoga', description: 'Ferramenta avançada para scan de números internacionais.', url: 'https://github.com/sundowndev/phoneinfoga' },
  
  // --- EMAILS (2) ---
  { id: '4', categoryId: '2', name: 'Have I Been Pwned', description: 'Verifica se seu e-mail foi comprometido em vazamentos.', url: 'https://haveibeenzuckered.com/' },
  { id: '5', categoryId: '2', name: 'EmailRep', description: 'Descubra a reputação de um e-mail.', url: 'https://emailrep.io/' },
  
  // --- GEOLOCALIZAÇÃO (8) - Conforme Planilha Fornecida ---
  { id: 'csv-1', categoryId: '8', name: 'GEO', description: 'Ferramenta de análise geoespacial.', url: 'https://geo.com' },
  { id: 'csv-2', categoryId: '8', name: 'GEOINT', description: 'Recursos de inteligência geoespacial.', url: 'https://geoint.com' },
  { id: 'csv-3', categoryId: '8', name: 'GeoNames', description: 'Banco de dados geográfico mundial.', url: 'https://geonames.org' },
  { id: 'csv-4', categoryId: '8', name: 'Geoseer.net', description: 'Motor de busca para recursos OGC.', url: 'https://geoseer.net' },
  { id: 'csv-5', categoryId: '8', name: 'GeoINT Search', description: 'Busca especializada em dados geoespaciais.', url: 'https://geointsearch.com' },
  { id: 'csv-6', categoryId: '8', name: 'GeoIP Tracker tool', description: 'Rastreamento de IP e localização geográfica.', url: 'https://geoiptracker.com' },
  { id: 'csv-7', categoryId: '8', name: 'Earth Engine Dataset', description: 'Conjunto de dados massivos do Google Earth Engine.', url: 'https://earthenginedataset.com' },
  { id: 'csv-8', categoryId: '8', name: 'GeoPlatform Portal', description: 'Portal governamental de dados geoespaciais.', url: 'https://geoplatform.gov' },
  { id: 'csv-9', categoryId: '8', name: 'Inspire-geoportal.eu', description: 'Portal europeu de infraestrutura de dados espaciais.', url: 'https://inspire-geoportal.eu' },
  { id: 'csv-10', categoryId: '8', name: 'FAO Map Catalog', description: 'Catálogo de mapas da Organização para Alimentação e Agricultura.', url: 'https://fao.org/mapcatalog' },
  { id: 'csv-11', categoryId: '8', name: 'Datacore-gn', description: 'Repositório de dados ambientais globais.', url: 'https://datacore-gn.unepgrid.ch' },
  { id: 'csv-12', categoryId: '8', name: 'ISRIC Data Hub', description: 'Centro de informações mundiais sobre solos.', url: 'https://isric.org/datahub' },
  { id: 'csv-13', categoryId: '8', name: 'geocreepy', description: 'Ferramenta de OSINT para geolocalização em redes sociais.', url: 'https://geocreepy.com' },
  { id: 'csv-14', categoryId: '8', name: 'US Crisis Monitor', description: 'Monitoramento de crises e conflitos nos EUA.', url: 'https://uscrisismonitor.com' },
  { id: 'csv-15', categoryId: '8', name: 'Toronto Live', description: 'Dados em tempo real da cidade de Toronto.', url: 'https://torontolive.com' },
  { id: 'csv-16', categoryId: '8', name: 'Residential Fire Fatalities in Indiana', description: 'Mapa de fatalidades por incêndios residenciais em Indiana.', url: 'https://indianafirefatalities.com' },
  { id: 'csv-17', categoryId: '8', name: 'geoprotests API', description: 'API para dados de protestos e eventos geo-localizados.', url: 'https://geoprotestsapi.com' },
  { id: 'csv-18', categoryId: '8', name: 'geoint-py', description: 'Biblioteca Python para análise de inteligência geográfica.', url: 'https://geoint-py.com' },
  { id: 'csv-19', categoryId: '8', name: 'geoclustering', description: 'Algoritmos de agrupamento geográfico para análise.', url: 'https://geoclustering.com' },
  { id: 'csv-20', categoryId: '8', name: 'Start.me', description: 'Dashboard personalizado para analistas de geolocalização.', url: 'https://start.me' },

  // --- JURÍDICO E PROCESSOS (17) ---
  { id: 'bz-4', categoryId: '17', name: 'JusBrasil', description: 'Principal portal de processos e diários oficiais.', url: 'https://www.jusbrasil.com.br/' },
  { id: 'bz-5', categoryId: '17', name: 'Escavador', description: 'Busca de nomes em processos judiciais.', url: 'https://www.escavador.com/' },
  { id: 'bz-6', categoryId: '17', name: 'BNMP - Mandados de Prisão', description: 'Banco Nacional de Monitoramento de Prisões.', url: 'https://portalbnmp.cnj.jus.br/#/pesquisa-peca#' },
  
  // --- DOCUMENTOS E CPF/CNPJ (18) ---
  { id: 'bz-8', categoryId: '18', name: 'CPF Situacao Receita', description: 'Situação oficial do CPF na Receita Federal.', url: 'https://servicos.receita.fazenda.gov.br/Servicos/CPF/ConsultaSituacao/ConsultaPublica.asp' },
  { id: 'bz-9', categoryId: '18', name: 'CNPJ Situação Cadastral', description: 'Consulta de dados cadastrais de empresas.', url: 'http://www.receita.fazenda.gov.br/PessoaJuridica/CNPJ/cnpjreva/Cnpjreva_Solicitacao.asp' },
  
  // --- TRANSPARÊNCIA E GOVERNO (19) ---
  { id: 'bz-12', categoryId: '19', name: 'Portal da Transparência', description: 'Gastos federais, servidores e sanções.', url: 'https://portaldatransparencia.gov.br/' }
];
