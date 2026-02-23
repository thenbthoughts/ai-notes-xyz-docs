import React from 'react';

export default function GetStartedSection() {
    return (
        <>
            <h2>🚀 Get Started</h2>

            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <a
                    href="http://demo.ai-notes.xyz/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        padding: '1rem',
                        backgroundColor: '#25c2a0',
                        color: 'white',
                        borderRadius: '8px',
                        fontWeight: 'bold',
                        textDecoration: 'none',
                    }}
                >
                    🎮 Try Demo Now
                </a>

                <a
                    href="/docs/selfhost/selfhost-docker-build"
                    style={{
                        padding: '1rem',
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