import React from 'react';
import {render, screen} from '@testing-library/react'
import Footer from './Footer';


describe('Footer', () => {

    test('Footer links have the correct external links', () => {
// ARRANGE
        render(<Footer/>)

// ACT
    const footerLink = screen.getByRole('link', {name: 'Buy us a coffee'})
    const githubLink = screen.getByRole('link', {name: 'GitGals GitHub'})
    const mailLink = screen.getByRole('link', {name: 'Contact Us'})

// ASSERT 
    expect(footerLink).toHaveAttribute('href', "https://www.buymeacoffee.com/gitgals")
    expect(githubLink).toHaveAttribute('href', "https://github.com/kasiawalsh/group-project-fullstack-group5-cfg")
    expect(mailLink).toHaveAttribute('href', "mailto:gitgals@gmail.com")
 })   
})   
