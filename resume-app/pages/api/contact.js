import { promises as fs } from "fs";
import path from "path";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const data = req.body;
  const dir = path.resolve("./data");
  try {
    await fs.mkdir(dir, { recursive: true });
    const file = path.join(dir, `contact_${Date.now()}.json`);
    await fs.writeFile(file, JSON.stringify(data, null, 2));
    res.status(200).json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false });
  }
}
