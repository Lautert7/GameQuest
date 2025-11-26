import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createMockContext(): TrpcContext {
  return {
    user: {
      id: 1,
      openId: "test-user",
      email: "test@example.com",
      name: "Test User",
      loginMethod: "manus",
      role: "user",
      bio: null,
      avatarUrl: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

describe("game procedures", () => {
  it("should list games", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.game.list({ limit: 10, offset: 0 });

    expect(Array.isArray(result)).toBe(true);
  });

  it("should search games", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.game.search({ query: "Zelda", limit: 5 });

    expect(Array.isArray(result)).toBe(true);
  });
});

describe("platform and tag procedures", () => {
  it("should list platforms", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.platform.list();

    expect(Array.isArray(result)).toBe(true);
  });

  it("should list tags", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.tag.list();

    expect(Array.isArray(result)).toBe(true);
  });
});
