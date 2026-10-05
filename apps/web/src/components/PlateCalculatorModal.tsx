'use client';

import React, { useState, useEffect } from 'react';
import type { WeightUnit } from '@nextset/shared';
import { calculatePlates } from '../lib/plateMath';
import { Disc, X, Check } from 'lucide-react';
import styles from './PlateCalculatorModal.module.css';

interface PlateCalculatorModalProps {
  isOpen: boolean;
  initialWeight: number;
  unit?: WeightUnit;
  onClose: () => void;
  onApplyWeight?: (weight: number) => void;
}

export const PlateCalculatorModal: React.FC<PlateCalculatorModalProps> = ({
  isOpen,
  initialWeight,
  unit = 'kg',
  onClose,
  onApplyWeight,
}) => {
  const defaultBarWeight = unit === 'kg' ? 20 : 45;
  const [weight, setWeight] = useState<number>(initialWeight > 0 ? initialWeight : defaultBarWeight);
  const [barWeight, setBarWeight] = useState<number>(defaultBarWeight);

  useEffect(() => {
    if (isOpen) {
      setWeight(initialWeight > 0 ? initialWeight : defaultBarWeight);
    }
  }, [isOpen, initialWeight, defaultBarWeight]);

  if (!isOpen) return null;

  const result = calculatePlates(weight, barWeight, unit);

  const handleStep = (delta: number) => {
    setWeight((prev) => Math.max(barWeight, Number((prev + delta).toFixed(2))));
  };

  const handleApply = () => {
    if (onApplyWeight) {
      onApplyWeight(weight);
    }
    onClose();
  };

  const barOptions =
    unit === 'kg'
      ? [
          { label: '20kg Olympic', weight: 20 },
          { label: '15kg Olympic', weight: 15 },
          { label: '10kg EZ-Bar', weight: 10 },
        ]
      : [
          { label: '45lb Olympic', weight: 45 },
          { label: '35lb Olympic', weight: 35 },
          { label: '25lb EZ-Bar', weight: 25 },
        ];

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.titleArea}>
            <div className={styles.title}>
              <Disc size={20} color="var(--accent-primary)" />
              <span>Plate Calculator</span>
            </div>
            <div className={styles.subtitle}>
              Plates on each side
            </div>
          </div>
          <button type="button" className={styles.closeBtn} onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Bar Selection */}
        <div className={styles.barSelector}>
          {barOptions.map((opt) => (
            <button
              key={opt.weight}
              type="button"
              className={`${styles.barBtn} ${
                barWeight === opt.weight ? styles.barBtnActive : ''
              }`}
              onClick={() => {
                setBarWeight(opt.weight);
                if (weight < opt.weight) setWeight(opt.weight);
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Target Weight & Stepper Controls */}
        <div className={styles.weightControl}>
          <div className={styles.targetDisplay}>
            <span>{weight}</span>
            <span className={styles.unit}>{unit}</span>
          </div>

          <div className={styles.stepperRow}>
            {[-10, -5, -2.5, 2.5, 5, 10].map((step) => (
              <button
                key={step}
                type="button"
                className={styles.stepBtn}
                onClick={() => handleStep(step)}
              >
                {step > 0 ? `+${step}` : step}
              </button>
            ))}
          </div>
        </div>

        {/* Barbell Collar & Loaded Plates Visualizer */}
        <div className={styles.barbellVisualizer}>
          <div className={styles.shaft} />
          <div className={styles.collar} />
          <div className={styles.sleeve} />

          <div className={styles.platesContainer}>
            {result.platesPerSide.map((plateGroup, gIdx) =>
              Array.from({ length: plateGroup.count }).map((_, cIdx) => (
                <div
                  key={`${gIdx}-${cIdx}`}
                  className={styles.plateBlock}
                  style={{
                    backgroundColor: plateGroup.spec.color,
                    color: plateGroup.spec.labelColor,
                    height: `${plateGroup.spec.heightRatio * 104}px`,
                    width: `${plateGroup.spec.widthPx}px`,
                  }}
                  title={`${plateGroup.spec.weight}${unit}`}
                >
                  {plateGroup.spec.weight}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Per-Side Loading Breakdown */}
        <div className={styles.breakdownSection}>
          <div className={styles.breakdownTitle}>
            Load Per Side ({result.weightPerSide} {unit})
          </div>

          {result.platesPerSide.length === 0 ? (
            <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-muted)' }}>
              Empty bar ({barWeight} {unit}). No plates needed.
            </div>
          ) : (
            <div className={styles.chipsList}>
              {result.platesPerSide.map((item, idx) => (
                <div key={idx} className={styles.plateChip}>
                  <span
                    className={styles.chipColorDot}
                    style={{ backgroundColor: item.spec.color }}
                  />
                  <span>
                    {item.count} × {item.spec.weight} {unit}
                  </span>
                </div>
              ))}
            </div>
          )}

          {result.unmatchedWeight > 0 && (
            <div style={{ fontSize: '11px', color: 'var(--accent-amber)', marginTop: 2 }}>
              {result.unmatchedWeight} {unit} can&apos;t be made with standard plates.
            </div>
          )}
        </div>

        {/* Apply Action Button */}
        {onApplyWeight && (
          <button
            type="button"
            className="btn-primary"
            style={{ width: '100%', height: '48px' }}
            onClick={handleApply}
          >
            <Check size={18} />
            <span>Use {weight} {unit}</span>
          </button>
        )}
      </div>
    </div>
  );
};
