import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('компонент button', () => {
    test('отображает текст из пропса text', () => {
        render(<Button text="нажми меня" />);
        expect(screen.getByText('нажми меня')).toBeInTheDocument();
    });

    test('вызывает функцию onclick при нажатии', () => {
        const handleClick = vi.fn();
        render(<Button onClick={handleClick} text="кнопка" />);
        
        fireEvent.click(screen.getByText('кнопка'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});