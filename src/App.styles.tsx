import styled from 'styled-components';

export const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.lightGray};
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: ${({ theme }) => theme.padding};
  font-family: 'Arial', sans-serif;
  color: ${({ theme }) => theme.colors.textDark};
  box-shadow: ${({ theme }) => theme.boxShadow};
`

export const Title = styled.h2`
  color: ${({ theme }) => theme.colors.dark};
  margin-bottom: ${({ theme }) => theme.padding};
`

export const List = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  gap: 5px;
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
`

export const ListItem = styled.li<{ disabled: boolean }>`
  padding: 10px;
  background: white;
  border-radius: ${({ theme }) => theme.borderRadius};
  text-align: left;
  text-decoration: ${({ disabled }) => (disabled ? 'line-through' : 'none')};
  color: ${({ disabled, theme }) => (disabled ? theme.colors.gray : theme.colors.dark)};
  border: 1px solid ${({ disabled, theme }) => (disabled ? theme.colors.gray : theme.colors.lightGray)};
  transition: background 0.3s ease, border-color 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.lightGray};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

export const InputText = styled.input`
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid ${({ theme }) => theme.colors.dark};
  border-radius: ${({ theme }) => theme.borderRadius};
  transition: border-color 0.3s ease;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    outline: none;
  }
`

export const Button = styled.button`
  padding: 8px 12px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.hoverBlue};
  }
`
