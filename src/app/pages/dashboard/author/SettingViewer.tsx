import React from 'react';
import { Badge } from '../../../components/ui/badge';
import { Card, CardContent } from '../../../components/ui/card';
import { cn } from '../../../components/ui/utils';

interface SettingViewerProps {
  data: any;
  className?: string;
}

export function SettingViewer({ data, className }: SettingViewerProps) {
  if (!data) return null;

  // If data is a string, try to parse it. If not parsable, return as text.
  let parsedData = data;
  if (typeof data === 'string') {
    try {
      // Check if it looks like JSON before parsing to avoid parsing normal text that happens to be valid JSON (like numbers)
      if (data.trim().startsWith('{') || data.trim().startsWith('[')) {
        parsedData = JSON.parse(data);
      }
    } catch (e) {
      // Keep as string if parsing fails
    }
  }

  // If parsed data is still a primitive, render it directly
  if (typeof parsedData !== 'object' || parsedData === null) {
    return (
      <div
        className={cn(
          'text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed',
          className,
        )}
      >
        {String(parsedData)}
      </div>
    );
  }

  return (
    <div className={cn('grid gap-5', className)}>
      {Object.entries(parsedData).map(([key, value]) => {
        // Skip null/undefined values as per requirement (to look clean)
        if (value === null || value === undefined || value === '') return null;

        // Skip specific internal keys if any (though normalize should have cleaned them)
        if (['id', 'name', 'category', 'ep_num'].includes(key)) return null;

        return (
          <div key={key} className="flex flex-col gap-2">
            <h5 className="text-xs font-bold text-primary/60 uppercase tracking-wider flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-primary/40"></span>
              {key}
            </h5>
            <div className="text-sm ml-1">{renderValue(value)}</div>
          </div>
        );
      })}
    </div>
  );
}

function renderValue(value: any): React.ReactNode {
  if (Array.isArray(value)) {
    if (value.length === 0)
      return <span className="text-muted-foreground text-xs">-</span>;

    // Check if array of objects (like relations)
    if (typeof value[0] === 'object' && value[0] !== null) {
      return (
        <div className="grid gap-2">
          {value.map((item: any, idx: number) => (
            <Card key={idx} className="bg-muted/40 border-none shadow-none">
              <CardContent className="p-3 grid gap-1.5">
                {Object.entries(item).map(([k, v]) => (
                  <div key={k} className="flex items-start gap-2 text-sm">
                    <span className="font-semibold shrink-0 text-muted-foreground min-w-[60px] text-xs mt-0.5">
                      {k}
                    </span>
                    <span className="text-foreground/90 leading-snug">
                      {String(v)}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      );
    }

    // Array of strings
    return (
      <div className="flex flex-wrap gap-2">
        {value.map((item: any, idx: number) => (
          <Badge
            key={idx}
            variant="secondary"
            className="font-normal px-2.5 py-1 bg-secondary/50 text-secondary-foreground border-transparent"
          >
            {String(item)}
          </Badge>
        ))}
      </div>
    );
  }

  if (typeof value === 'object' && value !== null) {
    return (
      <div className="pl-3 border-l-2 border-muted/50 py-1">
        {Object.entries(value).map(([k, v]) => (
          <div key={k} className="mb-1 last:mb-0">
            <span className="font-semibold text-xs text-muted-foreground mr-2">
              {k}:
            </span>
            <span>{String(v)}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <span className="leading-relaxed text-foreground/90 font-normal">
      {String(value)}
    </span>
  );
}
