// Array de notícias
const news = [
  {
    id: "noticia-1",
    title: "Nova exposição sobre a história quilombola",
    description: "Inauguração da exposição permanente que conta a trajetória de resistência e cultura da comunidade.",
    date: "15 de Dezembro, 2024",
    featured: true,
  },
  {
    id: "noticia-2",
    title: "Oficinas de artesanato tradicional",
    description: "Inscrições abertas para oficinas que ensinam técnicas ancestrais de artesanato quilombola.",
    date: "10 de Dezembro, 2024",
    featured: true,
  },
  {
    id: "noticia-3",
    title: "Documentário sobre Vila Bela em produção",
    description: "Projeto audiovisual registrará as tradições e histórias da comunidade para as futuras gerações.",
    date: "5 de Dezembro, 2024",
    featured: true,
  },
  {
    id: "noticia-4",
    title: "Festival de Música Quilombola",
    description: "Evento celebra a diversidade musical da comunidade com apresentações de grupos locais.",
    date: "1 de Dezembro, 2024",
    featured: false,
  },
  {
    id: "noticia-5",
    title: "Projeto de preservação da língua ancestral",
    description: "Iniciativa busca documentar e preservar expressões linguísticas tradicionais da comunidade.",
    date: "28 de Novembro, 2024",
    featured: false,
  },
  {
    id: "noticia-6",
    title: "Parceria com universidade local",
    description: "Acordo firmado para pesquisas sobre história e cultura quilombola na região.",
    date: "25 de Novembro, 2024",
    featured: false,
  },
];

// Função para criar o HTML de uma notícia
function NewsCard({ id, title, description, date }) {
  return `
    <article class="news-card p-4 rounded-xl hover:shadow-lg transition-shadow duration-300">
      <div class="flex items-center space-x-2 news-date text-sm font-medium mb-2">
        <i class="fas fa-calendar"></i>
        <span>${date}</span>
      </div>
      <h3 class="text-lg font-bold mb-2 project-title cursor-pointer" data-news-id="${id}">
        ${title}
      </h3>
      <p class="text-gray-600 text-sm leading-relaxed">
        ${description}
      </p>
    </article>
  `;
}

// Função para renderizar notícias
function renderNews(newsArray, limit = null, featuredOnly = false) {
  let newsToRender = featuredOnly ? newsArray.filter((item) => item.featured) : newsArray;

  newsToRender = limit ? newsToRender.slice(0, limit) : newsToRender;

  return newsToRender.map((newsItem) => NewsCard(newsItem)).join("");
}

// Função para carregar notícias no DOM
function loadNews() {
  const newsContainer = document.getElementById("news-container");

  if (newsContainer) {
    // Mostrar loading
    newsContainer.innerHTML = `
      <div class="col-span-full flex justify-center items-center py-4">
        <div class="text-center">
          <i class="fas fa-spinner fa-spin text-2xl text-primary mb-2"></i>
          <p class="text-gray-600 text-sm">Carregando notícias...</p>
        </div>
      </div>
    `;

    // Simular delay de carregamento
    setTimeout(() => {
      newsContainer.innerHTML = renderNews(news, 3, true);

      // Adicionar animação de entrada
      const cards = newsContainer.querySelectorAll(".news-card");
      cards.forEach((card, index) => {
        card.style.opacity = "0";
        card.style.transform = "translateY(10px)";
        setTimeout(() => {
          card.style.transition = "all 0.3s ease";
          card.style.opacity = "1";
          card.style.transform = "translateY(0)";
        }, index * 100);
      });

      // Adicionar eventos de clique nos títulos
      addNewsClickEvents();
    }, 300);
  }
}

// Função para adicionar eventos de clique nas notícias
function addNewsClickEvents() {
  const newsTitles = document.querySelectorAll("[data-news-id]");
  newsTitles.forEach((title) => {
    title.addEventListener("click", function () {
      const newsId = this.getAttribute("data-news-id");
      const newsItem = news.find((item) => item.id === newsId);
      if (newsItem) {
        showNewsModal(newsItem);
      }
    });
  });
}

// Função para exibir modal com detalhes da notícia
function showNewsModal(newsItem) {
  // Criar modal simples
  const modal = document.createElement("div");
  modal.className = "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4";
  modal.innerHTML = `
    <div class="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
      <div class="flex justify-between items-start mb-4">
        <div>
          <span class="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium mb-2">
            ${newsItem.category}
          </span>
          <h2 class="text-2xl font-bold text-gray-900">${newsItem.title}</h2>
          <p class="text-gray-600 mt-2">
            <i class="fas fa-calendar mr-2"></i>${newsItem.date}
          </p>
        </div>
        <button class="text-gray-500 hover:text-gray-700 text-2xl" onclick="this.closest('.fixed').remove()">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="prose max-w-none">
        <p class="text-gray-700 leading-relaxed">${newsItem.description}</p>
        <p class="text-gray-700 leading-relaxed mt-4">
          Esta é uma notícia em destaque da comunidade quilombola Teresa. 
          Para mais informações, entre em contato conosco através dos canais oficiais.
        </p>
      </div>
      <div class="mt-6 flex justify-end">
        <button class="btn-primary text-white px-6 py-2 rounded-full font-semibold" onclick="this.closest('.fixed').remove()">
          Fechar
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  // Fechar modal ao clicar no background
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal.remove();
    }
  });
}

// Exportar funcionalidades
window.NewsManager = {
  news,
  loadNews,
  renderNews,
  NewsCard,
  showNewsModal,
};

// Auto-executar quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", loadNews);
