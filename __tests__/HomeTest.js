/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Index from "../src/pages";

test("Check for Getting Started Text", () => {
    const { getByText } = render(<Index />);
    expect(getByText("Get started by editing")).toBeInTheDocument();
});
