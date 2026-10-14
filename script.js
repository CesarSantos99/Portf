// ========== 1. LINKS CONFIGURÁVEIS ==========
// Aqui você coloca os links reais. Deixe "" (vazio) se ainda não tiver.
// Botões com link vazio ficam apagados e não levam a lugar nenhum.
const links = {
  // Dashboard de Clientes
  dashboardDemo: "https://client-dashboard-phi-ruby.vercel.app/",
  dashboardCodigo: "",

  // Sistema de Agendamento
  agendamentoDemo: "",
  agendamentoCodigo: "",

  // Landing Page Profissional
  landingDemo: "",
  landingCodigo: "",

  // Contato (exemplos de formato nos comentários)
  whatsapp: "",  // https://wa.me/55DDDNUMERO  (ex.: https://wa.me/5531999999999)
  github: "",    // https://github.com/seu-usuario
  linkedin: ""   // https://www.linkedin.com/in/seu-perfil
};

// Pega todos os elementos que têm o atributo data-link
const botoesComLink = document.querySelectorAll("[data-link]");

// Para cada botão, procura o link correspondente no objeto "links"
botoesComLink.forEach(function (botao) {
  const nome = botao.dataset.link; // ex.: "github"
  const endereco = links[nome];

  if (endereco) {
    // Tem link: coloca no botão e abre em outra aba
    botao.href = endereco;
    botao.target = "_blank";
    botao.rel = "noopener noreferrer";
  } else {
    // Não tem link: deixa o botão apagado e impede o clique
    botao.classList.add("desativado");
    botao.title = "Link em breve";
    botao.addEventListener("click", function (evento) {
      evento.preventDefault();
    });
  }
});

// ========== 2. MENU MOBILE ==========
const botaoMenu = document.getElementById("botaoMenu");
const menu = document.getElementById("menu");

// Ao clicar no botão ☰, abre ou fecha o menu
botaoMenu.addEventListener("click", function () {
  menu.classList.toggle("aberto");

  // Avisa leitores de tela se o menu está aberto
  const aberto = menu.classList.contains("aberto");
  botaoMenu.setAttribute("aria-expanded", aberto);
});

// Ao clicar em um link do menu, fecha o menu (no celular)
const linksDoMenu = document.querySelectorAll(".menu a");
linksDoMenu.forEach(function (link) {
  link.addEventListener("click", function () {
    menu.classList.remove("aberto");
    botaoMenu.setAttribute("aria-expanded", false);
  });
});

// ========== 3. ANIMAÇÃO AO ROLAR ==========
const elementosEscondidos = document.querySelectorAll(".escondido");

function mostrarElementos() {
  // Altura da janela do navegador
  const alturaDaTela = window.innerHeight;

  elementosEscondidos.forEach(function (elemento) {
    // Distância do elemento até o topo da tela
    const posicao = elemento.getBoundingClientRect().top;

    // Se ele já entrou na parte visível, mostra
    if (posicao < alturaDaTela - 80) {
      elemento.classList.add("aparecer");
    }
  });
}

// Roda quando rola a página e também quando a página abre
window.addEventListener("scroll", mostrarElementos);
mostrarElementos();

// ========== 4. VALIDAÇÃO DO FORMULÁRIO ==========
const formulario = document.getElementById("formulario");
const campoNome = document.getElementById("nome");
const campoEmail = document.getElementById("email");
const campoMensagem = document.getElementById("mensagem");

const erroNome = document.getElementById("erroNome");
const erroEmail = document.getElementById("erroEmail");
const erroMensagem = document.getElementById("erroMensagem");
const resultado = document.getElementById("resultado");

// Função pequena que mostra (ou limpa) o erro de um campo
function mostrarErro(campo, espacoDoErro, texto) {
  espacoDoErro.textContent = texto;

  if (texto) {
    campo.classList.add("campo-invalido");
  } else {
    campo.classList.remove("campo-invalido");
  }
}

formulario.addEventListener("submit", function (evento) {
  // Impede a página de recarregar
  evento.preventDefault();

  // trim() tira espaços do começo e do fim
  const nome = campoNome.value.trim();
  const email = campoEmail.value.trim();
  const mensagem = campoMensagem.value.trim();

  let tudoCerto = true;
  resultado.textContent = "";

  // Validar nome
  if (nome.length < 3) {
    mostrarErro(campoNome, erroNome, "Digite seu nome (mínimo 3 letras).");
    tudoCerto = false;
  } else {
    mostrarErro(campoNome, erroNome, "");
  }

  // Validar e-mail (verificação básica: tem @ e um ponto depois)
  const emailValido = email.includes("@") && email.includes(".") && email.indexOf("@") > 0;
  if (!emailValido) {
    mostrarErro(campoEmail, erroEmail, "Digite um e-mail válido.");
    tudoCerto = false;
  } else {
    mostrarErro(campoEmail, erroEmail, "");
  }

  // Validar mensagem
  if (mensagem.length < 10) {
    mostrarErro(campoMensagem, erroMensagem, "Escreva uma mensagem com pelo menos 10 caracteres.");
    tudoCerto = false;
  } else {
    mostrarErro(campoMensagem, erroMensagem, "");
  }

  // Se algum campo está errado, para por aqui
  if (!tudoCerto) {
    return;
  }

  // IMPORTANTE: aqui os dados estão validados, mas NÃO são enviados para ninguém.
  // Para enviar de verdade é preciso um serviço (veja a explicação abaixo).
  resultado.textContent =
    "Campos validados! Por enquanto o envio ainda não está configurado. Use o WhatsApp ao lado.";
  formulario.reset();
});

// ========== 5. ANO NO RODAPÉ ==========
document.getElementById("ano").textContent = new Date().getFullYear();