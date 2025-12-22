interface HeatmapData {
  price: number;
  volume: number;
  timestamp: string;
}

interface HeatmapChartProps {
  data?: HeatmapData[];
  title?: string;
}

export function HeatmapChart({ data, title = 'Order Book Density' }: HeatmapChartProps) {
  // Default demo data
  const defaultData: HeatmapData[] = Array.from({ length: 20 }, (_, i) => ({
    price: 42000 + i * 100,
    volume: Math.random() * 1000,
    timestamp: new Date(Date.now() - i * 60000).toISOString(),
  }));

  const heatmapData = data || defaultData;
  const maxVolume = Math.max(...heatmapData.map(d => d.volume));

  const getHeatColor = (volume: number) => {
    const intensity = volume / maxVolume;
    
    if (intensity > 0.7) {
      return 'var(--sne-critical)';
    } else if (intensity > 0.4) {
      return 'var(--sne-accent)';
    } else if (intensity > 0.2) {
      return 'var(--sne-warning)';
    } else {
      return 'var(--sne-surface-elevated)';
    }
  };

  const getOpacity = (volume: number) => {
    const intensity = volume / maxVolume;
    return 0.3 + intensity * 0.7;
  };

  return (
    <div
      className="rounded-lg border p-6"
      style={{
        backgroundColor: 'var(--sne-surface-1)',
        borderColor: 'var(--border)',
      }}
    >
      <div className="mb-4">
        <h3 style={{ color: 'var(--sne-text-primary)' }}>{title}</h3>
        <p style={{ fontSize: 'var(--text-small)', color: 'var(--sne-text-secondary)' }}>
          Densidade de volume por faixa de preço
        </p>
      </div>

      <div className="space-y-1">
        {heatmapData.slice(0, 15).map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 group transition-all hover:scale-[1.02]"
          >
            <code
              style={{
                fontFamily: 'var(--font-family-mono)',
                fontSize: 'var(--text-small)',
                color: 'var(--sne-text-secondary)',
                minWidth: '80px',
              }}
            >
              ${item.price.toLocaleString()}
            </code>
            
            <div className="flex-1 relative h-8 rounded overflow-hidden"
                 style={{ backgroundColor: 'var(--sne-bg)' }}>
              <div
                className="absolute inset-y-0 left-0 transition-all duration-200"
                style={{
                  width: `${(item.volume / maxVolume) * 100}%`,
                  backgroundColor: getHeatColor(item.volume),
                  opacity: getOpacity(item.volume),
                }}
              />
              <div
                className="absolute inset-0 flex items-center px-3"
                style={{
                  color: 'var(--sne-text-primary)',
                  fontSize: 'var(--text-small)',
                  fontFamily: 'var(--font-family-mono)',
                }}
              >
                {item.volume.toFixed(2)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t flex items-center gap-6" style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded"
            style={{ backgroundColor: 'var(--sne-surface-elevated)' }}
          />
          <span style={{ fontSize: 'var(--text-small)', color: 'var(--sne-text-secondary)' }}>
            Baixo
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded"
            style={{ backgroundColor: 'var(--sne-warning)' }}
          />
          <span style={{ fontSize: 'var(--text-small)', color: 'var(--sne-text-secondary)' }}>
            Médio
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded"
            style={{ backgroundColor: 'var(--sne-accent)' }}
          />
          <span style={{ fontSize: 'var(--text-small)', color: 'var(--sne-text-secondary)' }}>
            Alto
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded"
            style={{ backgroundColor: 'var(--sne-critical)' }}
          />
          <span style={{ fontSize: 'var(--text-small)', color: 'var(--sne-text-secondary)' }}>
            Crítico
          </span>
        </div>
      </div>
    </div>
  );
}
