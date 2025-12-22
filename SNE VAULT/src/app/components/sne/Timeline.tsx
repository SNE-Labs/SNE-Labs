import { CheckCircle2, Circle, Clock } from 'lucide-react';

interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  status: 'completed' | 'pending' | 'current';
}

interface TimelineProps {
  events: TimelineEvent[];
}

export function Timeline({ events }: TimelineProps) {
  return (
    <div className="space-y-6">
      {events.map((event, idx) => {
        const isLast = idx === events.length - 1;
        
        return (
          <div key={event.id} className="relative">
            {/* Timeline line */}
            {!isLast && (
              <div
                className="absolute left-4 top-10 w-0.5 h-full"
                style={{
                  backgroundColor:
                    event.status === 'completed'
                      ? 'var(--sne-success)'
                      : 'var(--border)',
                }}
              />
            )}

            <div className="flex gap-4">
              {/* Icon */}
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10"
                style={{
                  backgroundColor:
                    event.status === 'completed'
                      ? 'var(--sne-success)'
                      : event.status === 'current'
                      ? 'var(--sne-accent)'
                      : 'var(--sne-surface-elevated)',
                  border: `2px solid ${
                    event.status === 'completed'
                      ? 'var(--sne-success)'
                      : event.status === 'current'
                      ? 'var(--sne-accent)'
                      : 'var(--border)'
                  }`,
                }}
              >
                {event.status === 'completed' ? (
                  <CheckCircle2 className="w-4 h-4" style={{ color: 'var(--sne-bg)' }} />
                ) : event.status === 'current' ? (
                  <Clock className="w-4 h-4" style={{ color: 'var(--sne-bg)' }} />
                ) : (
                  <Circle className="w-4 h-4" style={{ color: 'var(--sne-text-secondary)' }} />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 pb-6">
                <div className="flex items-start justify-between mb-2">
                  <h4 style={{ color: 'var(--sne-text-primary)' }}>
                    {event.title}
                  </h4>
                  <code
                    style={{
                      fontSize: 'var(--text-small)',
                      fontFamily: 'var(--font-family-mono)',
                      color: 'var(--sne-text-secondary)',
                    }}
                  >
                    {event.timestamp}
                  </code>
                </div>
                <p style={{ color: 'var(--sne-text-secondary)', fontSize: 'var(--text-body)' }}>
                  {event.description}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
