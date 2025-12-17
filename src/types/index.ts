export interface Workflow {
    id: string;
    type: string;
    name: string;
    tags: TagData[];
    lastUpdated: string;
    icon: string;
}


export interface TagData {
  label: string;
  color?: string;
}
