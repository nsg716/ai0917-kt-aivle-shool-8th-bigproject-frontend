import React from 'react';
import { X, Crown } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from './ui/utils';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';

interface SelectedSettingCardProps {
  item: {
    id?: number;
    keyword: string;
    authorName?: string;
    workTitle: string;
    category: string;
    // Extra fields from setting_format.txt
    nickname?: string;
    background?: string;
    description?: string;
    species?: string;
  };
  onRemove: () => void;
  isCrown: boolean;
  onSelectCrown?: () => void;
  onClick?: () => void;
  hideRemove?: boolean;
}

// Helper to format complex objects/arrays into natural text
const getFormattedValues = (val: any): string[] => {
  if (val === null || val === undefined) return [];
  if (typeof val === 'string') {
    const trimmed = val.trim();
    // Check for explicit "None" or "null" strings
    if (['None', 'null', 'undefined', '', ' '].includes(trimmed)) return [];
    // Skip long sentences/dialogues (e.g. > 20 chars) or strings with quotes indicating dialogue
    if (trimmed.length > 20 || trimmed.includes('"') || trimmed.includes("'"))
      return [];
    return [trimmed];
  }
  if (typeof val === 'number' || typeof val === 'boolean') return [String(val)];

  if (Array.isArray(val)) {
    return val.flatMap(getFormattedValues);
  }

  if (typeof val === 'object') {
    return Object.entries(val)
      .filter(
        ([k]) =>
          ![
            'id',
            'epNum',
            'userId',
            'workId',
            'created_at',
            'updated_at',
          ].includes(k),
      ) // Filter technical fields
      .flatMap(([_, v]) => getFormattedValues(v));
  }
  return [String(val)];
};

const parseAndFormatJson = (str: string | undefined | null): string[] => {
  if (!str) return [];
  try {
    let parsed: any = str;
    // Check if it looks like a JSON string
    if (
      typeof str === 'string' &&
      (str.trim().startsWith('{') || str.trim().startsWith('['))
    ) {
      try {
        parsed = JSON.parse(str);
      } catch (e) {
        // If parsing fails, treat as raw string (split by '/' if it looks like the old format)
        // But here we just return it as single string if not empty
        return getFormattedValues(str);
      }
    }

    if (typeof parsed === 'object' && parsed !== null) {
      // Logic: If it's an object with one key that matches a name/keyword, drill down
      const keys = Object.keys(parsed);
      if (keys.length === 1) {
        return getFormattedValues(parsed[keys[0]]);
      }
      return getFormattedValues(parsed);
    }
    return getFormattedValues(parsed);
  } catch (e) {
    return getFormattedValues(str);
  }
};

export function SelectedSettingCard({
  item,
  onRemove,
  isCrown,
  onSelectCrown,
  onClick,
  hideRemove,
}: SelectedSettingCardProps) {
  const showCrown = isCrown || !!onSelectCrown;
  const descriptionValues = parseAndFormatJson(
    item.description || item.background,
  );

  return (
    <Card
      className={cn(
        'relative group transition-all duration-200 overflow-hidden',
        onClick && 'cursor-pointer hover:border-primary/50 hover:shadow-md',
        isCrown
          ? 'border-yellow-500 shadow-md ring-1 ring-yellow-500 bg-yellow-50/10'
          : 'border-slate-200',
      )}
      onClick={onClick}
    >
      <CardContent className={cn('p-3 space-y-2', showCrown ? 'pr-8' : '')}>
        {/* Crown Selection (Radio Logic) */}
        {showCrown && (
          <div
            className={cn(
              'absolute top-2.5 right-2.5 z-10 p-1 rounded-full transition-colors',
              onSelectCrown && 'cursor-pointer hover:bg-slate-100',
            )}
            onClick={(e) => {
              e.stopPropagation();
              if (onSelectCrown) onSelectCrown();
            }}
          >
            <Crown
              className={cn(
                'w-4 h-4 transition-colors',
                isCrown
                  ? 'fill-yellow-500 text-yellow-500'
                  : 'text-slate-300 hover:text-slate-400',
              )}
            />
          </div>
        )}

        {/* Remove Button */}
        {!hideRemove && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 left-2 h-5 w-5 text-slate-300 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity z-20"
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
          >
            <X className="w-3 h-3" />
          </Button>
        )}

        {/* Header: Keyword & Category */}
        <div
          className={cn(
            'flex items-start justify-between gap-2',
            !hideRemove && 'pl-5',
          )}
        >
          <div className="flex flex-col min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h5
                className="font-semibold text-sm text-slate-900 truncate"
                title={item.keyword}
              >
                {item.keyword}
              </h5>
              <Badge
                variant="outline"
                className="text-[10px] px-1 h-5 shrink-0 font-normal text-slate-500"
              >
                {item.category}
              </Badge>
            </div>

            {/* Work Title below Keyword */}
            <div className="text-[11px] text-slate-400 truncate mt-0.5">
              {item.workTitle}
              {item.authorName && <span className="mx-1">·</span>}
              {item.authorName}
            </div>
          </div>
        </div>

        {/* Description / Background - Rendered as Badges */}
        <div className={cn('h-[44px] overflow-hidden', !hideRemove && 'pl-1')}>
          {descriptionValues.length > 0 ? (
            <div className="line-clamp-2 leading-[22px]">
              {descriptionValues.map((val, idx) => (
                <span
                  key={idx}
                  className="inline-block px-1.5 py-0.5 mr-1 rounded text-[10px] font-medium bg-slate-100 text-slate-600 border border-slate-200 align-middle"
                >
                  {val}
                </span>
              ))}
            </div>
          ) : (
            <span className="text-xs text-slate-300 italic">설명 없음</span>
          )}
        </div>

        {/* Footer: Species & Nickname */}
        {(item.species || item.nickname) && (
          <div
            className={cn('flex flex-wrap gap-1.5 pt-1', !hideRemove && 'pl-1')}
          >
            {item.species && (
              <Badge
                variant="secondary"
                className="text-[10px] px-1.5 h-5 bg-slate-100 text-slate-600 hover:bg-slate-200"
              >
                {item.species}
              </Badge>
            )}
            {item.nickname && (
              <span className="text-[10px] text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">
                {item.nickname}
              </span>
            )}
          </div>
        )}
      </CardContent>

      {/* Core Label for Crown */}
      {isCrown && (
        <div className="absolute bottom-2 right-2">
          <span className="text-[9px] font-bold text-yellow-600 bg-yellow-100 px-1.5 py-0.5 rounded-full border border-yellow-200/50">
            CORE
          </span>
        </div>
      )}
    </Card>
  );
}
