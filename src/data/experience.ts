/**
 * Experiencia profesional, de la más reciente a la más antigua.
 * Las fechas van en formato `AAAA-MM` y se formatean en el componente.
 */

export interface Experience {
  role: string;
  company: string;
  place: string;
  /** Tipo de contrato o modalidad (FCT, contrato, freelance…). */
  kind: string;
  start: string;
  end: string;
  summary: string;
  tasks: string[];
  /** Áreas que toca el puesto (se muestran como etiquetas). */
  areas: string[];
}

export const experience: Experience[] = [
  {
    role: 'Técnico de sistemas',
    company: 'App Informática',
    place: 'Dos Hermanas, Sevilla',
    kind: 'Formación en Centros de Trabajo (FCT)',
    start: '2025-03',
    end: '2025-06',
    summary:
      'Equipos reales, averías reales y personas que necesitaban que todo volviera a funcionar.',
    tasks: [
      'Mantenía el software y el hardware de los equipos y aplicaba medidas para prevenir fallos.',
      'Sustituía equipos averiados o piezas concretas de hardware.',
      'Revisaba, diagnosticaba y reparaba equipos informáticos.',
      'Instalaba software a medida.',
      'Resolvía dudas y problemas con los sistemas informáticos.',
    ],
    areas: ['Hardware', 'Diagnóstico', 'Mantenimiento', 'Software', 'Soporte'],
  },
];
