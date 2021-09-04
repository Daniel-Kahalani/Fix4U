import React from 'react';
import { GradeContainer, Title } from '../styles/gradeStyles';

export default function Grade({ grade }) {
  const colors = [
    'rgb(238, 96, 85)',
    'rgb(255, 155, 133)',
    'rgb(255, 217, 125)',
    'rgb(170, 246, 131)',
    'rgb(96, 211, 148)',
  ];
  let gradeColor;

  if (grade < 1) {
    gradeColor = colors[0];
  } else if (grade < 2) {
    gradeColor = colors[1];
  } else if (grade < 3) {
    gradeColor = colors[2];
  } else if (grade < 4) {
    gradeColor = colors[3];
  } else {
    gradeColor = colors[4];
  }

  return (
    <GradeContainer color={gradeColor}>
      <Title>{grade.toFixed(1)}</Title>
    </GradeContainer>
  );
}
