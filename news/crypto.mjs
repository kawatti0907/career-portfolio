const AAD = new TextEncoder().encode("herajika-news:v1");

function decode(value) {
  if (typeof value !== "string" || !/^[A-Za-z0-9_-]+$/.test(value)) throw new Error("Invalid encoding");
  return Uint8Array.from(atob(value.replace(/-/g, "+").replace(/_/g, "/")), (char) => char.charCodeAt(0));
}

export async function decryptNews(envelope, keyToken) {
  if (!/^[A-Za-z0-9_-]{43}$/.test(keyToken)) throw new Error("Invalid key");
  if (envelope?.version !== 1 || typeof envelope.ciphertext !== "string" || envelope.ciphertext.length > 8 * 1024 * 1024) throw new Error("Invalid edition");
  const bytes = decode(keyToken), iv = decode(envelope.iv), ciphertext = decode(envelope.ciphertext);
  if (bytes.length !== 32 || iv.length !== 12 || ciphertext.length < 16) throw new Error("Invalid edition");
  const key = await crypto.subtle.importKey("raw", bytes, "AES-GCM", false, ["decrypt"]);
  const plaintext = await crypto.subtle.decrypt({ name: "AES-GCM", iv, additionalData: AAD, tagLength: 128 }, key, ciphertext);
  const data = JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(plaintext));
  if (data.version !== 1 || !Array.isArray(data.items) || data.items.length > 600 || !Array.isArray(data.categories)) throw new Error("Invalid edition");
  return data;
}
