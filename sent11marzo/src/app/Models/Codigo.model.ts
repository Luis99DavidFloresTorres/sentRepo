export interface CodigoEntity {
  id: number;
  codigo: string;
  nombre: string;
}

export interface CodigoProducto {
  id: number;
  codigo: string;
  codigoEntity: CodigoEntity;
  productos: any[];
}
