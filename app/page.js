'use client';

import { useRef, useState, useEffect } from 'react';

export default function SignaturePage() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.strokeStyle = '#000080';
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      setContext(ctx);
    }
  }, []);

  const startDrawing = (e) => {
    if (!context) return;
    setIsDrawing(true);
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.type.includes('mouse') ? e.clientX - rect.left : e.touches[0].clientX - rect.left;
    const y = e.type.includes('mouse') ? e.clientY - rect.top : e.touches[0].clientY - rect.top;
    context.beginPath();
    context.moveTo(x, y);
  };

  const draw = (e) => {
    if (!isDrawing || !context) return;
    e.preventDefault();
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.type.includes('mouse') ? e.clientX - rect.left : e.touches[0].clientX - rect.left;
    const y = e.type.includes('mouse') ? e.clientY - rect.top : e.touches[0].clientY - rect.top;
    context.lineTo(x, y);
    context.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    if (!context) return;
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  const downloadSignature = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = 'signature_ouabas_hakima.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '20px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        padding: '40px',
        maxWidth: '700px',
        width: '100%'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#1a202c',
            marginBottom: '10px'
          }}>
            Signature Électronique
          </h1>
          <p style={{
            fontSize: '20px',
            color: '#4a5568',
            fontWeight: '500'
          }}>
            Ouabas Hakima
          </p>
        </div>

        <div style={{
          border: '3px solid #667eea',
          borderRadius: '12px',
          marginBottom: '25px',
          background: '#f7fafc',
          overflow: 'hidden'
        }}>
          <canvas
            ref={canvasRef}
            width={600}
            height={300}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            style={{
              display: 'block',
              width: '100%',
              height: 'auto',
              cursor: 'crosshair',
              touchAction: 'none'
            }}
          />
        </div>

        <div style={{
          display: 'flex',
          gap: '15px',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={clearSignature}
            style={{
              flex: '1',
              minWidth: '150px',
              padding: '15px 30px',
              fontSize: '16px',
              fontWeight: '600',
              color: 'white',
              background: '#e53e3e',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              transition: 'all 0.3s',
              boxShadow: '0 4px 15px rgba(229, 62, 62, 0.3)'
            }}
            onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
          >
            Effacer
          </button>
          <button
            onClick={downloadSignature}
            style={{
              flex: '1',
              minWidth: '150px',
              padding: '15px 30px',
              fontSize: '16px',
              fontWeight: '600',
              color: 'white',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              transition: 'all 0.3s',
              boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
            }}
            onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
          >
            Télécharger
          </button>
        </div>

        <div style={{
          marginTop: '25px',
          padding: '15px',
          background: '#edf2f7',
          borderRadius: '10px',
          fontSize: '14px',
          color: '#4a5568',
          textAlign: 'center'
        }}>
          Dessinez votre signature dans la zone ci-dessus
        </div>
      </div>
    </div>
  );
}
