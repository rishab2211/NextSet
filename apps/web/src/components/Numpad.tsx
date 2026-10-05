'use client';

import React, { useState, useEffect } from 'react';
import { Delete, Check } from 'lucide-react';
import styles from './Numpad.module.css';

export type NumpadMode = 'weight' | 'reps' | 'rpe';

interface NumpadProps {
  isOpen: boolean;
  mode: NumpadMode;
  initialValue: number;
  prevValue?: number;
  unit?: string;
  title?: string;
  onConfirm: (value: number) => void;
  onClose: () => void;
  onOpenPlateCalculator?: (currentVal: number) => void;
}

export const Numpad: React.FC<NumpadProps> = ({
  isOpen,
  mode,
  initialValue,
  prevValue,
  unit,
  title,
  onConfirm,
  onClose,
  onOpenPlateCalculator,
}) => {
  const [currentStr, setCurrentStr] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      setCurrentStr(initialValue > 0 ? initialValue.toString() : '');
    }
  }, [isOpen, initialValue]);

  if (!isOpen) return null;

  const handleDigit = (digit: string) => {
    if (digit === '.' && currentStr.includes('.')) return;
    if (currentStr.length >= 6) return;
    setCurrentStr((prev) => (prev === '0' && digit !== '.' ? digit : prev + digit));
  };

  const handleBackspace = () => {
    setCurrentStr((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    setCurrentStr('');
  };

  const handleQuickAdd = (amount: number) => {
    const num = parseFloat(currentStr) || 0;
    const next = Math.max(0, Number((num + amount).toFixed(2)));
    setCurrentStr(next.toString());
  };

  const handleMatchPrev = () => {
    if (prevValue && prevValue > 0) {
      setCurrentStr(prevValue.toString());
    }
  };

  const handleConfirm = () => {
    const val = parseFloat(currentStr) || 0;
    onConfirm(val);
    onClose();
  };

  const quickIncrements =
    mode === 'weight'
      ? [1.25, 2.5, 5, 10]
      : mode === 'reps'
      ? [1, 2, 5]
      : [0.5, 1.0];

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        {/* Header & Display */}
        <div className={styles.header}>
          <div className={styles.label}>{title || `Enter ${mode}`}</div>
          <div className={styles.displayValue}>
            <span>{currentStr || '0'}</span>
            <span className={styles.unit}>{unit || (mode === 'weight' ? 'kg' : '')}</span>
          </div>
        </div>

        {/* Quick Increment Buttons */}
        <div className={styles.quickBar}>
          {prevValue !== undefined && prevValue > 0 && (
            <button
              type="button"
              className={styles.quickBtn}
              style={{ color: 'var(--accent-primary)', borderColor: 'rgba(249, 115, 22, 0.35)', flex: '1.2' }}
              onClick={handleMatchPrev}
              title={`Match previous: ${prevValue}`}
            >
              Prev ({prevValue})
            </button>
          )}

          {mode === 'weight' && onOpenPlateCalculator && (
            <button
              type="button"
              className={styles.quickBtn}
              style={{ flex: '1.1' }}
              onClick={() => {
                const val = parseFloat(currentStr) || initialValue || 20;
                onClose();
                onOpenPlateCalculator(val);
              }}
            >
              Plates
            </button>
          )}

          {quickIncrements.map((inc) => (
            <button
              key={inc}
              type="button"
              className={styles.quickBtn}
              onClick={() => handleQuickAdd(inc)}
            >
              +{inc}
            </button>
          ))}

          <button type="button" className={styles.quickBtn} onClick={handleClear}>
            C
          </button>
        </div>

        {/* 3x4 Keypad Grid */}
        <div className={styles.keypadGrid}>
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
            <button
              key={digit}
              type="button"
              className={styles.keyBtn}
              onClick={() => handleDigit(digit)}
            >
              {digit}
            </button>
          ))}

          {/* Bottom Row: Decimal / Backspace / Done */}
          <button
            type="button"
            className={`${styles.keyBtn} ${styles.actionBtn}`}
            onClick={() => handleDigit('.')}
          >
            .
          </button>

          <button
            type="button"
            className={styles.keyBtn}
            onClick={() => handleDigit('0')}
          >
            0
          </button>

          <button
            type="button"
            className={`${styles.keyBtn} ${styles.actionBtn}`}
            onClick={handleBackspace}
            aria-label="Backspace"
          >
            <Delete size={22} />
          </button>
        </div>

        <button
          type="button"
          className={`${styles.keyBtn} ${styles.confirmBtn}`}
          onClick={handleConfirm}
        >
          <Check size={20} style={{ marginRight: 6 }} />
          <span>Done</span>
        </button>
      </div>
    </div>
  );
};
