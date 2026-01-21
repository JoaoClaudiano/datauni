# DataUni 📊

**Uma plataforma mobile-first para criação, aplicação e análise de questionários acadêmicos**

[![Status do Projeto](https://img.shields.io/badge/Status-Em_Desenvolvimento-yellow)](https://github.com/seu-usuario/datauni)
[![Licença](https://img.shields.io/badge/Licença-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/Frontend-React-61DAFB)](https://reactjs.org/)
[![Firebase](https://img.shields.io/badge/Backend-Firebase-FFCA28)](https://firebase.google.com/)
[![PWA](https://img.shields.io/badge/PWA-✅-5A0FC8)](https://web.dev/progressive-web-apps/)

## 🌟 Visão Geral

O DataUni é uma plataforma desenvolvida especificamente para a comunidade acadêmica, permitindo a criação, distribuição e análise de pesquisas universitárias com foco total em experiência mobile. Diferente de soluções genéricas como Google Forms, nascemos com o DNA acadêmico e mobile-first.

**Problema que resolvemos:** Pesquisas universitárias hoje são criadas em ferramentas genéricas, difíceis de usar no celular, com análise limitada e sem foco no contexto acadêmico.

**Nossa solução:** Uma plataforma onde estudantes, pesquisadores e professores criam questionários inteiros pelo celular, com dashboards automáticos prontos para artigos e TCCs.

## ✨ Funcionalidades Principais

### 📱 Criação Mobile-First
- Interface tipo "card-swiping" para criar questionários rapidamente
- Templates acadêmicos pré-definidos (avaliação de disciplina, saúde mental, etc.)
- Pré-visualização em tempo real da experiência do respondente
- Biblioteca de perguntas comuns em pesquisas universitárias

### 📊 Análise Automática
- Dashboards com gráficos prontos para uso acadêmico
- Comparativos automáticos por curso, período ou turma
- Word clouds para respostas abertas
- Exportação em formatos acadêmicos (CSV, PDF, imagens de gráficos)

### 🔗 Compartilhamento Simplificado
- Links otimizados para WhatsApp e redes sociais
- QR Code para coleta em eventos universitários
- Sem login obrigatório para respondentes
- Interface "stories-like" para maior engajamento

## 🏗️ Arquitetura Técnica

```
datauni/
├── frontend/                 # Aplicação React PWA
│   ├── src/
│   │   ├── components/      # Componentes reutilizáveis
│   │   ├── pages/          # Páginas principais
│   │   ├── hooks/          # Custom hooks
│   │   └── utils/          # Funções auxiliares
├── functions/               # Cloud Functions (Firebase)
│   ├── analytics/          # Processamento de dados
│   └── export/             # Geração de relatórios
└── firebase/               # Configuração Firebase
    ├── firestore.rules     # Regras de segurança
    └── firebase.json       # Configuração do projeto
```

### Stack Tecnológica
- **Frontend:** React 18 + TypeScript + Tailwind CSS
- **Backend:** Firebase (Firestore, Auth, Storage, Functions)
- **Deploy:** Firebase Hosting
- **Analytics:** Chart.js + Recharts
- **Estado:** Zustand (leve e simples)
- **UI/UX:** Framer Motion para animações

## 🚀 Começando

### Pré-requisitos
- Node.js 18+ e npm/yarn
- Conta no Firebase
- Git instalado

### Instalação Local

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/datauni.git
cd datauni
```

2. **Instale as dependências**
```bash
cd frontend
npm install
# ou
yarn install
```

3. **Configure o Firebase**
- Crie um projeto em [Firebase Console](https://console.firebase.google.com)
- Ative Authentication, Firestore e Storage
- Copie as credenciais para `.env.local`:
```env
REACT_APP_FIREBASE_API_KEY=your_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project
```

4. **Execute localmente**
```bash
npm start
# ou
yarn start
```

A aplicação estará disponível em `http://localhost:3000`

## 📦 Scripts Disponíveis

No diretório `frontend/`:

- `npm start` - Inicia o servidor de desenvolvimento
- `npm build` - Cria build para produção
- `npm test` - Executa testes
- `npm run deploy` - Deploy no Firebase Hosting

## 🎯 Roadmap

### MVP (Versão 1.0)
- [x] Criador básico de questionários mobile
- [x] 3 tipos de pergunta (múltipla escolha, texto, escala)
- [x] Dashboard com gráficos simples
- [x] Exportação CSV
- [ ] Autenticação por email
- [ ] PWA instalável

### Versão 2.0 (Próximos)
- [ ] Templates acadêmicos
- [ ] Análise comparativa
- [ ] Exportação PDF com gráficos
- [ ] Biblioteca de perguntas
- [ ] Modo offline para respostas

### Versão 3.0 (Futuro)
- [ ] API para integração
- [ ] DataUni Open (repositório público)
- [ ] Análise longitudinal
- [ ] Integração com sistemas acadêmicos

## 🤝 Como Contribuir

Adoramos contribuições da comunidade acadêmica! 

1. **Fork** o projeto
2. Crie uma **branch** para sua feature (`git checkout -b feature/incrivel`)
3. **Commit** suas mudanças (`git commit -m 'Adiciona feature incrível'`)
4. **Push** para a branch (`git push origin feature/incrivel`)
5. Abra um **Pull Request**

### Padrões de Código
- Usamos ESLint e Prettier para consistência
- Commits seguem [Conventional Commits](https://www.conventionalcommits.org/)
- Documente novas funcionalidades
- Teste suas mudanças

## 📱 Screenshots

*(Adicione screenshots quando disponível)*

| Criador Mobile | Dashboard | Respondente |
|----------------|-----------|-------------|
| ![Criador](link-imagem) | ![Dashboard](link-imagem) | ![Respondente](link-imagem) |

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👥 Equipe

- **Seu Nome** - Idealizador e Desenvolvedor Principal
- **Contribuidores** - [Lista de contribuidores](https://github.com/seu-usuario/datauni/contributors)

## 📞 Contato

- **Website:** [em breve]
- **Email:** contato@datauni.app
- **Twitter:** [@datauni_app](https://twitter.com/datauni_app)
- **Discord:** [Comunidade DataUni](https://discord.gg/link)

## 🙏 Agradecimentos

- Comunidade acadêmica por validar a ideia
- Firebase por fornecer uma infraestrutura robusta e gratuita
- Todos os contribuidores que ajudam a melhorar a plataforma

---

<div align="center">
  <p>Feito com ❤️ para a comunidade acadêmica brasileira</p>
  <p>DataUni - Porque toda pesquisa universitária merece uma ferramenta própria</p>
</div>

## 📚 Recursos Adicionais

- [Documentação Completa](docs/) - Guias detalhados de uso
- [API Reference](docs/api.md) - Documentação da API
- [FAQ](docs/faq.md) - Perguntas frequentes
- [CHANGELOG](CHANGELOG.md) - Histórico de mudanças

---

**Nota:** Este é um projeto em desenvolvimento ativo. Novas funcionalidades são adicionadas regularmente baseadas no feedback da comunidade acadêmica.
