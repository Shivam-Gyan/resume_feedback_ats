import React from 'react';

interface ScoreBadgeProps {
  score: number;
}

const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score }) => {
  const getBadgeStyles = (score: number) => {
    if (score > 60) {
      return {
        bgColor: 'bg-green-100',
        textColor: 'text-green-600',
        label: 'Strong'
      };
    } else if (score >= 50) {
      return {
        bgColor: 'bg-yellow-100',
        textColor: 'text-yellow-600',
        label: 'Good start'
      };
    } else {
      return {
        bgColor: 'bg-red-100',
        textColor: 'text-red-600',
        label: 'Needs Work'
      };
    }
  };

  const { bgColor, textColor, label } = getBadgeStyles(score);

  return (
    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${bgColor} ${textColor}`}>
      <p>{label}</p>
    </div>
  );
};

export default ScoreBadge;
