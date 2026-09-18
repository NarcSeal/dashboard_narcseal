import React, { useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip } from 'react-leaflet';
import { Box, Typography, ButtonGroup, Button, Chip } from '@mui/material';
import 'leaflet/dist/leaflet.css';

// Center of India coordinates
const INDIA_CENTER = [22.9734, 78.6569];

export const HeatmapMap = ({ records = [] }) => {
  const [filter, setFilter] = useState('ALL'); // ALL, POSITIVE, NEGATIVE

  const filteredRecords = records.filter((r) => {
    if (filter === 'ALL') return true;
    return r.result === filter;
  });

  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100%', minHeight: 440, borderRadius: 2, overflow: 'hidden' }}>
      {/* Map Filter Controls Overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 12,
          right: 12,
          zIndex: 1000,
          bgcolor: 'rgba(15, 23, 42, 0.85)',
          backdropFilter: 'blur(8px)',
          p: 0.8,
          borderRadius: 2,
          border: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          gap: 1,
          alignItems: 'center',
        }}
      >
        <Typography variant="caption" sx={{ color: '#94a3b8', px: 0.5, fontWeight: 600 }}>
          Heatmap Filter:
        </Typography>
        <ButtonGroup size="small" variant="outlined">
          <Button
            onClick={() => setFilter('ALL')}
            sx={{
              bgcolor: filter === 'ALL' ? '#38bdf8' : 'transparent',
              color: filter === 'ALL' ? '#000' : '#94a3b8',
              borderColor: 'rgba(255,255,255,0.15)',
              fontSize: '0.72rem',
              fontWeight: 700,
              '&:hover': { bgcolor: filter === 'ALL' ? '#38bdf8' : 'rgba(255,255,255,0.05)' },
            }}
          >
            All ({records.length})
          </Button>
          <Button
            onClick={() => setFilter('POSITIVE')}
            sx={{
              bgcolor: filter === 'POSITIVE' ? '#ef4444' : 'transparent',
              color: filter === 'POSITIVE' ? '#fff' : '#ef4444',
              borderColor: 'rgba(255,255,255,0.15)',
              fontSize: '0.72rem',
              fontWeight: 700,
              '&:hover': { bgcolor: filter === 'POSITIVE' ? '#ef4444' : 'rgba(255,255,255,0.05)' },
            }}
          >
            Positive
          </Button>
          <Button
            onClick={() => setFilter('NEGATIVE')}
            sx={{
              bgcolor: filter === 'NEGATIVE' ? '#10b981' : 'transparent',
              color: filter === 'NEGATIVE' ? '#000' : '#10b981',
              borderColor: 'rgba(255,255,255,0.15)',
              fontSize: '0.72rem',
              fontWeight: 700,
              '&:hover': { bgcolor: filter === 'NEGATIVE' ? '#10b981' : 'rgba(255,255,255,0.05)' },
            }}
          >
            Negative
          </Button>
        </ButtonGroup>
      </Box>

      {/* Map Legend Overlay */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 14,
          left: 14,
          zIndex: 1000,
          bgcolor: 'rgba(15, 23, 42, 0.9)',
          backdropFilter: 'blur(8px)',
          p: 1.2,
          borderRadius: 1.5,
          border: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          gap: 0.6,
        }}
      >
        <Typography variant="caption" sx={{ color: '#64748b', fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase' }}>
          GPS Seizure Heat Intensity
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#ef4444', boxShadow: '0 0 8px #ef4444' }} />
          <Typography variant="caption" sx={{ color: '#f8fafc', fontSize: '0.75rem' }}>
            Positive Test (Seizure Confirmed)
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#10b981' }} />
          <Typography variant="caption" sx={{ color: '#f8fafc', fontSize: '0.75rem' }}>
            Negative / Cleared Inspection
          </Typography>
        </Box>
      </Box>

      <MapContainer
        center={INDIA_CENTER}
        zoom={5}
        scrollWheelZoom={true}
        style={{ width: '100%', height: '100%' }}
      >
        {/* CartoDB Dark Matter tiles for military command-center aesthetic */}
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CartoDB</a> &copy; OpenStreetMap'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {filteredRecords.map((point) => {
          const isPositive = point.result === 'POSITIVE';
          const radius = isPositive ? 12 : 8;
          const color = isPositive ? '#ef4444' : '#10b981';

          return (
            <React.Fragment key={point.id}>
              {/* Outer pulsing glow ring for positive seizures */}
              {isPositive && (
                <CircleMarker
                  center={[point.lat, point.lng]}
                  radius={20}
                  pathOptions={{
                    color: '#ef4444',
                    fillColor: '#ef4444',
                    fillOpacity: 0.15,
                    weight: 1,
                    dashArray: '4, 4',
                  }}
                />
              )}

              {/* Core test coordinate marker */}
              <CircleMarker
                center={[point.lat, point.lng]}
                radius={radius}
                pathOptions={{
                  color: color,
                  fillColor: color,
                  fillOpacity: 0.85,
                  weight: 2,
                }}
              >
                <Tooltip direction="top" offset={[0, -10]} opacity={0.95}>
                  <span style={{ fontWeight: 600 }}>{point.substance}</span> ({point.result})
                </Tooltip>

                <Popup>
                  <Box sx={{ minWidth: 200, p: 0.5 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Chip
                        label={point.result}
                        size="small"
                        sx={{
                          bgcolor: isPositive ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)',
                          color: isPositive ? '#ef4444' : '#10b981',
                          fontWeight: 700,
                          fontSize: '0.68rem',
                        }}
                      />
                      <Typography variant="caption" sx={{ color: '#94a3b8', fontFamily: 'monospace' }}>
                        {point.id}
                      </Typography>
                    </Box>

                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#f8fafc', mb: 0.5 }}>
                      {point.substance}
                    </Typography>

                    <Typography variant="body2" sx={{ color: '#94a3b8', fontSize: '0.8rem', mb: 0.5 }}>
                      📍 {point.location}
                    </Typography>

                    {point.weight_g > 0 && (
                      <Typography variant="caption" sx={{ display: 'block', color: '#f59e0b', fontWeight: 600, mb: 0.5 }}>
                        Seized: {point.weight_g} grams
                      </Typography>
                    )}

                    <Typography variant="caption" sx={{ display: 'block', color: '#64748b' }}>
                      Officer: {point.officer}
                    </Typography>
                    <Typography variant="caption" sx={{ display: 'block', color: '#64748b' }}>
                      Timestamp: {point.timestamp}
                    </Typography>
                    <Typography variant="caption" sx={{ display: 'block', color: '#38bdf8', fontWeight: 600, mt: 0.5 }}>
                      Confidence: {point.confidence}%
                    </Typography>
                  </Box>
                </Popup>
              </CircleMarker>
            </React.Fragment>
          );
        })}
      </MapContainer>
    </Box>
  );
};
