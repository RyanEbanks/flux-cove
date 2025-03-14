import React from 'react';
import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react";
import Cart from "../Cart";

jest.mock('../../index.css', () => ({}));

describe('Calculating The Cart Item Prices', () => {
  //Test to see if the calculateTotalPrice returns the correct total when cartItems has valid items with productPrice
  test('Testing validity of total productPrice', () => {
    const testCartItems = [{ productPrice: 15 }, { productPrice: 20 }];
    const mockRefetchCartData = jest.fn(); //Mocking function
    
    //rendering the component and the necessary states
    render(<Cart cartItems={testCartItems}
      refetchCartData={mockRefetchCartData} //Passing mock into cart
    />);
    expect(screen.getByText('$35.00')).toBeInTheDocument();
  })
  //Test calculateTotalPrice handles empty cart or missing items
  test('Testing how the calculateTotalPrice handles an empty cart', () => {
    const emptyCart = [];
    const mockRefetchCartData = jest.fn();

    render(<Cart cartItems={emptyCart}
      refetchCartData={mockRefetchCartData}
    />);
    expect(screen.getByText('$0.00')).toBeInTheDocument();
  })

  //Test cartItems being undefined or not an array doesnt break the function
})