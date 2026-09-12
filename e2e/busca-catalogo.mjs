/**
 * Busca no catálogo externo, de ponta a ponta.
 *
 *   1. terminal A:  cd ../goals-tracker-back && pnpm dev
 *   2. terminal B:  pnpm dev
 *   3. terminal C:  node e2e/busca-catalogo.mjs
 *
 * Com a Open Library de verdade, buscar "duna" traz resultados reais. Para
 * rodar contra um catálogo controlado, suba a API com
 * CATALOGO_BASE_URL apontando para um servidor que imite o /search.json.
 */
import { chromium } from "playwright";

const url = "http://localhost:3000";
const email = `catalogo-${Date.now()}@teste.com`;
const ok = (m) => console.log("  OK  " + m);

const browser = await chromium.launch(
  process.env.PLAYWRIGHT_CHROMIUM
    ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM }
    : {},
);
const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
const erros = [];
page.on("pageerror", (e) => erros.push(String(e)));

await page.goto(url + "/login", { waitUntil: "networkidle" });
await page.getByRole("button", { name: "Criar conta" }).click();
await page.fill("#nome", "Ana Catálogo");
await page.fill("#email", email);
await page.fill("#senha", "senha123");
await page.getByRole("button", { name: "Criar conta" }).click();
await page.waitForURL(url + "/", { timeout: 25000 });
ok("conta criada");

await page.goto(url + "/leitura", { waitUntil: "networkidle" });
await page.getByRole("button", { name: "Novo livro" }).click();

// Busca com atraso: uma tecla não pode virar uma requisição.
await page.fill("#busca-catalogo", "duna");
await page.waitForSelector("text=Frank Herbert", { timeout: 20000 });
ok("busca no catálogo devolve resultados");

const antesDeEscolher = await page.inputValue("#titulo");
if (antesDeEscolher !== "") throw new Error("título deveria estar vazio antes de escolher");

await page.getByText("Duna", { exact: true }).first().click();
await page.waitForSelector("text=Os campos abaixo já vieram preenchidos", { timeout: 20000 });
ok("escolher um livro mostra o cartão do selecionado");

const titulo = await page.inputValue("#titulo");
const autor = await page.inputValue("#autor");
const paginas = await page.inputValue("#totalPaginas");
if (titulo !== "Duna") throw new Error(`título não preencheu: "${titulo}"`);
if (autor !== "Frank Herbert") throw new Error(`autor não preencheu: "${autor}"`);
if (paginas !== "688") throw new Error(`páginas não preencheram: "${paginas}"`);
ok("título, autor e páginas vieram preenchidos do catálogo");

const sinopseOculta = await page.locator('input[name="sinopse"]').inputValue();
if (!sinopseOculta.includes("Paul Atreides")) throw new Error("sinopse não foi carregada");
ok("sinopse veio do detalhe, em campo oculto");

// Os campos seguem editáveis: a paginação do catálogo erra com frequência.
await page.fill("#totalPaginas", "700");
await page.locator("#status").click();
await page.getByRole("option", { name: "Lendo" }).click();
await page.getByRole("button", { name: "Salvar" }).click();
await page.waitForSelector("text=Duna", { timeout: 20000 });
ok("livro cadastrado a partir do catálogo");

// Pelo link do card, e não pelo texto: "Duna" aparece em mais de um lugar.
await page.locator('a[href^="/leitura/"]').first().click();
await page.waitForURL(/\/leitura\/[a-z0-9]+/, { timeout: 20000 });
await page.waitForSelector("text=Sinopse", { timeout: 20000 });
await page.waitForSelector("text=/Paul Atreides/", { timeout: 20000 });
ok("a sinopse aparece na tela de detalhe");
await page.waitForSelector("text=/1965/", { timeout: 10000 });
ok("o ano de publicação aparece junto do autor");

const paginasSalvas = await page.locator("text=/de 700 páginas/").count();
if (paginasSalvas === 0) throw new Error("a edição manual das páginas não foi salva");
ok("a edição manual do campo prevaleceu sobre o catálogo");

// Cadastro manual continua funcionando, sem tocar na busca.
await page.goto(url + "/leitura", { waitUntil: "networkidle" });
await page.getByRole("button", { name: "Novo livro" }).click();
await page.fill("#titulo", "Caderno de Anotações");
await page.fill("#autor", "Eu Mesma");
await page.fill("#totalPaginas", "80");
await page.getByRole("button", { name: "Salvar" }).click();
await page.waitForSelector("text=Caderno de Anotações", { timeout: 20000 });
ok("cadastro manual segue funcionando sem usar a busca");

if (erros.length) throw new Error("erros na página:\n" + erros.join("\n"));
await browser.close();
console.log("\nBusca no catálogo passou.");
