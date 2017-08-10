import { clipboard } from 'electron';

export const writeText = (content) => {
  clipboard.writeText(content, 'selection');
};