import React, { useCallback } from 'react';
import { Particles } from "@tsparticles/react";
import { loadSlim } from 'tsparticles-slim';
import { useTheme } from '../../context/ThemeContext';

const ParticleBackground = ({ variant = 'default' }) => {
  const { isDarkMode } = useTheme();

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  // Define different particle configurations
  const getConfig = () => {
    // Base configuration shared by all variants
    const baseConfig = {
      fpsLimit: 60,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: 'push',
          },
          onHover: {
            enable: true,
            mode: 'repulse',
          },
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 100,
            duration: 0.4,
          },
        },
      },
      particles: {
        links: {
          enable: true,
          distance: 150,
          color: isDarkMode ? '#ffffff' : '#000000',
          opacity: 0.2,
          width: 1,
        },
        collisions: {
          enable: true,
        },
        move: {
          direction: 'none',
          enable: true,
          outModes: {
            default: 'bounce',
          },
          random: false,
          speed: 1,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 800,
          },
          value: 80,
        },
        opacity: {
          value: 0.3,
        },
        shape: {
          type: 'circle',
        },
        size: {
          value: { min: 1, max: 3 },
        },
      },
      detectRetina: true,
    };

    // Variant specific configurations
    switch (variant) {
      case 'home':
        return {
          ...baseConfig,
          particles: {
            ...baseConfig.particles,
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 100,
            },
            color: {
              value: isDarkMode ? ['#3366FF', '#6633FF', '#00CCCC'] : ['#3366FF', '#6633FF', '#00CCCC'],
            },
            opacity: {
              value: 0.4,
            },
            move: {
              ...baseConfig.particles.move,
              speed: 1.5,
            },
          },
        };
      
      case 'login':
        return {
          ...baseConfig,
          particles: {
            ...baseConfig.particles,
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 60,
            },
            color: {
              value: isDarkMode ? ['#6633FF', '#00CCCC'] : ['#3366FF', '#6633FF'],
            },
            shape: {
              type: ['circle', 'triangle'],
            },
            opacity: {
              value: 0.3,
            },
            size: {
              value: { min: 1, max: 4 },
            },
            move: {
              ...baseConfig.particles.move,
              speed: 1.2,
            },
          },
        };
      
      case 'selection':
        return {
          ...baseConfig,
          particles: {
            ...baseConfig.particles,
            number: {
              density: {
                enable: true,
                area: 900,
              },
              value: 70,
            },
            color: {
              value: isDarkMode ? ['#3366FF', '#6633FF', '#00CCCC'] : ['#3366FF', '#6633FF', '#00CCCC'],
            },
            shape: {
              type: 'circle',
            },
            opacity: {
              value: 0.3,
            },
            size: {
              value: { min: 1, max: 3 },
            },
            move: {
              ...baseConfig.particles.move,
              speed: 1,
              direction: 'top',
            },
          },
        };
        
      default:
        return baseConfig;
    }
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={getConfig()}
      className="absolute inset-0 -z-10"
    />
  );
};

export default ParticleBackground;