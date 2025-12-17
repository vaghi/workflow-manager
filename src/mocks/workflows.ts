import { Workflow } from '../types';

export const MOCK_WORKFLOWS: Workflow[] = [
  {
    id: 'mock-1',
    type: 'Workflow',
    name: 'Customer Onboarding',
    tags: [{ label: 'Test', color: '#D27DFF' }, { label: 'Marketing', color: '#FF9900' }],
    lastUpdated: '2 days ago',
    icon: 'document',
  },
  {
    id: 'mock-2',
    type: 'Data Processing',
    name: 'Monthly Report Generator',
    tags: [{ label: 'Content Creation', color: '#00A3FF' }],
    lastUpdated: '5 hours ago',
    icon: 'spreadsheet',
  },
  {
    id: 'mock-3',
    type: 'AI Agent',
    name: 'Support Operations Bot',
    tags: [{ label: 'Test', color: '#D27DFF' }, { label: 'Content Creation', color: '#00A3FF' }],
    lastUpdated: '1 hour ago',
    icon: 'bulb',
  },
  {
    id: 'mock-4',
    type: 'Workflow',
    name: 'Lead Scoring Pipeline',
    tags: [{ label: 'Marketing', color: '#FF9900' }],
    lastUpdated: 'Just now',
    icon: 'apple',
  },
  {
    id: 'mock-5',
    type: 'Content',
    name: 'Blog Post Drafts',
    tags: [{ label: 'Content Creation', color: '#00A3FF' }, { label: 'Marketing', color: '#FF9900' }],
    lastUpdated: '1 week ago',
    icon: 'pencil',
  },
];
