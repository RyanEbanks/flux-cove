import React from 'react';
import '@testing-library/jest-dom'; 
import { render, screen } from '@testing-library/react';
import HomeDisplay from '../HomeDisplay';

// Automatically mock image imports based on Jest configuration
jest.mock('../../images/heels.webp', () => 'mock-image-path');
jest.mock('../../images/home-display.webp', () => 'mock-image-path');
jest.mock('../../images/sandals.webp', () => 'mock-image-path');
jest.mock('../../images/shoe-display.webp', () => 'mock-image-path');
jest.mock('../../images/sneakers.webp', () => 'mock-image-path');
jest.mock('../../index.css', () => ({}));

test('should render Home component', () => {
    render(<HomeDisplay />); //Arrange
    
    // Check if the Home component is rendered
    const homeDisplayElement = screen.getByTestId('home-display-id'); //Act
    expect(homeDisplayElement).toBeInTheDocument(); //Insert

    // Check if the image is present in the document
    const imageElement1 = screen.getByAltText('guy in sneakers');
    const imageElement2 = screen.getByAltText('girl in heels');
    const imageElement3 = screen.getByAltText('girl in sandals');
    const imageElement4 = screen.getByAltText('image of shoe');
    const imageElement5 = screen.getByAltText('girl seated with shoes on');

    expect(imageElement1).toBeInTheDocument();
    expect(imageElement2).toBeInTheDocument();
    expect(imageElement3).toBeInTheDocument();
    expect(imageElement4).toBeInTheDocument();
    expect(imageElement5).toBeInTheDocument();

    expect(imageElement1).toHaveAttribute('src', 'mock-image-path');
    expect(imageElement2).toHaveAttribute('src', 'mock-image-path');
    expect(imageElement3).toHaveAttribute('src', 'mock-image-path');
    expect(imageElement4).toHaveAttribute('src', 'mock-image-path');
    expect(imageElement5).toHaveAttribute('src', 'mock-image-path');
});
