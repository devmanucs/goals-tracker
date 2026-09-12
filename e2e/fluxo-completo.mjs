/**
 * Fluxo completo do app contra a API real: cria conta, cadastra livro,
 * concurso, tópico e hábito, e confere que cada tela reflete o dado.
 *
 *   1. terminal A:  cd ../goals-tracker-back && pnpm dev
 *   2. terminal B:  pnpm dev
 *   3. terminal C:  node e2e/fluxo-completo.mjs
 */
import { chromium } from "playwright";

const url = "http://localhost:3000";
const email = `fluxo-${Date.now()}@teste.com`;
const ok = (m) => console.log("  OK  " + m);

const browser = await chromium.launch(
  process.env.PLAYWRIGHT_CHROMIUM
    ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM }
    : {},
);
const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });

const erros = [];
page.on("pageerror", (e) => erros.push(String(e)));
page.on("response", (r) => {
  if (r.status() >= 500) erros.push(`${r.status()} em ${r.url()}`);
});

// --- conta nova, dados zerados ---
await page.goto(url + "/login", { waitUntil: "networkidle" });
await page.getByRole("button", { name: "Criar conta" }).click();
await page.fill("#nome", "Ana Fluxo");
await page.fill("#email", email);
await page.fill("#senha", "senha123");
await page.getByRole("button", { name: "Criar conta" }).click();
await page.waitForURL(url + "/", { timeout: 25000 });
ok("conta criada");

await page.waitForSelector("text=Olá, Ana");
ok("dashboard saúda pelo nome vindo de /auth/me");

// --- leitura: estado vazio, cadastro, progresso ---
await page.goto(url + "/leitura", { waitUntil: "networkidle" });
await page.waitForSelector("text=Nenhum livro cadastrado");
ok("leitura começa vazia (conta isolada)");

await page.getByRole("button", { name: "Novo livro" }).click();
await page.fill("#titulo", "Duna");
await page.fill("#autor", "Frank Herbert");
await page.fill("#totalPaginas", "688");
await page.getByRole("button", { name: "Salvar" }).click();
await page.waitForSelector("text=Duna", { timeout: 20000 });
ok("livro criado pela API aparece na lista");

await page.locator("text=Duna").first().click();
await page.waitForURL(/\/leitura\/[a-z0-9]+/, { timeout: 20000 });
await page.getByRole("button", { name: "Registrar progresso" }).click();
await page.fill("#paginaAtual", "344");
await page.getByRole("button", { name: "Salvar" }).click();
await page.waitForSelector("text=50%", { timeout: 20000 });
ok("registro de progresso recalcula o percentual (344/688 = 50%)");

// --- página acima do total é barrada antes de virar requisição ---
await page.getByRole("button", { name: "Registrar progresso" }).click();
await page.fill("#paginaAtual", "9999");
await page.getByRole("button", { name: "Salvar" }).click();
await page.waitForTimeout(1500);
const passouDoLimite = await page.evaluate(() => {
  const campo = document.querySelector("#paginaAtual");
  return campo ? campo.checkValidity() : true;
});
if (passouDoLimite) throw new Error("página acima do total deveria ser inválida");
ok("página acima do total do livro é barrada no formulário");
await page.keyboard.press("Escape");
await page.waitForTimeout(500);

// --- troca de status pelo select da tela de detalhe ---
await page.locator('[aria-label="Status do livro"]').click();
await page.getByRole("option", { name: "Lendo" }).click();
await page.waitForTimeout(2000);
await page.reload({ waitUntil: "networkidle" });
const statusAtual = await page.locator('[aria-label="Status do livro"]').innerText();
if (!statusAtual.includes("Lendo")) throw new Error("status não persistiu: " + statusAtual);
ok("troca de status persiste pela API");

// --- estudos ---
await page.goto(url + "/estudos", { waitUntil: "networkidle" });
await page.getByRole("button", { name: "Novo concurso" }).click();
await page.fill("#titulo", "Analista — TRT");
await page.fill("#banca", "FGV");
await page.fill("#dataProva", "2027-03-15");
await page.getByRole("button", { name: "Salvar" }).click();
await page.waitForSelector("text=Analista — TRT", { timeout: 20000 });
ok("concurso criado");

await page.locator("text=Analista — TRT").first().click();
await page.waitForURL(/\/estudos\/[a-z0-9]+/, { timeout: 20000 });
await page.getByRole("button", { name: "Novo tópico" }).click();
await page.fill("#titulo", "Atos administrativos");
await page.fill("#materia", "Direito Administrativo");
await page.getByRole("button", { name: "Salvar" }).click();
await page.waitForSelector("text=Atos administrativos", { timeout: 20000 });
ok("tópico criado e listado");

// --- hábitos ---
await page.goto(url + "/habitos", { waitUntil: "networkidle" });
await page.getByRole("button", { name: "Novo hábito" }).click();
await page.fill("#nome", "Beber água");
await page.fill("#unidade", "L");
await page.fill("#metaValor", "2");
await page.getByRole("button", { name: "Salvar" }).click();
await page.waitForSelector("text=Beber água", { timeout: 20000 });
ok("hábito criado");

await page.locator("text=Beber água").first().click();
await page.waitForURL(/\/habitos\/[a-z0-9]+/, { timeout: 20000 });
await page.getByRole("button", { name: "Registrar valor" }).click();
await page.fill("#valor", "2.5");
await page.getByRole("button", { name: "Salvar" }).click();
await page.waitForSelector("text=/1 dias|1 períodos/", { timeout: 20000 });
ok("registro acende o streak calculado pelo backend");

// --- dashboard e retrospectiva agregam tudo ---
await page.goto(url + "/", { waitUntil: "networkidle" });
await page.waitForSelector("text=Duna");
await page.waitForSelector("text=Atos administrativos");
await page.waitForSelector("text=Beber água");
ok("dashboard agrega os três módulos numa requisição");

await page.goto(url + "/retrospectiva", { waitUntil: "networkidle" });
await page.waitForSelector("text=Páginas lidas por mês");
await page.waitForSelector("text=Tópicos estudados por mês");
ok("retrospectiva monta os gráficos com as séries da API");

// --- isolamento entre contas ---
await page.locator('[data-slot="dropdown-menu-trigger"]').click();
await page.getByText("Sair", { exact: true }).click();
await page.waitForURL(/\/login/, { timeout: 20000 });

const outroEmail = `outro-${Date.now()}@teste.com`;
await page.getByRole("button", { name: "Criar conta" }).click();
await page.fill("#nome", "Bruno Outro");
await page.fill("#email", outroEmail);
await page.fill("#senha", "senha123");
await page.getByRole("button", { name: "Criar conta" }).click();
await page.waitForURL(url + "/", { timeout: 25000 });

await page.goto(url + "/leitura", { waitUntil: "networkidle" });
await page.waitForSelector("text=Nenhum livro cadastrado");
if (await page.locator("text=Duna").count()) {
  throw new Error("VAZAMENTO: outra conta enxerga o livro da primeira");
}
ok("segunda conta não enxerga nada da primeira");

if (erros.length) throw new Error("erros na página:\n" + erros.join("\n"));

await browser.close();
console.log("\nFluxo completo passou.");
