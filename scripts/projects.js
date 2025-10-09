// Array de projetos
const projects = [
  {
    id: "projeto-1",
    title: "Festança do Congo",
    description:
      "Tradicional manifestação cultural que celebra a herança africana com danças, músicas e rituais ancestrais.",
    category: "Tradição Cultural",
    image:
      "https://img.freepik.com/vetores-premium/abaixo-escuro-com-efeito-grunge_278222-10487.jpg?semt=ais_hybrid&w=740&q=80",
    alt: "Festança do Congo",
  },
  {
    id: "projeto-2",
    title: "Festival de Praia",
    description: "Evento que une comunidade e visitantes em celebração da cultura local às margens do Rio Guaporé.",
    category: "Evento Comunitário",
    image:
      "https://img.freepik.com/vetores-premium/abaixo-escuro-com-efeito-grunge_278222-10487.jpg?semt=ais_hybrid&w=740&q=80",
    alt: "Festival de Praia",
  },
  {
    id: "projeto-3",
    title: "Dia da Consciência Negra",
    description: "Programação especial que valoriza a identidade afro-brasileira e a história quilombola da região.",
    category: "Educação Cultural",
    image:
      "https://img.freepik.com/vetores-premium/abaixo-escuro-com-efeito-grunge_278222-10487.jpg?semt=ais_hybrid&w=740&q=80",
    alt: "Dia da Consciência Negra",
  },
  {
    id: "projeto-4",
    title: "Oficinas de Artesanato",
    description: "Workshops que ensinam técnicas tradicionais de artesanato quilombola para jovens e adultos.",
    category: "Educação Cultural",
    image:
      "https://img.freepik.com/vetores-premium/abaixo-escuro-com-efeito-grunge_278222-10487.jpg?semt=ais_hybrid&w=740&q=80",
    alt: "Oficinas de Artesanato",
  },
  {
    id: "projeto-5",
    title: "Preservação Histórica",
    description: "Projeto de documentação e preservação da história oral da comunidade quilombola.",
    category: "Preservação",
    image:
      "https://img.freepik.com/vetores-premium/abaixo-escuro-com-efeito-grunge_278222-10487.jpg?semt=ais_hybrid&w=740&q=80",
    alt: "Preservação Histórica",
  },
  {
    id: "projeto-6",
    title: "Música Tradicional",
    description: "Resgate e ensino das músicas e instrumentos tradicionais da cultura quilombola.",
    category: "Tradição Cultural",
    image:
      "https://img.freepik.com/vetores-premium/abaixo-escuro-com-efeito-grunge_278222-10487.jpg?semt=ais_hybrid&w=740&q=80",
    alt: "Música Tradicional",
  },
];

// Função para criar o HTML de um projeto
function ProjectCard({ id, title, description, category, image, alt }) {
  return `
    <div class="group project-card">
      <div class="relative h-64 overflow-hidden">
        <img
          src="${image}"
          alt="${alt}"
          class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
          onerror="this.src='https://img.freepik.com/vetores-premium/abaixo-escuro-com-efeito-grunge_278222-10487.jpg?semt=ais_hybrid&w=740&q=80'">
        <div class="absolute top-4 left-4">
          <span class="project-badge">${category}</span>
        </div>
      </div>
      <div class="p-6">
        <h3 class="text-xl font-bold mb-3 project-title">
          ${title}
        </h3>
        <p class="text-gray-600 mb-4 leading-relaxed">
          ${description}
        </p>
        <a href="#${id}" class="inline-flex items-center space-x-2 project-link">
          <span>Saiba mais</span>
          <i class="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
        </a>
      </div>
    </div>
  `;
}

// Função para renderizar projetos
function renderProjects(projectsArray, limit = null) {
  const projectsToRender = limit ? projectsArray.slice(0, limit) : projectsArray;
  return projectsToRender.map((project) => ProjectCard(project)).join("");
}

// Função para carregar projetos no DOM
function loadProjects() {
  const projectsContainer = document.getElementById("projects-container");

  if (projectsContainer) {
    // Mostrar loading
    projectsContainer.innerHTML = `
      <div class="col-span-full flex justify-center items-center py-8">
        <div class="text-center">
          <i class="fas fa-spinner fa-spin text-4xl text-primary mb-4"></i>
          <p class="text-gray-600">Carregando projetos...</p>
        </div>
      </div>
    `;

    // Simular delay de carregamento
    setTimeout(() => {
      projectsContainer.innerHTML = renderProjects(projects, 3);

      // Adicionar animação de entrada
      const cards = projectsContainer.querySelectorAll(".project-card");
      cards.forEach((card, index) => {
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";
        setTimeout(() => {
          card.style.transition = "all 0.5s ease";
          card.style.opacity = "1";
          card.style.transform = "translateY(0)";
        }, index * 150);
      });
    }, 500);
  }
}

// Exportar funcionalidades
window.ProjectsManager = {
  projects,
  loadProjects,
  renderProjects,
  ProjectCard,
};

// Auto-executar quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", loadProjects);
