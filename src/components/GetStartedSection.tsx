import React from 'react';

export default function GetStartedSection() {
    return (
        <>
            <h2>🚀 Get Started</h2>

            <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                alignItems: 'center',
            }}
            >
                <a
                    href="http://demo.ai-notes.xyz/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        paddingLeft: '20px',
                        paddingRight: '20px',
                        paddingTop: '10px',
                        paddingBottom: '10px',
                        backgroundColor: '#25c2a0',
                        color: 'white',
                        borderRadius: '8px',
                        fontWeight: 'bold',
                        textDecoration: 'none',
                    }}
                >
                    🎮 Try Demo Now
                    <div>Username: demo</div>
                    <div>Password: demodemo</div>
                </a>

                <a
                    href="/docs/selfhost/selfhost-docker-build"
                    style={{
                        paddingLeft: '20px',
                        paddingRight: '20px',
                        paddingTop: '10px',
                        paddingBottom: '10px',
                        backgroundColor: '#eee',
                        color: '#333',
                        borderRadius: '8px',
                        fontWeight: 'bold',
                        textDecoration: 'none',
                    }}
                >
                    ⚡ Install by Docker
                </a>
            </div>
        </>
    );
}