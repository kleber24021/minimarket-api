const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

const rootDir = path.resolve(__dirname, "..");
const productsPath = path.join(rootDir, "data", "products.json");
const promotionsPath = path.join(rootDir, "data", "promotions.json");
const runtimeDbPath = path.join("/tmp", "db.json");

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function buildDb() {
  const products = readJson(productsPath).products || [];
  const promotions = readJson(promotionsPath).promotions || [];

  const db = { products, promotions };
  fs.writeFileSync(runtimeDbPath, JSON.stringify(db, null, 2), "utf8");
}

function startServer() {
  const server = spawn(
    process.platform === "win32" ? "npx.cmd" : "npx",
    ["json-server", "--host", "0.0.0.0", "--port", "3000", "--watch", runtimeDbPath],
    { stdio: "inherit" }
  );

  server.on("exit", (code) => process.exit(code ?? 0));
}

buildDb();
startServer();
