import React, { useState } from 'react';
import { IconButton, Fade } from '@mui/material';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';

function CopyScramble({scramble = ''}) {
    const [copied, setCopied] = useState(false);

    const handleCopyClick = () => {
        navigator.clipboard.writeText(scramble);

        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 1000);
    };

    return (
        <button onClick={handleCopyClick} className="relative">
            <Fade in={!copied} timeout={500}>
                <div className="absolute inset-0 flex items-center justify-center">
                    <ContentCopyRoundedIcon sx={{fontSize: 14, color:'black'}}/>
                </div>
            </Fade>
            <Fade in={copied} timeout={500}>
                <div className="absolute inset-0 flex items-center justify-center">
                    <DoneRoundedIcon sx={{fontSize: 14, color:'black'}}/>
                </div>
            </Fade>
        </button>
    );
}

export default CopyScramble;