/**
 * Fluxo de autenticação de ponta a ponta, contra o app e a API rodando.
 *
 *   1. terminal A:  cd ../goals-tracker-back && pnpm dev
 *   2. terminal B:  pnpm dev
 *   3. terminal C:  node e2e/auth.mjs
 *
 * Não roda no `pnpm test` (jest) de propósito: depende dos dois servidores no ar.
 */
import { chromium } from "playwright";

const url = "http://localhost:3000";
const email = `ana-${Date.now()}@teste.com`;
const ok = (m) => console.log("  OK  " + m);

const browser = await chromium.launch(
  // Em ambiente com Chromium já instalado fora do padrão, aponte
  // PLAYWRIGHT_CHROMIUM antes de rodar.
  process.env.PLAYWRIGHT_CHROMIUM
    ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM }
    : {},
);
const page = await browser.newPage();

// 1. Rota protegida sem sessão manda para o login
await page.goto(url + "/leitura", { waitUntil: "networkidle" });
if (!page.url().includes("/login")) throw new Error("não redirecionou para /login");
ok("rota protegida redireciona para /login");

// 2. Criar conta
await page.getByRole("button", { name: "Criar conta" }).click();
await page.fill("#nome", "Ana Teste");
await page.fill("#email", email);
await page.fill("#senha", "senha123");
await page.getByRole("button", { name: "Criar conta" }).click();
await page.waitForURL(url + "/", { timeout: 20000 });
ok("registro cria a conta e já entra");

// 3. Sidebar mostra o usuário real, vindo de /auth/me
await page.waitForSelector("text=Ana Teste", { timeout: 10000 });
const emailNaTela = await page.locator(`text=${email}`).first().isVisible();
if (!emailNaTela) throw new Error("email do usuário não apareceu na sidebar");
ok("sidebar mostra nome e email vindos de /auth/me");

// 4. Cookie de sessão é httpOnly
const [cookie] = (await page.context().cookies()).filter((c) => c.name === "gt_sessao");
if (!cookie) throw new Error("cookie de sessão não foi gravado");
if (!cookie.httpOnly) throw new Error("cookie de sessão NÃO é httpOnly");
const viaJs = await page.evaluate(() => document.cookie);
if (viaJs.includes("gt_sessao")) throw new Error("token acessível por JS");
ok("cookie httpOnly e invisível para JavaScript");

// 5. Com sessão, /login volta para a home
await page.goto(url + "/login", { waitUntil: "networkidle" });
if (page.url() !== url + "/") throw new Error("logado deveria sair de /login");
ok("logado é redirecionado para fora de /login");

// 6. Sair revoga a sessão
await page.waitForSelector("text=Ana Teste", { timeout: 15000 });
await page.locator('[data-slot="dropdown-menu-trigger"]').click();
await page.getByText("Sair", { exact: true }).click();
await page.waitForURL(/\/login/, { timeout: 20000 });
ok("sair volta para /login");
const depois = (await page.context().cookies()).filter((c) => c.name === "gt_sessao");
if (depois.length && depois[0].value) throw new Error("cookie não foi apagado");
ok("cookie de sessão apagado");

// 7. Login com a conta criada
await page.fill("#email", email);
await page.fill("#senha", "senha123");
await page.getByRole("button", { name: "Entrar" }).click();
await page.waitForURL(url + "/", { timeout: 20000 });
ok("login com a conta criada funciona");

// 8. Credencial errada mostra o erro do backend
await page.goto(url + "/login");
await page.context().clearCookies();
await page.goto(url + "/login", { waitUntil: "networkidle" });
await page.fill("#email", email);
await page.fill("#senha", "senha-errada");
await page.getByRole("button", { name: "Entrar" }).click();
await page.waitForSelector("text=Verifique suas credenciais", { timeout: 20000 });
ok("credencial errada mostra a mensagem do backend");

await browser.close();
console.log("\nTodos os passos passaram.");
