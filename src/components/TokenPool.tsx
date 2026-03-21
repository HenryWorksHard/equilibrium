import type { Token } from '../types';
import { TokenCard } from './TokenCard';

interface TokenPoolProps {
  tokens: Token[];
  onDragStart: (e: React.DragEvent, token: Token, source: string) => void;
}

export const TokenPool = ({ tokens, onDragStart }: TokenPoolProps) => {
  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <div className="text-center mb-4">
        <span className="text-chalk/40 text-xs font-mono tracking-widest uppercase">
          available runners
        </span>
      </div>
      
      <div className="flex flex-wrap justify-center gap-6 p-6 
        border border-chalk/10 rounded-lg bg-slate/20">
        {tokens.map((token) => (
          <TokenCard
            key={token.id}
            token={token}
            source="pool"
            onDragStart={onDragStart}
          />
        ))}
        
        {tokens.length === 0 && (
          <span className="text-chalk/30 text-sm font-mono py-8">
            all runners placed on scale
          </span>
        )}
      </div>
    </div>
  );
};
