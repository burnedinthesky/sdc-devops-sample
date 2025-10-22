import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../src/App'

describe('App', () => {
  it('renders the app with Vite and React logos', () => {
    render(<App />)

    const viteLogo = screen.getByAltText('Vite logo')
    const reactLogo = screen.getByAltText('React logo')

    expect(viteLogo).toBeInTheDocument()
    expect(reactLogo).toBeInTheDocument()
  })

  it('renders the main heading', () => {
    render(<App />)

    const heading = screen.getByRole('heading', { name: /vite \+ react/i })
    expect(heading).toBeInTheDocument()
  })

  it('renders the counter button with initial count of 0', () => {
    render(<App />)

    const button = screen.getByRole('button', { name: /count is 0/i })
    expect(button).toBeInTheDocument()
  })

  it('increments the counter when button is clicked', async () => {
    const user = userEvent.setup()
    render(<App />)

    const button = screen.getByRole('button', { name: /count is 0/i })

    await user.click(button)
    expect(screen.getByRole('button', { name: /count is 1/i })).toBeInTheDocument()

    await user.click(button)
    expect(screen.getByRole('button', { name: /count is 2/i })).toBeInTheDocument()
  })

  it('renders the HMR instruction text', () => {
    render(<App />)

    expect(screen.getByText(/edit/i)).toBeInTheDocument()
    expect(screen.getByText(/src\/App.tsx/i)).toBeInTheDocument()
  })

  it('renders the call-to-action text', () => {
    render(<App />)

    expect(screen.getByText(/click on the vite and react logos to learn more/i)).toBeInTheDocument()
  })

  it('has correct links for Vite and React', () => {
    render(<App />)

    const links = screen.getAllByRole('link')
    const viteLink = links.find(link => link.getAttribute('href') === 'https://vite.dev')
    const reactLink = links.find(link => link.getAttribute('href') === 'https://react.dev')

    expect(viteLink).toBeInTheDocument()
    expect(reactLink).toBeInTheDocument()
    expect(viteLink).toHaveAttribute('target', '_blank')
    expect(reactLink).toHaveAttribute('target', '_blank')
  })
})

