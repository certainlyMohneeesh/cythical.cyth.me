"use client"
import React from 'react';
import styled from 'styled-components';

const Loader = () => {
    return (
      <StyledWrapper>
        <div className="cube-loader">
          <div className="cube-top" />
          <div className="cube-wrapper">
            <span style={{"--i": 0} as React.CSSProperties} className="cube-span" />
            <span style={{"--i": 1} as React.CSSProperties} className="cube-span" />
            <span style={{"--i": 2} as React.CSSProperties} className="cube-span" />
            <span style={{"--i": 3} as React.CSSProperties} className="cube-span" />
          </div>
        </div>
      </StyledWrapper>
    );
  }

  const StyledWrapper = styled.div`
  .cube-loader {
    position: relative;
    width: 75px;
    height: 75px;
    transform-style: preserve-3d;
    transform: rotateX(-30deg);
    animation: animate 4s linear infinite;

    @media (max-width: 768px) {
      width: 60px;
      height: 60px;
    }
    
    @media (max-width: 480px) {
      width: 45px;
      height: 45px;
    }
  }

  @keyframes animate {
    0% {
      transform: rotateX(-30deg) rotateY(0);
    }
    100% {
      transform: rotateX(-30deg) rotateY(360deg);
    }
  }

  .cube-loader .cube-wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
  }

  .cube-loader .cube-wrapper .cube-span {
    position: absolute;
    width: 100%;
    height: 100%;
    transform: rotateY(calc(90deg * var(--i))) translateZ(37.5px);
    background: linear-gradient(
      to bottom,
      hsl(330, 3.13%, 25.1%) 0%,
      hsl(177.27, 21.71%, 32.06%) 5.5%,
      hsl(176.67, 34.1%, 36.88%) 12.1%,
      hsl(176.61, 42.28%, 40.7%) 19.6%,
      hsl(176.63, 48.32%, 43.88%) 27.9%,
      hsl(176.66, 53.07%, 46.58%) 36.6%,
      hsl(176.7, 56.94%, 48.91%) 45.6%,
      hsl(176.74, 62.39%, 50.91%) 54.6%,
      hsl(176.77, 69.86%, 52.62%) 63.4%,
      hsl(176.8, 76.78%, 54.08%) 71.7%,
      hsl(176.83, 83.02%, 55.29%) 79.4%,
      hsl(176.85, 88.44%, 56.28%) 86.2%,
      hsl(176.86, 92.9%, 57.04%) 91.9%,
      hsl(176.88, 96.24%, 57.59%) 96.3%,
      hsl(176.88, 98.34%, 57.93%) 99%,
      hsl(176.89, 99.07%, 58.04%) 100%
    );

    @media (max-width: 768px) {
      transform: rotateY(calc(90deg * var(--i))) translateZ(30px);
    }
    
    @media (max-width: 480px) {
      transform: rotateY(calc(90deg * var(--i))) translateZ(22.5px);
    }
  }

  .cube-top {
    position: absolute;
    width: 75px;
    height: 75px;
    background: hsl(330, 3.13%, 25.1%) 0%;
    transform: rotateX(90deg) translateZ(37.5px);
    transform-style: preserve-3d;

    @media (max-width: 768px) {
      width: 60px;
      height: 60px;
      transform: rotateX(90deg) translateZ(30px);
    }
    
    @media (max-width: 480px) {
      width: 45px;
      height: 45px;
      transform: rotateX(90deg) translateZ(22.5px);
    }
  }

  .cube-top::before {
    content: '';
    position: absolute;
    width: 75px;
    height: 75px;
    background: hsl(176.61, 42.28%, 40.7%) 19.6%;
    transform: translateZ(-90px);
    filter: blur(10px);
    box-shadow: 0 0 10px #323232,
                0 0 20px hsl(176.61, 42.28%, 40.7%) 19.6%,
                0 0 30px #323232,
                0 0 40px hsl(176.61, 42.28%, 40.7%) 19.6%;

    @media (max-width: 768px) {
      width: 60px;
      height: 60px;
      transform: translateZ(-72px);
    }
    
    @media (max-width: 480px) {
      width: 45px;
      height: 45px;
      transform: translateZ(-54px);
    }
  }
`;


export default Loader;