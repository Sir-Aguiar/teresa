const discographyTracks = [
  {
    id: "track-1",
    title: "Poema para Vila Bela",
    artist: "Grupo Aurora",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    audioFile: "./assets/discografia/00 - Poema para Vila Bela.mp3",
  },
  {
    id: "track-2",
    title: "A rosa",
    artist: "Grupo Aurora",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
    audioFile: "./assets/discografia/01 - A rosa.mp3",
  },
  {
    id: "track-3",
    title: "Nunca te darei perdão",
    artist: "Grupo Aurora",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse.",
    audioFile: "./assets/discografia/02 - Nunca te darei perdão.mp3",
  },
  {
    id: "track-4",
    title: "Campo Verde Serenado",
    artist: "Grupo Aurora",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Excepteur sint occaecat cupidatat non proident, sunt in culpa.",
    audioFile: "./assets/discografia/03- Campo Verde Serenado.mp3",
  },
  {
    id: "track-5",
    title: "Ranchinho",
    artist: "Grupo Aurora",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem.",
    audioFile: "./assets/discografia/04 - Ranchinho.mp3",
  },
  {
    id: "track-6",
    title: "Ó de casa",
    artist: "Grupo Aurora",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. At vero eos et accusamus et iusto odio dignissimos ducimus.",
    audioFile: "./assets/discografia/05 - Ó de casa.mp3",
  },
  {
    id: "track-7",
    title: "Pássaro Preto",
    artist: "Grupo Aurora",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Temporibus autem quibusdam et aut officiis debitis aut rerum.",
    audioFile: "./assets/discografia/06 - Pássaro Preto.mp3",
  },
  {
    id: "track-8",
    title: "Lamento Sertanejo",
    artist: "Grupo Aurora",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam libero tempore, cum soluta nobis est eligendi optio cumque.",
    audioFile: "./assets/discografia/07 - Lamento Sertanejo.mp3",
  },
  {
    id: "track-9",
    title: "Canção do Carreiro",
    artist: "Grupo Aurora",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque porro quisquam est, qui dolorem ipsum quia dolor sit.",
    audioFile: "./assets/discografia/08 - Canção do Carreiro.mp3",
  },
  {
    id: "track-10",
    title: "Rasqueado Mineiro",
    artist: "Grupo Aurora",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minima veniam, quis nostrum exercitationem ullam.",
    audioFile: "./assets/discografia/09 - Rasqueado Mineiro.mp3",
  },
  {
    id: "track-11",
    title: "Beijinho Doce",
    artist: "Grupo Aurora",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis autem vel eum iure reprehenderit qui in ea voluptate velit.",
    audioFile: "./assets/discografia/10 - Beijinho Doce.mp3",
  },
  {
    id: "track-12",
    title: "Viola Cabocla",
    artist: "Grupo Aurora",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et harum quidem rerum facilis est et expedita distinctio.",
    audioFile: "./assets/discografia/11 - Viola Cabocla.mp3",
  },
  {
    id: "track-13",
    title: "Cabocla Teresa",
    artist: "Grupo Aurora",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam libero tempore, cum soluta nobis est eligendi optio.",
    audioFile: "./assets/discografia/12 - Cabocla Teresa.mp3",
  },
  {
    id: "track-14",
    title: "Cuiabá Formosa",
    artist: "Grupo Aurora",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus.",
    audioFile: "./assets/discografia/13 - Cuiabá Formosa.mp3",
  },
  {
    id: "track-15",
    title: "O Sabiá e a Grola",
    artist: "Grupo Aurora",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Itaque earum rerum hic tenetur a sapiente delectus ut aut.",
    audioFile: "./assets/discografia/14 - O Sabiá e a Grola.mp3",
  },
  {
    id: "track-16",
    title: "Beijinho Doce",
    artist: "Grupo Aurora",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.",
    audioFile: "./assets/discografia/15 - Beijinho Doce.mp3",
  },
];

class DiscographyCarousel {
  constructor() {
    this.currentTrackIndex = 0;
    this.tracks = discographyTracks;
    this.audioPlayer = null;
    this.isInitialized = false;

    this.init();
  }

  init() {
    if (this.isInitialized) return;

    this.audioPlayer = document.getElementById("audio-player");
    if (!this.audioPlayer) {
      console.error("Player de áudio não encontrado!");
      return;
    }

    this.setupEventListeners();
    this.createTrackIndicators();
    this.loadTrack(0);

    this.isInitialized = true;
    console.log("Carrossel de discografia inicializado com", this.tracks.length, "faixas");
  }

  setupEventListeners() {
    // Botões de navegação
    const prevBtn = document.getElementById("prev-track");
    const nextBtn = document.getElementById("next-track");
    const mobilePrevBtn = document.getElementById("mobile-prev");
    const mobileNextBtn = document.getElementById("mobile-next");

    if (prevBtn) prevBtn.addEventListener("click", () => this.previousTrack());
    if (nextBtn) nextBtn.addEventListener("click", () => this.nextTrack());
    if (mobilePrevBtn) mobilePrevBtn.addEventListener("click", () => this.previousTrack());
    if (mobileNextBtn) mobileNextBtn.addEventListener("click", () => this.nextTrack());

    // Eventos do player de áudio
    if (this.audioPlayer) {
      this.audioPlayer.addEventListener("ended", () => this.nextTrack());

      this.audioPlayer.addEventListener("error", (e) => {
        console.error("Erro no player de áudio:", e);
        this.showAudioError();
      });

      this.audioPlayer.addEventListener("canplay", () => {
        console.log("Áudio carregado e pronto para reprodução");
      });

      this.audioPlayer.addEventListener("loadstart", () => {
        console.log("Iniciando carregamento do áudio:", this.tracks[this.currentTrackIndex].audioFile);
      });
    }

    // Navegação por teclado (apenas quando na seção)
    document.addEventListener("keydown", (e) => {
      if (this.isInViewport()) {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          this.previousTrack();
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          this.nextTrack();
        } else if (e.key === " ") {
          e.preventDefault();
          this.togglePlayPause();
        }
      }
    });
  }

  createTrackIndicators() {
    const indicatorsContainer = document.getElementById("track-indicators");
    if (!indicatorsContainer) return;

    indicatorsContainer.innerHTML = "";

    this.tracks.forEach((_, index) => {
      const indicator = document.createElement("div");
      indicator.className = `w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
        index === 0 ? "bg-primary" : "bg-gray-300 hover:bg-gray-400"
      }`;
      indicator.setAttribute("data-track", index);
      indicator.addEventListener("click", () => this.loadTrack(index));
      indicatorsContainer.appendChild(indicator);
    });

    // Atualizar total de faixas
    const totalTracksElement = document.getElementById("total-tracks");
    if (totalTracksElement) {
      totalTracksElement.textContent = this.tracks.length;
    }
  }

  loadTrack(index) {
    if (index < 0 || index >= this.tracks.length) return;

    const track = this.tracks[index];
    this.currentTrackIndex = index;

    console.log(`Carregando faixa ${index + 1}: ${track.title}`);
    console.log(`Arquivo: ${track.audioFile}`);

    // Parar áudio atual se estiver tocando
    if (this.audioPlayer && !this.audioPlayer.paused) {
      this.audioPlayer.pause();
    }

    // Atualizar informações da faixa
    this.updateTrackInfo(track, index);

    // Atualizar source do áudio
    this.updateAudioSource(track);

    // Atualizar indicadores
    this.updateIndicators();

    // Animação de transição
    this.animateTrackChange();
  }

  updateTrackInfo(track, index) {
    const titleElement = document.getElementById("current-track-title");
    const artistElement = document.getElementById("current-track-artist");
    const descriptionElement = document.getElementById("current-track-description");
    const trackNumberElement = document.getElementById("current-track-number");

    if (titleElement) {
      titleElement.textContent = track.title;
      titleElement.style.opacity = "0";
      setTimeout(() => {
        titleElement.style.opacity = "1";
      }, 100);
    }

    if (artistElement) {
      artistElement.textContent = track.artist;
    }

    if (descriptionElement) {
      descriptionElement.textContent = track.description;
    }

    if (trackNumberElement) {
      trackNumberElement.textContent = index + 1;
    }
  }

  updateAudioSource(track) {
    if (!this.audioPlayer) return;

    // Limpar eventos antigos
    this.audioPlayer.pause();
    this.audioPlayer.currentTime = 0;

    // Definir nova fonte diretamente no elemento audio
    this.audioPlayer.src = track.audioFile;

    // Forçar reload do player
    this.audioPlayer.load();

    // Verificar se o arquivo existe
    this.audioPlayer.addEventListener(
      "loadeddata",
      () => {
        console.log(`✅ Áudio carregado com sucesso: ${track.title}`);
      },
      { once: true },
    );

    this.audioPlayer.addEventListener(
      "error",
      (e) => {
        console.error(`❌ Erro ao carregar áudio: ${track.audioFile}`, e);
        this.showAudioError();
      },
      { once: true },
    );
  }

  updateIndicators() {
    const indicators = document.querySelectorAll("#track-indicators > div");
    indicators.forEach((indicator, index) => {
      const isActive = index === this.currentTrackIndex;
      indicator.className = `w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
        isActive ? "bg-primary scale-110" : "bg-gray-300 hover:bg-gray-400"
      }`;
    });
  }

  animateTrackChange() {
    const carousel = document.querySelector(".music-carousel");
    if (carousel) {
      carousel.style.transition = "transform 0.2s ease, opacity 0.2s ease";
      carousel.style.transform = "scale(0.99)";
      carousel.style.opacity = "0.95";

      setTimeout(() => {
        carousel.style.transform = "scale(1)";
        carousel.style.opacity = "1";
      }, 200);
    }
  }

  nextTrack() {
    const nextIndex = (this.currentTrackIndex + 1) % this.tracks.length;
    this.loadTrack(nextIndex);
  }

  previousTrack() {
    const prevIndex = this.currentTrackIndex === 0 ? this.tracks.length - 1 : this.currentTrackIndex - 1;
    this.loadTrack(prevIndex);
  }

  togglePlayPause() {
    if (!this.audioPlayer) return;

    if (this.audioPlayer.paused) {
      this.audioPlayer.play().catch((e) => {
        console.error("Erro ao reproduzir áudio:", e);
        this.showAudioError();
      });
    } else {
      this.audioPlayer.pause();
    }
  }

  showAudioError() {
    const titleElement = document.getElementById("current-track-title");
    const descriptionElement = document.getElementById("current-track-description");
    console.log(`Não foi possível carregar: ${this.tracks[this.currentTrackIndex].audioFile}`);
  }

  isInViewport() {
    const section = document.querySelector(".discography-section");
    if (!section) return false;

    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    return rect.top < windowHeight / 2 && rect.bottom > windowHeight / 2;
  }

  // Método para debug - verificar status dos arquivos
  async debugTracks() {
    console.log("=== DEBUG DISCOGRAFIA ===");
    for (let i = 0; i < this.tracks.length; i++) {
      const track = this.tracks[i];
      console.log(`Faixa ${i + 1}: ${track.title}`);
      console.log(`Arquivo: ${track.audioFile}`);

      try {
        const response = await fetch(track.audioFile, { method: "HEAD" });
        console.log(`Status: ${response.ok ? "✅ OK" : "❌ Erro"} (${response.status})`);
      } catch (error) {
        console.log(`Status: ❌ Erro de rede`);
      }
      console.log("---");
    }
  }
}

// Instância global do carrossel
let discographyCarousel;

// Inicializar quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", () => {
  // Aguardar elementos estarem prontos
  setTimeout(() => {
    try {
      discographyCarousel = new DiscographyCarousel();

      // Debug para verificar arquivos (remover em produção)
      if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
        setTimeout(() => {
          if (discographyCarousel) {
            discographyCarousel.debugTracks();
          }
        }, 1000);
      }
    } catch (error) {
      console.error("Erro ao inicializar carrossel de discografia:", error);
    }
  }, 500);
});

// Exportar para uso global
window.DiscographyManager = {
  tracks: discographyTracks,
  carousel: () => discographyCarousel,
  init: () => {
    if (!discographyCarousel) {
      discographyCarousel = new DiscographyCarousel();
    }
    return discographyCarousel;
  },
};
