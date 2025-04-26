export interface ApiResponse<T> {
  success: boolean;        // Indica si la operación fue exitosa
  statusCode: number;      // Código HTTP de la respuesta
  message?: string;        // Mensaje descriptivo (opcional)
  data: T;                 // Datos principales de la respuesta
  meta?: {                 // Metadatos adicionales (opcional)
    page?: number;
    total?: number;
    limit?: number;
    [key: string]: any;    // Para propiedades adicionales
  };
  error?: {               // Detalles de error (solo cuando success = false)
    code?: string;        // Código interno de error
    details?: string[];   // Detalles específicos del error
  };
}