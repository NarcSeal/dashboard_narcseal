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
          bgcolor: 'rgba(250, 249, 244, 0.85)',
          backdropFilter: 'blur(8px)',
          p: 0.8,
          borderRadius: 2,
          border: '1px solid #C8C4B5',
          display: 'flex',
          gap: 1,
          alignItems: 'center',
        }}
      >
        <Typography variant="caption" sx={{ color: 'text.secondary', px: 0.5, fontWeight: 700 }}>
          Heatmap Filter:
        </Typography>
        <ButtonGroup size="small" variant="outlined">
          <Button
            onClick={() => setFilter('ALL')}
            sx={{
              bgcolor: filter === 'ALL' ? '#343A24' : 'transparent',
              color: filter === 'ALL' ? '#FAF9F4' : 'text.secondary',
              borderColor: '#C8C4B5',
              fontSize: '0.72rem',
              fontWeight: 700,
              '&:hover': { bgcolor: filter === 'ALL' ? '#1F241A' : 'rgba(0,0,0,0.05)' },
            }}
          >
            All ({records.length})
          </Button>
          <Button
            onClick={() => setFilter('POSITIVE')}
            sx={{
              bgcolor: filter === 'POSITIVE' ? '#D94B4B' : 'transparent',
              color: filter === 'POSITIVE' ? '#FAF9F4' : '#D94B4B',
              borderColor: '#C8C4B5',
              fontSize: '0.72rem',
              fontWeight: 700,
              '&:hover': { bgcolor: filter === 'POSITIVE' ? '#B33939' : 'rgba(217,75,75,0.05)' },
            }}
          >
            Positive
          </Button>
          <Button
            onClick={() => setFilter('NEGATIVE')}
            sx={{
              bgcolor: filter === 'NEGATIVE' ? '#3E7A4A' : 'transparent',
              color: filter === 'NEGATIVE' ? '#FAF9F4' : '#3E7A4A',
              borderColor: '#C8C4B5',
              fontSize: '0.72rem',
              fontWeight: 700,
              '&:hover': { bgcolor: filter === 'NEGATIVE' ? '#2F5D38' : 'rgba(62,122,74,0.05)' },
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
          bgcolor: 'rgba(250, 249, 244, 0.9)',
          backdropFilter: 'blur(8px)',
          p: 1.2,
          borderRadius: 1.5,
          border: '1px solid #C8C4B5',
          display: 'flex',
          flexDirection: 'column',
          gap: 0.6,
        }}
      >
        <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase' }}>
          GPS Seizure Heat Intensity
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#D94B4B', boxShadow: '0 0 8px #D94B4B' }} />
          <Typography variant="caption" sx={{ color: 'text.primary', fontSize: '0.75rem', fontWeight: 600 }}>
            Positive Test (Seizure Confirmed)
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#3E7A4A' }} />
          <Typography variant="caption" sx={{ color: 'text.primary', fontSize: '0.75rem', fontWeight: 600 }}>
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
        {/* CartoDB Light Matter tiles for institutional aesthetic */}
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CartoDB</a> &copy; OpenStreetMap'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />

        {filteredRecords.map((point) => {
          const isPositive = point.result === 'POSITIVE';
          const radius = isPositive ? 12 : 8;
          const color = isPositive ? '#D94B4B' : '#3E7A4A';

          return (
            <React.Fragment key={point.id}>
              {/* Outer pulsing glow ring for positive seizures */}
              {isPositive && (
                <CircleMarker
                  center={[point.lat, point.lng]}
                  radius={20}
                  pathOptions={{
                    color: '#D94B4B',
                    fillColor: '#D94B4B',
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
                  <Box sx={{ minWidth: 200, p: 0.5, bgcolor: '#FAF9F4', color: '#1F241A' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Chip
                        label={point.result}
                        size="small"
                        sx={{
                          bgcolor: isPositive ? 'rgba(217, 75, 75, 0.1)' : 'rgba(62, 122, 74, 0.1)',
                          color: isPositive ? '#D94B4B' : '#3E7A4A',
                          fontWeight: 700,
                          fontSize: '0.68rem',
                          border: `1px solid ${isPositive ? '#D94B4B' : '#3E7A4A'}`,
                        }}
                      />
                      <Typography variant="caption" sx={{ color: 'text.secondary', fontFamily: 'monospace' }}>
                        {point.id}
                      </Typography>
                    </Box>

                    <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'text.primary', mb: 0.5 }}>
                      {point.substance}
                    </Typography>

                    <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.8rem', mb: 0.5, fontWeight: 600 }}>
                      📍 {point.location}
                    </Typography>

                    {point.weight_g > 0 && (
                      <Typography variant="caption" sx={{ display: 'block', color: '#C68A22', fontWeight: 700, mb: 0.5 }}>
                        Seized: {point.weight_g} grams
                      </Typography>
                    )}

                    <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary', fontWeight: 600 }}>
                      Officer: {point.officer}
                    </Typography>
                    <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary', fontWeight: 600 }}>
                      Timestamp: {point.timestamp}
                    </Typography>
                    <Typography variant="caption" sx={{ display: 'block', color: '#343A24', fontWeight: 700, mt: 0.5 }}>
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
