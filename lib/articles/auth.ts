import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE = "nc_admin";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function secret() {
  return process.env.SESSION_SECRET ?? "";
}

/** Admin is only enabled when both secrets are configured. */
export function adminConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD && secret().length >= 24);
}

function sign(payload: string) {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);

  return left.length === right.length && timingSafeEqual(left, right);
}

export function passwordMatches(input: string) {
  const expected = process.env.ADMIN_PASSWORD ?? "";

  // Hash both sides so the comparison time does not reveal the password length.
  const a = createHmac("sha256", "pw").update(input).digest("base64url");
  const b = createHmac("sha256", "pw").update(expected).digest("base64url");

  return expected.length > 0 && safeEqual(a, b);
}

export async function startSession() {
  const payload = String(Date.now() + MAX_AGE * 1000);
  const store = await cookies();

  store.set(COOKIE, `${payload}.${sign(payload)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function endSession() {
  (await cookies()).delete(COOKIE);
}

export async function isAdmin() {
  if (!adminConfigured()) {
    return false;
  }

  const value = (await cookies()).get(COOKIE)?.value;

  if (!value) {
    return false;
  }

  const [payload, signature] = value.split(".");

  if (!payload || !signature || !safeEqual(signature, sign(payload))) {
    return false;
  }

  return Number(payload) > Date.now();
}

/** Use at the top of every admin page and server action. */
export async function requireAdmin() {
  if (!(await isAdmin())) {
    redirect("/admin");
  }
}
