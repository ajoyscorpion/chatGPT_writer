import React, {useEffect, useState } from 'react' 
import aiIcon  from "assets/icon.png";

const AiIcon = () => {
    const [open, setOpen] = useState(false)
    const [promptText,setPromptText] = useState('')
    const [history,setHistory] = useState([])
    const [generateClicked, setGenerateClicked] = useState(false)
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        
        const handleFocus = (e) => {
            const target = e.target;
            if (target && target.classList.contains('msg-form__contenteditable')) {
                setVisible(true);
            }
        };

        const handleBlur = (e) => {
            const target = e.target;
            if (target && target.classList.contains('msg-form__contenteditable')) {
                setVisible(true);
            }
        };
        document.addEventListener('focusin', handleFocus);
        document.addEventListener('focusout', handleBlur);
        return () => {
            document.removeEventListener('focusin', handleFocus);
            document.removeEventListener('focusout', handleBlur);
        };
    }, []);

    

    const handleClick = (e) => {
        e.stopPropagation();
        setOpen(true)
        setVisible(true);    
    }

    const handleClose = () => {
        setOpen(false);
        setVisible(false)
    };

    const handleInputClick = (e) => {
        e.stopPropagation();
    };

    const handleInputChange = (e) => {
        setPromptText(e.target.value)
    }

    const handleEnterPress = (e) => {
        if (e.key === 'Enter' && promptText.trim() !== '') {
            setHistory([...history, promptText]);
            setPromptText('');
        }
    };

    const handleGenerate = () => {
        setGenerateClicked(true)
    }

    const handleInsert = () => {
        const messageInput = document.querySelector('.msg-form__contenteditable');
        if (messageInput) {
            messageInput.innerHTML = "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask" ;

            setOpen(false);
            setVisible(false)
            setGenerateClicked(false);
        }
    }



    useEffect(() => {
        const messageInput = document.querySelector('.msg-form__contenteditable');
        if (messageInput) {
            const iconContainer = document.createElement('div');
            iconContainer.style.position = 'absolute';
            iconContainer.style.top = '75%';
            iconContainer.style.right = '10px';
            iconContainer.style.transform = 'translateY(-50%)';
            iconContainer.style.cursor = 'pointer';
            iconContainer.style.zIndex = '1000';
            iconContainer.onclick = handleClick;

            const iconImage = document.createElement('img');
            iconImage.src = aiIcon;
            iconImage.style.width = '25px';
            iconImage.style.height = '25px';

            iconContainer.appendChild(iconImage);
            messageInput.parentElement.appendChild(iconContainer);
        }
    }, [visible]);


  return (
    <>
    { visible && (
        <div
            onClick={handleClick}
            style={{
                position: 'fixed',
        }}
    >
        <img src={aiIcon} alt="aiIcon" style={{ width: '25px', height: '25px' }} />
    </div>

    )}
        

      { open && (
                <div
                    onClick={handleClose}
                    style={{
                        position: 'fixed',
                        top: '0',
                        left: '0',
                        right: '0',
                        bottom: '0',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: '999',
                    }}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            backgroundColor: '#fff',
                            padding: '20px',
                            borderRadius: '8px',
                            maxWidth: '400px',
                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <div style={{ display: 'flex', flexDirection:'column',  alignItems: 'center', marginBottom: '10px' }}>
                            
                            <div
                                style={{
                                    width:'400px',
                                    display:'flex',
                                    alignItems:'end',
                                    justifyContent:'end',
                                    flexDirection:'column'    
                                }}
                            >
                                {history.map((item, index) => (
                                    <div 
                                        className='mt-3'
                                        key={index} 
                                        style={{
                                            border:'solid',
                                            padding: '8px',
                                            marginBottom: '8px',
                                            marginLeft:'10px',
                                            backgroundColor: '#3182CE',
                                            color: '#FFFFFF',
                                            borderRadius: '9px',
                                            fontSize:'15px'
                                        }}
                                    >{item}</div>
                                ))}
                            </div>

                            { generateClicked && (
                                <div
                                    style={{
                                        width:'400px',
                                        display:'flex',
                                        alignItems:'start',
                                        justifyContent:'start',
                                        flexDirection:'column'    
                                    }}
                                >
                                    <div 
                                        className='mt-3' 
                                        style={{
                                            border:'solid',
                                            padding: '8px',
                                            marginBottom: '8px',
                                            marginLeft:'10px',
                                            marginRight:'10px',
                                            backgroundColor: '#3182CE',
                                            color: '#FFFFFF',
                                            borderRadius: '9px',
                                            fontSize:'15px'
                                        }}
                                    >Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask</div>
                                </div>
                            )}

                        </div>
                        <div
                            style={{
                                width:'auto',
                                paddingBottom:'10px',
                            }}
                        >
                            <input
                                type="text"
                                name="price"
                                id="price"
                                className="fontSize:14px w-full h-12 rounded-md border-0 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xl sm:leading-6"
                                placeholder="Your Prompt"
                                onClick={handleInputClick} 
                                value={promptText}
                                onChange={handleInputChange}
                                onKeyDown={handleEnterPress}
                            />
                        </div>
                        <hr />
                        <div
                            className='mt-3' 
                            style={{
                                display:'flex',
                                justifyContent:'end',
                            }}
                        >

                            { generateClicked && (
                                <button
                                    onClick={handleInsert}
                                    style={{
                                        backgroundColor: '#3182CE',
                                        color: '#FFFFFF',
                                        padding: '5px 10px',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        fontSize:'15px',
                                        marginRight:'5px'
                                    }}
                                >Insert</button>
                            )}

                            <button
                                onClick={handleGenerate}
                                disabled={generateClicked}
                                style={{
                                    backgroundColor: '#3182CE',
                                    color: '#FFFFFF',
                                    padding: '5px 10px',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    fontSize:'15px'
                                }}
                            >Generate</button>
                        </div>
                    </div>
                </div>
            )}

    </>
  )
}

export default AiIcon;
