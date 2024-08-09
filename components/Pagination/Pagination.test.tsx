import { render, screen } from "@testing-library/react";
import { it } from "node:test";
import { expect, test } from "vitest";
import { Pagination } from "./Pagination";
import { RouterContext } from "next/dist/shared/lib/router-context.shared-runtime";
import { createMockRouter } from "../../test-utils/createMockRouter";
import React from "react";
import userEvent from "@testing-library/user-event";

test("Pagination component", () => {
  it("updates URL query parameter when page changes", async () => {
    const router = createMockRouter({});
    render(
      <RouterContext.Provider value={router}>
        <Pagination maxCount={30} currentPage={"1"} />
      </RouterContext.Provider>,
    );
    const button = screen.getByText("2");
    await userEvent.click(button);
    const newUrl = new URLSearchParams(window.location.href);
    expect(newUrl.get("page")).toBe("2");
  });
});
