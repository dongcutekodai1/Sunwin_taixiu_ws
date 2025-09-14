// b52md5.js
const Fastify = require("fastify");
const axios = require("axios");

const fastify = Fastify({ logger: false });
const PORT = process.env.PORT || 3001;

let b52LatestData = null;

// Hàm gọi API thay cho WebSocket
async function fetchB52Data() {
  try {
    const res = await axios.get("https://apigop-huydaixu.onrender.com/api/b52md5");
    b52LatestData = res.data;
  } catch (err) {
    console.error("Lỗi gọi API:", err.message);
  }
}

// Cập nhật dữ liệu mỗi 5 giây
setInterval(fetchB52Data, 5000);
fetchB52Data();

// ✅ ROUTE JSON REALTIME
fastify.get("/api/b52md5", async (request, reply) => {
  return b52LatestData || {
    phien: null,
    xuc_xac_1: null,
    xuc_xac_2: null,
    xuc_xac_3: null,
    tong: null,
    ket_qua: null,
    md5: null,
    id: "@truongdong1920 | MD5 B52"
  };
});

const start = async () => {
  try {
    const address = await fastify.listen({ port: PORT, host: "0.0.0.0" });
    console.log(`✅ Server đang chạy tại ${address}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
