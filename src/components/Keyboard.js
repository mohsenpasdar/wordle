import React, { useCallback, useContext, useEffect } from 'react';
import AppContext from '../context/AppContext';
import Key from './Key';

const Keyboard = () => {
    const { onEnter, onDelete, onSelectLetter } = useContext(AppContext)

    const keys1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P']
    const keys2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']
    const keys3 = ['Z', 'X', 'C', 'V', 'B', 'N', 'M']

    const handleKeyboard = useCallback(e => {
        if (e.key === 'Enter') {
            onEnter()
        } else if (e.key === 'Backspace') {
            onDelete()
        } else if (keys1.includes(e.key.toUpperCase()) || keys2.includes(e.key.toUpperCase()) || keys3.includes(e.key.toUpperCase())) {
            onSelectLetter(e.key.toUpperCase())
        }
    })

    useEffect(() => {
        document.addEventListener('keydown', handleKeyboard)
        return () => document.removeEventListener('keydown', handleKeyboard)
    }, [handleKeyboard])

    return (
        <div className='keyboard'>
            <div className='line1'>
                {keys1.map(key => (
                    <Key keyVal={key} key={key} />
                ))}
            </div>
            <div className='line2'>
                {keys2.map(key => (
                    <Key keyVal={key} key={key} />
                ))}
            </div>
            <div className='line3'>
                <Key keyVal={'ENTER'} key={'enter'} bigKey={true} />
                {keys3.map(key => (
                    <Key keyVal={key} key={key} />
                ))}
                <Key keyVal={'DELETE'} key={'dlete'} bigKey={true} />
            </div>
        </div>
    );
};

export default Keyboard;