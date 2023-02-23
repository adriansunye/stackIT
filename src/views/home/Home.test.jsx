import { beforeEach, describe, expect, test } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import "@testing-library/jest-dom";
import Home from './Home';

describe("HOme", () => {

    beforeEach(() => {
        render(<Home/>);
    });

    test("should show title all the time", () => {

        expect(screen.getByText(/Home/i)).toBeInTheDocument();
    })

    // test("should not show the content at the start", () => {

    //     expect(screen.queryByText(/Content/i)).not.toBeInTheDocument();
    // })

    // test("should show the content on accordion click", async () => {

    //     const title = screen.getByText(/Show/i);
    //     fireEvent.click(title)

    //     expect(await screen.findByText(/Content/i)).toBeInTheDocument();
    // })
})