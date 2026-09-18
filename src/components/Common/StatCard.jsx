import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';

const MotionCard = motion.create(Card);

// Simple count-up hook
function useCountUp(target, duration = 1200) {
  const [count, setCount] = useState(0);
  const startTime = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    if (typeof target !== 'number' || isNaN(target)) {
      setCount(target || 0);
      return;
    }
    startTime.current = performance.now();
    const animate = (now) => {
      const elapsed = now - startTime.current;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration]);

  return count;
}

export const StatCard = ({ title, value, subtitle, icon: Icon, color = '#06B6D4', trend, pulse }) => {
  const displayValue = useCountUp(typeof value === 'number' ? value : 0);

  return (
    <MotionCard
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className={pulse ? 'amber-pulse' : ''}
      sx={{
        backgroundColor: '#111827',
        border: '1px solid #374151',
        borderRadius: '16px',
        position: 'relative',
        overflow: 'hidden',
        transition: 'border-color 0.2s ease',
        '&:hover': {
          borderColor: color,
        },
      }}
    >
      {/* Top accent bar */}
      <Box sx={{ height: '3px', width: '100%', background: `linear-gradient(90deg, ${color}, transparent)` }} />

      <CardContent sx={{ p: 2.5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography
              variant="caption"
              sx={{
                color: '#9CA3AF',
                fontWeight: 600,
                letterSpacing: '0.06em',
                fontSize: '0.7rem',
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                mt: 0.5,
                color: '#F9FAFB',
                fontFamily: 'var(--font-mono)',
                fontSize: '2rem',
              }}
            >
              {typeof value === 'number' ? displayValue : value}
            </Typography>
          </Box>
          <Box
            sx={{
              p: 1.2,
              borderRadius: '12px',
              backgroundColor: `${color}15`,
              border: `1px solid ${color}25`,
              color: color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {Icon && <Icon sx={{ fontSize: 26 }} />}
          </Box>
        </Box>

        {(subtitle || trend) && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1.5 }}>
            {trend && (
              <Typography variant="caption" sx={{ color: color, fontWeight: 700, fontSize: '0.75rem' }}>
                {trend}
              </Typography>
            )}
            {subtitle && (
              <Typography variant="caption" sx={{ color: '#6B7280', fontSize: '0.72rem' }}>
                {subtitle}
              </Typography>
            )}
          </Box>
        )}
      </CardContent>
    </MotionCard>
  );
};
