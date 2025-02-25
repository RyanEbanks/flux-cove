import React from 'react';
import '@testing-library/jest-dom'; 
import { render, screen } from '@testing-library/react';
import Home from '../Home';

// Automatically mock image imports based on Jest configuration
jest.mock('../../images/Banner-Hero.webp', () => 'mock-image-path');
jest.mock('../../index.css', () => ({}));

test('should render Home component', () => {
    render(<Home />); //Arrange
    
    // Check if the Home component is rendered
    const homeElement = screen.getByTestId('homeId'); //Act
    expect(homeElement).toBeInTheDocument(); //Insert

    // Check if the image is present in the document
    const imageElement = screen.getByAltText('hero banner');
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', 'mock-image-path');
});
