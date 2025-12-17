import { Workflow } from '../types';

// Helper to subtract time
const subtractTime = (date: Date, seconds: number) => {
  const newDate = new Date(date);
  newDate.setSeconds(newDate.getSeconds() - seconds);
  return newDate.toISOString();
};

const now = new Date();

export const MOCK_WORKFLOWS: Workflow[] = [
  {
    id: 'mock-1',
    type: 'Workflow',
    name: 'Customer Onboarding',
    tags: [{ label: 'Test', color: '#D27DFF' }, { label: 'Marketing', color: '#FF9900' }],
    lastUpdated: subtractTime(now, 86400 * 2), // 2 days ago
    icon: 'document',
  },
  {
    id: 'mock-2',
    type: 'Data Processing',
    name: 'Monthly Report Generator',
    tags: [{ label: 'Content Creation', color: '#00A3FF' }],
    lastUpdated: subtractTime(now, 3600), // 1 hour ago
    icon: 'spreadsheet',
  },
  {
    id: 'mock-3',
    type: 'AI Agent',
    name: 'Support Operations Bot',
    tags: [{ label: 'Test', color: '#D27DFF' }, { label: 'Content Creation', color: '#00A3FF' }],
    lastUpdated: subtractTime(now, 604800), // 1 week ago
    icon: 'bulb',
  },
  {
    id: 'mock-4',
    type: 'Workflow',
    name: 'Lead Scoring Pipeline',
    tags: [{ label: 'Marketing', color: '#FF9900' }],
    lastUpdated: now.toISOString(), // Now
    icon: 'apple',
  },
  {
    id: 'mock-5',
    type: 'Content',
    name: 'Blog Post Drafts',
    tags: [{ label: 'Content Creation', color: '#00A3FF' }, { label: 'Marketing', color: '#FF9900' }],
    lastUpdated: subtractTime(now, 86400 * 30), // 1 month ago
    icon: 'pencil',
  },
];
