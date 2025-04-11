import { BehaviorSubject } from 'rxjs';

export interface SingleSpaProps {
  component?: 'navbar' | 'sidebar' | 'default'; // Solo componentes de layout
  domElement?: HTMLElement;         // Contenedor donde montar
  [key: string]: unknown;
}

export const singleSpaPropsSubject = new BehaviorSubject<SingleSpaProps>({});

// Helper para obtener props
export function getComponentToRender(): SingleSpaProps['component'] {
  const props = singleSpaPropsSubject.getValue();
  return props?.component || 'default';
}